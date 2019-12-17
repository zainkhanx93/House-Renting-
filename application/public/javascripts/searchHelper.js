
$(document).ready(function () {
    $("#searchOneOnOneList").html("");
    $("#searchOneOnManyList").html("");
    $("#searchManyOnOneList").html("");

    $.ajax({
        url: "listingIds",
        context: document.body
    }).done(function(data) {

        for(let i in data){
            $("#searchOneOnOneList").append("<li><a href=\"#\">"+data[i].lid+"</a></li>" );
            $("#searchOneOnManyList").append("<li><a href=\"#\">"+data[i].lid+"</a></li>" );
            $("#searchManyOnOneList").append("<li><a href=\"#\">"+data[i].lid+"</a></li>" );
        }
    });
});



$("#searchOneOnOneList").click(function (e) {
    $("#divSearchOneToOne").html("");
    $.ajax({
        url: "listingOneToOne?lid=" + e.target.text,
        context: document.body
    }).done(function(text) {

        if(text.length == 0){
            $("#divSearchOneToOne").append("No Data Available.");
        }

        $("#divSearchOneToOne").append(" <ul style=\"list-style: none;\">" +
            " <li><b>Listing ID: </b>" + text[0].ListingID + "</li>\n" +
            " <li><b>Location: </b>" + text[0].ListingLocation+ "</li>\n" +
            " <li><b>Deposit: </b>" + text[0].ChargesDeposit+ "</li>\n" +
            " </ul>");
    });
});

$("#searchOneOnManyList").click(function (e) {
    $("#divSearchOneToMany").html("");
    let listingId = e.target.text;
    $.ajax({
        url: "listingOneToMany?lid=" + listingId,
        context: document.body
    }).done(function (results) {

        if(results.length == 0){
            $("#divSearchOneToMany").append("No Data Available.");
        }

        for (let i in  results) {
            $("#divSearchOneToMany").append(" <ul style=\"list-style: none;\">" +
                " <li><b>Listing ID: </b>" + listingId + "</li>\n" +
                " <li><b>Renter ID: </b>" + results[i].UserID + "</li>\n" +
                " <li><b>Location: </b>" + results[i].ListingLocation + "</li>\n" +
                " </ul>"
            );
        }

    });
});


$("#searchManyOnOneList").click(function (e) {
    $("#divSearchManyToOne").html("");
    let listingId = e.target.text;
    $.ajax({
        url: "listingManyToOne?lid=" + e.target.text,
        context: document.body
    }).done(function(results) {


        if(results.length == 0){
            $("#divSearchManyToOne").append("No Data Available.");
        }

        for (let i in  results) {
            $("#divSearchManyToOne").append(" <ul style=\"list-style: none;\">" +
                " <li><b>Listing ID: </b>" + listingId + "</li>\n" +
                " <li><b>Rooms: </b>" + results[i].ListingRooms + "</li>\n" +
                " <li><b>Start Date: </b>" + new Date(results[i].Startdate).toString() + "</li>\n" +
                " <li><b>End Date: </b>" + new Date(results[i].Enddate).toString() + "</li>\n" +
                " </ul>"
            );
        }
    });
});

$("#searchManyToManyData").click(function (e) {
    $("#divSearchManyToMany").html("");

    $.ajax({
        url: "bookingManyToMany",
        context: document.body
    }).done(function(results) {

        if(results.length == 0){
            $("#divSearchManyToMany").append("No Data Available.");
        }
        for (let i in  results) {
            $("#divSearchManyToMany").append(" <ul style=\"list-style: none;\">" +
                " <li><b>Renter ID: </b>" + results[i].RenterID + "</li>\n" +
                " <li><b>Booking ID: </b>" + results[i].BookingID + "</li>\n" +
                " <li><b>Number of Guests: </b>" + results[i].noofguests + "</li>\n" +
                " <li><b>Start Date: </b>" + new Date(results[i].Startdate).toString() + "</li>\n" +
                " <li><b>End Date: </b>" + new Date(results[i].Enddate).toString() + "</li>\n" +
                " </ul>"
            );
        }
    });
});

