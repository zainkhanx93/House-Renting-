



	$('#userInsert').click(function(e){
		$.ajax({
			url  : "/user";
			type : 'POST';
			data : (name : name, email : email, dob : dob, contactno : contactno);
			dateType: 'json',
			success :  function(response)
			{
				alert(response)
			}
			
		})
	})



	$('#accountInsert').click(function(e){
			$.ajax({
			url  : "/account";
			type : 'POST';
			data : (username : username, password : password, uid : uid);
			dateType: 'json',
			success :  function(response)
			{
				alert(response)
			}
			
			
		})
	})

	$('#listingInsert').click(function(e){
			$.ajax({
			url  : "/listing",
			type : 'POST',
			data : (locations : locations, type : type, rooms : rooms, renterId : renterId, parking : parking, wifi : wifi, ac : ac, pool : pool, perday : perday, deposit : deposit, cleaning : cleaning);
			dateType: 'json',
			success :  function(response)
			{
				alert(response)
			}
			
		})
	})



	$('#bookingInsert').click(function(e){
			$.ajax({
			url  : "/booking";
			type : 'POST';
			data : (username : username, password : password, uid : uid);
			dateType: 'json',
			success :  function(response)
			{
				alert(response)
			}
			
		})
	})

