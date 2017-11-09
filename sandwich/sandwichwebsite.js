$(document).ready(function(){
	$('.tabs li').click(function(){
		$(this).addClass('current');
	});
	
	$('.adminTabs li').click(function(){
		$(this).addClass('current');
	});

	$("#submit").click(function(){
	var usernameCheck = document.getElementById("username").value;
	//alert(usernameCheck);
	var passwordCheck = document.getElementById("password").value;
	//alert(passwordCheck);
	var adminCheck ='';
	var userCheck = '';
	
	var userBool = false;
	//check if user exists
	$.ajax({
		url: "checkForUser.php?q="+usernameCheck+"&g="+passwordCheck,
		type: "GET",
		success: function(text){
			userCheck = text;

			if(userCheck.length == 0) {
			alert("That user/password combination does not match our records");
			} 
			if(userCheck =='Y') {
			getConferencesForAdmin();
			$("#login").hide();
			$("#register").hide();
			$("#adminSelectionTabs").show();
			$("#admin-tab-1").addClass('current');
			$('.adminTabs li:first-child').addClass('current');			
			}
			else if (userCheck =='N') {
			getConferences();
			getCurrentOrder();
			$("#login").hide();
			$("#register").hide();
			$("#userSelectionTabs").show();
			$("#tab-1").addClass('current');
			$('.tabs li:first-child').addClass('current');
			var response = '';

			$.ajax({
		
			url: "choices.php?q="+usernameCheck,
			type: "GET",
			success: function(text){
			response = text;
			document.getElementById("choicesResponse").innerHTML=response;
			},
			error:function(xhr){
				alert("An error occured: " + xhr.status + " " + xhr.statusText);
			},
			complete: function( xhr, status ) {
			}
			});
			}
			},
			error:function(xhr){
				alert("An error occured: " + xhr.status + " " + xhr.statusText);
			},
			complete: function( xhr, status ) {
			}
		});
	
	});
	
	$("#newUser").click(function(){
	$("#login").hide();
	$("#register").show();
	$("#userSelectionTabs").hide();
	});
	
	$("#buttonTableConferenceAdd").click(function() {
		var newConferenceName = "'" + document.getElementById("newConferenceName").value + "'";
		var newConferenceLocation = "'" + document.getElementById("newConferenceLocation").value + "'";
		var newConferenceDate = "'" + document.getElementById("newConferenceDate").value + "'";

		$.ajax({
			url: "addConference.php?q="+newConferenceName+ "&l=" +newConferenceLocation+ "&d=" +newConferenceDate,
			type: "GET",
			success: function(text){
			getConferencesForAdmin();
			}
		})
	})
	
	$("#persistNewUser").click(function(){
	//persist data somehow
	//however, check if user exists
	//check password strength
	var passwordCheck = document.getElementById("passwordForm").value;
	var fNameCheck = document.getElementById("firstnameForm").value;
	var lNameCheck = document.getElementById("lastnameForm").value;
	var userCheck = document.getElementById("userNameForm").value;
	var emailCheck = document.getElementById("emailForm").value;
	
	var formComplete = true;
	var registeredUserExists = false;
	
	if(fNameCheck.length == 0) {
		formComplete = false;
	}
	else if(lNameCheck.length == 0) {
		formComplete = false;
	}
	else if(userCheck.length == 0) {
		formComplete = false;
	}
	else if(emailCheck.length == 0) {
		formComplete = false;
	}
	
	var validated =  true;
    if(passwordCheck.length < 8) {
    validated = false;
	}
	if(!/\d/.test(passwordCheck)) {
    validated = false;
	}
    if(!/[a-z]/.test(passwordCheck)) {
    validated = false;
	}
    if(!/[A-Z]/.test(passwordCheck)) {
    validated = false;
	}
    if(/[^0-9a-zA-Z]/.test(passwordCheck)) {
    validated = false;
	}
	
	var response = '';
	$.ajax({
		url: "checkRegisteredUser.php?q="+userCheck,
		type: "GET",
		success: function(text){
			response = text;
			if(response == 'N') {
			registeredUserExists = true;
			} else if (response == 'Y') {
			registeredUserExists = true;
			} else { 
			}
			
			if (validated && formComplete && registeredUserExists == false) {
			var response = '';
			var passwordCheck = document.getElementById("passwordForm");
			var fNameCheck = document.getElementById("firstnameForm");
			var lNameCheck = document.getElementById("lastnameForm");
			var userCheck = document.getElementById("userNameForm");
			var emailCheck = document.getElementById("emailForm");
			$.ajax({
			url: "persistThisUser.php?l="+lNameCheck.value+"&f="+fNameCheck.value+"&u="+userCheck.value+"&p="+passwordCheck.value+"&e="+emailCheck.value,
			type: "GET",
			success: function(text){
				response = text;
				alert(response);
				},
				error:function(xhr){
					alert("An error occured: " + xhr.status + " " + xhr.statusText);
				},
				complete: function( xhr, status ) {
				}
			});	
			$("#login").show();
			$("#register").hide();
			$("#userSelectionTabs").hide();
			
			passwordCheck.value = '';
			lNameCheck.value = '';
			fNameCheck.value = '';
			userCheck.value = '';
			emailCheck.value = '';
			} else if(!formComplete) {
			alert("You must complete the form in its entirety to register");	
			}
			else if (!validated){
			alert("Your password must contain a mix of lowercase, uppercase, numbers, 8 in length");
			} else if(registeredUserExists == true) { 
			alert("That username already exists!");
			} else {
			alert("Try again!");
			}
			},
			error:function(xhr){
				alert("An error occured: " + xhr.status + " " + xhr.statusText);
			},
			complete: function( xhr, status ) {
			}
		});
	});
	
	$("#cancelNewUser").click(function(){
	alert("Cancelled registration");
	$("#login").show();
	$("#register").hide();
	$("#userSelectionTabs").hide();
	var passwordCheck = document.getElementById("passwordForm");
	var fNameCheck = document.getElementById("firstnameForm");
	var lNameCheck = document.getElementById("lastnameForm");
	var userCheck = document.getElementById("userNameForm");
	var emailCheck = document.getElementById("emailForm");

	passwordCheck.value = '';
	lNameCheck.value = '';
	fNameCheck.value = '';
	userCheck.value = '';
	emailCheck.value = '';
	});
	
	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');
		
		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	});
	
	$('ul.adminTabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.adminTabs li').removeClass('current');
		$('.tab-content').removeClass('current');
		
		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	});
	
	$(".logout").click(function(){
	$("#login").show();
	$("#register").hide();
	$("#adminSelectionTabs").hide();
	$('ul.tabs li').removeClass('current');
	$('ul.adminTabs li').removeClass('current');
	$("#userSelectionTabs").hide();
	$("#userOrderList").hide();
	$("#ordersResponse").show();
	var passwordCheck = document.getElementById("password");
	var username = document.getElementById("username");
	
	username.value='';
	passwordCheck.value='';
	});
		 
	 
	 $("#cancelSandwiches").click(function() {
	 alert("Cancelled sandwich selection");
	 var searchConf = document.getElementById("searchConfName");
	 var searchLoc = document.getElementById("searchLocation");
	 getConferences();
	 searchConf.value ='';
	 searchLoc.value='';
	 $("#login").hide();
	 $("#register").hide();
	 $("#userSelectionTabs").show();
	 $("#tab-1").addClass('current');
	 $("#userOrderList").hide();
	 $('.tabs li:first-child').addClass('current');
	 $("#conferenceSandwichList").hide();
	 });
	 
	 $("#cancelChangeOrder").click(function() {
			$("#ordersResponse").show();
			$("#userOrderList").hide();
	});
	 
	  $("#cancelSandwichesEdit").click(function() {
	 $("#login").hide();
	 $("#register").hide();
	 $("#adminSelectionTabs").show();
	 $("#admin-tab-1").addClass('current');
	 $("#conferenceSandwichListEdit").hide();
	 });
	 
	 $("#search").click(function() {
	 
	 var searchConf = document.getElementById("searchConfName").value;
	 var searchLoc = document.getElementById("searchLocation").value;
	 
	 if(searchConf.length == 0 && searchLoc.length == 0) {
		getConferences();
	 } else if (searchConf.length == 0 && searchLoc.length > 0) {
	 $.ajax({
		url: "searchLocation.php?q="+searchLoc,
		type: "GET",
		success: function(text){
			response = text;
			document.getElementById("conferenceResponse").innerHTML=response;
			},
			error:function(xhr){
				alert("An error occured: " + xhr.status + " " + xhr.statusText);
			},
			complete: function( xhr, status ) {
			}
		});
	 } else if (searchConf.length > 0 && searchLoc.length == 0) { 
	  $.ajax({
		url: "searchConference.php?q="+searchConf,
		type: "GET",
		success: function(text){
			response = text;
			document.getElementById("conferenceResponse").innerHTML=response;
			},
			error:function(xhr){
				alert("An error occured: " + xhr.status + " " + xhr.statusText);
			},
			complete: function( xhr, status ) {
			}
		});
	 } else {
	 $.ajax({
		url: "searchCombo.php?c="+searchConf+"&l="+searchLoc,
		type: "GET",
		success: function(text){
			response = text;
			document.getElementById("conferenceResponse").innerHTML=response;
			},
			error:function(xhr){
				alert("An error occured: " + xhr.status + " " + xhr.statusText);
			},
			complete: function( xhr, status ) {
			}
		});
	 }
	 
	 $("#login").hide();
	 $("#register").hide();
	 $("#userSelectionTabs").show();
	 $("#tab-1").addClass('current');
	 $('.tabs li:first-child').addClass('current');
	 $("#conferenceSandwichList").hide();
	 });
	 
});

function getConferences() {
var response = '';
$.ajax({
		url: "conferences.php",
		type: "GET",
		success: function(text){
			response = text;
			document.getElementById("conferenceResponse").innerHTML=response;
			},
			error:function(xhr){
				alert("An error occured: " + xhr.status + " " + xhr.statusText);
			},
			complete: function( xhr, status ) {
			}
		});
};

function getConferencesForAdmin() {
var response = '';
$.ajax({
		url: "conferencesAdmin.php",
		type: "GET",
		success: function(text){
			response = text;
			document.getElementById("conferenceResponseAdmin").innerHTML=response;
			},
			error:function(xhr){
				alert("An error occured: " + xhr.status + " " + xhr.statusText);
			},
			complete: function( xhr, status ) {
			}
		});
};

function getConferenceSandwiches(id) {
var response = '';
$.ajax({
		url: "conferencesandwich.php?q="+id,
		type: "GET",
		success: function(text){
			response = text;
			document.getElementById("sandwichconferenceResponse").innerHTML=response;
			$("#login").hide();
			$("#register").hide();
			$("#userSelectionTabs").hide();
			$('ul.tabs li').removeClass('current');
			$('.tab-content').removeClass('current');
			$("#conferenceSandwichList").show();
			},
			error:function(xhr){
				alert("An error occured: " + xhr.status + " " + xhr.statusText);
			},
			complete: function( xhr, status ) {
			}
		});
};

function editConference(id) {
var response = '';
$.ajax({
		url: "editConference.php?q="+id,
		type: "GET",
		success: function(text){
			response = text;
			document.getElementById("sandwichconferenceResponseAdmin").innerHTML=response;
			$("#login").hide();
			$("#register").hide();
			$("#adminSelectionTabs").hide();
			$('ul.adminTabs li').removeClass('current');
			$('.tab-content').removeClass('current');
			$("#conferenceSandwichListEdit").show();
			},
			error:function(xhr){
				alert("An error occured: " + xhr.status + " " + xhr.statusText);
			},
			complete: function( xhr, status ) {
			}
		});
};

function removeSandwich(confid, sandid){
var response = '';
var deleteResponse = '';

$.ajax({
		url: "removeSandwich.php?q="+response+ "&c=" +confid+ "&s=" +sandid, 
		type: "GET",
		success: function(text){
			deleteResponse = text;
			editConference(confid);
		}
	});
};		

function deleteConference(id){
var response = '';
var deleteConferenceResponse = '';
$.ajax({
		url: "deleteConference.php?q="+id, 
		type: "GET",
		success: function(text){
			deleteConferenceResponse = text;
			getConferencesForAdmin();
		}
	});
};		

function addSandwich(con, san){
var response = '';
var addResponse = '';
$.ajax({
		url: "addSandwich.php?q="+response+ "&c=" +con+ "&s=" +san, 
		type: "GET",
		success: function(text){
			addResponse = text;
			editConference(con);
		}
	});
};	

function persistSandwichChoice(confid, sandwichID) {
var username = document.getElementById("username");
var response = '';
var sandwichResponse = '';
$.ajax({
		//get user id to persist selection
		url: "getUser.php?q="+username.value,
		type: "GET",
		success: function(text){
			response = text;
			$.ajax({
			url: "persistThisSandwichUserSelection.php?q="+response+"&s="+sandwichID+"&c="+confid,
			type: "GET",
			success: function(text){
				sandwichResponse = text;
				alert(sandwichResponse);
				$("#login").hide();
				$("#register").hide();
				$("#userSelectionTabs").show();
				$("#tab-1").addClass('current');
				$('.tabs li:first-child').addClass('current');
				var response = '';
				getCurrentOrder();
				$.ajax({
			
				url: "choices.php?q="+username.value,
				type: "GET",
				success: function(text){
				response = text;
				document.getElementById("choicesResponse").innerHTML=response;
				$("#conferenceSandwichList").hide();
				var searchConf = document.getElementById("searchConfName");
				 var searchLoc = document.getElementById("searchLocation");
				 getConferences();
				 searchConf.value ='';
				 searchLoc.value='';
				},
				error:function(xhr){
					alert("An error occured: " + xhr.status + " " + xhr.statusText);
				},
				complete: function( xhr, status ) {
				}
				});
				},
				error:function(xhr){
					alert("An error occured: " + xhr.status + " " + xhr.statusText);
				},
				complete: function( xhr, status ) {
				}
			});
			},
			error:function(xhr){
				alert("An error occured: " + xhr.status + " " + xhr.statusText);
			},
			complete: function( xhr, status ) {
			}
		});
};

function getCurrentOrder() {
var username = document.getElementById("username").value;
var response = '';

$.ajax({
		url: "currentConfOrder.php?q="+username,
		type: "GET",
		success: function(text){
			response = text;
			document.getElementById("ordersResponse").innerHTML=response;
			},
			error:function(xhr){
				alert("An error occured: " + xhr.status + " " + xhr.statusText);
			},
			complete: function( xhr, status ) {
			}
		});

};

function getCurrentSandOrder(confid) {
var user = document.getElementById("username").value;
var response = '';

$.ajax({
		url: "currentSandOrder.php?q="+user+"&f="+confid,
		type: "GET",
		success: function(text){
			response = text;
			$("#ordersResponse").hide();
			$("#userOrderList").show();
			document.getElementById("userOrderResponse").innerHTML=response;
			},
			error:function(xhr){
				alert("An error occured: " + xhr.status + " " + xhr.statusText);
			},
			complete: function( xhr, status ) {
			}
		});
};

function editCurrentSandwichOrder(element) {

	var id =$(element).data('conferenceid');
		
	$("#userOrderList").hide();
	$("#ordersResponse").show();
	getConferenceSandwiches(id);
	
};