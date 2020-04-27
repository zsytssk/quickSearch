import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { state } from '../build/state';

const htmlWebpackPlugin = () => {
	const { title } = state;
	return new HtmlWebpackPlugin({
		template: './tpl/index.html',
		title,
		inject: true,
	});
};

export const createPlugins = () => {
	const { type } = state;
	if (type === 'content') {
		return [new CleanWebpackPlugin()];
	}
	return [htmlWebpackPlugin(), new CleanWebpackPlugin()];
};
