import * as readline from 'readline';
import { paths } from '../webpack/paths';
import { build } from '../webpack/webpackUtils';
import { cp } from '../zutil/ls/main';
import { state } from '../webpack/state';
import { build_tip_arr } from './build';

// 监听本地
export async function listenLocal() {
	let build_tips = `请选择要执行的命令\n$1 > `;
	let build_tip_str = '';
	for (const item of build_tip_arr) {
		build_tip_str += ` ${item}\n`;
	}
	build_tips = build_tips.replace('$1', build_tip_str);

	return new Promise((resolve, reject) => {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		console.log('--------------------');
		console.log();

		rl.question(build_tips, (answer) => {
			console.log(`选中${answer}`);
			rl.close();
			resolve(answer);
		});
	}) as Promise<string>;
}

export function setAnalyze(status: boolean) {
	state.analyze = status;
}
export function buildTest() {
	build('Test', 'options');
	build('Test', 'content');
	build('Test', 'background');
}

export async function buildProd() {
	console.log(`build background`);
	await build('Prod', 'background');
	console.log(`build content`);
	await build('Prod', 'content');
	console.log(`build options`);
	await build('Prod', 'options');
}
export async function buildTestCon() {
	await build('Test', 'content');
}
export async function buildTestOptions() {
	await build('Test', 'options');
}
export async function buildProdOptions() {
	await build('Prod', 'options');
}

export async function afterBuild() {
	await cp(paths.tpl, paths.appBuild);
}

export function test() {}
