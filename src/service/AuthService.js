module.exports = {
    getUser: function () {
        const user = sessionStorage.getItem('user');
        if (user === "undefined" || !user) {
            return null;
        } else {
            return JSON.parse(user);
        }

    },

    getToken: function () {
        return sessionStorage.getItem('token');
    },

    setUserSession: function (user, token) {
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('token', token);
    },

    resetUserSession: function () {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');

    },

    isLoggedInUser: function () {
        const user = sessionStorage.getItem('user');
        let isValidUser = false;
        if (user && user !== "undefined" && user !== "null") {
            isValidUser = true;
        }

        const token = sessionStorage.getItem('token');

        let isLoggedIn = false;
        if (token && isValidUser) {
            isLoggedIn = true;
        }
        return (isLoggedIn);
    }
}