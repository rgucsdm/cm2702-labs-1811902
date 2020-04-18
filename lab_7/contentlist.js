
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
	var newPara = document.createElement("p");
    newPara.innerHTML = items_html;
	document.getElementById("content").appendChild(newPara);
}

function addMoreContent() {
    var items = ["hewey", "dewey", "louie"];
    
    // create new ul element
    var ul = document.createElement("ul");
    
    // add list item as a child to <ul>
    for (var i=0; i < items.length; i++) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(items[i]));
        //li.innerHTML = items[i];
        ul.appendChild(li);
	};

    // add ul to content as a new paragraph
    var newPara = document.createElement("p");
    newPara.appendChild(ul);
    document.getElementById("content").appendChild(newPara);
}

function addItem(form) {
    var newItem = form.newItem.value;
    var newPara = document.createElement("p");
    newPara.appendChild(document.createTextNode(newItem));
    document.getElementById("content").appendChild(newPara);
}

function removeItem() {
    var paras = document.getElementsByTagName("p");
    if(paras.length==0) {
        alert("Nothing to remove");
    } else {
        paras[paras.length-1].remove();
    }
}

