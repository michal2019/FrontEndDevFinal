app.factory("userSrv", function ($q) {

    var activeUser = null; // new User({id: 1, fname: "Nir" ...})

    function User(parseUser) {
        this.id = parseUser.id;
        this.fname = parseUser.get("fname");
        this.lname = parseUser.get("lname");
        this.email = parseUser.get("email");
    }


    function isLoggedIn() {
        return activeUser ? true : false;
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
        activeUser = null;
    }

    function getActiveUser() {
        return activeUser;
    }

    return {
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        getActiveUser: getActiveUser
    }

});
// app.factory("userSrv", function($q, $http) {

//     var activeUser = null; // new User({id: 1, fname: "Nir" ...})

//     function User(plainUser) {
//         this.id = plainUser.id;
//         this.fname = plainUser.fname;
//         this.lname = plainUser.lname;
//         this.email = plainUser.email;
//     }


//     function isLoggedIn() {
//         return activeUser ? true : false;
//     }

//     // login will check if the user and password exists. If so it will update the active user 
//     // variable and will return it
//     function login(email, pwd) {
//         var async = $q.defer();

//         activeUser = null;
//         $http.get("app/model/data/users.json").then(function(res) {
//             var users = res.data;
//             for (var i = 0; i < users.length && !activeUser; i++) {
//                 if (email === users[i].email && pwd === users[i].pwd) {
//                     activeUser = new User(users[i]);
//                     async.resolve(activeUser);
//                 } 
//             }
//             if (!activeUser) {
//                 async.reject(401);
//             }
//         }, function(err) {
//             async.reject(err);
//         })

//         return async.promise;
//     }

//     function logout() {
//         activeUser = null;
//     }

//     function getActiveUser() {
//         return activeUser;
//     }

//     return {
//         isLoggedIn: isLoggedIn,
//         login: login,
//         logout: logout,
//         getActiveUser: getActiveUser
//     }

// });

