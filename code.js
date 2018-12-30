// Set the maximium number of columns per row
const maxColumns = 4;

$(document).ready(function (e) {

    // Attach to click event on button A
    $('#buttonA').click(function () {
        ShowHideRows($(this), $('#tableA'));
    });

    // Attach to click event to button B
    $('#buttonB').click(function () {
        ShowHideRows($(this), $('#tableB'));
    });

    // Get Json from web endpoint and process for insertion in row
    $.getJSON("https://www.googleapis.com/books/v1/volumes?q=[tech]", function (json) {
        // Create the first default table rows
        $("#tableA").append("<tr></tr>");
        $("#tableB").append("<tr></tr>");
        // Sort all book items in json
        var results = json['items'];
        results.sort(function (a, b) {
            if (a.volumeInfo.title == b.volumeInfo.title)
                return 0;
            if (a.volumeInfo.title < b.volumeInfo.title)
                return -1;
            if (a.volumeInfo.title > b.volumeInfo.title)
                return 1;
        });
        // Loop through all books in sorted results add the books items and insert new rows when
        // necessary
        $.each(results, function (i, item) {
            // Get first char of each tile an convert to lower case to allow
            // for case insensitive match
            var char = item.volumeInfo.title[0].toLowerCase();

            // Seperate into tables alphabetically with first table containing A-N 
            // and second table containing M-Z
            if (char >= 'a' && char <= 'm') {
                InsertBookInRow($("#tableA"), item);
            }
            else {
                InsertBookInRow($("#tableB"), item);
            }
        });
    });
});

// Function to show and hide rows and update button labels
function ShowHideRows(button, table) {
    // Loop through all rows except the first (default) row
    // and show or hide the row based on button state
    $(table).find("tr").each(function (i, row) {
        if (i > 0) {
            if ($(button).text() == "Show") {
                $(row).show();
            }
            else {
                $(row).hide();
            }
        }
    });
    if ($(button).html() == "Show") {
        $(button).html('Hide')
    }
    else {
        $(button).html('Show')
    }
}

// Create the book tile and insert into last row,
// if books exceed max columns then insert a new row
function InsertBookInRow(table, item) {
    $(table).find("tr:last").append(
        "<td>" +
        "<img src='" + item.volumeInfo.imageLinks.smallThumbnail + "'/>" +
        "<div>" + item.volumeInfo.title + "</div>" +
        "</td");
    if ($(table).find(" tr:last td").length == maxColumns) {
        table.append("<tr class='hideRow'></tr>");
    }
}