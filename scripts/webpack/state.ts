import { paths } from '../webpack/paths';

export type Env = 'Test' | 'Dev' | 'Prod';
export type Type = 'content' | 'options' | 'background';

type State = {
	env: Env;
	type: Type;
	entry: string;
	output: {
		path: string;
		filename: string;
	};
	title: string;
};

export const state = {
	title: '设置',
	entry: '',
	output: {
		path: '',
		filename: '[name].[hash].js',
	},
} as State;

export function init(env: Env, type: Type) {
	state.env = env;
	state.type = type;
	if (type === 'options') {
		state.entry = paths.optionsTs;
		state.output.path = paths.optionsBuild;
	} else if (type === 'content') {
		state.entry = paths.contentTs;
		state.output.path = paths.contentBuild;
		state.output.filename = '[name].js';
	} else if (type === 'background') {
		state.entry = paths.backgroundTs;
		state.output.path = paths.backgroundBuild;
		state.output.filename = '[name].js';
	}
}
