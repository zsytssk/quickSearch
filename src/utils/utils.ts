/** 创建随机id */
export function createRandomString() {
	return Math.random().toString().replace('0.', '');
}
