// Script carries out some array operations and prints the results to the console
// Read through the all the code first, then attempt task 2

function main () {
	// main body of app
	print("msgs should appear in console (see the print() function)");
	
	// calculate the sum of arrays
	// illustrating two different ways of passing an array to the sum function
	print("the sum of array [1,2,3] is:")
	array = [1,2,3];
	print(sum(array));
	print("and the sum of array [4,5,6] is:")
	print(sum([4,5,6]));
	
	// perhaps we want a quicker way to generate simple arrays
	// see the range() function below
	array1 = range(1,20);
	array2 = range(1,20,1);
	array3 = range(1,20,2); // illustrate the a step of 2 instead of 1
	print("three arrays generated from range function:");
	print(array1);
	print(array2);
	print(array3);
	
	// test for your functions
	// uncomment each and check your function implementations work
	print("minimum of array1 is:");
	// print(minimum(array1));
	print("maximum of array3 is:");
	// print(maximum(array3));
	print("product of array2 is:");
	// print(product(array2));
	print("concatenation of array3 is:");
	// print(concatenate(array3));
}

// utility functions
function print (arg) {
	// convenience function to print to browser console
	console.log(arg);
}

function sum (array) {
	// finds the sum of elements in an array
	var total = 0;
	
	// iterate through the array and calculate the sum
	// by adding each element in turn to total
	for (var i = 0; i < array.length; i++){
		total = total + array[i];
	};
	return total;
}

function range (start, end, step) {
	// creates an array from "start" to "end"
	// with increments of value "step" 
	
	// step defaults to 1 if not specified
	if (typeof step === 'undefined') {
		step = 1
	};
	
	// create an empty array to store elements
	array = [];
	
	// iterate form 'start' to 'end', moving in increments of 'step'
	// to generate elements of array
	for (var i=start; i <= end; i=i+step) {
		// use Array method to add new elements
		array.push(i);
	};
	return array;
}

function minimum (array) { 
    // find the minimum value in an array and return it
    // ...
}

function maximum (array) { 
    // find the maximum value in an array and return it
    // ...
}

function product (array) { 
    // find the product of all the elements of an array and return it
    // ...
}

function concatenate (array) { 
    // combine the elements of an array and return as a string
    // ...
}