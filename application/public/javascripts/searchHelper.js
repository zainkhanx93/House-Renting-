$("#searchOneOnOneList").click(function (e) {
    $("#divCharge").html("");
    $.ajax({
        url: "getChargeByListing?lid=" + e.target.text,
        context: document.body
    }).done(function(text) {

        $("#divCharge").append(text);
    });


});
