import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { state } from './state';
import { paths } from './paths';

const htmlWebpackPlugin = () => {
	const { title } = state;
	return new HtmlWebpackPlugin({
		template: paths.optionsHtml,
		title,
		inject: true,
	});
};

export const createPlugins = () => {
	const { type } = state;
	if (type === 'content') {
		return [new CleanWebpackPlugin(), new BundleAnalyzerPlugin()];
		// return [new CleanWebpackPlugin()];
	}
	if (type === 'background') {
		return [new CleanWebpackPlugin()];
	}
	return [htmlWebpackPlugin(), new CleanWebpackPlugin()];
};
