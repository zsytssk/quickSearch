import { paths } from '../webpack/paths';
import { build } from '../webpack/webpackUtils';
import { cp } from '../zutil/ls/main';
import { state } from '../webpack/state';
import { readFile } from '../zutil/ls/asyncUtil';
import { replaceReg } from '../zutil/utils/replaceReg';
import { write } from '../zutil/ls/write';

export async function beforeBuild() {
	/** 将packageJson中的版本号写入manifest */
	const { packageJson, tplManifest } = paths;
	let package_str = await readFile(packageJson);
	let manifest_str = await readFile(tplManifest);
	let package_obj = JSON.parse(package_str);
	manifest_str = replaceReg(
		manifest_str,
		/"version": "[^"]+"/g,
		`"version": "${package_obj.version}"`,
	);
	await write(tplManifest, manifest_str);
}

// 监听本地
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
