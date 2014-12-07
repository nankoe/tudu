// This is a todo list that allows users to:
// - add and save items
// - edit items inline and save items by hitting enter
// - delete itmes
// - clear a list of todo items
// - drag items around to sort them
// - check off items that have been completed



"use strict";

$(function() {
	var today = new Date(); 
    $( "#datepicker" ).datepicker({
    	minDate: today
    });
    $( ".sortable" ).sortable();
    $( ".sortable" ).sortable({ cancel: ".todoTitle, .todoDue"});

  });



(function () {

	var title = $(".item_title").val();
	var save = document.getElementById("hwSave");
	var keyId = parseInt(localStorage.length);


	//incrementing keyId if the largest numbered key in localStorage is equal to or less than the current keyId (so that current items do not get replaced in case the number does not increment)
	for (i = 0; i < localStorage.length; i++) {
		if (keyId < parseInt(localStorage.key(i)) || keyId === parseInt(localStorage.key(i)))  {
			keyId = parseInt(localStorage.key(i)) + 1;
		} 
	}



	//showing add form when clicking "Add Item"
	$(".showForm").click(function () {
		$(".item_form").show();
		$(this).addClass("disable");
	});

	//canceling item form when clicking "Cancel"
	$("#hwCancel").click(function () {
		$(".item_form").hide();
		$(".showForm").removeClass("disable");
		$("#error").hide();
		return false;
	});


	//clearing list
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
		$("#initialList").prepend(localStorage.getItem(localStorage.key(i)));    
	};


	$(".edit").click(function () {

		var title = $(this).next().next().children();
		var date = $(this).next().next().children().first().next();
		if ($(title).attr('contentEditable') == 'true') {
        	$(this).children().removeClass('fa fa-floppy-o fa-lg');
        	$(this).children().addClass('fa fa-pencil-square-o fa-lg');
			if ($(title).text() !== "") {
	        	$(title).blur();
	        	$(title).attr('contentEditable', 'false');
	        	$(title).css('border', 'none');
	        	$(title).effect( 'highlight', {color: '#D7ECCA'}, 1000, callback );
	        	$("#error").hide();
	        } else {
	        	$("#error").show();
	        }

		} else {
	        $(this).children().removeClass('fa fa-pencil-square-o fa-lg');
			$(this).children().addClass('fa fa-floppy-o fa-lg');
			$(title).attr('contentEditable', 'true');
			$(title).css({'border-bottom': '1px solid black', 'padding-bottom': '3px', 'line-height':'21px'});
		}


        
        //find the title content
    	// var oldTitle = localStorage.getItem(localStorage.key(parseInt($(this).parent().parent().attr('id'))));
    	var newKey = $(this).parent().attr('id');
    	var newDate = $(title).next().text();
    	var newTitle = $(title).first().text();
    	var newValue = "<li class='todoItem' id='" + newKey + "'><a class='delete' title='Delete Item'><span class='fa fa-trash fa-lg'></span></a><a class='edit' title='Edit Item'><span class='fa fa-pencil-square-o fa-lg'></span></a><input type='checkbox' class='done'><div class='itemDetails'><span class='todoTitle'>" + newTitle + "</span><span class='todoDue'>" + newDate + "</span></div></li>";
    	
    	localStorage.setItem(newKey, newValue);
    	

        // alert($(oldTitle).find("div span").text());
        // e.preventDefault();


		return false;
	});


	//crossing off items
	$(document).on('click', ".done" , function() {
		var finishItem = $(this).is(":checked");
    	if (finishItem) {
    		$(this).next().css({"text-decoration":"line-through", "font-style":"italic"});
    		$(this).parent().addClass("checked");
    	} else {
    		$(this).next().css({"text-decoration":"none", "font-style":"normal"});
    		$(this).parent().removeClass("checked");
    	}
	});

	//prevent 'enter' from adding a new line in todo item while editing
	//show error is task is empty when user tries to save
	$(document).on('keydown', '.todoTitle', function(e) {  
	    if(e.keyCode == 13) {
	    	e.preventDefault();
	    }
	});



	//show "clear items" button if there are items in the list
	if ($("#initialList li").length > 0) {
		$("#clearStorage").show();
	} else {
		$("#clearStorage").hide();
	}

    function callback() {
      setTimeout(function() {
        $(this).removeAttr( "style" ).hide().fadeIn();
      }, 1000 );
    };

	//deleting an item
	$(document).on('click', '.todoItem .delete', function() {
		if(typeof(Storage) !== "undefined") {
			if (confirm("Are you sure you want to delete item?")) {
				var id = $(this).parent().attr('id');
				localStorage.removeItem(id);
				$(this).parent().remove();
				keyId = parseInt(keyId) + 1;
				location.reload(); 
			} else {
				return false;
			}
		} else {
			$(".title").val("Sorry! No Web Storage support..");
		    return false;
		};
	});

	// adding item
	function addTodo(event) {
		event.preventDefault();
		if(typeof(Storage) !== "undefined") {
				var value = $(".item_title").val();

				for (i = 0; i < localStorage.length; i++) {
					if (keyId < localStorage.key(i) || keyId === parseInt(localStorage.key(i)))  {
						keyId = parseInt(localStorage.key(i)) + 1;
					} 
				}
				if (value !== "") {
					$("#error").hide();
					var date;
					if ($("#datepicker").val() == "") {	
						date = ""
					} else {
						date = "Due " + $("#datepicker").val();
					}

					
					var listItem = "<li class='todoItem' id='" + keyId + "'><a class='delete' title='Delete Item'><span class='fa fa-trash fa-lg'></span></a><a class='edit' title='Edit Item'><span class='fa fa-pencil-square-o fa-lg'></span></a><input type='checkbox' class='done'><div class='itemDetails'><span class='todoTitle'>" + value + "</span><span class='todoDue'>" + date + "</span></div></li>";

					

					localStorage.setItem(keyId, listItem);
					$("#initialList").prepend(localStorage.getItem(keyId));
					$(".item_form").hide();
					$(".showForm").removeClass("disable");
					$("form")[0].reset();
					keyId = parseInt(keyId)+ 1;
					location.reload(); 
					return false;
				} else {
					$("#error").show();
					return false;
				}
				return false
		} else {
		    $("#error").val("Sorry! No Web Storage support..");
		    return false;
		};

	}

})();