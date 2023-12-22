function brRedirect() {
    var domainCheck = window.location.href
    if (domainCheck.includes("creativefat.com")) {
        window.location = domainCheck.replace("creativefat.com", "britonh.com");
    }
}

brRedirect();

function navBarFunction() {
    var x = document.getElementById("myTopbar");
    if (x.className === "topbar") {
        x.className += " responsive";
    } else {
        x.className = "topbar";
    }
    
    var x = document.getElementById("rightPad");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

}