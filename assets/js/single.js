let issueContainerEl = document.querySelector("#issues-container");

let getRepoIssues = function(repo) {
    let apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                // pass response data to dom funtion
                displayIssues(data);
            });
        } else {
        }
    });
};
getRepoIssues("facebook/react")


let displayIssues = function(issues) {
    let (issues.length ===0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    for (let i = 0; i < issues.length; i++) {
        // create a link element to take users to the issue on github
        let issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");
        
        // create span to hold issue title
        let titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container
        issueEl.appendChild(titleEl);

        // create a type element
        let typeEl = document.createElement("span");

        // check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else { 
            typeEl.textContent = "(Issues)";
        }

        // append to container
        issueEl.appendChild(typeEl);

        issueContainerEl.appendChild(issueEl);
    }
};