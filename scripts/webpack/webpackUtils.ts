import webpack, { Stats } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { webpackConfigFn } from './webpack.config';
import { devServerConfig } from './devServer';
import { log, logWarn, logError } from '../utils/log';
import { init, Env, Type } from './state';

export function start(env: Env, type: Type) {
	const compiler = webpack(webpackConfigFn());
	const devServerOptions = {
		open: true,
		stats: {
			colors: true,
		},
		...devServerConfig,
	};

	const server = new WebpackDevServer(compiler, devServerOptions);
	init(env, type);
	server.listen(8080, '127.0.0.1', () => {
		console.log('Starting server on http://localhost:8080');
	});
}

type BuildResult = {
	stats: Stats;
	warnings: string[];
};

export function build(env: Env, type: Type) {
	init(env, type);
	const compiler = webpack(webpackConfigFn());
	const task = new Promise((resolve, reject) => {
		compiler.run((err, stats) => {
			let messages: Partial<Stats.ToJsonOutput>;
			if (err) {
				if (!err.message) {
					return reject(err);
				}

				let errMessage = err.message;

				// Add additional information for postcss errors
				if (Object.prototype.hasOwnProperty.call(err, 'postcssNode')) {
					errMessage += '\nCompileError: Begins at CSS selector ' + err['postcssNode'].selector;
				}

				messages = {
					errors: [errMessage],
					warnings: [],
				};
			} else {
				messages = stats.toJson({ all: false, warnings: true, errors: true });
			}

			if (messages.errors.length) {
				// Only keep the first error. Others are often indicative
				// of the same problem, but confuse the reader with noise.
				if (messages.errors.length > 1) {
					messages.errors.length = 1;
				}
				return reject(new Error(messages.errors.join('\n\n')));
			}

			return resolve({
				stats,
				warnings: messages.warnings,
			});
		});
	}) as Promise<BuildResult>;

	return task
		.then((data) => {
			log(data.stats.toString());
			if (data.warnings) {
				logWarn(data.warnings);
			}
		})
		.catch((err) => {
			if (err && err.message) {
				logError(err.message);
			}
			process.exit(1);
		});
}
