const DefaultSetting = {
	list: [
		{
			name: 'baidu',
			url: 'https://www.baidu.com/s?wd=',
		},
		{
			name: 'google',
			url: 'https://www.google.com/search?q=',
		},
	],
	curIndex: 0,
};

export type Setting = typeof DefaultSetting;

export function getSetting(): Promise<typeof DefaultSetting> {
	return new Promise((resolve, reject) => {
		chrome.storage.sync.get('quickSearch', async (r) => {
			if (r.quickSearch) {
				resolve(r.quickSearch);
			} else {
				await setSetting(DefaultSetting);
				resolve(DefaultSetting);
			}
		});
	});
}

export function setSetting(setting: Setting): Promise<typeof DefaultSetting> {
	return new Promise((resolve, reject) => {
		chrome.storage.sync.set({ quickSearch: setting }, () => {
			resolve();
		});
	});
}

export function getUrl(url: string) {
	return chrome.extension.getURL(url);
}

export function sendMessage(msg: {}) {
	chrome.runtime.sendMessage(msg);
}
