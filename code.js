$(document).ready(function(e) {
    
    $('#buttonA').click(function() {         
        ShowHideRows($(this), $('#tableA tr'));
    });

    $('#buttonB').click(function() {                
        ShowHideRows($(this), $('#tableB tr'));
    });

    $.getJSON("https://www.googleapis.com/books/v1/volumes?q=[tech]", function(json) {
     var maxColumns = 4;
      $("#tableA").append("<tr></tr>");
      $("#tableB").append("<tr></tr>");
      var results = json['items'];
      
      results.sort(function(a,b){
            if(a.volumeInfo.title == b.volumeInfo.title)
                return 0;
            if(a.volumeInfo.title < b.volumeInfo.title)
                return -1;
            if(a.volumeInfo.title > b.volumeInfo.title)
                return 1;
        });

      
      $.each(results, function(i, item) {
        var char = item.volumeInfo.title[0];
        if (char >= 'A' && char <= 'M') {
          var row = $("#tableA tr:last");
          row.append("<td><img src='" + item.volumeInfo.imageLinks.smallThumbnail + "'/></td");
          
          if ($("#tableA tr:last td").length == maxColumns) {
            $("#tableA").append("<tr class='hideRow'></tr>");
          }
        }
        else {
          var row = $("#tableB tr:last");
          row.append("<td><img src='" + item.volumeInfo.imageLinks.smallThumbnail + "'/></td");
          
          if ($("#tableB tr:last td").length == maxColumns) {
            $("#tableB").append("<tr class='hideRow'></tr>");
          }
        }
      });
    });
  });

function ShowHideRows(button, table) {
    $(table).each(function (i, row) {
            
        if(i > 0) {
            if($(button).text() == "Show") {
                $(row).show();
            }
            else {
                $(row).hide();
            }
        }
    });

    if($(button).html() == "Show") {
        $(button).html('Hide')
    }
    else {
        $(button).html('Show')
    }
}