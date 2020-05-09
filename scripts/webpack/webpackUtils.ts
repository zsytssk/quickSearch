import webpack, { Stats } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { webpackConfigFn } from './webpack.config';
import { devServerConfig } from './devServer';
import { log, logWarn, logError } from '../utils/log';
import { waitProcessExit } from '../zutil/utils/utils';
import { init, Env, Type } from './state';
import { Subscriber, Observable } from 'rxjs';

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

export async function build(env: Env, type: Type) {
	init(env, type);
	const compiler = webpack(webpackConfigFn());
	const is_watch = env !== 'Prod' ? true : false;
	await waitBuild(compiler, is_watch);
}

type BuildResult = {
	type: 'error' | 'success';
	data?: {
		stats: Stats;
		warnings: string[];
	};
	error?: Error;
};

function waitBuild(compiler: webpack.Compiler, is_watch: boolean) {
	const observer = new Observable((subscriber: Subscriber<BuildResult>) => {
		const handler = (error: Error, stats: Stats) => {
			let messages: Partial<Stats.ToJsonOutput>;
			if (error) {
				if (!error.message) {
					return subscriber.next({
						type: 'error',
						error,
					});
				}

				let errMessage = error.message;

				// Add additional information for postcss errors
				if (Object.prototype.hasOwnProperty.call(error, 'postcssNode')) {
					errMessage += '\nCompileError: Begins at CSS selector ' + error['postcssNode'].selector;
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
				return subscriber.next({
					type: 'error',
					error: new Error(messages.errors.join('\n\n')),
				});
			}

			return subscriber.next({
				type: 'success',
				data: {
					stats,
					warnings: messages.warnings,
				},
			});
		};

		if (is_watch) {
			compiler.watch({}, handler);
		} else {
			compiler.run(handler);
		}
	});

	const then_fn = (res: BuildResult) => {
		const { data, type, error } = res;
		if (type === 'error') {
			return logError(error);
		}
		log(data.stats.toString());
		if (data.warnings) {
			logWarn(data.warnings);
		}
	};

	if (!is_watch) {
		return new Promise((resolve, reject) => {
			const subscribe = observer.subscribe((data) => {
				then_fn(data);
				resolve(data);
				subscribe.unsubscribe();
			});
		});
	} else {
		observer.subscribe(then_fn);
		return waitProcessExit();
	}
}
