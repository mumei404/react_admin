export const addApiList = async (newData) => {
	let currentApiList = await fetchApiList();
	sessionStorage.setItem('apiList', JSON.stringify(currentApiList.concat(newData)))
	return Promise.resolve(newData);
};

export const fetchApiList = () => {
	return Promise.resolve(JSON.parse(sessionStorage.getItem('apiList') || '[]'))
};

export const clearApiList = () => {
	sessionStorage.setItem('apiList', []);
	return Promise.resolve('success')
};
