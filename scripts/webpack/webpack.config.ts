import { Configuration } from 'webpack';
import { cssLoader, fileLoader, tsLoader } from './loader';
import { resolve } from './other';
import { createPlugins } from './plugin';
import { state } from '../build/state';

export const webpackConfigFn = () => {
	const { env, entry, output } = state;
	const mode: Configuration['mode'] = env === 'Prod' ? 'production' : 'development';
	return {
		entry,
		output,
		mode,
		module: {
			rules: [{ ...tsLoader }, { ...cssLoader }, { ...fileLoader }],
		},
		resolve,
		plugins: createPlugins(),
	};
};
