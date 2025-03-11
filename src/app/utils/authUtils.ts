export const getUserInfo = () => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("role");
    return { isAuthenticated: !!token, role };
};

export const loginUser = (token: string, role: string) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("role", role);
    window.dispatchEvent(new Event("authChange"));
};

export const logoutUser = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    window.dispatchEvent(new Event("authChange"));
};
