// const moment = require("moment");

const openSource = {
    githubConvertedToken: localStorage.getItem("token"),
    githubUserName: localStorage.getItem("username"),
    githubOrganization: localStorage.getItem("organization")
    // githubConvertedToken: "ac4f3b8bbea34f039fb7ab06a77f4246600a1a83",
    // githubUserName: "adhyaksasb",
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: "bearer " + openSource.githubConvertedToken,
  };

  const repoName = localStorage.getItem("repoName");

  var no0 = 0; //Increment for Collaborators
  var noms = 0; //Increment for Milestones
  var no1 = 0; //Increment for Issues
  var arrbacklog = [];

  fetch("https://api.github.com/graphql", {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
          query: `
          {
            user(login: "${openSource.githubUserName}") {
              organization(login: "${openSource.githubOrganization}") {
                login
                repository(name: "${repoName}") {
                  name
                  milestones(first: 10, orderBy: {field: DUE_DATE, direction: ASC}) {
                    nodes {
                      title
                      description
                      dueOn
                      issues(first: 100) {
                        nodes {
                          createdAt
                          closedAt
                          title
                          projectCards(first: 10) {
                            nodes {
                              column {
                                name
                              }
                            }
                          }
                          assignees(first: 10) {
                            nodes {
                              login
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          `
      })    
  })
  .then(res => res.json())
  .then(data => data.data.user.organization.repository).then(results => {
    let output = '<div class="container-fluid"> ';
        output += `<h3>${results.name}</h3><br><br>
        <h5>Performance Analysis</h5>
        <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">`;
        results.milestones.nodes.forEach(ms => {
          noms++;
          output += `<a class="nav-item nav-link" id="ms${noms}-tab" data-toggle="tab" href="#ms${noms}" role="tab" aria-controls="ms${noms}" aria-selected="true">Milestones ${noms}</a>`
        });
        output += `
        </div>
      </nav>
      <div class="tab-content" id="nav-tabContent">`;

          results.milestones.nodes.forEach(ms => {    
          no1++;
          var title = `${ms.title}`;
          var due = `${ms.dueOn}`;
          // var due = new Date(`${ms.dueOn}`);
          output += `
          <div class="tab-pane fade show active" id="ms${no1}" role="tabpanel" aria-labelledby="ms${no1}-tab">          
          <br>
          <h5>${title}</h5>
          <h6>Due On: ${due}</h6>
        </br>
        <form action="./summary.html">
        <table class = "table table-dark" name="${title}" id="tblms${no1}">
          <thead>
            <tr>
              <th scope="col" class="text-center">Backlog</th>
              <th scope="col" class="text-center">Assignee</th>
              <th scope="col" class="text-center">CreatedAt</th>
              <th scope="col" class="text-center">ClosedAt</th>
              <th scope="col" class="text-center">Status</th>
              <th scope="col" class="text-center">LeadTime</th>
              <th scope="col" class="text-center">InHours</th>
            </tr>
          </thead>
          <tbody>`
          ms.issues.nodes.forEach(issue => {
            var backlog = `${issue.title}`;
            var createdAt = `${issue.createdAt}`;
            var closedAt = `${issue.closedAt}`;
            var assignee = `${issue.assignees.nodes[0].login}`;
            // var status = `${issue.projectCards.nodes[0].column.name}`;
            var moment1 = moment(createdAt);
            var moment2 = moment(closedAt);
            var days = moment2.diff(moment1, 'Days');
            var hours = moment2.diff(moment1, 'H');
            var diff = hours%24;
            var LT = [`${days}d${diff}h`];
            arrbacklog.push(backlog);
            localStorage.setItem(`backlog${no1}`, JSON.stringify(arrbacklog));
            
            output += `<tr>
            <td scope="col" class="text-center">${backlog}</td>
            <td scope="col" class="text-center">${assignee}</td>
            <td scope="col" class="text-center">${createdAt}</td>
            <td scope="col" class="text-center">${closedAt}</td>
            <td scope="col" class="text-center">Done</td>
            <td scope="col" class="text-center">${LT}</td>
            <td scope="col" class="text-center">${hours}</td>`
          })
          output +=`</tbody>
            </table>
            <button id="btntojson${no1}" class="btn1" name="${due}" name2="${title}" onClick="setLS(this.name)">Summary</button>
            </form>
            </div>`;
        })

        output+= `</div>
          </div>
        </div> `;       
        console.log(results);
        document.getElementById('results').innerHTML = output;

        $('#btntojson1').click( function() {
          var table = $('#tblms1').tableToJSON(); // Convert the table into a javascript object
          console.log(table);
          localStorage.setItem('msSummary', 'Sprint 1');
          localStorage.setItem('Sprint 1', JSON.stringify(table));
        });
        $('#btntojson2').click( function() {
          var table = $('#tblms2').tableToJSON(); // Convert the table into a javascript object
          console.log(table);
          localStorage.setItem('msSummary', 'Sprint 2');
          localStorage.setItem('Sprint 2', JSON.stringify(table));
        });
        $('#btntojson3').click( function() {
          var table = $('#tblms3').tableToJSON(); // Convert the table into a javascript object
          console.log(table);
          localStorage.setItem('msSummary', 'Sprint 3');
          localStorage.setItem('Sprint 3', JSON.stringify(table));
        });
        $('#btntojson4').click( function() {
          var table = $('#tblms4').tableToJSON(); // Convert the table into a javascript object
          console.log(table);
          localStorage.setItem('msSummary', 'Sprint 4');
          localStorage.setItem('Sprint 4', JSON.stringify(table));
        });
    }).catch(err => {
      alert("Token is missing, invalid, or timed out");
      window.location.href="./login.html";
  });