var condition = "test";
var msName = localStorage.getItem('msSummary');
var msDue = localStorage.getItem('sumDue');
var repo = localStorage.getItem('repoName');
var dateDue = new Date(msDue);
var myArrayFromLocalStorage = localStorage.getItem(msName);

if (myArrayFromLocalStorage && myArrayFromLocalStorage.length) {
    var myArray = JSON.parse(myArrayFromLocalStorage);
    console.log(myArray);
}

let output = '<div>';
    output += `
    <table class = "table table-dark" name="${msName}" id="tblms">
        <thead>
        <tr>
            <th colspan="8" scope="col" class="text-center">${repo} (${msName})</th>
            </tr>
            <tr>
                <th colspan="8" scope="col" class="text-center">Due On: ${msDue}</th>                            
            </tr>
            <tr>
                <th scope="col" class="text-center">Backlog</th>
                <th scope="col" class="text-center">Assignee</th>
                <th scope="col" class="text-center">Created At</th>
                <th scope="col" class="text-center">Closed At</th>
                <th scope="col" class="text-center">Status</th>
                <th scope="col" class="text-center">Lead Time</th>
                <th scope="col" class="text-center">LT (in Hours)</th>
                <th scope="col" class="text-center">Condition</th>
            </tr>
        </thead>
        <tbody>`;
        for (var i = 0; i < myArray.length; i++) {
            var obj = myArray[i];
            var condDue = new Date(obj.ClosedAt);
            if (dateDue > condDue) {
                condition = "On Time";
            } else {
                condition = "Late";
            }
            output += `
            <tr>
                <td scope="col" class="text-center">${obj.Backlog}</td>
                <td scope="col" class="text-center">${obj.Assignee}</td>
                <td scope="col" class="text-center">${obj.CreatedAt}</td>
                <td scope="col" class="text-center">${obj.ClosedAt}</td>
                <td scope="col" class="text-center">${obj.Status}</td>
                <td scope="col" class="text-center">${obj.LeadTime}</td>
                <td scope="col" class="text-center">${obj.InHours}</td>
                <td scope="col" class="text-center">${condition}</td>
            </tr>`
        }

        
output += '</tbody><table><div>';
document.getElementById('results').innerHTML = output;
