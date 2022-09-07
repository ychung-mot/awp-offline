import React from 'react';
import Table from '@awp/components/table';
import { sortByNumericThenAlpha } from '@awp/helpers/sorter';
import { Button } from 'react-bootstrap';
import { SystemAdminRole } from '@awp/constants';

const DexieDemoTable = ({ isMedium, isLarge, data, loading, setMode, setEntity }) => {
	const actionMenu = (row) => {
		return (
			<>
				<div>
					{row.row.original.Name !== SystemAdminRole && (
						<i
							className="fas fa-edit mx-1 my-1 awp-img-btn"
							alt="Edit"
							onClick={() => {
								setMode('edit');
								setEntity(row.row.original);
							}}
						></i>
					)}
					<i
						className="fas fa-eye mx-1 my-1 awp-img-btn"
						alt="View"
						onClick={() => {
							setMode('view');
							setEntity(row.row.original);
						}}
					></i>
				</div>
			</>
		);
	};

	const columns = React.useMemo(
		() => [
			{
				Header: 'Name',
				accessor: 'Name',
				sortType: sortByNumericThenAlpha,
			},
			{
				Header: 'Description',
				accessor: 'Description',
				sortType: sortByNumericThenAlpha,
			},
			{
				Header: 'Last Updated',
				accessor: 'LastUpdated',
				sortType: sortByNumericThenAlpha,
				Cell: ({ value }) => {
					return new Date(value).toDateString('yyyy-MM-dd HH:mm:ss');
				},
			},
			{
				Header: 'Actions',
				accessor: 'id',
				disableSortBy: true,
				Cell: actionMenu,
			},
		],
		[isLarge, isMedium]
	);

	return (
		<>
			<div className="d-flex">
				<h1 className="flex-grow-1">Dexie Demo</h1>
				<div>
					<Button
						className="mr-2"
						variant="primary"
						onClick={() => {
							setMode('create');
						}}
						disabled={loading}
					>
						Create New Entity
					</Button>
				</div>
			</div>
			<Table columns={columns} data={data} fetchData={() => {}} loading={loading} search="" defaultSortBy="Name" />
		</>
	);
};

export default DexieDemoTable;
