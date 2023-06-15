export function extractJwtFromCookie() {
	try {
		return document.cookie
			.split(';')
			.find(cookie => cookie.trim().startsWith('Authorization='))
			.split('=Bearer ')[1]
			.trim()
	} catch (error) {
		return ''
	}
}

export function deleteJwtFromCookie(token){
	const date = new Date()
	date.setHours(date.getHours() - 1)
	const utc = date.toUTCString()
	document.cookie = 'Authorization=' + token + ';expires=' + utc
}

export function saveJwtToCookie(token) {
	const date = new Date()
	date.setHours(date.getHours() + 24)
	const utc = date.toUTCString()
	document.cookie = 'Authorization=' + token + ';expires=' + utc
}
