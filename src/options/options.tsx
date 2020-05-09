import React from 'react';
import ReactDOM from 'react-dom';
import { Intro } from './intro';
import { Setting } from './setting/setting';

import './option.less';
import 'antd/dist/antd.css';

ReactDOM.render(
	<React.StrictMode>
		<Intro />
		<Setting />
	</React.StrictMode>,
	document.getElementById('root'),
);
