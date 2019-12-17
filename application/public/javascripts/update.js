
$("#updateOneToOneDD").click(function (e) {
    let pool = $("#pool").val();
    let parking = $("#parking").val();
    let lid  = $("#updateVal").html();
    $.ajax({
        url: "updateListingOneToOne?lid=" + lid+"&pool="+pool+"&parking="+parking,
        context: document.body
    }).done(function(text) {
        $("#divUpdateOneToOne").append(text);
    });
});
$(document).on('click', '.dropdown-menu li a', function (e) {
    $("#updateVal").html("");
    $("#updateVal").append($(this).text());
});

$("#updateOneToManyDD").click(function (e) {
    let email = $("#email").val();
    let username = $("#username").val();
    let name = $("#updateVal").html();
    $.ajax({
        url: "updateListingOneToMany?name="+name+"&email="+email+"&username="+username,
        context: document.body
    }).done(function(text) {
        $("#divUpdateOneToMany").append(text);
    });
});
$(document).on('click', '.dropdown-menu li a', function (e) {
    $("#updateVal").html("");
    $("#updateVal").append($(this).text());
});

$("#updateManyToOneDD").click(function (e) {
    let noofguests = $("#noofguests").val();
    let lid = $("#updateVal").html();
    $.ajax({
        url: "updateListingManyToOne?lid="+lid+"&noofguests="+noofguests,
        context: document.body
    }).done(function(text) {
        $("#divUpdateManyToOne").append(text);
    });
});
$(document).on('click', '.dropdown-menu li a', function (e) {
    $("#updateVal").html("");
    $("#updateVal").append($(this).text());
});

$("#updateManyToManyDD").click(function (e) {
    let noofguests = $("#noofguests").val();
    let startdate = $("#startdate").val();
    let renteeId = $("#updateVal").html();
    $.ajax({
        url: "updateListingManyToMany?renteeId="+renteeId+"&startdate"+startdate+"&noofguests="+noofguests,
        context: document.body
    }).done(function(text) {
        $("#divUpdateManyToMany").append(text);
    });
});
$(document).on('click', '.dropdown-menu li a', function (e) {
    $("#updateVal").html("");
    $("#updateVal").append($(this).text());
});