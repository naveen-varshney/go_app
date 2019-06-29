$(document).ready(function(){
  setTimeout(function(){
    // fetch top 10 stock
    LoadInitial();
  },100); // milliseconds

  $("#search").on("keyup", function() {
    var value = $(this).val().trim();
    console.log(value);
    if (value == '') {
      LoadInitial();
      return;
    }
    LoadSearch(search=value);
  });



});

function LoadInitial() {
  // console.log(url);
  $.ajax({
                url: '/list',
                type: 'get',
                // data:{'query': search},
                success: function(data){
                  // debugger
                  var data = data.trim()
                  data = data.replace(/{/g,'{"')
                  data = data.replace(/:/g,'":')
                  data = data.replace(/,/g,',"')
                  data = data.replace(/," /g,',')
                  data = data.replace(/,"{/g,',{')
                  console.log(data);
                  data = JSON.parse(data);


                  // if (data.success != 'true') {
                  //   $('#t-body').html("some error occured while fetching data!!");
                  //   return;
                  // }
                  $('#t-body').empty();
                  rows = data.rows;
                  rows.forEach(AddRowInTable);
                  },
                  error: function (xhr, ajaxOptions, thrownError) {
                  var errorMsg = 'Ajax request failed: ' + xhr.responseText;
                  $('#t-body').html(errorMsg);
                  }
                  });
}

// create table cell for each item
function AddRowInTable(item) {
  // var symbol = item.substr(0,item.indexOf(' '));
  // items = item.split(" ");
  // x = items.slice(1,items.length);
  // x = x.join(' ').trim();
  document.getElementById("t-body").innerHTML += "<tr>"
    +"<td>"+ item.Symbol  +"</td>"
    +"<td>"+ item.CompanyName +"</td>"
    +"<td>"+ item.BoardMeetingDate +"</td>"
    +"<td>"+ item.Purpose +"</td>"
    +"<td>"+ item.Details +"</td>"
    // +"<td>"+ x +"</td>"
    // +"<td><button class='btn btn-primary' id="+ symbol+">Show details</button></td>"
  +"</tr>";
  // document.getElementById(symbol).onclick = createTestClickHandler(symbol);
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

function AddRowInTableSearch(item) {
  var symbol = item.substr(0,item.indexOf(' '));
  items = item.split(" ");
  x = items.slice(1,items.length);
  x = x.join(' ').trim();
  document.getElementById("t-body").innerHTML += "<tr>"
    +"<td>"+ symbol  +"</td>"
    +"<td>"+ x +"</td>"
    +"<td></td>"
    +"<td></td>"
    // +"<td>"+ x +"</td>"
    // +"<td><button class='btn btn-primary' id="+ symbol+">Show details</button></td>"
  +"</tr>";
  // document.getElementById(symbol).onclick = createTestClickHandler(symbol);
}


function LoadSearch(search='') {
  $.ajax({
                url: '/search',
                type: 'get',
                data:{'query': search},
                success: function(data){
                    var data = JSON.parse(data);
                    console.log(data);

                    $('#t-body').empty();
                    if (data.success != 'true') {
                      $('#t-body').html("some error occured while fetching data!!");
                      return;
                    }
                    rows = data.rows1.slice(0,10);
                    companies = [];
                    for (var i = 0; i < rows.length; i++) {
                      companies.push(rows[i].CompanyValues);
                    }
                    companies.forEach(AddRowInTableSearch);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    var errorMsg = 'Ajax request failed: ' + xhr.responseText;
                    $('#t-body').html(errorMsg);
                  }
            });
}
