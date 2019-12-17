    $('#insertUser').click(function (e) {
        let name = $("#name").val();
        let dob = $("#DOB").val();
        let email = $("#email1").val();
        let contactno = $("#contactno").val();


        $.ajax({
            url: "/user",
            type: 'POST',
            data: {name: name, email: email, dob: dob, contactno: contactno},
            dateType: 'json'
        }).done(function (text) {
            alert(text);
        });
    });



	$('#insertAccount').click(function(e){

            let username = $("#username1").val();
            let password = $("#password").val();
            let uid = $("#uid").val();

			$.ajax({
			url  : "/account",
			type : 'POST',
			data : {username : username, password : password, uid : uid},
			dateType: 'json'

		}).done(function (text) {
                alert(text);
        });
	})

	$('#insertListing').click(function(e){

	    let locations = $("#location").val();
        let type = $("#type").val();
        let rooms = $("#rooms").val();
        let renterId = $("#renterid").val();
        let parking = $("#parking2").val();
        let wifi = $("#wifi").val();
        let ac = $("#ac").val();
        let pool = $("#pool2").val();
        let perday = $("#perday").val();
        let deposit = $("#deposit").val();
        let cleaning = $("#cleaning").val();

        $.ajax({
            url: "/listing",
            type: 'POST',
            data: {location: locations, type: type, rooms: rooms, renterId: renterId, parking: parking,
                wifi: wifi, ac: ac, pool: pool, perday: perday, deposit: deposit, cleaning: cleaning},
            dateType: 'json'
        }).
        done(function (text) {
            alert(text);
        });
	})



	$('#insertBooking').click(function(e){

        let renteeId = $("#renteeid").val();
        let startDate = $("#startDate1").val();
        let enddate = $("#endDate").val();
        let numofguest = $("#numofguest").val();
        let lid = $("#lid").val();

			$.ajax({
			url  : "/booking",
			type : 'POST',
			data : {renteeId : renteeId, startdate : startDate, enddate : enddate, noofguests : numofguest, lid:lid},
			dateType: 'json'
		}).
        done(function (text) {
            alert(text);
        });
	})

