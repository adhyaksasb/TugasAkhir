const openSource = {
    githubConvertedToken: localStorage.getItem("token"),
    githubUserName: localStorage.getItem("username"),
    githubOrganization: localStorage.getItem("organization")
    // githubConvertedToken: "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",
    // githubUserName: "adhyaksasb",
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: "bearer " + openSource.githubConvertedToken,
  };
  
  var no = 0; //Increment for Repositories
  var login = ["haha"];

  function passvalues(clicked_id)
  {
    localStorage.setItem("username", clicked_id);
  }
  

  fetch("https://api.github.com/graphql", {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
          query: `
          {
            user(login: "${openSource.githubUserName}") {
              avatarUrl
              login
              url
              organization(login: "${openSource.githubOrganization}") {
                login
                avatarUrl
                repositories(first: 100, orderBy: {field: PUSHED_AT, direction: DESC}) {
                  totalCount
                  nodes {
                    name
                    nameWithOwner
                    updatedAt
                    description
                  }
                  
                } 
              }
            }
          }
          `
      })    
  })
  .then(res => res.json())
  .then(data => data.data.user.organization).then(results => {
    console.log(results);
    let output = '<div class="row">';
      output += `
      <div class="row no-gutters">
      <div class="col-lg-4" align="center">
          <img src="${results.avatarUrl}" class="img-fluid my-3" alt="">
          <h3>${results.login}</h3>
      </div>
      <div class="col-lg-8 px-4 pt-1">
        <h1>Repositories List (${results.repositories.totalCount})</h1>
        <form action="./repository.html">
        <div class="card-content" id="decard" style="display: none">`;

      //Loop for Repositories List
      results.repositories.nodes.forEach(post => {
        no++;
        output+= `<div class="card my-3" style="width: 36rem;">
        <input type="submit" class="card-header bg-dark text-light" id="repo${no}" name="${post.name}" value="${post.nameWithOwner}" target="_blank" onclick="reply_click(this.name);"/>
        <div class="card-body bg-secondary text-light">
          <h5 class="card-text">${post.description}</h5>
          <br>
          <p class="card-text">Update on ${post.updatedAt}</p>
        </div>
        </div>`
      })
      output+= `</div>
      </div>
    </div>
  </div>`
      document.getElementById('results').innerHTML = output;
  }).catch(err => {
    alert("Token is missing, invalid, or timed out");
    window.location.href="./login.html";
});

