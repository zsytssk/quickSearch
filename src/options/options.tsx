import React from 'react';
import ReactDOM from 'react-dom';
import { List } from './list';
import { Intro } from './intro';
import './option.less';

ReactDOM.render(
	<React.StrictMode>
		<List />
		<Intro />
	</React.StrictMode>,
	document.getElementById('root'),
);
