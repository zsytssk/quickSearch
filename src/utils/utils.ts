/** 创建随机id */
export function createRandomString() {
	return Math.random().toString().replace('0.', '');
}

export function getFavicon(url: string) {
	if (!url) {
		return '';
	}
	const url_info = new URL(url);
	return `${url_info.origin}/favicon.ico`;
}

export function sleep(seconds: number = 0) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, seconds * 1000);
	});
}
