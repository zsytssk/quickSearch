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
	const { type, analyze, env } = state;
	const result = [];

	if (type === 'content') {
		result.push(new CleanWebpackPlugin());
	} else if (type === 'options') {
		result.push(htmlWebpackPlugin());
	}

	if (analyze) {
		result.push(new BundleAnalyzerPlugin());
	}
	if (env === 'Prod') {
		result.push(new CleanWebpackPlugin());
	}

	return result;
};
