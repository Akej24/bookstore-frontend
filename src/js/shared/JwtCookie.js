export default class JwtCookie{
    static extractJwt(){
		const authCookie = document.cookie
		.split(';')
		.find(cookie => cookie.trim().startsWith('Authorization='))
		.split('=Bearer ')[1]
		.trim();
		return authCookie;
	}
}