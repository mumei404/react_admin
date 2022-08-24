export const addApiList = async (newData) => {
	let currentApiList = await getApiList();
	sessionStorage.setItem('apiList', JSON.stringify(currentApiList.concat(newData)))
	return Promise.resolve(newData);
};

export const getApiList = () => {
	return Promise.resolve(JSON.parse(sessionStorage.getItem('apiList') || '[]'))
};
