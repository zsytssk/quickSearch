const DefaultSetting = {
	list: [
		{
			id: 'default1',
			name: 'baidu',
			url: 'https://www.baidu.com/s?wd=',
		},
		{
			id: 'default2',
			name: 'google',
			url: 'https://www.google.com/search?q=',
		},
	],
	curIndex: 0,
};

export type Setting = typeof DefaultSetting;
export type SettingItem = Setting['list'][0];

export function getSetting(): Promise<typeof DefaultSetting> {
	return new Promise((resolve, reject) => {
		chrome.storage.sync.get('vto', async (r) => {
			if (r.vto) {
				resolve(r.vto);
			} else {
				await setSetting(DefaultSetting);
				resolve(DefaultSetting);
			}
		});
	});
}

export function setSetting(setting: Setting): Promise<typeof DefaultSetting> {
	return new Promise((resolve, reject) => {
		chrome.storage.sync.set({ vto: setting }, () => {
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
