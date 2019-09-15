export const authUser = (username, password) =>
	fetch(
		`https://loft-taxi.glitch.me/auth?username=${username}&password=${password}`
	).then(response =>
		response.status !== 200 ? Promise.reject(response) : response.json()
	);

export const removeAuthDataInLocalStorage = () => {
	return window.localStorage.removeItem("authData");
};