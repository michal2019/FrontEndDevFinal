
app.factory("appliesSrv", function ($q, $http, userSrv) {
    var applies = {};   // key is userId and value is an array of the user's applies
    var nextApplieId;

    class Apply {
        constructor(parseApply) {
            this.id = parseApply.id;
            this.company = parseApply.get("company");
            this.title = parseApply.get("title");
            this.location = parseApply.get("location");
            this.status = parseApply.get("status");
            this.updateTime = parseApply.get("updatedAt");
            this.comment = parseApply.get("comment");
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
            console.error('Error', error);
            async.reject(error);
        });

        return async.promise;
    }

    // Returning (with a promise) a single apply by its index in the array
    function getApplyByIndex(index) {
        var async = $q.defer();

        // Getting all the applies and returning a single apply by its index in the array
        getActiveUserApplies().then(function (applies) {
            if (index >= applies.length) {
                async.reject("Index out of bounds")
            }

            async.resolve(applies[index]);
        }, function (err) {
            async.reject(err);
        })

        return async.promise;
    }

    function getStatus(status) {
        var statusStr = "";
        switch (status) {
            case '1':
                statusStr = "פנייה במייל";
                break;
            case '2':
                statusStr = "מוזמן לראיון";
                break;
            case '3':
                statusStr = "ממתין לתשובת המראיינים";
                break;
            case '4':
                statusStr = "לא מתאים";
                break;
            case '5':
                statusStr = "מרכז הערכה";
                break;
            case '6':
                statusStr = "מתאים";
                break;
            case '7':
                statusStr = "תקן הוקפא";
                break;
            default:
        }
        return statusStr;
    }

    function addApply(company, title, location, status ,comment) {
        var async = $q.defer();

        // Preparing the new parse recipe object to save
        var ApplyParse = Parse.Object.extend('jobReply');
        var newApply = new ApplyParse();
        newApply.set('company', company);
        newApply.set('title', title);
        newApply.set('location', location);
        newApply.set('status', status);
        newApply.set('userID', Parse.User.current());
        newApply.set('comment', comment);

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

    function updateApply(applyId, company, title, location, status, comment) {
        var async = $q.defer();
        const jobReply = Parse.Object.extend('jobReply');
        const query = new Parse.Query(jobReply);
        query.get(applyId).then(function (object) {
            object.set('company', company);
            object.set('title', title);
            object.set('location', location);
            object.set('userID', Parse.User.current());
            object.set('status', status);
            object.set('comment', comment);
            object.save().then(function (response) {
                console.log('Updated jobReply', response);
                var updatedApply = new Apply(response);
                updatedApply.updateTime = new Date();
                async.resolve(updatedApply);
            }, (error) => {
                console.error('Error while updating jobReply', error);
                async.reject(error);
            });
        });
        return async.promise;
    }

    function deleteApply(apply) {
        var async = $q.defer();
        const jobReply = Parse.Object.extend('jobReply');
        const query = new Parse.Query(jobReply);
        query.get(apply.id).then(function (object) {
            object.destroy().then(function (response) {
                console.log('Deleted jobReply', response);
                async.resolve(new Apply(response));
            }, (error) => {
                console.error('Error while deleting jobReply', error);
                async.reject(error);
            });
        });
        return async.promise;
    }

    return {
        getActiveUserApplies: getActiveUserApplies,
        addApply: addApply,
        getStatus: getStatus,
        updateApply: updateApply,
        deleteApply: deleteApply,
        getApplyByIndex: getApplyByIndex
    }

});