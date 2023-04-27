export const useLocalStorage = () => {
	const sign = (key: string, payload: any) => {
		localStorage.setItem(key, JSON.stringify(payload));
	}

	const getInfo = (key: string) => {
		const jsonInfo = localStorage.getItem(key);
		if(jsonInfo) return JSON.parse(jsonInfo);
		return null;
	}

	const remove = (key: string) => {
		localStorage.removeItem(key);
	}

	return { sign, getInfo, remove };
}