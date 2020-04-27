export const cssLoader = {
	test: /(\.less)$/,
	use: [
		'style-loader',
		{
			loader: 'css-loader',
			options: {
				sourceMap: true,
				modules: { auto: true },
			},
		},
		{
			loader: 'less-loader',
			options: {
				sourceMap: true,
			},
		},
	],
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
