import Dexie from 'dexie';

export const db = new Dexie('awp-offline');
db.version(1).stores({
	avalancheData: 'id, type, lastUpdated', // Primary key and indexed props
});
