import * as fs from 'fs';
import * as path from 'path';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) => path.resolve(appDirectory, relativePath);

export const paths = {
	appPath: resolveApp('.'),
	packageJson: resolveApp('package.json'),
	appBuild: resolveApp('build'),
	optionsBuild: path.resolve(resolveApp('build'), 'options/'),
	optionsTs: resolveApp('src/options/options.tsx'),
	optionsHtml: resolveApp('src/options/index.html'),
	contentBuild: path.resolve(resolveApp('build'), 'content/'),
	contentTs: resolveApp('src/content/content.tsx'),
	backgroundBuild: path.resolve(resolveApp('build'), 'background/'),
	backgroundTs: resolveApp('src/background/background.ts'),
	appSrc: resolveApp('src'),
	tpl: resolveApp('tpl'),
	tplManifest: resolveApp('tpl/manifest.json'),
};
