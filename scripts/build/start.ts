import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { webpackConfigFn } from '../webpack/webpack.config';
import { devServerConfig } from '../webpack/devServer';
import { init } from './state';

const compiler = webpack(webpackConfigFn());
const devServerOptions = {
	open: true,
	stats: {
		colors: true,
	},
	...devServerConfig,
};

const server = new WebpackDevServer(compiler, devServerOptions);
init('Test', 'options');
server.listen(8080, '127.0.0.1', () => {
	console.log('Starting server on http://localhost:8080');
});
