import React from 'react';
import ReactDOM from 'react-dom';

import { Panel } from './panel/panel';
import { sendMessage, getUrl } from '@app/utils/chromeUtils';
import './content.less';

document.body.insertAdjacentHTML('beforeend', `<div id="vto"></div>`);
sendMessage({
	newIconPath: getUrl('assets/images/icons/Icon128.png'),
});
ReactDOM.render(
	<React.StrictMode>
		<Panel />
	</React.StrictMode>,
	document.getElementById('vto'),
);
