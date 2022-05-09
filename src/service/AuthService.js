module.exports = {
    getUser: function () {
        const user = localStorage.getItem('user');
        if (user === "undefined" || !user) {
            return null;
        } else {
            return JSON.parse(user);
        }
    },

    getToken: function () {
        return localStorage.getItem('token');
    },

    setUserSession: function (user, token) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
    },

    resetUserSession: function () {
        localStorage.removeItem('user');
        localStorage.removeItem('token');

    },

    isLoggedInUser: function () {
        const user = localStorage.getItem('user');
        let isValidUser = false;
        if (user && user !== "undefined" && user !== "null") {
            isValidUser = true;
        }

        const token = localStorage.getItem('token');

        let isLoggedIn = false;
        if (token && isValidUser) {
            isLoggedIn = true;
        }
        return (isLoggedIn);
    }
}