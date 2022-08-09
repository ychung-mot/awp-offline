import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import { selectUserTypes } from '@awp/stores/dropdownsSlice';

const FetchData = () => {
	const userTypesDropdown = useSelector(selectUserTypes);

	return (
		<table className="table table-striped" aria-labelledby="tabelLabel">
			<thead>
				<tr>
					<th>ID</th>
					<th>Descrition</th>
				</tr>
			</thead>
			<tbody>
				{userTypesDropdown.options.map((usertype) => (
					<tr key={usertype.Id}>
						<td>{usertype.Id}</td>
						<td>{usertype.Description}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default FetchData;
