

var currentChat = document.querySelector('.clickableClass');

currentChat.addEventListener('click', function(event) {
    document.getElementById("clickableID").innerHTML = "YOU CLICKED ME!"
    console.log("the console log message", this.id);


   
});


