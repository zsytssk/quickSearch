import webpack, { Configuration } from 'webpack';
import { cssLoader, fileLoader, tsLoader } from './loader';
import { resolve } from './other';
import { createPlugins } from './plugin';
import { state } from './state';

export const webpackConfigFn = () => {
	const { env, entry, output } = state;
	const mode: Configuration['mode'] = env === 'Prod' ? 'production' : 'development';
	const devtool: webpack.Options.Devtool = env === 'Prod' ? false : 'source-map';

	return {
		devtool,
		entry,
		output,
		mode,
		module: {
			rules: [{ ...tsLoader }, { ...cssLoader }, { ...fileLoader }],
		},
		watch: true,
		resolve,
		plugins: createPlugins(),
	};
};
