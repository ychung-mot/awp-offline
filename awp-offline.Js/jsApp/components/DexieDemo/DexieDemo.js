import React, { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@awp/db';
import DexieDemoEdit from './DexieDemoEdit';
import DexieDemoTable from './DexieDemoTable';
import { BOOTSTRAP_BREAKPOINTS, checkBreakpoint } from '@awp/helpers/UIHelper';
import { debounce } from '@awp/helpers/Utils';

const DexieDemo = () => {
	const [mode, setMode] = useState('list');
	const [isMedium, setIsMedium] = useState(checkBreakpoint(BOOTSTRAP_BREAKPOINTS.MEDIUM));
	const [isLarge, setIsLarge] = useState(checkBreakpoint(BOOTSTRAP_BREAKPOINTS.LARGE));
	const [loading, setLoading] = useState(false);
	const [entity, setEntity] = useState(null);
	const data = useLiveQuery(() => db.avalancheData.where({ type: 'dexie-demo' }).toArray()) ?? [];

	useEffect(() => {
		const handleResize = debounce(() => {
			setIsMedium(checkBreakpoint(BOOTSTRAP_BREAKPOINTS.MEDIUM));
			setIsLarge(checkBreakpoint(BOOTSTRAP_BREAKPOINTS.LARGE));
		}, 100);

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});

	const tableProps = {
		isMedium,
		isLarge,
		data,
		loading,
		setMode,
		setEntity,
	};

	const editProps = {
		setMode,
		mode,
		entityId: entity?.id,
		setLoading,
		loading,
	};

	return (
		<>
			{mode === 'list' ? (
				<>
					<DexieDemoTable {...tableProps} />
				</>
			) : (
				<DexieDemoEdit {...editProps} />
			)}
		</>
	);
};

export default DexieDemo;
