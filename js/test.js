"use strict";

$(function() {
    $( "#datepicker" ).datepicker();
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
  });



(function () {
	var title = $(".item_title").val();
	var save = document.getElementById("hwSave");
	var edit = document.getElementById("edit");
	var keyId = localStorage.length + 1;


	// for (i = 0; i < localStorage.length; i++) {
	// 	if (keyId < localStorage.key(i)) {
	// 		keyId = localStorage.key(i);
	// 	}
	// }


	//showing add form
	$(".showForm").click(function () {
		$(".item_form").show();
		$(this).addClass("disable");
	});

	//canceling item form
	$("#hwCancel").click(function () {
		$(".item_form").hide();
		$(".showForm").removeClass("disable");
		$("#error").hide();
		return false;
	});
	

	$("#clearStorage").click(function () {
		if (confirm("Are you sure you want to clear items?")) {
			localStorage.clear();
			location.reload(); 
		} else {
			return false;
		}
		
	});

	//adding/saving a new item
	save.addEventListener("click", addTodo, false);

	for (var i = 0; i < keyId; i++){
		$("#sortable").prepend(localStorage.getItem(localStorage.key(i)));    
	};


	//change style 
	$(document).on('click', ".done" , function() {
		var finishItem = $(this).is(":checked");
    	if (finishItem) {
    		$(this).next().css({"text-decoration":"line-through", "font-style":"italic"});
    	} else {
    		$(this).next().css({"text-decoration":"none", "font-style":"normal"});
    	}
	});

	//prevent 'enter' from adding a new line in todo item
	$(document).on('keydown', '.todoTitle', function(e) {  
	    if(e.keyCode == 13) {
	        e.preventDefault();
	    }
	});

	//deleting an item
	$(document).on('click', '.todoItem a .delete', function() {
		if (confirm("Are you sure you want to delete item?")) {
			var id = $(this).parent().parent().attr('id');
			localStorage.removeItem(id);
			$(this).parent().parent().remove();
			keyId = parseInt(keyId) + 1;
		} else {
			return false;
		}
	});

	// adding item
	function addTodo(event) {
		event.preventDefault();
		if(typeof(Storage) !== "undefined") {
				var value = $(".item_title").val();
				// var item;
				if (value !== "") {
					$("#error").hide();
					var date;
					if ($("#datepicker").val() == "") {	
						date = ""
					} else {
						date = "Due " + $("#datepicker").val();
					}

					
					var listItem = "<li class='todoItem' id='" + keyId + "'><a><span class='fa fa-trash fa-lg delete'></span></a><input type='checkbox' class='done'><div class='itemDetails'><span class='todoTitle' contenteditable='true'>" + value + "</span><span class='todoDue'>" + date + "</span></div></li>"

					
					

					localStorage.setItem(keyId, listItem);
					$("#sortable").prepend(localStorage.getItem(keyId));
					$(".item_form").hide();
					$(".showForm").removeClass("disable");
					$("form")[0].reset();
					keyId = parseInt(keyId)+ 1;
					return false;
				} else {
					$("#error").show();
					return false;
				}
				return false
		} else {
		    $(".title").val("Sorry! No Web Storage support..");
		    return false;
		};

	}


})();