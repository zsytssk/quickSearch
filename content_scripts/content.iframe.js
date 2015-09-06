// link text
var _links = document.querySelectorAll('a');
for(var i = 0; i < _links.length; i++) {
	if(!_links[i].href) {
		continue;
	}
	_links[i].addEventListener('contextmenu', function () {
		if(window.getSelection().type === 'Range') {
			return true;
		}
		selectLink(this);
	}, false);
}

// 快捷键
document.addEventListener('keydown', function (e) {
	var ekc = e.keyCode;
	// esc 隐藏
	if(ekc === 27) {
		chrome.runtime.sendMessage({
			sendBack: true,
			esc: true
		});
		return;
	}

	// 搜索
	if(ekc === 81 && e.altKey === true) {
		e.preventDefault();
		chrome.runtime.sendMessage({
			sendBack: true,
			runSearch: true
		});
		return;
	}

	// 编辑
	if(ekc === 69 && e.altKey === true) {
		e.preventDefault();
		chrome.runtime.sendMessage({
			sendBack: true,
			eidt: true
		});
		return;
	}

	// 更换引擎
	if(ekc === 67 && e.altKey === true) {
		e.preventDefault();
		chrome.runtime.sendMessage({
			sendBack: true,
			changeSearchEngine: true
		});
		return;
	}

});
// 传递选择文字
document.addEventListener('mouseup', function (event) {
	var word = '';
	if(window.getSelection().type === 'Range') {
		word = window.getSelection().getRangeAt(0).toString();
	}
	chrome.runtime.sendMessage({
		sendBack: true,
		word: word
	});
});

function selectLink(_self) {
	var selection = window.getSelection();
	var range = document.createRange();
	range.selectNodeContents(_self);
	selection.removeAllRanges();
	selection.addRange(range);
}
