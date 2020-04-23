// 添加右键菜单
var contextMenusid = chrome.contextMenus.create({
	'title': 'quick search',
	'contexts': ['page', 'selection', 'link'],
	'documentUrlPatterns': ['*://*/*'],
	'onclick': contextClickHander
});

function contextClickHander(info, tab) {
	if(info.selectionText) {
		chrome.tabs.sendMessage(tab.id, {
			runSearch: true,
			word: info.selectionText
		});
		return;
	} else if(info.linkUrl) {
		chrome.tabs.sendMessage(tab.id, {
			runSearch: true
		});
		return;
	}
	chrome.tabs.sendMessage(tab.id, {
		runSearch: true,
		word: ''
	});
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	// initial icon
	if(message.newIconPath) {
		try {
			chrome.browserAction.setIcon({
				path: message.newIconPath,
				tabId: sender.tab.id
			});
		} catch(e) {}
	}

	// pass iframe message to content script
	if(message.sendBack) {
		chrome.tabs.sendMessage(sender.tab.id, message);
	}

});

chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.sendMessage(tab.id, {
		runSearch: true
	});
});
chrome.commands.onCommand.addListener(function (command) {
	if(command === 'toggle-edit') {
		chrome.tabs.query({
			active: true,
			currentWindow: true
		}, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {
				eidt: true
			});
		});
	}
	if(command === 'change-SearchEngine') {
		chrome.tabs.query({
			active: true,
			currentWindow: true
		}, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {
				changeSearchEngine: true
			});
		});
	}
});

// overcome x-frame-options
chrome.webRequest.onHeadersReceived.addListener(
	function (info) {
		var headers = info.responseHeaders;
		for(var i = headers.length - 1; i >= 0; --i) {
			var header = headers[i].name.toLowerCase();
			if(header === 'x-frame-options' || header === 'frame-options') {
				headers.splice(i, 1); // Remove header
			}
		}
		return {
			responseHeaders: headers
		};
	}, {
		urls: ['*://*/*'], // Pattern to match all http(s) pages
		types: ['sub_frame']
	}, ['blocking', 'responseHeaders']
);

chrome.webRequest.onBeforeSendHeaders.addListener(
	function (info) {
		// Replace the User-Agent header
		var headers = info.requestHeaders;
		headers.forEach(function (header, i) {
			if(header.name.toLowerCase() === 'user-agent') {
				header.value = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4';
			}
		});
		return {
			requestHeaders: headers
		};
	},
	// Request filter
	{
		// Modify the headers for these pages
		urls: [
			'*://*.google.com/*from=quicksearch*'
			// '*://*/*from=quicksearch*'
		],
		// In the main window and frames
		types: ['main_frame', 'sub_frame']
	}, ['blocking', 'requestHeaders']
);
