export function convertDateToSimpleFomart(utcDate) {
    const date = new Date(utcDate);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const formattedDate = `${year}-${month}-${day} ~ ${hours}:${minutes}`;
    return formattedDate
}