import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideErrorDialog, selectError } from '@stores/errorDialogSlice';
import { Modal, Button } from 'react-bootstrap';

const ErrorDialogModal = () => {
	const dispatch = useDispatch();
	const error = useSelector(selectError);

	return (
		<div>
			<Modal show={error.show} backdrop="static" size="md" aria-labelledby="contained-modal-title-vcenter" centered>
				<Modal.Header>
					<h3>{error.title ? error.title : 'Server Error'}</h3>
				</Modal.Header>
				<Modal.Body>
					{error.message && (
						<p>
							<strong>Error:</strong> {error.message}
						</p>
					)}
					{error.statusCode && (
						<p>
							<small>
								status code: <strong className="text-danger">{error.statusCode}</strong>
							</small>
						</p>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button size="sm" color="primary" onClick={() => dispatch(hideErrorDialog())}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default ErrorDialogModal;
