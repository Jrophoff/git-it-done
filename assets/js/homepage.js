var getUserRepos = function(user) {
    // format the guthub api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a get rquest to url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
};
  
getUserRepos();