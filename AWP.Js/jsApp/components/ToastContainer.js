import React from 'react';
import PropTypes from 'prop-types';

function ToastContainer(props) {
	return (
		<div className="toast-container">
		{props.children}
		</div>
	)
}

ToastContainer.propTypes = {
	children: PropTypes.any
};

export default ToastContainer;
