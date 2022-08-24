export const addApiContent = async (newData) => {
	let current = await fetchApiContent();
	sessionStorage.setItem('apiContent', JSON.stringify(current.concat(newData)))
	return Promise.resolve(newData);
};

export const fetchApiContent = () => {
	return Promise.resolve(JSON.parse(sessionStorage.getItem('apiContent') || '[]'))
};

export const fetchApiContentByApiId = async (apiId) => {
	const data = await fetchApiContent();
	return data.filter(item => item.apiId === apiId);
};
