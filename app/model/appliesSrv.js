
app.factory("appliesSrv", function($q, $http, userSrv) {

    // All of these variables are a hack becasue we don't have a server side
    // mianitng all the applies in the memory
    var applies = {};   // key is userId and value is an array of the user's applies
    var nextApplieId;

    // New ES6 syntax for creating a constructor
    class Applie {
        constructor(parseApplie) {
            this.id = parseApplie.id;
            this.name = parseApplie.get("company");
            this.title = parseApplie.get("title");
            this.location = parseApplie.get("location");
            this.status = parseApplie.get("status");
        }
    }

    function getActiveUserApplies() {
        var async = $q.defer();

        var applies = [];

        // Building a query
        var ApplieParse = Parse.Object.extend('Applie');
        var query = new Parse.Query(ApplieParse);
        query.equalTo("userId", Parse.User.current());

        // Executing the query
        query.find().then((results) => {
          console.log('Applie found', results);
          for (let index = 0; index < results.length; index++) {
              applies.push(new Applie(results[index]));
          }
          async.resolve(applies);
        }, (error) => {
          console.error('Error while fetching Recipe', error);
          async.reject(error);
        });

        return async.promise;
    }

    function addApplie(name, desc, img) {
        var async = $q.defer();

        // Preparing the new parse recipe object to save
        var ApplieParse = Parse.Object.extend('jobReply');
        var newApplie = new ApplieParse();
        newApplie.set('company', company);
        newApplie.set('title', title);
        newApplie.set('location', location);
        newApplie.set('userId', Parse.User.current());

        // Actual saving the new recipe in Parse
        newApplie.save().then(
          function (result) {
            console.log('Applie created', result);
            async.resolve(new Applie(result));
          },
          function (error) {
            console.error('Error while creating Applie: ', error);
            async.reject(error);
          }
        );

        return async.promise;
    }

    return {
        getActiveUserApplies: getActiveUserApplies,
        addApplie: addApplie
    }

});