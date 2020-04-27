import webpack, { Stats } from 'webpack';
import { webpackConfigFn } from '../webpack/webpack.config';
import { log, logWarn, logError } from '../utils/log';
import { init } from './state';

type BuildResult = {
	stats: Stats;
	warnings: string[];
};

function build() {
	init('Test', 'content');
	const compiler = webpack(webpackConfigFn());
	return new Promise((resolve, reject) => {
		compiler.watch({}, (err, stats) => {
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
}

build()
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
