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
	}
}
