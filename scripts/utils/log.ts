import chalk, { ChalkFunction } from 'chalk';

type ClassProp<T> = T[keyof T];
type Props<T, U> = { [key in keyof T]: T[key] extends U ? key : never };
type ObjKeys<T, U> = ClassProp<Props<T, U>>;

export function log(...params: any[]) {
	console.log(...params);
}
export function logColor(color: ObjKeys<typeof chalk, ChalkFunction>, ...params: any[]) {
	console.log(chalk[color](...params));
}
export function logWarn(...params: any[]) {
	console.log(chalk.yellow(...params));
}
export function logError(...params: any[]) {
	console.log(chalk.red(...params));
}
