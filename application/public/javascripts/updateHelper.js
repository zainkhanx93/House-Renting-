//ONE TO ONE, LISTING, AMENTITES
//ONE TO MANY, USER, ACCOUNT
//MANY TO ONE, LISTING, BOOKING
//MANY TO MANY, RENTEE_BOOKING, BOOKING

$(document).ready(function () {
    $("#updateListingOneToOne").html("");
    $("#updateOneToMany").html("");
    $("#updateManyToOne").html("");
    $("#updateManyToMany").html("");

    $.ajax({
        url: url,
        context: document.body
    }).done(function(data) {

        for(let i in data){
            $("#updateListingOneToOne").append("<li><a href=\"#\">"+data[i].lid+"</a></li>" );
            $("#updateOneToMany").append("<li><a href=\"#\">"+data[i].lid+"</a></li>" );
            $("#updateManyToOne").append("<li><a href=\"#\">"+data[i].lid+"</a></li>" );
            $("#updateManyToMany").append("<li><a href=\"#\">"+data[i].lid+"</a></li>" );
        }
    });
});

$("#updateListingOneToOne").click(function (e) {
    $("#divUpdateOneToOne").html("");
    $.ajax({
        url: "updateListingOneToOne?lid=" + e.target.text,
        context: document.body
    }).done(function(text) {

        if(text.length == 0){
            $("#divUpdateOneToOne").append("No Data Available.");
        }

        $("#divUpdateOneToOne").append(" <ul style=\"list-style: none;\">" +
            " <li><b>Listing: </b>" + text[0].ListingID + "</li>\n" +
            " <li><b>Amentities: </b>" + text[0].ListingLocation+ "</li>\n" +
            " <li><b>Deposit: </b>" + text[0].ChargesDeposit+ "</li>\n" +
            " </ul>");
    });
});

$("#updateListingOneToMany").click(function (e) {
    $("#divUpdateOneToMany").html("");
    let listingId = e.target.text;
    $.ajax({
        url: "updateListingOneToMany?lid=" + listingId,
        context: document.body
    }).done(function (results) {

        if(results.length == 0){
            $("#divUpdateOneToMany").append("No Data Available.");
        }
        for (let i in  results) {
            $("#divUpdateOneToMany").append(" <ul style=\"list-style: none;\">" +
                " <li><b>User: </b>" + username.UserID + "</li>\n" +
                " <li><b>Account: </b>" + results[i].UserID + "</li>\n" +
                " <li><b>Location: </b>" + results[i].ListingLocation + "</li>\n" +
                " </ul>"
            );
        }
    });
});

$("#updateListingManyToMany").click(function (e) {
    $("#divUpdateManyToMany").html("");

    $.ajax({
        url: "updateListingManyToMany",
        context: document.body
    }).done(function(results) {

        if(results.length == 0){
            $("#divUpdateManyToMany").append("No Data Available.");
        }
        for (let i in results) {
            $("#divUpdateManyToMany").append(" <ul style=\"list-style: none;\">" +
                " <li><b>Renter Booking: </b>" + results[i].RenterID + "</li>\n" +
                " <li><b>Start Date: </b>" + new Date(results[i].Startdate).toString() + "</li>\n" +
                " <li><b>End Date: </b>" + new Date(results[i].Enddate).toString() + "</li>\n" +
                " <li><b>Number of Guests: </b>" + results[i].noofguests + "</li>\n" +
                " </ul>"
            );
        }
    });
});

$("#updateListingManyToOne").click(function (e) {
    $("#divUpdateManyToOne").html("");
    let listingId = e.target.text;
    $.ajax({
        url: "updateListingManyToOne?lid=" + e.target.text,
        context: document.body
    }).done(function(results) {

        if(results.length == 0){
            $("#divUpdateManyToOne").append("No Data Available.");
        }

        for (let i in  results) {
            $("#divUpdateManyToOne").append(" <ul style=\"list-style: none;\">" +
                " <li><b>Listing ID: </b>" + listingId + "</li>\n" +
                " <li><b>Start Date: </b>" + new Date(results[i].Startdate).toString() + "</li>\n" +
                " <li><b>End Date: </b>" + new Date(results[i].Enddate).toString() + "</li>\n" +
                " <li><b>Number of Guests: </b>" + results[i].noofguests + "</li>\n" +
                " </ul>"
            );
        }
    });
});


