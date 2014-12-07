"use strict";

//draws square
var TodoItem = function(title) {
    this.title = title;

    this.addItem = function(title) {
        if(typeof(Storage) !== "undefined") {
            if (title !== "") {
                var date;
                if ($("#datepicker").val() == "") { 
                    date = ""
                } else {
                    date = ", due " + $("#datepicker").val();
                }
                var todo = $(title).prepend("<li class='todoItem'><span class='done'><input type='checkbox'></span>").append(date + ("</li>"));
 
                localStorage.setItem("item", todo);

                localStorage.getItem('item');


                return false;
            } else {
                $("#error").append("<span>Please enter a task or hit cancel.</span>");
                return false;
            }
        } else {
            $(".title").val("Sorry! No Web Storage support..");
        };
        return false;
    }

    return this.TodoItem;
};



