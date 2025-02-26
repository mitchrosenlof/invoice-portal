import {
	ChevronDownIcon,
	ChevronUpDownIcon,
	ChevronUpIcon,
	InformationCircleIcon,
} from '@heroicons/react/24/outline';
import React, { JSX, useEffect, useState } from 'react';
import { sortAlphaNum } from '../../util';
import Button from './button';


const ResponsiveTable = (props: {
	title?: string;
	data: any[];
	loading?: boolean;
	growHeight?: boolean;
	heightOffset?: number;
	disableSearch?: boolean;
	disableSort?: boolean;
	columns: {
		title: string;
		key: string;
		type?: string;
		size?: string;
		hide?: boolean;
	}[];
	size?: string;
	row: (item: any, index?: number) => JSX.Element;
	refresh?: () => void;
	addRow?: () => void;
	onFilteredDataChange?: (data: any) => void;
	limit?: number;
}): JSX.Element => {
	const {
		title,
		columns = [],
		loading,
		data,
		growHeight = false,
		heightOffset = 210,
		size,
		row,
		refresh,
		addRow,
		disableSort,
		disableSearch,
		onFilteredDataChange,
		limit,
	} = props;
	const scrollRef = React.useRef<HTMLDivElement>(null);
	const [scrollTop, setScrollTop] = useState(0);
	const [search, setSearch] = useState('');
	const [filteredData, setFilteredData] = useState<any[] | null>(null);
	const [pagedDataForDisplay, setPagedDataForDisplay] = useState<any[] | null>(null);
	const [columnToSort, setColumnToSort] = useState('');
	const [columnSortType, setColumnSortType] = useState('');
	const [displayDataPageIndex, setDisplayDataPageIndex] = useState(1);
	const nonHiddenColumns = columns.filter(column => !column.hide);

	const resetTableSort = () => {
		setColumnSortType('');
		setColumnToSort('');
	};

	const toggleColumnSort = (key: string) => {
		if (columnToSort === key) {
			if (columnSortType === 'asc') {
				setColumnSortType('desc');
			} else if (columnSortType === 'desc') {
				resetTableSort();
			}
		} else {
			setColumnToSort(key);
			setColumnSortType('asc');
		}
	};

	const onScroll = (event: any) => {
		const newScrollTop = event?.target?.scrollTop;
		// prevent reset of scrollTop to 0 on re-render
		if (newScrollTop) setScrollTop(newScrollTop);
	};

	useEffect(() => {
		let _filteredData: any[] = [];
		if (data) {
			_filteredData = [...data];
			if (search) {
				_filteredData = [...data].filter(item => {
					return columns.some(column => {
						const value = item[column.key];
						return value && search
							? value.toString().toLowerCase().includes(search.toLowerCase())
							: false;
					});
				});
			}
			if (columnToSort) {
				_filteredData.sort((a, b) => {
					const aVal = a[columnToSort] ? a[columnToSort] : '';
					const bVal = b[columnToSort] ? b[columnToSort] : '';
					return aVal && bVal ? sortAlphaNum(aVal, bVal) : 0;
				});
				if (columnSortType === 'desc') _filteredData.reverse();
			}
		}
		setFilteredData(_filteredData);
		// if (onFilteredDataChange) {
		// 	onFilteredDataChange(_filteredData);
		// }

		if (scrollRef.current && scrollTop) {
			scrollRef.current.scrollTop = scrollTop;
		}
	}, [data, search, columnToSort, columnSortType]);

	useEffect(() => {
		setDisplayDataPageIndex(1);
	}, [search]);

	useEffect(() => {
		const endIndex =
			limit && limit * displayDataPageIndex <= (filteredData ?? []).length
				? limit * displayDataPageIndex
				: filteredData?.length;
		const pagedDataForDisplay = filteredData ? filteredData.slice(0, endIndex) : null;
		setPagedDataForDisplay(pagedDataForDisplay);
	}, [filteredData, displayDataPageIndex]);

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between">
				<div className={size ? `text-${size} font-bold` : 'text-2xl font-bold'}>
					{title ? title : ''}
				</div>
				<div className="flex items-center space-x-1">
					{!disableSearch ? (
						<div className="flex flex-1 items-center">
							<div className="px-1">
								<InformationCircleIcon className="h-5 w-5 cursor-pointer text-gray-400" />
							</div>
							<input
								className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
								placeholder={'Search...'}
								onChange={event => {
									setSearch(event.target.value);
								}}
							/>
						</div>
					) : null}
				</div>
			</div>
			<div
				ref={scrollRef}
				className={`overflow-hidden overflow-y-auto rounded-lg bg-white shadow`}
				style={
					growHeight
						? {
								height: `calc(100vh - ${heightOffset}px)`,
						  }
						: {
								maxHeight: '24rem',
						  }
				}
				onScroll={onScroll}
			>
				<table className="w-full table-auto border-collapse">
					<thead>
						<tr>
							{nonHiddenColumns.map((column, index) => {
								const { key, title, type, size } = column;
								return (
									<th
										key={key}
										className={`sticky top-0 z-10 flex-1 bg-gray-200 p-3 font-bold ${
											size ? `text-${size}` : ''
										}`}
									>
										{title ? (
											<button
												className={`flex w-full items-center ${
													index === nonHiddenColumns.length - 1
														? 'justify-end'
														: type === 'number'
														? 'justify-center'
														: 'justify-between'
												}`}
												onClick={() =>
													!disableSort ? toggleColumnSort(key) : null
												}
											>
												<div className="">{title}</div>
												{!disableSort ? (
													<div className="pl-1">
														{columnToSort === key ? (
															columnSortType === 'asc' ? (
																<ChevronUpIcon
																	className={`h-4 w-4 text-blue-primary`}
																/>
															) : (
																<ChevronDownIcon
																	className={`h-4 w-4 text-blue-primary`}
																/>
															)
														) : (
															<ChevronUpDownIcon
																className={`h-4 w-4 text-gray-400`}
															/>
														)}
													</div>
												) : null}
											</button>
										) : (
											''
										)}
									</th>
								);
							})}
						</tr>
					</thead>
					<tbody>
						{loading || !pagedDataForDisplay || !pagedDataForDisplay[0] ? (
							<tr>
								<td colSpan={columns.length} className="p-3">
									{loading ? (
										<img
											src="/img/loading-icon.svg"
											className="mx-auto h-7 w-7"
										/>
									) : search ? (
										'No matches'
									) : (
										'No data'
									)}
								</td>
							</tr>
						) : (
							<>
								{pagedDataForDisplay.map((item, index) => row(item, index))}
								{filteredData &&
								filteredData.length &&
								limit &&
								displayDataPageIndex &&
								limit * displayDataPageIndex <= filteredData.length ? (
									<tr>
										<td colSpan={columns.length} className="p-3 text-center">
											<div className="flex items-center justify-center space-x-2">
												<div className="text-xs italic">
													Showing first {limit * displayDataPageIndex} rows.
												</div>
												<Button
													title="Show more"
													onClick={() => {
														setDisplayDataPageIndex(prev => prev + 1);
													}}
												/>
											</div>
										</td>
									</tr>
								) : null}
							</>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ResponsiveTable;
