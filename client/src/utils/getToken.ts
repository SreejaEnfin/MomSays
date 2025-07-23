export const getToken = () => {
    const token = sessionStorage.getItem('parentToken');
    return token;
}