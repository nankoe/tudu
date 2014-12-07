
"use strict";
(function () {
    /*
     * This is the class defintion for the TodoList object.
     */
    var TodoList = (function () {
        /*
         * A reference to the list that the TodoList will be operating on.
         */
        var list = null;
        
        /*
         * This will be the actual list of todo items managed by the
         * TodoList.
         */
        var todo = [];
        
        /*
         * This is the constructor function for todo lists. All it does is
         * intiallize the log property to false. If you want to see the 
         * TodoList log messages to the console when its methods get called
         * then set dl.log = true;
         */
        function TodoList() {
            this.log = true;
        }
  
        /*
         * This function is used to setup the TodoList. it must be called 
         * before any of the other functions will work.
         * 
         * TodoList needs to know about the canvas they are operating on and
         * I didn't want to design it assuming the canvas would have a partiuclar
         * id so it must be provided. All of the TodoList's other functions
         * will log errors if setup is not called first.
         */
        TodoList.prototype.setup = function(group) {
            list = group;
            if(this.log) {
               console.log("The todo list is setup.");
            }
        };
        
        /*
         * This function adds a graphical object to the DisplayList and then
         * redraws the whole list.
         * 
         * The DisplayList assumes that all graphical objects have the 4 
         * required funntions - draw(), contains(), moveTo(), and setSize() -
         * defined.If you add an object without those 4 functions this function 
         * will log a warnings to the console for each undefined method.
         */
        TodoList.prototype.addTodoItem = function (item) {
            if(this.log) {
                console.log("addTodoItem()");
            }    
            if(list) {
                // checkObject(go);
                todo.push(item);
                this.redraw();
            }
            else {
                notSetup("addGraphicalObject");
            }
        };
        
        
        /*
         * This function searches through the list of graphical objects for
         * an object containing the point (x,y). If no object is found it will
         * return null. This function searches the list in reverse order from 
         * redraw, so it will return the first object on top of others, as if 
         * they were physically stacked.
         * 
         * This function works by going through each graphical object and 
         * calling their respective contains() functions. If it encounters an 
         * object without a contains() function it will log an error to the 
         * console.
         */
        TodoList.prototype.editTodoItem = function (x,y) {
            if(this.log) {
                console.log("getObjectContaining()");
            }
            if(can) {
                for (var i = dl.length-1; i >= 0; i--) {
                    if(dl[i].contains){
                        if(dl[i].contains(x,y)){
                            if(this.log)console.log("\t found object:"+dl[i].prototype);
                            return dl[i];
                        }
                    }
                    else {
                        console.error("An object in the display list does not have a constains() function.");
                    }
                }
            }
            else {
                notSetup("getObjectContaining");
            }
            if(this.log) console.log("\tno contianing object found.");
            return null;
        };
        
        /*
         * This function is used to remove a graphical object from the 
         * DisplayList and returns the object if it was successfuly removed
         * otherwise it returns null. It also calls redraw() after the 
         * object has been removed.
         */
        TodoList.prototype.removeTodoItem = function(item) {
            if(this.log) {
                console.log("removeGraphicalObject()");
            }
            var dex = dl.indexOf(item);
            if(dex >= 0) {
                var ret = dl.splice(dex,1)[0];
                console.log("\tobject found:"+ret.prototype);
                this.redraw();
                return ret;
            }
            else {
                if(this.log) {
                    console.log("\tobject not found in list.");
                }
                return null;
            }
        };
        
         /*
         * This function checks that a graphical object defines all of the 
         * required functions to be used in the display list and logs warnings
         * for the functions that are missing.
         */
        function checkObject(item) {
            if(!(item.add)){
                console.warn("A graphical object is being added without a add function. This object will not work correctly in the TodoList!");
            }
            // if(!(item.contains)) {
            //     console.warn("A graphical object is being added without a remove function. This object will not work correctly in the TodoList!");
            // }
            // if(!(item.edit)) {
            //     console.warn("A graphical object is being added without a edit function. This object will not work correctly in the TodoList!");
            // }
            // if(!(item.finish)) {
            //     console.warn("A graphical object is being added without a finish function. This object will not work correctly in the TodoList!");
            // }
        }
        
        /*
         * This function just logs an error to the console if the DisplayList
         * is not setup correctly. I only included it to not have to write the
         * error message more than once.
         */
        function notSetup(functionName) {
            console.error("The display list hasn't been setup yet. You need to call the setup() function before you call "+functionName+"()!");
        }
        
        /*
         * This completes the class defintion by returning the function 
         * DisplayList.
         */
        return TodoList;
    })();
    
    /*
     * This creates a new DisplayList and sets it to the global variable
     * dl. This allows you to access the display list from any other script as
     * a global variable.
     */
    window.todo = new TodoList();
})();