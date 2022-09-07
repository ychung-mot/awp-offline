import React from 'react';
import { Spinner} from 'react-bootstrap';

function AwpSpinner({...props}) {
	return (
		<Spinner animation="border" size="sm" variant="primary" {...props} />
	)
}

export default AwpSpinner;
