import * as readline from 'readline';
import { paths } from '../webpack/paths';
import { build } from '../webpack/webpackUtils';
import { cp } from '../zutil/ls/main';
import { build_tips } from './build';

// 监听本地
export async function listenLocal() {
	return new Promise((resolve, reject) => {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		console.log('--------------------');
		console.log();
		console.log();

		rl.question(build_tips, (answer) => {
			console.log(`选中${answer}`);
			rl.close();
			resolve(answer);
		});
	}) as Promise<string>;
}

export function buildTest() {
	build('Test', 'options');
	build('Test', 'content');
	build('Test', 'background');
}

export async function buildProd() {
	console.log(`build options`);
	await build('Prod', 'options');
	console.log(`build content`);
	await build('Prod', 'content');
	console.log(`build background`);
	await build('Prod', 'background');
}

export async function afterBuild() {
	await cp(paths.tpl, paths.appBuild);
}

export function test() {}
