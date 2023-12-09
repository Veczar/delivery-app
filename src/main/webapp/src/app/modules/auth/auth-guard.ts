

export const authGuard = () => {
    return localStorage.getItem('role') === 'ADMIN' ? true : false;
}