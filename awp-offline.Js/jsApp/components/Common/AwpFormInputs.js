import React from 'react';
import { Table, Form, Container, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useField } from 'formik';
import Select from 'react-select';
import DatePicker from 'react-datepicker';

export const FieldError = ({ meta }) => {
	if (!meta.touched || !meta.error) return <></>;

	const errors = Array.isArray(meta.error) ? meta.error : [meta.error];

	return (
		<div className="text-danger mt-1">
			<ul>
				{errors.map((error,i) => (
					<li key={i}>{error}</li>
				))}
			</ul>
		</div>
	);
};

export const FormInput = ({ label, instruction, readOnly = false, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<Form.Group className="my-1">
			<div className="d-flex">
				<Form.Label className="flex-grow-1"><b>{label}</b></Form.Label>
				<div style={{ display: 'flex', marginBottom: '-0.05rem' }}>
					<small style={{ alignSelf: 'flex-end' }}>{!readOnly && instruction}</small>
				</div>
			</div>
			{readOnly ? (
				<div className="centered">
					{field.value ? <span {...props}>{field.value}</span> : <span>&nbsp;&nbsp;</span>}
				</div>
			) : (
				<>
					<Form.Control className="text-input" {...field} {...props} autoComplete="off" />
					<FieldError meta={meta} />
				</>
			)}
		</Form.Group>
	);
};

export const FormTextReadOnly = ({ label, textValue }) => {
	return (
		<Form.Group className="my-1">
			<Form.Label><b>{label}</b></Form.Label>
			<div className="centered">{textValue ? <span>{textValue}</span> : <span>&nbsp;&nbsp;</span>}</div>
		</Form.Group>
	);
};

export const FormTextArea = ({ label, instruction, readOnly = false, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<Form.Group className="my-1">
			<div className="d-flex">
				<Form.Label className="flex-grow-1"><b>{label}</b></Form.Label>
				<div style={{ display: 'flex', marginBottom: '-0.05rem' }}>
					<small style={{ alignSelf: 'flex-end' }}>{!readOnly && instruction}</small>
				</div>
			</div>
			{readOnly ? (
				<>
					<Form.Control as="textarea" {...field} {...props} disabled style={{ backgroundColor: 'white' }} />
				</>
			) : (
				<>
					<Form.Control as="textarea" {...field} {...props} disabled={readOnly} autoComplete="off" />
					<FieldError meta={meta} />
				</>
			)}
		</Form.Group>
	);
};

export const FormEmailReadOnly = ({ label, textValue }) => {
	const href = `mailto:${textValue}`;
	return (
		<Form.Group className="my-1">
			<Form.Label><b>{label}</b></Form.Label>
			<div className="centered">
				{textValue ? (
					<a href={href}>
						<span>{textValue}</span>
					</a>
				) : (
					<span>&nbsp;&nbsp;</span>
				)}
			</div>
		</Form.Group>
	);
};

export const FormSwitch = ({ label, readOnly = false, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<Form.Group className="my-1">
			<Form.Label htmlFor={props.id || props.name}><b>{label}</b></Form.Label>
			{readOnly ? (
				<Form.Check type="switch" id={props.name} {...field} {...props} disabled />
			) : (
				<Form.Check type="switch" id={props.name} {...field} {...props} />
			)}
		</Form.Group>
	);
};

export const FormRadioGroup = ({ label, readOnly = false, textValue, children, ...props }) => {
	return (
		<Form.Group className="my-1">
			<Form.Label htmlFor={props.id || props.name}><b>{label}</b></Form.Label>
			{readOnly ? (
				<div className="centered">{textValue ? <span>{textValue}</span> : <span>&nbsp;&nbsp;</span>}</div>
			) : (
				<>{children}</>
			)}
		</Form.Group>
	);
};

export const FormRadio = ({ ...props }) => {
	const [field, meta] = useField(props);
	const checked = field.value === props.value;
	return (
		<>
			<Form.Check type="radio" {...field} {...props} checked={checked} />
		</>
	);
};

export const FormSelect = ({ label, textValue, postChange=false, readOnly = false, ...props }) => {
	const [field, meta, { setValue, setTouched }] = useField(props);
	const onChange = (value) => {
		setValue(value);
		if(postChange && postChange instanceof Function) postChange(value);
	};
	return (
		<>
			<Form.Group className="my-1">
				<Form.Label style={props.labelStyle} htmlFor={props.id || props.name}><b>{label}</b></Form.Label>
				{readOnly ? (
					<div className="centered">{textValue ? <span>{textValue}</span> : <span>&nbsp;&nbsp;</span>}</div>
				) : (
					<>
						<Select {...props} value={field.value} onChange={onChange} onBlur={setTouched} />
						<FieldError meta={meta} />
					</>
				)}
			</Form.Group>
		</>
	);
};

export const FormList = ({ label, colLabel, id, name, permissions, readOnly }) => {
	const [field, meta, { setValue, setTouched }] = useField(name);

	const existingPermissions = permissions.filter((permission) => meta.initialValue.includes(permission.value));

	const onChange = (e, permission) => {
		const values = [...field.value];
		if (e.target.checked) {
			setValue([...field.value, permission.value]);
		} else {
			const idx = values.indexOf(permission.value);
			values.splice(idx, 1);
			setValue(values);
		}
	};

	return (
		<Form.Group className="my-1">
			<Container>
				<h3>{label}</h3>
				{readOnly ? (
					<ListGroup>
						{existingPermissions.map((permission, idx) => (
							<ListGroupItem key={idx}>{permission.label}</ListGroupItem>
						))}
					</ListGroup>
				) : (
					<>
						<FieldError meta={meta} />
						<Table id={id} name={name} striped bordered hover>
							<thead>
								<tr>
									<th>{colLabel}</th>
									<th>Select</th>
								</tr>
							</thead>
							<tbody>
								{permissions.map((permission) => (
									<tr key={permission.value}>
										<td>{permission.label}</td>
										<td>
											<Form.Check
												style={{ textAlign: 'center' }}
												aria-label="permission"
												value={permission.value}
												checked={field.value.includes(permission.value)}
												onChange={(e) => onChange(e, permission)}
												onBlur={setTouched}
											/>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</>
				)}
			</Container>
		</Form.Group>
	);
};

export const FormDatePicker = ({ label, textValue, readOnly = false, 
								 timeFormat="HH:mm", timeIntervals=60, showTimeSelect=false,
								 showTime={ isEnabled: true} , dateFormat=['yyyy-MM-dd HH:mm', 'yyyy-MM-dd', 'yyyyMMdd'], ...props }) => {
	const [field, meta, { setValue, setTouched }] = useField(props);
	const onChange = (value) => {
		setValue(value);
	};
	return (
		<>
			<Form.Group className="my-1">
				<Form.Label className="mr-2" style={props.labelStyle} htmlFor={props.id || props.name}><b>{label}</b></Form.Label>
				{readOnly ? (
					<div className="centered">{textValue ? <span>{textValue}</span> : <span>&nbsp;&nbsp;</span>}</div>
				) : (
					<>
						<DatePicker
							selected={field.value }
							className="form-control input-sm"
							dateFormat={dateFormat}
							showTimeSelect={showTimeSelect} //control time selection
							showTime= {showTime} 
							closeOnSelect={true}
							timeFormat={timeFormat}
							timeIntervals={timeIntervals}
							onChange={onChange}
							onChangeRaw={e => {
								setTouched(true, true);
							}}
						/>
						<FieldError meta={meta} />
					</>
				)}
			</Form.Group>
		</>
	);
};
