
app.factory("appliesSrv", function($q, $http, userSrv) {

    // All of these variables are a hack becasue we don't have a server side
    // mianitng all the applies in the memory
    var applies = {};   // key is userId and value is an array of the user's applies
    var nextApplieId;

    // New ES6 syntax for creating a constructor
    class Apply {
        constructor(parseApply) {
            this.id = parseApply.id;
            this.company = parseApply.get("company");
            this.title = parseApply.get("title");
            this.location = parseApply.get("location");
            this.status = parseApply.get("status");
        }
    }

    function getActiveUserApplies() {
        var async = $q.defer();

        var applies = [];

        // Building a query
        var ApplyParse = Parse.Object.extend('jobReply');
        var query = new Parse.Query(ApplyParse);
        query.equalTo("userID", Parse.User.current());

        // Executing the query
        query.find().then((results) => {
          console.log('Apply found', results);
          for (let index = 0; index < results.length; index++) {
              applies.push(new Apply(results[index]));
          }
          async.resolve(applies);
        }, (error) => {
          console.error('Error while fetching Recipe', error);
          async.reject(error);
        });

        return async.promise;
    }

    function addApply(company, title, location, status) {
        var async = $q.defer();

        // Preparing the new parse recipe object to save
        var ApplyParse = Parse.Object.extend('jobReply');
        var newApply = new ApplyParse();
        newApply.set('company', company);
        newApply.set('title', title);
        newApply.set('location', location);
        newApply.set('status', status);
        newApply.set('userID', Parse.User.current());

        // Actual saving the new recipe in Parse
        newApply.save().then(
          function (result) {
            console.log('Apply created', result);
            async.resolve(new Apply(result));
          },
          function (error) {
            console.error('Error while creating Apply: ', error);
            async.reject(error);
          }
        );

        return async.promise;
    }

    return {
        getActiveUserApplies: getActiveUserApplies,
        addApply: addApply
    }

});