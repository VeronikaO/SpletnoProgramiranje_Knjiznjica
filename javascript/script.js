document.getElementById("nav01").innerHTML =
"<ul id='menu'>" +
"<li><div class=\"dropdown\"><button class=\"dropbtn\">Categories</button><div class=\"dropdown-content\"><a href=\"main.html?filter=Fantasy\">Fantasy</a><a href=\"main.html?filter=Sci-fi\">Sci-fi</a><a href=\"main.html?filter=Comedy\">Comedy</a></div></div></li>" +
// "<li><div class=\"dropdown\"><button class=\"dropbtn\">Order by:</button><div class=\"dropdown-content\"><a href=\"#\">Latest</a><a href=\"#\">Most popular</a><a href=\"#\">Best match</a></div></div></li>" +
"<li><a href=\"main.html?filter=NA\">Coming soon</a></li>"
 "<li><input id=\"my_search\" type=\"search\" placeholder=\"Search\"></input></li>" +
 "<li><button type=\"submit\" onclick=\"return search_function()\">Search</button></li>"
"</ul>";

var current_user;

function validateForm(){
  var name = document.forms["login_form"]["luname"].value;
  var password = document.forms["login_form"]["lpsw"].value;

  for(var i = 0; i < users.length; i++){
    if(users[i].username === name && users[i].password === password){
      window.localStorage.setItem("current_user", name);
      return true;
    }
  }
  return false;
}

function get_user_info(){
  var user_name = document.forms["register_form"]["uname"].value;
  var psw = document.forms["register_form"]["psw"].value;
  var cpsw = document.forms["register_form"]["cpsw"].value;
  var name = document.forms["register_form"]["name"].value;
  var surname = document.forms["register_form"]["surname"].value;
  var email = document.forms["register_form"]["email"].value;
  var address = document.forms["register_form"]["address"].value;
  var city = document.forms["register_form"]["city"].value;
  var zip = document.forms["register_form"]["zip"].value;
  var phone = document.forms["register_form"]["phone"].value;
  if(psw !== cpsw){
    return false;
  }

  users.push({
    "username":user_name,
    "password":psw,
    "name":name,
    "surname":surname,
    "address":address,
    "city":city,
    "zip":zip,
    "phone":phone,
    "email":email
  });
  return true;
}

function getParameterByName(name, url) { //copyright http://stackoverflow.com/a/901144
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function create_book_page(){
  var url = window.location.href;
  var title = getParameterByName("title", url);

  for(var i = 0; i < books.length; i++){
    if(books[i].title === title){
      var newElement = document.createElement("div");
      newElement.setAttribute("class", "book");

      var img = document.createElement("img");
      img.setAttribute("src", books[i].picture);
      newElement.appendChild(img);

      var p = document.createElement("p");
      var text = document.createTextNode(books[i].description);
      p.appendChild(text);

      newElement.appendChild(p);
      document.getElementById("book_main").appendChild(newElement);
    }
  }
}

function get_checkout_url(){
  var url = window.location.href;
  var title = getParameterByName("title", url);
  document.forms['book_page_checkout']['title'].value = title;
}

function add_to_wishlist(){
  var url = window.location.href;
  var title = getParameterByName("title", url);
  for(var i = 0; i < wishlists.length; i++){
    if(wishlists[i].user === current_user){
      wishlists[i].titles.push(title);
    }
  }
}

function create_checkout_page(){
  var url = window.location.href;
  var title = getParameterByName("title", url);

  for(var i = 0; i < books.length; i++){
    if(books[i].title === title){
      var newElement = document.createElement("div");
      newElement.setAttribute("class", "book");

      var img = document.createElement("img");
      img.setAttribute("src", books[i].picture);
      newElement.appendChild(img);

      var p = document.createElement("p");
      var text = document.createTextNode(books[i].description);
      p.appendChild(text);

      newElement.appendChild(p);
      document.getElementById("checkout_book").appendChild(newElement);
    }
  }
  var current_user = localStorage.getItem("current_user");
  for (var i = 0; i < users.length; i++) {
    if(current_user === users[i].username){
      var ul = document.createElement("ul");
      var li = document.createElement("li");
      var text = document.createTextNode("User name: "+users[i].username);
      li.appendChild(text);
      ul.appendChild(li);

      li = document.createElement("li");
      text = document.createTextNode("First name: "+users[i].name);
      li.appendChild(text);
      ul.appendChild(li);

      li = document.createElement("li");
      text = document.createTextNode("Last name: "+users[i].surname);
      li.appendChild(text);
      ul.appendChild(li);

      li = document.createElement("li");
      text = document.createTextNode("Email: "+users[i].email);
      li.appendChild(text);
      ul.appendChild(li);

      li = document.createElement("li");
      text = document.createTextNode("Address: "+users[i].address);
      li.appendChild(text);
      ul.appendChild(li);

      li = document.createElement("li");
      text = document.createTextNode("City: "+users[i].city);
      li.appendChild(text);
      ul.appendChild(li);

      li = document.createElement("li");
      text = document.createTextNode("Zip: "+users[i].zip);
      li.appendChild(text);
      ul.appendChild(li);

      document.getElementById("checkout_user_info").appendChild(ul);
    }
  }
}

function create_wishlist_page(){
  var current_user = localStorage.getItem("current_user");
  for(var i = 0; i < wishlists.length; i++){
    if(wishlists[i].user === current_user){
      for(var j = 0; j < wishlists[i].titles.length; j++){
        for(var k = 0; k < books.length; k++){
          if(wishlists[i].titles[j] === books[k].title){

            var newElement = document.createElement("div");
            newElement.setAttribute("class", "book_list");

            var a = document.createElement("a");
            a.setAttribute("href","book.html?title="+books[k].title);

            var img = document.createElement("img");
            img.setAttribute("src", books[k].picture);
            a.appendChild(img);

            var p = document.createElement("p");
            var text = document.createTextNode(books[k].description);
            p.appendChild(text);


            newElement.appendChild(a);
            newElement.appendChild(p);
            document.getElementById("wishlist_main").appendChild(newElement);
          }
        }
      }
    }
  }
}

function search_function(){
  var text = document.getElementById("my_search").value;
  var url = "main.html?search_"+text;
  return url;
}

function create_book_div(){
  var url = window.location.href;
  var filter = getParameterByName("filter", url);

  for(i = 0; i < books.length; i++){
    if(books[i].genre1 === filter || books[i].genre2 === filter || filter === null){
      if(books[i].date_added !== "NA"){
        var newElement = document.createElement("div");
        newElement.setAttribute("class", "book_list");

        var a = document.createElement("a");
        a.setAttribute("href","book.html?title="+books[i].title);

        var img = document.createElement("img");
        img.setAttribute("src", books[i].picture);
        a.appendChild(img);

        var p = document.createElement("p");
        var text = document.createTextNode(books[i].description);
        p.appendChild(text);


        newElement.appendChild(a);
        newElement.appendChild(p);
        document.getElementById("main").appendChild(newElement);
      }
    }
    else if(filter === "NA"){
      if(books[i].date_added === "NA"){
        var newElement = document.createElement("div");
        newElement.setAttribute("class", "book_list");

        var a = document.createElement("a");
        a.setAttribute("href","book.html?title="+books[i].title);

        var img = document.createElement("img");
        img.setAttribute("src", books[i].picture);
        a.appendChild(img);

        var p = document.createElement("p");
        var text = document.createTextNode(books[i].description);
        p.appendChild(text);


        newElement.appendChild(a);
        newElement.appendChild(p);
        document.getElementById("main").appendChild(newElement);
      }
    }
    else if(filter === "search"){
      var x = document.getElementById("my_search");
      if(books[i].title === x || books[i].author === x){
        var newElement = document.createElement("div");
        newElement.setAttribute("class", "book_list");

        var a = document.createElement("a");
        a.setAttribute("href","book.html?title="+books[i].title);

        var img = document.createElement("img");
        img.setAttribute("src", books[i].picture);
        a.appendChild(img);

        var p = document.createElement("p");
        var text = document.createTextNode(books[i].description);
        p.appendChild(text);


        newElement.appendChild(a);
        newElement.appendChild(p);
        document.getElementById("main").appendChild(newElement);
      }
    }
  }
}
