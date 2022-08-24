export const addApiList = async (newData) => {
	let currentApiList = await fetchApiList();
	sessionStorage.setItem('apiList', JSON.stringify(currentApiList.concat(newData)))
	return Promise.resolve(newData);
};

export const fetchApiList = () => {
	return Promise.resolve(JSON.parse(sessionStorage.getItem('apiList') || '[]'))
};

export const fetchApiOne = async (id) => {
	const list = await fetchApiList();
	const data = list.find(item => item.apiId === id);
	if(data === undefined) {
		return Promise.reject()
	} else {
		return Promise.resolve(data)
	}
};

export const clearApiList = () => {
	sessionStorage.setItem('apiList', []);
	return Promise.resolve('success')
};
