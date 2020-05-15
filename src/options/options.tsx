import React from 'react';
import ReactDOM from 'react-dom';
import { Intro } from './intro';
import { Setting } from './setting/setting';

import './option.less';

ReactDOM.render(
	<React.StrictMode>
		<Setting />
	</React.StrictMode>,
	document.getElementById('root'),
);
