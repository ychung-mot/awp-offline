import React, { useState } from 'react';
import { Toast as BootstrapToast } from 'react-bootstrap';
import PropTypes from 'prop-types';

function Toast(props) {

	const [show, setShow] = useState(true);

	let toastType = props.type === 'success' ? 'toast-success' : 'toast-danger';

	return (
		<BootstrapToast onClose={() => setShow(false)} show={show} delay={10000} autohide className={toastType}>
			{ props.title ?
				<BootstrapToast.Header>
					<strong className="mr-auto">{props.title}</strong>
				</BootstrapToast.Header>
				: ''}
			<BootstrapToast.Body>
				{props.children}
			</BootstrapToast.Body>
		</BootstrapToast>
	);
}

Toast.propTypes = {
	type: PropTypes.string,
	title: PropTypes.string,
	// @CODESMELL Generic parameter defined
	children: PropTypes.any
};

export default Toast;
