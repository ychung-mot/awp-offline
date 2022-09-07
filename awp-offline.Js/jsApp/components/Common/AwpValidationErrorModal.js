import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AwpValidationErrorModal = ({ setErrors, errors }) => {
	const close = () => setErrors(null);

	return (
		<Modal
			show={errors !== null}
			onHide={close}
			backdrop="static"
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header>
				<Modal.Title>
					<h3 className="awp-card-header">Server Validation Error</h3>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{errors &&
					Object.keys(errors).map((k, i) => (
						<div key={`awp_val_mod_div_${i}`}>
							<h4 key={`awp_val_mod_h4_${i}`}>{k}</h4>
							<ul key={`awp_val_mod_ul_${i}`}>
								{Object.values(errors[k]).map((error, j) => (
									<li key={`awp_val_mod_li_${i}_${j}`} className="ml-1">
										{error}
									</li>
								)
								)}
							</ul>
						</div>
					))}
			</Modal.Body>
			<Modal.Footer>
				<Button variant="primary" onClick={close}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

AwpValidationErrorModal.propTypes = {
	setErrors: PropTypes.func,
	errors: PropTypes.object,
};

export default AwpValidationErrorModal;
