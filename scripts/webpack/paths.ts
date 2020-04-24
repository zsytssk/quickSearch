import * as fs from 'fs';
import * as path from 'path';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) => path.resolve(appDirectory, relativePath);

export const paths = {
	appPath: resolveApp('.'),
	appBuild: resolveApp('build'),
	appPublic: resolveApp('public'),
	appHtml: resolveApp('public/index.html'),
	appIndexJs: resolveApp('src/main.tsx'),
	optionsBuild: path.resolve(resolveApp('build'), 'options/'),
	optionsTs: resolveApp('src/options/main.tsx'),
	appSrc: resolveApp('src'),
};
