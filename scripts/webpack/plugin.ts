import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { state } from '../build/state';

const htmlWebpackPlugin = () => {
	const { title } = state;
	return new HtmlWebpackPlugin({
		favicon: './tpl/favicon.ico',
		template: './tpl/index.html',
		title,
		inject: true,
	});
};

export const createPlugins = () => {
	return [htmlWebpackPlugin(), new CleanWebpackPlugin()];
};
