//This is the order in which the image boxes will be created when the page loads

var artworks = ["Game_Sheet", "Battleship", "Tenzi"];



//Create the image Boxes when the page loads:
window.onload = function() {
    var main = document.getElementsByTagName("main")[0];
    var imageBoxes = document.createElement("div");
    imageBoxes.id = "imageBoxes";
    //imageBoxes.setAttribute("style", "display: none;")
    
    for (var i = 0; i < artworks.length; i++) {
        var imageBox = document.createElement("a");
        imageBox.className = "imagebox";
        var directory = artworks[i].replace(/_/g, "");
        directory = directory.toLowerCase();
        imageBox.setAttribute("style", "background:url(GridImages/" + artworks[i] + ".png);");
        imageBox.setAttribute("href", "https://www.britonh.com/" + directory);
        imageBox.setAttribute("target", "_blank");
        var a = document.createElement("a");
        a.setAttribute("href", "https://www.britonh.com/" + directory);
        a.setAttribute("target", "_blank");
        a.className = "link";
        imageBox.appendChild(a);
        var overlay = document.createElement("div");
        overlay.className ="overlay";
        a.appendChild(overlay);
        var boxtitle = document.createElement("span");
        boxtitle.className ="boxtitle";
        boxtitle.textContent = artworks[i].replace(/_/g, " ");
        
        overlay.appendChild(boxtitle);
        
        imageBoxes.appendChild(imageBox);        
    }
    main.appendChild(imageBoxes);
}