import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
//import { fetchCurrentUser } from '@stores/usersSlice';
import { fetchUserTypes } from '@stores/dropdownsSlice';
import ErrorDialogModal from './ErrorDialogModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from 'react-bootstrap';

const AwpCommon = (props) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		Promise.all([
			//dispatch(fetchCurrentUser()),
			dispatch(fetchUserTypes()),
		]).then(() => setLoading(false));
	}, []);

	return (
		<>
			<ErrorDialogModal></ErrorDialogModal>
			{loading ? (
				<div className="text-center">
					<Spinner animation="border" />
				</div>
			) : (
				props.children
			)}
			<ToastContainer autoClose={700} />
		</>
	);
};

export default AwpCommon;
