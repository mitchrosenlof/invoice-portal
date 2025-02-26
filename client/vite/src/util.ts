export const sortAlphaNum = (a: any, b: any) => {
	let sorted = null;
	try {
		sorted = a.toString().localeCompare(b, 'en', { numeric: true });
	} catch (e) {
		console.error(e);
	}
	return sorted;
};
