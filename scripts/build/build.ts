import {
	listenLocal,
	afterBuild,
	buildProd,
	test,
	buildTest,
	setAnalyze,
	buildTestCon,
	buildTestOptions,
} from './buildUtils';

const type = process.argv.slice(2)[0] || 'buildMap';

export const build_tip_arr = [
	'1.编译代码 + 发布(prod)',
	'2.编译代码 + 发布(test)',
	'3.编译代码 + 发布 + analyze(prod)',
	'4.编译代码 + 发布 + analyze(test)',
	'5.编译代码 content (test)',
	'6.编译代码 options (test)',
];

const buildMap = {
	'1': async () => {
		await buildProd();
		await afterBuild();
	},
	'2': async () => {
		await buildTest();
		await afterBuild();
	},
	'3': async () => {
		setAnalyze(true);
		await buildProd();
		await afterBuild();
	},
	'4': async () => {
		setAnalyze(true);
		await buildProd();
		await afterBuild();
	},
	'5': async () => {
		await buildTestCon();
	},
	'6': async () => {
		await buildTestOptions();
	},
};

const actionMap = {
	async buildMap() {
		for (let i = 0; i < 50; i++) {
			const listen_type = await listenLocal();
			console.time(`buildType:${listen_type}, costTime:`);
			if (buildMap[listen_type]) {
				await buildMap[listen_type]();
			}
			console.timeEnd(`buildType:${listen_type}, costTime:`);
		}
	},
	async test() {
		await test();
	},
};

export async function main() {
	console.log(type);
	console.time('AllCostTime');
	await actionMap[type]();
	console.timeEnd('AllCostTime');
}

main();
