$(document).on('click', ".dropdown-menu li a", function() {
    var selText = $(this).text();
    $(this).parents('.dropdown').find('.dropdown-toggle').html(selText + ' <span class="caret"></span>');
    $(".default_option").remove();
    $(".dropdown-menu").prepend("<li class='default_option'><a>Select</a></li>");
});

$(document).on('click', '.dropdown-menu li a', function (e) {
    $("#deleteVal").html("");
    $("#deleteVal").append($(this).text());

});

$(document).ready(function () {
    clearAndPopulateLists();
});

function clearAndPopulateLists() {
    $("#userList").html("");
    $("#accountList").html("");
    $("#renterList").html("");
    $("#renteeList").html("");
    $("#listingList").html("");
    $("#bookingList").html("");

    populateData("userIds","userList", "uid");
    populateData("accountIds","accountList", "aid");
    populateData("renterIds","renterList", "renterId");
    populateData("renteeIds","renteeList", "renteeId");
    populateData("listingIds","listingList", "lid");
    populateData("bookingIds","bookingList", "bid");

}

function populateData(url, elem, val){
    $.ajax({
        url: url,
        context: document.body
    }).done(function(data) {
        for(let i in data){
            console.log(data[i][val]);
            $("#"+elem).append("<li><a href=\"#\">"+data[i][val]+"</a></li>" );

        }
    });
}


$("#deleteUser").click(function (e) {
    sendRequest("deleteUser?uid="+$("#deleteVal").html(),"divUser");
});

$("#deleteAccount").click(function (e) {
    sendRequest("deleteAccount?aid="+$("#deleteVal").html(),"divAccount");
});

$("#deleteRenter").click(function (e) {
    sendRequest("deleteRenter?renterId="+$("#deleteVal").html(),"divRenter");
});

$("#deleteBooking").click(function (e) {
    sendRequest("deleteBooking?bid="+$("#deleteVal").html(),"divBooking");
});

$("#deleteRentee").click(function (e) {
    sendRequest("deleteRentee?renteeId="+$("#deleteVal").html(),"divRentee");
});

$("#deleteListing").click(function (e) {
    sendRequest("deleteListing?lid="+$("#deleteVal").html(),"divListing");
});


function sendRequest(url, elem) {
    $.ajax({
        url: url,
        context: document.body
    }).done(function(text) {
        $("#"+elem).html("");
        $("#"+elem).append(text);
        clearAndPopulateLists();
    });
}