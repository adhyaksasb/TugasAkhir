const moment = require("moment");

const openSource = {
    githubConvertedToken: localStorage.getItem("token"),
    githubUserName: localStorage.getItem("username"),
    // githubConvertedToken: "ac4f3b8bbea34f039fb7ab06a77f4246600a1a83",
    // githubUserName: "adhyaksasb",
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: "bearer " + openSource.githubConvertedToken,
  };

  const repoName = localStorage.getItem("repoName");

  var no0 = 0; //Increment for Collaborators
  var no1 = 0; //Increment for Issues
  var avg = ["0"];
  var login = ["haha"];

  fetch("https://api.github.com/graphql", {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
          query: `
          query {
            repository(name: "${repoName}", owner: "${openSource.githubUserName}") {
              id
              name
              assignableUsers(first: 10) {
                edges {
                  node {
                    id
                    login
                  }
                }
              }
              createdAt
              projects(first: 10) {
                edges {
                  node {
                    id
                    name
                    createdAt
                    closedAt
                  }
                }
              }
              issues(first: 100) {
                edges {
                  node {
                    id
                    assignees(first: 100) {
                      edges {
                        node {
                          id
                          login
                        }
                      }
                    }
                    closedAt
                    createdAt
                    title
                    projectCards(first: 100) {
                        nodes {
                          column {
                            name
                          }
                        }
                      }
                  }
                }
                totalCount
              }
            }
          }
          `
      })    
  })
  .then(res => res.json())
  .then(data => data.data.repository).then(results => {
    let output = '<div class="container-fluid"> ';
        output += `<h3>${results.name}</h3><br>
        <h5>Collaborators</h5>
        <table class = "table table-dark">
            <thead>
             <tr>
                <th scope="col" class="text-center">No</th>
                <th scope="col" class="text-center">Collaborators Username</th>
             </tr>
             <thead>
            <tbody>`;

            //Loop for Collaborators
            results.assignableUsers.edges.forEach(post => {
                login.push(`${post.node.login}`);
                no0++;
                output += `<tr>
                <td scope="col" class="text-center">${no0}</td>
                <td scope="col"><a class="btn btn-dark btn-block" href="https://www.github.com/${post.node.login}" role="button">${post.node.login}</a></td>
             </tr>`
            });
        output += `</tbody>
        </table><br>
        <h5>Performance Analysis</h5>
        <table class = "table table-dark" id="xlsx">
            <thead>
            <tr>
                <th scope="col" class="text-center">No</th>
                <th scope="col" class="text-center">Product Backlog</th>
                <th scope="col" class="text-center">Assignee</th>
                <th scope="col" class="text-center">Created At</th>
                <th scope="col" class="text-center">Closed At</th>
                <th scope="col" class="text-center">Status</th>
                <th scope="col" class="text-center">Lead Time</th>
             </tr>
             </thead>
            <tbody>`;

            //Loop for Product Backlog (Issues)
            results.issues.edges.forEach(post => {
                no1++;
                var assignee = `${post.node.assignees.edges[0].node.login}`;
                var date1 = `${post.node.createdAt}`;
                var date2 = `${post.node.closedAt}`;
                var moment1 = moment(date1);
                var moment2 = moment(date2);
                var days = moment2.diff(moment1, 'Days')
                var hours = moment2.diff(moment1, 'H');
                var diff = hours%24;
                var LT = [`${days}d${diff}h`];

                output += `<tr>
                <td scope="col" class="text-center">${no1}</td>
                <td scope="col" class="text-center">${post.node.title}</td>
                <td scope="col" class="text-center">${assignee}</td>
                <td scope="col" class="text-center">${post.node.createdAt}</td>
                <td scope="col" class="text-center">${post.node.closedAt}</td>
                <td scope="col" class="text-center">${post.node.projectCards.nodes[0].column.name}</td>
                <td scope="col" class="text-center">${LT}</td>`
            })

        output+= `</tbody>
                </table>
                </div>
            </div> `         
    console.log(results);
    document.getElementById('results').innerHTML = output;
}).catch(err => {
    alert("Token is missing, invalid, or timed out");
    window.location.href="./login.html";
});

