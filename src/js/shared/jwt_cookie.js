export function extractJwtFromCookie() {
	try {
		return document.cookie
			.split(';')
			.find(cookie => cookie.trim().startsWith('Authorization='))
			.split('=Bearer ')[1]
			.trim();
	} catch (error) {
		return '';
	}
}

export function deleteJwtFromCookie(token){
	const d = new Date();
	d.setHours(d.getHours() - 1);
	const utc = d.toUTCString();
	document.cookie = 'Authorization=' + token + ';expires=' + utc;
}

export function saveJwtToCookie(token) {
	document.cookie = 'Authorization=' + token;
}
