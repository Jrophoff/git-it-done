let userFormEl = document.querySelector("#user-form");
let languageButtonEl = document.querySelector("#language-buttons")
let nameInputEl = document.querySelector("#username");
let repoContainerEl = document.querySelector("#repos-container");
let repoSearchTerm = document.querySelector("#repo-search-term");



let formSubmitHandler = function (event) {
    // prevent page from refreshing
    event.preventDefault();
    console.log(event);

    let username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
};

let buttonClickHandler = function(events) {
    let language = event.target.getAttribute("data-language")
    
    if (language) {
        getFeaturedRepos(language);
    }
    // clear old content
    repoContainerEl.textContent = "";
    }

var getUserRepos = function (user) {
    // format the guthub api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a get rquest to url
    fetch(apiUrl).then(function (response) {
        // request was successful
        if (response.ok) {
            response.json().then(function (data) {
                displayRepos(data, user);
            });
        } else {
            alert("Error: GitHub User Not Found");
        }
    })
    .catch(function(error) {
        // notice this ',catch()' getting chained onto the end of the '.then()' method
        alert("Unable to connect to GitHub");
    });
};

let getFeaturedRepos = function(language) {
    let apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data){
                displayRepos(data.items, language);
            });
        } else {
          alert("Error: GitHub User Not Found")  
        }
    });
};

let displayRepos = function (repos, searchTerm) {

    // check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }

    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    // loop over reops
    for (var i = 0; i < repos.length; i++) {
        // format repo name
        let repoName = repos[i].owner.login + "/" + repos[i].name;

        // create a container for each repo
        let repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        // creat a span element to hold repository name
        let titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // append to container
        repoEl.appendChild(titleEl);

        // create a status element
        let statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML =
                "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append to container
        repoEl.appendChild(statusEl);

        // append containerto the dom
        repoContainerEl.appendChild(repoEl);
    }

    

    console.log(repos);
    console.log(searchTerm);
};


userFormEl.addEventListener("submit", formSubmitHandler);
languageButtonEl.addEventListener("click", buttonClickHandler);
