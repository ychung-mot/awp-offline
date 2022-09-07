import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import { db } from '@awp/db';
import { SystemAdminRole } from '@awp/constants';
import { Row, Col, Card, Button, Spinner, Container } from 'react-bootstrap';
import { FormInput, FormTextArea } from '@awp/components/Common/AwpFormInputs';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import AwpValidationErrorModal from '@awp/components/Common/AwpValidationErrorModal';

const DexieDemoEdit = ({ setMode, mode, entityId, setLoading, loading }) => {
	const [entityData, setEntityData] = useState({});
	const [entityErrors, setEntityErrors] = useState(null);
	const entityType = 'dexie-demo';

	const readOnly = (mode !== 'edit' && mode !== 'create') || entityData.Name === SystemAdminRole;
	const title = mode === 'edit' ? 'Update Entity' : mode === 'create' ? 'Create Entity' : 'Entity';
	const buttonLabel = mode === 'edit' ? 'Save Changes' : 'Create Entity';

	useEffect(() => {
		if (mode === 'create') {
			setEntityData({ id: '', name: '', description: '', lastUpdated: Date.now() });
			return;
		}

		setLoading(true);
		db.avalancheData
			.get(entityId)
			.then((entity) => {
				setEntityData(entity);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const updateEntity = (setSubmitting, resetForm, setErrors, dto) => {
		db.avalancheData
			.update(entityId, dto)
			.then(async (updated) => {
				if (updated) {
					toast.success('Entity has been updated');
				} else {
					const errors = { id: `Update failed. There was no avalanche data with Id: ${entityId}` };
					setErrors(errors);
					if (errors.entity) setEntityErrors({ Entity: errors.entity });
				}
			})
			.finally(() => {
				setSubmitting(false);
			});
	};

	const createEntity = (setSubmitting, setErrors, dto) => {
		db.avalancheData
			.add({ id: uuid(), type: entityType, ...dto })
			.then(async () => {
				toast.success('Entity has been created');
				setMode('view');
			})
			.catch((error) => {
				const errors = { InsertError: error };
				setErrors(errors);
			})
			.finally(() => {
				setSubmitting(false);
			});
	};

	const handleSubmit = (values, { setSubmitting, resetForm, setErrors }) => {
		setSubmitting(true);

		const dto = {
			Name: values.name,
			Description: values.description,
			LastUpdated: Date.now(),
		};

		if (mode === 'edit') {
			updateEntity(setSubmitting, resetForm, setErrors, dto);
		} else {
			createEntity(setSubmitting, setErrors, dto);
		}
	};

	const Buttons = ({ title, props }) => {
		return (
			<>
				<Col sm={8}>
					<h2>{title}</h2>
				</Col>
				{!readOnly ? (
					<Col sm={4}>
						<div className="mr-3" style={{ float: 'right' }}>
							<Button
								className="mr-2"
								variant="outline-primary"
								onClick={() => {
									props.resetForm();
									setMode('list');
								}}
							>
								Cancel
							</Button>
							<Button type="submit" variant="primary" disabled={!props.isValid || !props.dirty || props.isSumitting}>
								{props.isSubmitting ? (
									<>
										<Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
										Saving...
									</>
								) : (
									<span>{buttonLabel}</span>
								)}
							</Button>
						</div>
					</Col>
				) : (
					<Col sm={4}>
						{' '}
						{entityData.Name !== SystemAdminRole && (
							<div className="mr-3" style={{ float: 'right' }}>
								<Button className="mr-2" variant="outline-primary" onClick={() => setMode('edit')}>
									Edit Entity
								</Button>
							</div>
						)}
					</Col>
				)}
			</>
		);
	};

	return (
		<>
			{loading ? (
				<Container>
					<Spinner animation="border" />
				</Container>
			) : (
				<>
					<Formik
						initialValues={{
							validateOnMount: true,
							name: entityData.Name ?? '',
							description: entityData.Description ?? '',
						}}
						validationSchema={Yup.object({
							name: Yup.string()
								.matches(/^[a-z0-9 ]+$/i, 'Special characters are not allowed')
								.max(50, 'Maximum 50 characters are allowed')
								.required('Entity name is a required field'),
							description: Yup.string()
								.matches(/^[a-z0-9 ,().]+$/i, 'Special characters are not allowed')
								.max(2000, 'Maximum 2000 characters are allowed')
								.required('Entity description is a required field'),
						})}
						onSubmit={handleSubmit}
					>
						{(props) => (
							<Form>
								<span className="awp-text-btn" onClick={() => setMode('list')}>
									List Entities
								</span>
								<span className="mx-3">&gt;</span>
								<span>{title}</span>
								<Card border="light" className="page-card">
									<Card.Header>
										<Row className="mt-3">
											<Buttons title={title} props={props} />
										</Row>
									</Card.Header>
									<Card.Body>
										<Row>
											<Col sm={6} className="mb-4">
												<FormInput
													label="Entity Name"
													instruction="(50 Characters max)"
													readOnly={readOnly}
													name="name"
													id="name"
												/>
											</Col>
										</Row>
										<Row>
											<Col sm={8} className="mb-4">
												<FormTextArea
													readOnly={readOnly}
													label="Entity Description"
													instruction="(2,000 Characters max)"
													id="description"
													name="description"
													rows={3}
												/>
											</Col>
										</Row>
									</Card.Body>
									<Card.Footer>
										<Row className="my-2">
											<Buttons title=" " props={props} />
										</Row>
									</Card.Footer>
								</Card>
							</Form>
						)}
					</Formik>
					<AwpValidationErrorModal setErrors={setEntityErrors} errors={entityErrors} />
				</>
			)}
		</>
	);
};

export default DexieDemoEdit;
