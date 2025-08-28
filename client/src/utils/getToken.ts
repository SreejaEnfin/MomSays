export const getParentToken = () => {
    const token = sessionStorage.getItem('parentToken');
    return token;
}

export const getChildToken = () => {
    const token = sessionStorage.getItem('childToken');
    return token;
}