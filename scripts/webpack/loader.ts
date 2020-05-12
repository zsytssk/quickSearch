import { state } from './state';

export const cssLoaderFn = function () {
	const { env } = state;
	const sourceMap = env !== 'Prod';
	return {
		test: /\.(css|less)$/i,
		use: [
			'style-loader',
			{
				loader: 'css-loader',
				options: {
					sourceMap,
					modules: { auto: true },
				},
			},
			{
				loader: 'less-loader',
				options: {
					sourceMap,
				},
			},
		],
	};
};

export const fileLoader = {
	test: /\.(png|jpg|svg|gif)$/,
	exclude: /node_modules/,
	use: ['file-loader'],
};

export const tsLoader = {
	test: /(\.ts|\.tsx|\.jsx|\.js)$/,
	loader: 'ts-loader',
	options: {
		transpileOnly: true,
	},
};
