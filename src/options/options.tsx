import React from 'react';
import ReactDOM from 'react-dom';
import { List } from './list';
import { Intro } from './intro';
import { Setting } from './setting/setting';

import './option.less';
import 'antd/dist/antd.css';

ReactDOM.render(
	<React.StrictMode>
		<List />
		<Intro />
		<Setting />
	</React.StrictMode>,
	document.getElementById('root'),
);
