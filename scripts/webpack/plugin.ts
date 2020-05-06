import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { state } from './state';
import { paths } from './paths';

const htmlWebpackPlugin = () => {
	return new HtmlWebpackPlugin({
		template: paths.optionsHtml,
		inject: true,
	});
};

export const createPlugins = () => {
	const { type, analyze } = state;
	const result = [];

	if (type === 'content') {
		result.push(new CleanWebpackPlugin());
		if (analyze) {
			result.push(new BundleAnalyzerPlugin());
		}
	} else if (type === 'background') {
		result.push(new CleanWebpackPlugin());
	} else {
		result.push(htmlWebpackPlugin(), new CleanWebpackPlugin());
	}

	return result;
};
