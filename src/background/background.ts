// 添加右键菜单
const contextMenuId = chrome.contextMenus.create({
	title: 'vto',
	contexts: ['page', 'selection', 'link'],
	documentUrlPatterns: ['*://*/*'],
	onclick: contextClickHandler,
});

function contextClickHandler(info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab) {
	if (info.selectionText) {
		chrome.tabs.sendMessage(tab.id, {
			runSearch: true,
			word: info.selectionText,
		});
		return;
	} else if (info.linkUrl) {
		chrome.tabs.sendMessage(tab.id, {
			runSearch: true,
		});
		return;
	}
	chrome.tabs.sendMessage(tab.id, {
		runSearch: true,
		word: '',
	});
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	// initial icon
	if (message.newIconPath) {
		try {
			chrome.browserAction.setIcon({
				path: message.newIconPath,
				tabId: sender.tab.id,
			});
		} catch (e) {}
	}

	// pass iframe message to content script
	if (message.sendBack) {
		chrome.tabs.sendMessage(sender.tab.id, message);
	}
});

chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.tabs.sendMessage(tab.id, {
		runSearch: true,
	});
});

chrome.commands.onCommand.addListener(function (command) {
	if (command === 'toggle-edit') {
		chrome.tabs.query(
			{
				active: true,
				currentWindow: true,
			},
			function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {
					eidt: true,
				});
			},
		);
	}
	if (command === 'change-SearchEngine') {
		chrome.tabs.query(
			{
				active: true,
				currentWindow: true,
			},
			function (tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {
					changeSearchEngine: true,
				});
			},
		);
	}
});

// overcome x-frame-options
chrome.webRequest.onHeadersReceived.addListener(
	function (info) {
		var headers = info.responseHeaders;
		for (var i = headers.length - 1; i >= 0; --i) {
			var header = headers[i].name.toLowerCase();
			console.log(header);
			if (header === 'x-frame-options' || header === 'frame-options') {
				headers.splice(i, 1); // Remove header
			}
		}
		return {
			responseHeaders: headers,
		};
	},
	{
		urls: ['*://*/*'], // Pattern to match all http(s) pages
		types: ['sub_frame'],
	},
	['blocking', 'responseHeaders'],
);

chrome.webRequest.onBeforeSendHeaders.addListener(
	function (info) {
		// Replace the User-Agent header
		var headers = info.requestHeaders;
		headers.forEach(function (header, i) {
			if (header.name.toLowerCase() === 'user-agent') {
				header.value =
					'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1';
			}
		});
		return {
			requestHeaders: headers,
		};
	},
	// Request filter
	{
		// Modify the headers for these pages
		urls: ['*://*.google.com/*from=vto*', '*://*/*from=vto*'],
		// In the main window and frames
		types: ['main_frame', 'sub_frame'],
	},
	['blocking', 'requestHeaders'],
);
