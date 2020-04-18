
function addContent () {
	// add a list of items to the content div
	var items = ["hewey", "dewey", "louie"];
	
	// build the html string for a <ul> list
	var items_html = "<ul>";
	for (var i=0; i < items.length; i++) {
		item = items[i];
		items_html += "<li>" + item + "</li>";
	};
	items_html += "</ul>";
	
	// using javascript
	// 1. find the content div
	// 2. modify its html attribute by adding items_html
	document.getElementById("content").innerHTML += items_html;
}

function addMoreContent() {
    var items = ["hewey", "dewey", "louie"];
    
    // create new ul element
    var ul = document.createElement("ul");
    
    // add list item as a child to <ul>
    for (var i=0; i < items.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = items[i];
        ul.appendChild(li);
	};

    // add ul to content
    document.getElementById("content").appendChild(ul);
}

function addItem(form) {
    var newItem = form.newItem.value;
    var li = document.createElement("li");
    li.innerHTML = newItem;
    document.getElementById("customList").appendChild(li);
}

function removeItem() {
    var customList = document.getElementById("customList");
    customList.removeChild(customList.lastChild);
}

