function getUrlVars() {
    var vars = window.location.href.replace(/^[^\?]+\?/gi, ""); 
    return vars;
}

function setLocationHash() {
    var locationHash = getUrlVars();
    var name = locationHash;
    
    if (locationHash != "") {
        if (locationHash.toLowerCase() == "alphason") {
            locationHash = Alphason;
            openArtwork(locationHash, name.toLowerCase());
        } else if (locationHash.toLowerCase() == "audio_flavor") {
            locationHash = Audio_Flavor;
            openArtwork(locationHash, name.toLowerCase());
        } else if (locationHash.toLowerCase() == "the_lines_that_hold_us") {
            locationHash = The_Lines_That_Hold_Us;
            openArtwork(locationHash, name.toLowerCase());
        } else if (locationHash.toLowerCase() == "sketchboard") {
            locationHash = Sketchboard;
            openArtwork(locationHash, name.toLowerCase());
        } else if (locationHash.toLowerCase() == "rhino") {
            locationHash = Rhino;
            openArtwork(locationHash, name.toLowerCase());
        } else if (locationHash.toLowerCase() == "parallel_ski_tour") {
            locationHash = Parallel_Ski_Tour;
            openArtwork(locationHash, name.toLowerCase());
        } else if (locationHash.toLowerCase() == "reformulation") {
            locationHash = Reformulation;
            openArtwork(locationHash, name.toLowerCase());
        } else if (locationHash.toLowerCase() == "leger_yoyos") {
            locationHash = Leger_Yoyos;
            openArtwork(locationHash, name.toLowerCase());
        } else if (locationHash.toLowerCase() == "backyard_joe") {
            locationHash = Backyard_Joe;
            openArtwork(locationHash, name.toLowerCase());
        } else if (locationHash.toLowerCase() == "christopher_nolan_bio") {
            locationHash = Christopher_Nolan_Bio;
            openArtwork(locationHash, name.toLowerCase());
        } else if (locationHash.toLowerCase() == "krzyztopor_castle") {
            locationHash = Krzyztopor_Castle;
            openArtwork(locationHash, name.toLowerCase());
        } else if (locationHash.toLowerCase() == "meet_america") {
            locationHash = Meet_America;
            openArtwork(locationHash, name.toLowerCase());
        } else {
            var selectedWorkElement = document.getElementById("selectedWork");
            selectedWorkElement.innerHTML = "";
        }
    }
}