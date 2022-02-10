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
              repositories(first: 10, orderBy: {field: CREATED_AT, direction: DESC}) {
                nodes {
                  createdAt
                  updatedAt
                  name
                  nameWithOwner
                  url
                  description
                  owner {
                    login
                  }
                }
              }
            }
          }
          `
      })    
  })
  .then(res => res.json())
  .then(data => data.data.user).then(results => {
    console.log(results);
    let output = '<div class="row">';
      output += `
      <div class="row no-gutters">
      <div class="col-lg-4" align="center">
          <img src="${results.avatarUrl}" class="img-fluid my-3" alt="">
          <h3>${results.login}</h3>
      </div>
      <div class="col-lg-8 px-4 pt-1">
        <h1>Repositories List</h1>
        <form action="./repositoryPersonal.html">`;

      //Loop for Repositories List
      results.repositories.nodes.forEach(post => {
        no++;
        output+= `<div class="card my-3">
        <input type="submit" class="card-header bg-dark text-light" id="repo${no}" name="${post.name}" value="${post.nameWithOwner}" onclick="reply_click(this.name);"/>
        <div class="card-body bg-secondary text-light">
          <h5 class="card-text">${post.description}</h5>
          <br>
          <p class="card-text">Update on ${post.updatedAt}</p>
        </div>`
      })
      output+= `</div>
    </div>
  </div>`
      document.getElementById('results').innerHTML = output;
  }).catch(err => {
    alert("Token is missing, invalid, or timed out");
    window.location.href="./login.html";
});

