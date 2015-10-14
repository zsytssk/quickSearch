// 滚动条 经常跳到 最上面
var keyword = '',
	searchUrlSuffix = '&from=quicksearch',
	quickSearch,
	searchurl;

var bs, bsbox, bsform, bsinput, bscon, bstopbar;
var bsformcontent, change, external, bsiframe, btn_search, btn_cancel, btn_more;
var lastUpdate = '2015/07/22 10:13';

chrome.storage.sync.get('quickSearch', function (r) {
	var islastUpdate;
	if(!r.quickSearch) {
		islastUpdate = false;
	} else {
		islastUpdate = Date.parse(r.quickSearch.lastUpdate) >= Date.parse(lastUpdate);
	}

	if(islastUpdate) {
		quickSearch = r.quickSearch;
	} else {
		quickSearch = {
			List: [{
				'type': 'baidu',
				'url': 'https://www.baidu.com/s?wd=',
			}, {
				'type': 'google',
				'url': 'https://www.google.com/search?q='
			}],
			curIndex: 0,
			lastUpdate: lastUpdate
		};
		chrome.storage.sync.set({
			'quickSearch': quickSearch
		});
	}
	searchurl = quickSearch.List[quickSearch.curIndex].url;
});

httpRequest(chrome.extension.getURL('content_scripts/quickSearch.html'), function (data) {
	chrome.runtime.sendMessage({
		'newIconPath': chrome.extension.getURL('style/images/icons/Icon128.png')
	});

	var htmlString = data.replace(/__MSG_@@extension_id__/g, chrome.runtime.id);
	document.body.insertAdjacentHTML('beforeend', htmlString);
	bs = document.querySelector('#BaiduISearch');
	eval(bs.querySelector('script').innerHTML);

	// 在这个时候页面的内容还没有加载进去
	bsbox = bs.shadowRoot.querySelector('.bs-box');
	bstopbar = bsbox.querySelector('.topbar');
	bsform = bsbox.querySelector('.bs-form');
	bsformcontent = bsbox.querySelector('.bs-form .content');
	bsinput = bsbox.querySelector('.bs-form input');
	change = bsbox.querySelector('.bs-box .change');
	external = bsbox.querySelector('.bs-box .external');
	bscon = bsbox.querySelector('.bs-box .con');
	bsiframe = bsbox.querySelector('#BaiduISearchIframe');
	btn_search = bsbox.querySelector('.bs-box .search');
	btn_cancel = bsbox.querySelector('.bs-box .cancel');
	btn_more = bsbox.querySelector('.bs-box .more');

	// 改变背景色
	bs.addEventListener('mousewheel', bswheelmove, false);

	// 处理 点击 shadowDom on Click 同时触发 bs 和 shadowDom click事件
	var shadowDomIsClick = false;
	bsbox.addEventListener('click', function (event) {
		shadowDomIsClick = true;
	});
	bs.addEventListener('click', function (event) {
		if(shadowDomIsClick) {
			shadowDomIsClick = false;
			return;
		}
		event.preventDefault();
		togglebs('hide');
	});
	bsbox.querySelector('.external').addEventListener('click', function (event) {
		togglebs('hide');
	});
	// 下拉选项
	bsbox.querySelector('.more').addEventListener('click', function (event) {
		bstopbar.classList.add('extend');
	});
	bsbox.querySelector('.drop-box').addEventListener('mouseleave', function (event) {
		bstopbar.classList.remove('extend');
	});

	btn_search.addEventListener('click', function (event) {
		toggleedit();
	});

	btn_cancel.addEventListener('click', function (event) {
		toggleedit();
		if(bsinput.value) {
			quickSearch_run(bsinput.value);
		}
	});

	bsinput.addEventListener('focus', function (event) {
		this.select();
	});

	change.addEventListener('click', function (event) {
		changeSearchEngine();
	});

	bsform.addEventListener('submit', function (event) {
		event.preventDefault();
		if(bsinput.value === '') {
			return false;
		}
		quickSearch_run(bsinput.value);
	});

	window.onresize = function () {
		bscon.style.height = window.innerHeight - 40 + 'px';
	};

});

function bswheelmove(event) {
	var delta = event.wheelDelta / 120;
	var alpha = getBgAlpha(bs);
	if(delta < 0 && alpha >= 1 || delta > 0 && alpha <= 0) {
		return;
	}
	alpha = parseFloat(alpha - delta * 0.05).toFixed(2);
	bs.style.backgroundColor = 'rgba(0, 0, 0, ' + alpha + ')';
}

function getBgAlpha(dom) {
	var style = window.getComputedStyle(dom);
	var bgc = style.getPropertyValue('background-color');
	if(bgc.indexOf('rgba') === -1) {
		return 1;
	}
	var alpha = bgc.replace(/^.*,(.+)\)/, '$1');
	return parseFloat(alpha);
}

function calcbsboxheight() {
	bscon.style.cssText = 'padding-top: 40px; position: absolute; left: 0; top: 0; width: 100%;';
	bscon.style.height = window.innerHeight - 40 + 'px';
}

function httpRequest(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.onreadystatechange = function () {
		if(xhr.readyState === 4) {
			callback(xhr.responseText);
		}
	};
	xhr.send();
}

function toggleedit(status) {
	if(bs.style.display !== 'block') {
		return;
	}

	if(status === 'active') {
		bsform.classList.add('active');
		bsinput.focus();
	} else if(status === 'disabled') {
		bsform.classList.remove('active');
	} else {
		if(!bsform.classList.contains('active')) {
			bsform.classList.add('active');
			bsinput.focus();
		} else {
			bsform.classList.remove('active');
		}
	}
}

function changeSearchEngine() {
	if(bs.style.display !== 'block') {
		return;
	}
	quickSearch.curIndex = (quickSearch.curIndex + 1 < quickSearch.List.length) ? (quickSearch.curIndex + 1) : 0;
	searchurl = quickSearch.List[quickSearch.curIndex].url;
	chrome.storage.sync.set({
		'quickSearch': quickSearch
	}, quickSearch_run(bsinput.value));
}

function togglebs(status) {
	toggleedit('disabled');

	keyword = keyword.replace(/^\d+\./, '');
	bsinput.value = keyword;
	bsformcontent.innerHTML = keyword;
	window.getSelection().empty();
	if(status === 'hide') {
		if(bs.style.display === 'none') {
			return;
		}

		bsiframe.src = '';
		bs.style.display = 'none';

		document.querySelector('body').classList.remove('ovh');
		document.querySelector('html').classList.remove('ovh');
	} else {
		if(bs.style.display === 'block') {
			return;
		}

		bs.style.display = 'block';
		calcbsboxheight();
		document.querySelector('body').classList.add('ovh');
		document.querySelector('html').classList.add('ovh');
	}
}

function quickSearch_run(word) {
	if(word) {
		keyword = word;
	}

	if(!word && keyword && keyword === bsinput.value && keyword.match(/^[a-zA-Z\s']+$/)) {
		keyword = '翻译 ' + keyword;
	}


	keyword = keyword || 'I love you';

	bsiframe.src = searchurl + keyword + searchUrlSuffix;
	external.href = searchurl + keyword;

	togglebs('show');
}

chrome.runtime.onMessage.addListener(function (message) {
	if(message.word || message.word === '') {
		keyword = message.word;
	}

	if(message.runSearch) {
		quickSearch_run();
	} else if(message.eidt) {
		toggleedit();
	} else if(message.changeSearchEngine) {
		changeSearchEngine();
	} else if(message.togglebs) {
		togglebs('hide');
	} else if(message.esc) {
		if(bstopbar.classList.contains('extend')) {
			bstopbar.classList.remove('extend');
			return;
		}
		toggleedit();
		togglebs('hide');
	}
});
