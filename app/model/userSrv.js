app.factory("userSrv", function ($q) {

    var activeUser = null;

    if (Parse.User.current()) {
        activeUser = new User(Parse.User.current());
    }

    function User(parseUser) {
        this.id = parseUser.id;
        // this.username = username;
        this.email = parseUser.get("email");
    }


    function isLoggedIn() {
        return activeUser ? true : false;
    }

    function signUp(username, email, pwd) {
        activeUser = null;
        var async = $q.defer();
        const user = new Parse.User()
        user.set('username', username);
        user.set('email', email);
        user.set('password', pwd);

        // Pass the username and password to logIn function
        user.signUp().then(function (user) {
            // Do stuff after successful login
            console.log('sign Up user', user);
            activeUser = new User(user);
            async.resolve(activeUser);
        }).catch(error => {
            console.error('Error while logging in user', error);
            async.reject(error);
        });

        return async.promise;
    }

    // login will check if the user and password exists. If so it will update the active user 
    // variable and will return it
    function login(email, pwd) {
        var async = $q.defer();

        activeUser = null;

        // Pass the username and password to logIn function
        Parse.User.logIn(email, pwd).then(function (user) {
            // Do stuff after successful login
            console.log('Logged in user', user);
            activeUser = new User(user);
            async.resolve(activeUser);
        }).catch(error => {
            console.error('Error while logging in user', error);
            async.reject(error);
        });

        return async.promise;
    }

    function logout() {
        console.log('Logged out user', activeUser);
        activeUser = null;
    }

    function getActiveUser() {
        return activeUser;
    }

    function resetPassword(email) {
        activeUser = null;
        var async = $q.defer();
        Parse.User.requestPasswordReset(email).then(function () {
            console.log("Password reset request was sent successfully");
            async.resolve(activeUser);
        }).catch(function (error) {
            console.log("The login failed with error: " + error.code + " " + error.message);
            async.reject(error);
        });

        return async.promise;
    }


    return {
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        getActiveUser: getActiveUser,
        signUp: signUp,
        resetPassword: resetPassword
    }

});