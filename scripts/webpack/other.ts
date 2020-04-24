import path from 'path';
import { paths } from './paths';

export const resolve = {
	extensions: ['.js', '.jsx', '.ts', '.tsx'],
	alias: {
		'@app': paths.appSrc,
	},
};
