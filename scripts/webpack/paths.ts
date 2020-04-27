import * as fs from 'fs';
import * as path from 'path';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) => path.resolve(appDirectory, relativePath);

export const paths = {
	appPath: resolveApp('.'),
	appBuild: resolveApp('build'),
	optionsBuild: path.resolve(resolveApp('build'), 'options/'),
	optionsTs: resolveApp('src/options/options.tsx'),
	contentBuild: path.resolve(resolveApp('build'), 'content/'),
	contentTs: resolveApp('src/content/content.tsx'),
	appSrc: resolveApp('src'),
};
