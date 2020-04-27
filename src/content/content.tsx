import React from 'react';
import ReactDOM from 'react-dom';
import { Panel } from './panel/panel';
import { sendMessage, getUrl } from '@app/utils/chromeUtils';
import { Provider } from 'react-redux';
import './content.less';
import { initStore } from './contentStore/contentStore';

document.body.insertAdjacentHTML('beforeend', `<div id="quickSearch"></div>`);

sendMessage({
	newIconPath: getUrl('assets/images/icons/Icon128.png'),
});

ReactDOM.render(
	<Provider store={initStore()}>
		<React.StrictMode>
			<Panel />
		</React.StrictMode>
	</Provider>,
	document.getElementById('quickSearch'),
);
