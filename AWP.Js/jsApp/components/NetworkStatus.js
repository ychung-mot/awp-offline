import React, { useState, useEffect } from 'react';

const NetworkStatus = () => {
	const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);

	const goOnline = () => {
		setOnlineStatus(true);
	};

	const goOffline = () => {
		setOnlineStatus(false);
	};

	useEffect(() => {
		window.addEventListener('online', goOnline);
		window.addEventListener('offline', goOffline);

		return () => {
			window.removeEventListener('online', goOnline);
			window.removeEventListener('offline', goOffline);
		};
	}, []);

	return onlineStatus ? <div>Online</div> : <div>Offline</div>;
};

export default NetworkStatus;
