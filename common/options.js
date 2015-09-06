window.onload = function() {
	var message = document.getElementById('message');
	var radio = document.querySelectorAll('[name=searchEngine]');
	var quickSearch, searchid;

	// 初始化
	chrome.storage.sync.get('quickSearch', function(r) {
		if (r.quickSearch) {
			quickSearch = r.quickSearch;
		} else {
			quickSearch = {
				List: [{
					'type': 'baidu',
					'url': 'https://www.baidu.com/s?wd=',
				},{
					'type': 'google',
					'url': 'https://www.google.com/search?q=',
				}
				],
				curIndex: 1
			};
			chrome.storage.sync.set({'quickSearch': quickSearch});
		}
		searchid = quickSearch.List[quickSearch.curIndex].type;
		document.getElementById(searchid).checked = true;
	});


	for (var i = 0; i < radio.length; i++) {
		radio[i].addEventListener('change', function() {
			quickSearch.curIndex = Array.prototype.indexOf.call(radio, this);
			chrome.storage.sync.set({'quickSearch': quickSearch}, showTip);
		});
	}

	function showTip() {
		chrome.storage.sync.get('quickSearch', function(r) {
			quickSearch = r.quickSearch;
			searchid = quickSearch.List[quickSearch.curIndex].type;
			message.innerHTML = 'set ' + searchid + 'success!';
		});
	}
};