
// Regular javascript function
function regularFunction(){
    console.log("regular javascript function")
}
regularFunction()



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// NextGen Javascript functionality
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// let and const
//
console.log("*** let and const ***")

// Standard Javascript variable
var regular_javascript_variable = 67;

// New syntax but like var
let same_as_var = 67;

// as it names suggested, constant
const could_not_be_changed = 67;




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Arrow Functions
//
console.log("\n*** Arrow Functions ***")

const printMyName = (name) => {
    console.log(name)
};
printMyName('Max');

// With a return value
const squared = (number) => {
    return Math.pow(number, 2);
};
console.log(squared(could_not_be_changed));

// concise version
// if one parameter -> no () required
// just return something -> no return keyword required
const squared_short = number => Math.pow(number, 2);
console.log(squared_short(same_as_var));




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Export and Import (between files)
//
// Need to compile the code with Babel first. You can run the compiler in command line, or make transpiling
// a part of your build process (using Gulp, Grunt, WebPack, etc.).
// In WebStorm: https://blog.jetbrains.com/webstorm/2015/05/ecmascript-6-in-webstorm-transpiling/
console.log("\n*** Export and Import (between files) ***")

import any_name from "./defaultexport.js";
any_name();

import {myConstant} from "./export_items_individually";
import {myFunction} from "./export_items_individually";
myFunction(myConstant);




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Classes
//

// very similar to javascript function instantiation
// (for more details https://medium.com/dailyjs/instantiation-patterns-in-javascript-8fdcf69e8f9b)
console.log("\n*** Classes ***")

class Human {
    // required
    constructor(){
        this.sex = "M";
    }

}

class Person extends Human {
    constructor(){
        // need to call constructor of parent like in Python
        super();
        this.name = "BillyBob";
    }

    printStuff() {
        console.log("Name is", this.name);
        console.log("Sex is", this.sex);
    }
}
// Instantiation of a class
let somebody = new Person();
somebody.printStuff();





//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Modern Syntax for Properties and Functions in Classes
//
console.log("\n*** Modern Syntax for Properties and Functions in Classes ***")

// Modern syntax introduced in ES7 for defining:
//  - variable outside of a constructor() function with no "this"
//  - class functions using arrow functions
class PersonNew {
    name = 'Jerry';

    printStuff = () => {
        console.log("Name is", this.name);
    }
}

let somebody_else = new PersonNew();
somebody_else.printStuff();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Spread and Rest operators
//
console.log("\n*** Spread and Rest operators ***");

// spread is something like the split function in python but more general, not just for list (I think)
const old_array = ["test", "patate"];
const new_array = [...old_array, "bleh", "fruits"];
console.log("spread and concatenate: ", new_array);

// the rest variant of the same ... is really like the * operator in python functions
const any_number_of_parameters_function = (...args) => {
    return args.sort()
};
console.log("rested: ", any_number_of_parameters_function(4, 2, 6, 7, 9));

// the ... operator can also expend a Javascript "object". An object seems to be a simple container or properties
// (kind of a C struct)

const old_obj = {
    name: "Patrick",
    age: 44
};

const new_obj = {...old_obj, size: 'L'};

console.log("pread and concatenate object:", new_obj);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Destructuring
//
console.log("\n*** Destructuring ***");

// very similar to Python unpacking
// it uses the array symbol [] but a and b are not in an array
let [a, b] = ["Jesus", "Saint-Esprit"];
console.log("a: ", a, "b: ", b);

// same thing for properties in object. Here, only name is pulled.
let {name} = {name: "Eric", age:"22"};
console.log(name);


// it seems that the syntax for
//   array is []
//   objects is {}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// References and primitive type
// (not modern javascript, just very useful)
//
console.log("\n*** References and primitive type ***");

// PRIMITIVE: a primitive type is like an int, a bool
let num = 1;  // is a primitive type
let num2 = num; //creates a copy of the content of num
num2 = 2;
console.log(num2);


// REFERENCE: objects and array are references
let object1 = {
    name: "Pat",
    sex: "M"
};
let object2 = object1;
object2.name = "Sophie";
console.log(object1); // both object1 an object2 get changed because they point to the same space in memory

// if we spread an object while creating another one, we are now making a copy of it
let object3 = {...object1};
object3.name = "Albert";
console.log(object1); // it stays with the Sophie name, object3 occupies another space in memory


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Array functions
//
console.log("\n*** Array functions ***");

let array = [1,2,3];
// array function are executed on each element or the array
// each element is put in the "num" variable below and can be manipulated in the execution part of the array function
// (between the {})
// in that case the map return a new array (it is not a reference as above)
let t = array.map((num) => {
    return num * 2;
});
console.log(t);


