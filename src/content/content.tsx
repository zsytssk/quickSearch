import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { Panel } from './panel/panel';
import { sendMessage, getUrl } from '@app/utils/chromeUtils';
import './content.less';
import { initStore } from './contentStore/contentStore';

document.body.insertAdjacentHTML('beforeend', `<div id="vto"></div>`);

sendMessage({
	newIconPath: getUrl('assets/images/icons/Icon128.png'),
});

ReactDOM.render(
	<Provider store={initStore()}>
		<React.StrictMode>
			<Panel />
		</React.StrictMode>
	</Provider>,
	document.getElementById('vto'),
);
