$(document).ready(function(){
    $("#search").on("keyup", function() {
      var value = $(this).val();
      console.log(value);
      // get all matched strock for search
      if (value.length >= 2) {
        LoadSearch(search=value);
      }
  });
});

function LoadSearch(search='') {
  $.ajax({
                url: '/search',
                type: 'get',
                data:{'query': search},
                success: function(data){
                    var data = JSON.parse(data);

                    if (data.success != 'true') {
                      $('#t-body').html("some error occured while fetching data!!");
                      return;
                    }
                    $('#t-body').empty();
                    rows = data.rows1;
                    companies = [];
                    for (var i = 0; i < rows.length; i++) {
                      companies.push(rows[i].CompanyValues);
                    }
                    companies.forEach(AddRowInTable);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    var errorMsg = 'Ajax request failed: ' + xhr.responseText;
                    $('#t-body').html(errorMsg);
                  }
            });
}

// create table cell for each item
function AddRowInTable(item) {
  var symbol = item.substr(0,item.indexOf(' '));
  items = item.split(" ");
  x = items.slice(1,items.length);
  x = x.join(' ').trim();
  document.getElementById("t-body").innerHTML += "<tr>"
    +"<td>"+ symbol  +"</td>"
    +"<td>"+ x +"</td>"
    +"<td><button class='btn btn-primary' id="+ symbol+">Show details</button></td>"
  +"</tr>";
  document.getElementById(symbol).onclick = createTestClickHandler(symbol);
}

function createTestClickHandler(obj) {
  console.log(obj);
    return function () {
        myFunction(obj);
    };
}

function myFunction(str) {
  console.log(str);
}
