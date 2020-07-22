/**
 * @Author: John Isaacs <john>
 * @Date:   24-Mar-162016
 * @Filename: submitToList.js
 * @Last modified by:   john
 * @Last modified time: 02-Mar-182018
 */



$(function(){
	//document ready
	alert("document ready");

	$('#searchform').submit(function(){
		var searchterms = $("#searchterms").val();
		addItemToList(searchterms);
		return false;
	});
});



function addItemToList (item){
	$('#results').append("<li>" +item + "</li>");
}
