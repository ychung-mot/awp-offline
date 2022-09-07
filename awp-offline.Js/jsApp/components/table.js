import React, { useState } from 'react';
import { useTable, usePagination, useSortBy, useRowSelect, useExpanded } from 'react-table';
import { Spinner } from 'react-bootstrap';
import { isValueEmpty } from '../helpers/utilsReact';
import PropTypes from 'prop-types';
import AwpSpinner from '@components/Common/AwpSpinner';

const SelectedRowsSelectAction = ({ options, handleChange, selectedRows, updateloading }) => {
	const [showConfirm, setShowConfirm] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState('');
	const onCancelChangeClick = () => {
		setSelectedStatus('');
		setShowConfirm(false);
	};

	const onStatusChange = (e) => {
		setSelectedStatus(e.target.value);
		setShowConfirm(e.target.value != '');
	};
	
	return (
		<>
			<select name="updateMultipleRows" onChange={onStatusChange} value={selectedStatus}>
				<option value="">Update status</option>
				{options.map((opt) => {
					return (
						<option key={opt.value} value={opt.value}>
							{opt.text}
						</option>
					);
				})}
			</select>

			{showConfirm ? (
				<><span className="ml-3">
					Are you sure you want to update status?
					<button type="button" className="btn btn-outline-secondary ml-3" onClick={onCancelChangeClick}>
						No
					</button>
					<button
						type="button"
						className="btn btn-outline-secondary ml-3"
						onClick={() => handleChange(selectedStatus, selectedRows)}
					>
						Yes
					</button>
				</span>
				{updateloading && <AwpSpinner style={{marginLeft:"0.4rem"}} />}</>
			) : (
				''
			)}
		</>
	);
};

// @CODESMELL validator set to any
SelectedRowsSelectAction.propTypes = {
	options: PropTypes.any,
	handleChange: PropTypes.any,
	selectedRows: PropTypes.any,
};

const SelectedRowsButtonAction = ({ buttonText, handleClick, selectedRows }) => {
	const [showConfirm, setShowConfirm] = useState(false);

	const onButtonClick = () => {
		setShowConfirm(true);
	};

	const onCancelChangeClick = () => {
		setShowConfirm(false);
	};

	return (
		<>
			<button type="button" className="btn btn-outline-primary" onClick={onButtonClick}>
				{' '}
				{buttonText}{' '}
			</button>
			{showConfirm ? (
				<span className="ml-3">
					Are you sure you want to associate equipment?
					<button type="button" className="btn btn-outline-secondary ml-3" onClick={onCancelChangeClick}>
						No
					</button>
					<button
						type="button"
						className="btn btn-outline-secondary ml-3"
						onClick={(e) => handleClick(e, selectedRows)}
					>
						Yes
					</button>
				</span>
			) : (
				''
			)}
		</>
	);
};

// @CODESMELL validator set to any
SelectedRowsButtonAction.propTypes = {
	buttonText: PropTypes.any,
	handleClick: PropTypes.any,
	selectedRows: PropTypes.any,
};

const IndeterminateCheckbox = React.forwardRef(({ indeterminate, notSelectable, ...rest }, ref) => {
	const defaultRef = React.useRef();
	const resolvedRef = ref || defaultRef;

	React.useEffect(() => {
		resolvedRef.current.indeterminate = indeterminate;
	}, [resolvedRef, indeterminate]);

	return (
		<>
			{notSelectable ? (
				<>
					<input type="checkbox" ref={resolvedRef} {...rest} disabled />
				</>
			) : (
				<>
					<input type="checkbox" ref={resolvedRef} {...rest} />
				</>
			)}
		</>
	);
});

//https://stackoverflow.com/questions/67857563/react-table-conditionally-select-row
const getConditionalSelectHeaderCheckboxProps = ({ headerProps, isRowSelectable, shouldSelectPage = true }) => {
	const checkIfAllSelectableRowsSelected = (rows) => rows.filter(isRowSelectable).every((row) => row.isSelected);
	// Standard: Here we define the selection type for the next click: Select Page / Select All
	const isSelectPage =
		shouldSelectPage &&
		headerProps.page
			// For conditional select: Filter the rows based on your business logic
			.filter(isRowSelectable)
			// Standard: `isSelectPage === true` if some of the rows are not yet selected
			// This (standard) logic might be confusing to understand at first, but - as a side note - the idea is as follows:
			// This is the variable that defines whether the header props that will be received FOR THE NEXT CLICK will be for Select Page or for Select All
			// Try to play this out in your head:
			//  - Initially, none of the rows are selected, so when we clicking the button initially, we will select only the (selectable) rows on the page (i.e. Select Page), hence the next click will be for Select All, hence `isSelectPage` will be `false`
			//  - When clicking again, we will select the rest of the (selectable) rows (i.e. Select All). The next click will again be Select All (for de-selecting all), hence `isSelectPage` will be `false`
			//  - Finally, when clicking again, we will de-select all rows. The next click will be for Select Page, hence `isSelectPage` will `true`
			.some((row) => !row.isSelected);

	// Standard: Get the props based on Select Page / Select All
	const checkboxProps = isSelectPage
		? headerProps.getToggleAllPageRowsSelectedProps()
		: headerProps.getToggleAllRowsSelectedProps();

	// For conditional select: The header checkbox should be:
	//   - checked if all selectable rows are selected
	//   - indeterminate if only some selectable rows are selected (but not all)
	const disabled = headerProps.rows.filter(isRowSelectable).length === 0;
	const checked = !disabled && checkIfAllSelectableRowsSelected(headerProps.rows);
	const indeterminate = !checked && headerProps.rows.some((row) => row.isSelected);

	// For conditional select: This is where the magic happens
	const onChange = () => {
		// If we're in Select All and all selectable rows are already selected: deselect all rows
		if (!isSelectPage && checkIfAllSelectableRowsSelected(headerProps.rows)) {
			headerProps.rows.forEach((row) => {
				headerProps.toggleRowSelected(row.id, false);
			});
		} else {
			// Otherwise:
			// First, define the rows to work with: if we're in Select Page, use `headerProps.page`, otherwise (Select All) use headerProps.rows
			const rows = isSelectPage ? headerProps.page : headerProps.rows;
			// Then select every selectable row
			rows.forEach((row) => {
				const checked = isRowSelectable(row);
				headerProps.toggleRowSelected(row.id, checked);
			});
		}
	};

	// For conditional select: override checked, indeterminate and onChange - to enforce conditional select based on our business logic
	return {
		...checkboxProps,
		checked,
		indeterminate,
		onChange,
		disabled,
	};
};

function Table({
	columns,
	data,
	fetchData,
	loading,
	search,
	filters,
	noRecordsFound,
	defaultSortBy,
	defaultDesc,
	selectableRows,
	dataTriggers,
	hiddenColumns,
	isFirstColumnSticky,
	renderRowSubComponent,
	expendRowStyle,
	expendCellStyle,
	doubleClickHandler,
	defaultPageSize, // must be one of [5, 10, 25, 50, 100]
}) {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		selectedFlatRows,
		visibleColumns,
		page,
		canPreviousPage,
		canNextPage,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize, selectedRowIds },
	} = useTable(
		{
			columns,
			data,
			initialState: {
				pageIndex: 0,
				pageSize: isValueEmpty(defaultPageSize) ? 25 : defaultPageSize,
				sortBy: [
					{
						id: isValueEmpty(defaultSortBy) ? 'Name' : defaultSortBy,
						desc: isValueEmpty(defaultDesc) || defaultDesc === false ? false : true,
					},
				],
				search: search,
				hiddenColumns: hiddenColumns ? hiddenColumns : [''],
				isFirstColumnSticky: isValueEmpty(isFirstColumnSticky) ? false : isFirstColumnSticky,
				expendRowStyle: isValueEmpty(expendRowStyle) ? '' : expendRowStyle,
				expendCellStyle: isValueEmpty(expendCellStyle) ? '' : expendCellStyle,
			},
			disableSortRemove: true,
		},
		useSortBy,
		useExpanded, // Use the useExpanded plugin hook
		usePagination,
		useRowSelect,
		(hooks) => {
			if (selectableRows && selectableRows.enabled) {
				hooks.visibleColumns.push((columns) => [
					// Let's make a column for selection
					{
						id: 'selection',
						// The header can use the table's getToggleAllRowsSelectedProps method
						// to render a checkbox
						Header: (props) => {
							const checkboxProps = getConditionalSelectHeaderCheckboxProps({
								headerProps: props,
								isRowSelectable: (row) => !row.original.NotSelectable,
							});

							return <IndeterminateCheckbox {...checkboxProps} />;
						},
						// The cell can use the individual row's getToggleRowSelectedProps method
						// to the render a checkbox
						Cell: ({ row }) => {
							return (
								<IndeterminateCheckbox
									{...row.getToggleRowSelectedProps()}
									notSelectable={row.original.NotSelectable}
								/>
							);
						},
						style: { width: '20px' },
					},
					...columns,
				]);
			}
		}
	);
	const [disPlayPageSize, setDisPlayPageSize] = useState(pageSize);
	let pl = pageSize == 5 ? [5, 10, 25, 50, 100, 'All'] : [10, 25, 50, 100, 'All'];
	const pageList = pl;
	if (!filters) {
		filters = [];
	}
	if (!dataTriggers) {
		dataTriggers = [];
	}
	const convertPageSize = (pSize) => {
		return pSize === 'All' ? 9999999 : Number(pSize);
	};
	const getColumnStyle = (c) => {
		return c.style;
	};

	React.useEffect(() => {
		fetchData();
		// @CODESMELL Some strange things are happening here
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search, ...filters, ...dataTriggers]);

	return (
		<>
			{Object.keys(selectedRowIds).length > 0 ? (
				<div className="mb-3">
					<span className="pr-2">
						{Object.keys(selectedRowIds).length} record{Object.keys(selectedRowIds).length > 1 ? 's' : ''}
					</span>
					{selectableRows.withButton ? (
						<SelectedRowsButtonAction
							buttonText={selectableRows.buttonText}
							handleClick={selectableRows.handleClick}
							selectedRows={selectedFlatRows}
						/>
					) : (
						<SelectedRowsSelectAction
							options={selectableRows.options}
							handleChange={selectableRows.handleChange}
							selectedRows={selectedFlatRows}
							updateloading={selectableRows.updateloading}
						/>
					)}
				</div>
			) : (
				''
			)}
			<table {...getTableProps()} className="table">
				<thead>
					{headerGroups.map((headerGroup, hdrIdx) => (
						<tr {...headerGroup.getHeaderGroupProps()} key={'hdr-' + hdrIdx}>
							{headerGroup.headers.map((column, hIdx) => {
								if (column.show || column.show === undefined) {
									return (
										<th
											key={'h-' + hIdx}
											{...column.getHeaderProps(column.getSortByToggleProps())}
											style={{ ...column.getHeaderProps().style, ...getColumnStyle(column) }}
										>
											{column.render('Header')}
											{column.isSorted ? (
												column.isSortedDesc ? (
													<div className="arrow-down"></div>
												) : (
													<div className="arrow-up"></div>
												)
											) : (
												''
											)}
										</th>
									);
								}
							})}
						</tr>
					))}
				</thead>
				<>
					{loading ? (
						<tbody>
							<tr>
								<td className="text-center" colSpan={visibleColumns.length}>
									<Spinner animation="border" />
								</td>
							</tr>
						</tbody>
					) : (
						<>
							{rows.length < 1 ? (
								<tbody>
									<tr>
										<td className="text-center" colSpan={visibleColumns.length}>
											<span>{isValueEmpty(noRecordsFound) ? 'No records found' : noRecordsFound}</span>
										</td>
									</tr>
								</tbody>
							) : (
								<tbody {...getTableBodyProps()}>
									{page.map((row) => {
										prepareRow(row);
										const rowProps = row.getRowProps();
										return (
											<React.Fragment key={rowProps.key}>
												<tr {...rowProps}>
													{row.cells.map((cell, j) => {
														if (cell.column.show || cell.column.show === undefined) {
															if (isFirstColumnSticky === true && j === 0) {
																return (
																	<th
																		key={j}
																		{...cell.getCellProps()}
																		style={{ ...cell.column.getHeaderProps().style, ...getColumnStyle(cell.column) }}
																	>
																		{cell.render('Cell')}
																	</th>
																);
															}
															return (
																<td
																	{...cell.getCellProps()}
																	style={{ ...cell.column.getHeaderProps().style, ...getColumnStyle(cell.column) }}
																	onDoubleClick={(e) => {
																		if (doubleClickHandler) {
																			doubleClickHandler(e, cell);
																		}
																	}}
																>
																	{cell.render('Cell')}
																</td>
															);
														}
													})}
												</tr>
												{row.isExpanded ? (
													<tr style={expendRowStyle} >
														<td colSpan={visibleColumns.length} style={expendCellStyle}>{renderRowSubComponent({ row })}</td>
													</tr>
												) : null}
											</React.Fragment>
										);
									})}
								</tbody>
							)}
						</>
					)}
				</>
			</table>
			<div className="pagination">
				<form className="form-inline">
					<select
						className="form-control"
						value={disPlayPageSize}
						style={{ font: 'inherit' }}
						onChange={(e) => {
							const ev = e.target.value;
							setDisPlayPageSize(String(ev));
							setPageSize(convertPageSize(ev));
						}}
					>
						{pageList.map((pSize, i) => (
							<option key={i} value={String(pSize)}>
								{pSize}
							</option>
						))}
					</select>{' '}
					<span className="pagination_showing">
						Showing {rows.length === 0 ? '0' : pageIndex * pageSize + 1} -{' '}
						{pageIndex * pageSize + pageSize > rows.length ? rows.length : pageIndex * pageSize + pageSize} of{' '}
						{rows.length}
					</span>
				</form>

				{rows.length > pageSize ? (
					<div className="float-right">
						<button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="btn btn-light">
							{'<<'}
						</button>{' '}
						<button onClick={() => previousPage()} disabled={!canPreviousPage} className="btn btn-light">
							{'<'}
						</button>{' '}
						<button onClick={() => nextPage()} disabled={!canNextPage} className="btn btn-light">
							{'>'}
						</button>{' '}
						<button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="btn btn-light">
							{'>>'}
						</button>{' '}
					</div>
				) : (
					''
				)}
			</div>
		</>
	);
}

// @CODESMELL validator set to any
Table.propTypes = {
	columns: PropTypes.any,
	data: PropTypes.any,
	fetchData: PropTypes.any,
	loading: PropTypes.any,
	search: PropTypes.any,
	filters: PropTypes.any,
	noRecordsFound: PropTypes.any,
	defaultSortBy: PropTypes.any,
	defaultDesc: PropTypes.any,
	selectableRows: PropTypes.any,
	dataTriggers: PropTypes.any,
	hiddenColumns: PropTypes.any,
	isFirstColumnSticky: PropTypes.any,
	renderRowSubComponent: PropTypes.any,
	defaultPageSize: PropTypes.any,
};

export default Table;
