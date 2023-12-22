//This is the order in which the image boxes will be created when the page loads

var artworks = ["Alphason", "Audio_Flavor", "The_Lines_That_Hold_Us", "Sketchboard", "Rhino", "Parallel_Ski_Tour","Reformulation", "Leger_Yoyos",  "Backyard_Joe", "Christopher_Nolan_Bio", "Krzyztopor_Castle", "Meet_America"];



//Create the image Boxes when the page loads:
window.onload = function() {
    var main = document.getElementsByTagName("main")[0];
    var imageBoxes = document.createElement("div");
    imageBoxes.id = "imageBoxes";
    //imageBoxes.setAttribute("style", "display: none;")
    
    for (var i = 0; i < artworks.length; i++) {
        var imageBox = document.createElement("div");
        imageBox.className = "imagebox";
        imageBox.setAttribute("style", "background:url(GridImages/" + artworks[i] + ".gif);");
        imageBox.setAttribute("onclick", "openArtwork(" + artworks[i] + "," + "'" + artworks[i] + "')");
        var a = document.createElement("div");
        a.setAttribute("onclick", "openArtwork(" + artworks[i] + "," + "'" + artworks[i] + "')");
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
    
    setLocationHash();
}



//Add the Artwork HTML to the page when that image box is clicked
function openArtwork(artwork, name) {
    //document.getElementById("imageBoxes").setAttribute("style", "display: none;");
    document.getElementById("controls").setAttribute("style", "");
    var selectedWorkElement = document.getElementById("selectedWork");
    selectedWorkElement.innerHTML = artwork;
    selectedWorkElement.setAttribute("style", "");
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.replaceState(null, null, "?" + name.toLowerCase());
}


//Remove any artwork that was opened
function closeArtwork() {
    document.getElementById("imageBoxes").setAttribute("style", "");
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById("controls").setAttribute("style", "display: none;");
    var selectedWorkElement = document.getElementById("selectedWork");
    selectedWorkElement.innerHTML = "";
    selectedWorkElement.setAttribute("style", "display: none;");
    window.history.replaceState(null, null, "?work");
    
    
}



/****************************************************************/
/****************************************************************/

/*      Artwork's HTML      */

/****************************************************************/
/****************************************************************/


/* Alphason HTML */

var Alphason = `<div id="description">
           <h1>Alphson Speaker Promotion</h1>
           <p>
                This piece is a product promo animation created using Cinema 4D. It uses a moody, opulent atmosphere and surreal illustrations of sound to capture the interest of high- end audiophile enthusiasts.
           </p>
       </div>
       
       <div id="media">
           <div class="mediaBlock">
                <iframe src="https://player.vimeo.com/video/369040206" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
           </div>
    
        </div>`;

/* Parallel Ski Tour HTML */

var Parallel_Ski_Tour = `<div id="description">
           <h1>Parallel Ski Tour</h1>
           <p>
                This is a parallax animation showcasing a professional ski tour hosted by Parallel Ski Company.
            <br><br>
                Apart from the flyover frame, every scene in this video was made by animating still images.
           </p>
       </div>
       
       <div id="media">
           <div class="mediaBlock">
                <iframe src="https://player.vimeo.com/video/246603391" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
           </div>
    
        </div>`;

/* Reformulation HTML */

var Reformulation = `<div id="description">
           <h1>Reformulation</h1>
           <p>
                “REFORMULATION” is a computer animated title sequence for a sci-fi thriller made using Cinema 4D. Its dark, moody feel slowly drags the viewer into a feeling of discomfort or confusion through it’s visual and audio elements.
           </p>
       </div>
       
       <div id="media">
           <div class="mediaBlock">
                <iframe src="https://player.vimeo.com/video/378694324" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
           </div>
    
        </div>`;



/* Christopher Nolan HTML */

var Christopher_Nolan_Bio = `<div id="description">
           <h1>Christopher Nolan</h1>
            <h1>Pamphlet Biography</h1>
           <p>
                A folding pamphlet about the life of Christopher Nolan, the film director. 
           </p>
            <br>
            <p>
                I have always enjoyed Christopher Nolan’s films for their interesting story plots, and I wanted to capture his unique style in a similar way through print. The pamphlet unfolds in a unique way that is meant to let the viewer discover different pieces of his life as they figure out how it unfolds, much like the plots of many of Nolan’s films.
            <br>
                I focused heavily on the use of typography throughout this piece, and used type as the leading visual storytelling element rather than photography or other elements.
            </p>
       </div>
        <div id="media">
            <div class="mediaGrid2">
                <img src="pageImages/media/nolanFolded1.png"/>
                <img src="pageImages/media/nolanFolded2.png"/>
            </div>
            <div class="mediaBlock">
                <img src="pageImages/media/nolanBack.png" />
            </div>
            <div class="mediaBlock">
                <img src="pageImages/media/nolanFront.png" />
            </div>
        </div>`


/* Meet America HTML */

var Meet_America = `<div id="description">
           <h1>Meet America</h1>
            <h1>Poster Series</h1>
           <p>
                These are a series of posters showcasing some of Americaʼs most iconic man-made structures.
           </p>
            <br>
            <p>
                This project interested me because I love to travel, and I am always marveling over architecture and the amount of time, effort and resources humans put into building structures. I wanted to showcase these types of iconic American structures in a simple way to show how quickly recognizable architecture can be.
            </p>
       </div>
        <div id="media">
            <div class="mediaBlock">
                <img src="pageImages/media/NewYork.png" />
            </div>
            <div class="mediaBlock">
                <img src="pageImages/media/StLouis.png" />
            </div>
            <div class="mediaBlock">
                <img src="pageImages/media/WashingtonDC.png" />
            </div>
            <div class="mediaBlock">
                <img src="pageImages/media/Seattle.png" />
            </div>
            <div class="mediaBlock">
                <img src="pageImages/media/SanFrancisco.png" />
            </div>
        </div>`

/* Krzyztopor Castle HTML */

var Krzyztopor_Castle = `<div id="description">
           <h1>The Krzyztopor Castle</h1>
           <p>
                This is a digital “clay” recreation of the Krzyztopor Castle in Poland.
           </p>
            <br>
            <p>
                The real castle was built in the 1500ʼs and still stands today in partial ruin. I wanted to recreate the castle in much of the way it may have originally stood without damage, leaving out rendered texture to focus on itʼs unique structure.
            </p>
       </div>
        <div id="media">
            <div class="mediaBlock">
                <img src="pageImages/media/Castle-Right.jpg" />
            </div>
            <div class="mediaBlock">
                <img src="pageImages/media/Castle-Front.jpg" />
            </div>
            <div class="mediaBlock">
                <img src="pageImages/media/Castle-Top.jpg" />
            </div>
            <div class="mediaBlock">
                <img src="pageImages/media/Castle-Rotation.gif" />
            </div>
        </div>`


/* Yoyo HTML */

var Leger_Yoyos = `<div id="description">
           <h1>Léger Yoyos</h1>
           <p>
                For this project I wanted to explore mediums by branding and creating product packaging for a yoyo.
           </p>
            <br>
            <p>
                You can see here some of the steps that I took along the way that led me to the final design, including sketches, 3D digital mock-ups, and flat die-lines.
            <br>
                The final product was made through many hours of trial and error, eventually developing my own technique of folding laser cut masonite board.
            </p>
            <br>
            <p>

                I am a hobbyist yoyo thrower, and I have always thought it would be fitting to have an interesting way to display and store a yoyo when it is not being used. Inspiration for the shape and design itself came from paintings by Fernand Léger due to their geometric and playful shapes and colors. 
            </p>
       </div>
        <div id="media">
            <div class="mediaBlock">
                <img src="pageImages/media/Yoyo5.png" />
            </div>
            <div class="textBlock">
                <h2>Computer Renders</h2>
                <p>After some sketch ideas, I began by creating 3d computer renders to help me get an idea of how some of the different package designs might come out when created 3-dimentionally. This is the design I finally decided upon to create a dieline for. The dieline below is what I used to laser-cut the masonite.</p>
            </div>
            <div class="mediaGrid3">
                <img src="pageImages/media/yoyoModelWhite1.png"/>
                <img src="pageImages/media/yoyoModelWhite2.png"/>
                <img src="pageImages/media/yoyoModelWhite3.png"/>
            </div>
            <div class="mediaBlock">
                <img src="pageImages/media/yoyoDieline.png" />
            </div>
            
            <div class="textBlock">
                <h2>Laser Cutting Masonite</h2>
                <p>It many hours of experimentation and wasted masonite board to get the settings where I needed them. I didn't just need to cut through the masonite (around the edges of the form), but I also needed to cut the center lines just enough to bend into shape without breaking. I also tried differnent types of wood and materials, but masonite board turned out to be the perfect material to bend without breaking or splintering.</p>
            </div>
            <div class="mediaBlock">
                <img src="pageImages/media/laserCut.gif" />
            </div>
            <div class="textBlock">
                <h2>Final Product</h2>
            </div>
            <div class="mediaBlock">
                <img src="pageImages/media/Yoyo1.png" />
            </div>
            <div class="mediaBlock">
                <img src="pageImages/media/Yoyo2.png" />
            </div>
            <div class="mediaBlock">
                <img src="pageImages/media/Yoyo3.png" />
            </div>
            <div class="mediaBlock">
                <img src="pageImages/media/Yoyo4.png" />
            </div>
            <div class="mediaBlock">
                <img src="pageImages/media/YoyoAward.png" />
            </div>
        </div>`



/* Sketchboard HTML */

var Sketchboard = `<div id="description">
           <h1>Sketchboard</h1>
           <p>
               This is a skateboard designed for JAM skateboards. The inspiration came from the concept: “Abstraction of the Mind”. Everyone interprets things differently, based upon their personality, likes, dislikes and past experiences. I wanted to see how many different people’s minds would interpret an abstract shape, without any prior influence.
               
               <br>

               Each sketch on the board is an individual interpretation of a form, showing that people sometimes interpret things similarly, but often very differently.
           </p>
       </div>
       
       <div id="media">
            <div class="mediaBlock">
                <img src="pageImages/media/4boards.png" />
            </div>

            <div class="mediaBlock">
                <img src="pageImages/media/2boards.png" />
            </div>

            <div class="mediaBlock">
                <img src="pageImages/media/sketchboardAssembly.png" />
            </div>

            <div class="mediaBlock">
                <img src="pageImages/media/holdingboard.png" />
            </div>

            <div class="textBlock">
                <h2>Background Inspiration</h2>
                <p>The background inspiration came as I was playing around with a painting process - trying a technique known as acrylic dump or flow painting. I like the natural abstract shapes and colors that are created.</p>
            </div>
            <div class="mediaBlock">
                <img src="pageImages/media/sketchboardPaintings.png" />
            </div>
           
            <div class="textBlock">
                <h2>Sketches From Many Different People</h2>
                <p>I gave the same scribble to many different people and asked them all to interpret it into whatever image they saw, not allowing them to look at the images made by others. I was able to get different sketches from over 50 people, and it was fun to see what different shapes and images people were able to create out of the same base scribble.</p>
            </div>
            <div class="mediaBlock">
                <img src="pageImages/media/sketchesDisplay.png" />
            </div>
           
           <div class="textBlock">
                <h2>Each sketch is a new interpretation <br>-<br> An abstraction of the mind! </h2>
           </div>
           <div class="mediaBlock">
                <img src="pageImages/media/sketchboard_dark_large.png" />
            </div>
           
        </div>`


/* Rhino HTML */

var Rhino = `<div id="description">
           <h1>Rhino Clothing</h1>
           <p>
                Rhino clothing is a “rough urban” brand of clothing made with higher-end materials that allow them to be very comfortable, but very durable and long lasting. 
           </p>
            <br>
            <p>
                I love the rhino because of their tough and rugged nature, as well as their unique horns on the front of their nose. 
            <br>
            <br>

                It interests me to base a clothing brand around the durable “rugged” nature that rhinos naturally capture, and mix that with the idea that rugged clothing can be just as comfortable as any other clothing.
            </p>
       </div>
        <div id="media">
            <div class="mediaBlock">
                <img src="pageImages/media/RhinoMeetAd.png" />
            </div>

            <div class="mediaBlock">
                <img src="pageImages/media/rhinoStorefront.png" />
            </div>

            <div class="mediaBlock">
                <img src="pageImages/media/rhinoClothingExamples.png" />
            </div>

            <div class="mediaBlock">
                <img src="pageImages/media/rhinoBusinessCards.png" />
            </div>
        </div>`;



/* The Lines that Hold US HTML */

var The_Lines_That_Hold_Us = `<div id="description">
           <h1>The Lines That Hold Us</h1>
           <p>
                This piece is a 30 page design publication focused on energy production and use in our world today. I created this work with the hopes to spark awareness in the mind of the average person into how much of their lives around them revolves around energy.
           </p>
            <br>
            <p>
                I believe that if we all have a better understanding of how needed and useful energy is in our lives, we can find ways to contribute to a better future in energy.
            </p>
       </div>
        <div id="media">
            <div class="mediaBlock">
                <img src="pageImages/media/LinesDisplay1.jpg" />
            </div>
            <div class="mediaBlock">
                <img src="pageImages/media/LinesDisplay2.jpg" />
            </div>
            <div class="mediaBlock">
                <img src="pageImages/media/LinesDisplay3.jpg" />
            </div>
            <div class="mediaBlock">
                <img src="pageImages/media/page1.png" />
            </div>

            <div class="mediaBlock">
                <img src="pageImages/media/page2.png" />
            </div>

            <div class="mediaBlock">
                <img src="pageImages/media/page3.png" />
            </div>

            <div class="mediaBlock">
                <img src="pageImages/media/page4.png" />
            </div>

            <div class="mediaBlock">
                <img src="pageImages/media/page5.png" />
            </div>

            <div class="mediaBlock">
                <img src="pageImages/media/page6.png" />
            </div>

            <div class="mediaBlock">
                <img src="pageImages/media/page7.png" />
            </div>

            <div class="mediaBlock">
                <img src="pageImages/media/page8.png" />
            </div>

            <div class="mediaBlock">
                <img src="pageImages/media/page9.png" />
            </div>

            <div class="mediaBlock">
                <img src="pageImages/media/page10.png" />
            </div>

            <div class="mediaBlock">
                <img src="pageImages/media/page11.png" />
            </div>

            <div class="mediaBlock">
                <img src="pageImages/media/page12.png" />
            </div>

            <div class="mediaBlock">
                <img src="pageImages/media/page13.png" />
            </div>

            <div class="mediaBlock">
                <img src="pageImages/media/page14.png" />
            </div>

            <div class="mediaBlock">
                <img src="pageImages/media/page15.png" />
            </div>

            <div class="mediaBlock">
                <img src="pageImages/media/page16.png" />
            </div>
        </div>`;

/* Audio Flavor HTML */

var Audio_Flavor = `<div id="description">
           <h1>Audio Flavor</h1>
           <p>
                Audio flavor is a mobile app that helps you find music that you will like, based upon what you already listen to.
               
               <br><br>
               
                A lot of who I am has been defined by my personal music interests, so I am always looking for new artists that I feel express my feelings and who I am. This desire for new music is what drove my interest in this project.
           </p>
       </div>
       
       <div id="media">
            <div class="mediaBlock">
                <img src="pageImages/media/audioFlavor1.png" />
            </div>

            <div class="mediaBlock">
                <img src="pageImages/media/audioFlavor2.png" />
            </div>

            <div class="mediaBlock">
                <img src="pageImages/media/audioFlavor3.png" />
            </div>

            <div class="mediaBlock">
                <img src="pageImages/media/audioFlavor4.png" />
            </div>
        </div>`;



/* Backyard Joe HTML/CSS (Made this in webflow - REALLY MESSY BUT IT LOOKS NICE) */

var Backyard_Joe = `

<!DOCTYPE html>
<html data-wf-domain="britonhainsworthportfolio.webflow.io" data-wf-page="5ddd978ea0ceb00939d95844" data-wf-site="5ddd978ea0ceb0e29ed95839" data-wf-status="1" class="w-mod-js wf-montserrat-n1-active wf-montserrat-i1-active wf-montserrat-n2-active wf-montserrat-i2-active wf-montserrat-n3-active wf-montserrat-i3-active wf-montserrat-n4-active wf-montserrat-i4-active wf-montserrat-n5-active wf-montserrat-i5-active wf-montserrat-n6-active wf-montserrat-i6-active wf-montserrat-n7-active wf-montserrat-i7-active wf-montserrat-n8-active wf-montserrat-i8-active wf-montserrat-n9-active wf-montserrat-i9-active wf-active w-mod-ix">
   <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>Project 2</title>
      <meta content="Project 2" property="og:title">
      <meta content="width=device-width, initial-scale=1" name="viewport">
      <meta content="Webflow" name="generator">       
       <style>
           
           /* Generated on: Wed Dec 11 2019 20:43:17 GMT+0000 (Coordinated Universal Time) */

/* ==========================================================================
   Start of custom Webflow CSS
   ========================================================================== */
.w-layout-grid {
  display: -ms-grid;
  display: grid;
  grid-auto-columns: 1fr;
  -ms-grid-columns: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  -ms-grid-rows: auto auto;
  grid-template-rows: auto auto;
  grid-row-gap: 16px;
  grid-column-gap: 16px;
}

body {
  background-color: #1f1f1f;
  font-family: Montserrat, sans-serif;
  color: #1a1b1f;
  font-size: 16px;
  line-height: 28px;
  font-weight: 400;
}

h1 {
  margin-top: 20px;
  margin-bottom: 15px;
  font-size: 44px;
  line-height: 62px;
  font-weight: 400;
}

h2 {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 36px;
  line-height: 50px;
  font-weight: 400;
}

h3 {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 30px;
  line-height: 46px;
  font-weight: 400;
}

h4 {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 24px;
  line-height: 38px;
  font-weight: 400;
}

h5 {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 20px;
  line-height: 34px;
  font-weight: 500;
}

h6 {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 28px;
  font-weight: 500;
}

p {
  margin-bottom: 10px;
}

a {
  display: block;
  -webkit-transition: opacity 200ms ease;
  transition: opacity 200ms ease;
  color: #1a1b1f;
  text-decoration: underline;
}

a:hover {
  color: #32343a;
}

a:active {
  color: #43464d;
}

ul {
  margin-top: 20px;
  margin-bottom: 20px;
  padding-left: 40px;
  list-style-type: disc;
}

li {
  margin-bottom: 10px;
}

img {
  display: block;
}

label {
  margin-bottom: 10px;
  font-size: 12px;
  line-height: 20px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
}

blockquote {
  margin-top: 25px;
  margin-bottom: 25px;
  padding: 15px 30px;
  border-left: 5px solid #e2e2e2;
  font-size: 20px;
  line-height: 34px;
}

figure {
  margin-top: 25px;
  padding-bottom: 20px;
}

figcaption {
  margin-top: 5px;
  opacity: 0.6;
  font-size: 14px;
  line-height: 26px;
  text-align: center;
}

.heading-jumbo-small {
  margin-top: 10px;
  margin-bottom: 15px;
  font-size: 36px;
  line-height: 50px;
  font-weight: 400;
  text-transform: none;
}

.styleguide-block {
  display: block;
  margin-top: 80px;
  margin-bottom: 80px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  text-align: left;
}

.heading-jumbo-tiny {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 18px;
  line-height: 32px;
  font-weight: 500;
  text-transform: uppercase;
}

.rich-text {
  width: 70%;
  margin-right: auto;
  margin-bottom: 100px;
  margin-left: auto;
}

.rich-text p {
  margin-top: 15px;
  margin-bottom: 25px;
  opacity: 0.6;
}

.container {
  overflow: hidden;
  width: 100%;
  height: auto;
  max-width: 1140px;
  margin-right: auto;
  margin-left: auto;
}

.styleguide-content-wrap {
  text-align: center;
}

.paragraph-small {
  font-size: 14px;
  line-height: 26px;
}

.styleguide-header-wrap {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  height: 460px;
  padding: 30px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #1a1b1f;
  color: #fff;
  text-align: center;
}

.styleguide-button-wrap {
  margin-top: 10px;
  margin-bottom: 10px;
}

.grid-heading {
  margin-top: 10px;
  margin-bottom: 10px;
  font-family: Montserrat, sans-serif;
  color: #fff;
  font-size: 300%;
  line-height: 80px;
  text-transform: none;
}

.paragraph-tiny {
  color: #bdbdc0;
  font-size: 12px;
  line-height: 20px;
}

.paragraph-tiny.cc-paragraph-tiny-light {
  opacity: 0.7;
  color: #bababb;
}

.label {
  margin-bottom: 10px;
  font-size: 12px;
  line-height: 20px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.label.cc-styleguide-label {
  margin-bottom: 25px;
}

.label.cc-speaking-label {
  margin-top: 20px;
  margin-bottom: 10px;
}

.label.cc-about-light {
  opacity: 0.6;
}

.paragraph-light {
  margin-top: 0px;
  opacity: 0.6;
  color: #fff;
  font-size: 18px;
}

.paragraph-light.cc-position-name {
  margin-bottom: 5px;
}

.section {
  top: auto;
  margin-top: 0px;
}

.section.cc-contact {
  padding-right: 80px;
  padding-left: 80px;
  background-color: #292929;
}

.button {
  position: relative;
  padding: 12px 25px;
  border-radius: 0px;
  background-color: #2d4347;
  -webkit-transition: background-color 400ms ease, opacity 400ms ease, color 400ms ease;
  transition: background-color 400ms ease, opacity 400ms ease, color 400ms ease;
  color: #fff;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;
}

.button:hover {
  background-color: #32343a;
  color: #fff;
}

.button:active {
  background-color: #43464d;
}

.button.cc-jumbo-button {
  padding: 16px 35px;
  font-size: 14px;
  line-height: 26px;
}

.button.cc-white-button {
  padding: 16px 35px;
  background-color: #fff;
  color: #202020;
  font-size: 14px;
  line-height: 26px;
}

.button.cc-white-button:hover {
  background-color: hsla(0, 0%, 100%, 0.8);
}

.button.cc-white-button:active {
  background-color: hsla(0, 0%, 100%, 0.9);
}

.paragraph-bigger {
  margin-bottom: 10px;
  opacity: 1;
  font-size: 20px;
  line-height: 34px;
  font-weight: 400;
}

.paragraph-bigger.cc-bigger-light {
  opacity: 0.6;
}

.divider {
  height: 1px;
  background-color: #eee;
}

.logo-link {
  z-index: 1;
}

.logo-link:hover {
  opacity: 0.8;
}

.logo-link:active {
  opacity: 0.7;
}

.navigation-item {
  padding-top: 9px;
  padding-bottom: 9px;
  -webkit-box-flex: 0;
  -webkit-flex: 0 auto;
  -ms-flex: 0 auto;
  flex: 0 auto;
  opacity: 0.6;
  color: #ebebeb;
  font-size: 12px;
  line-height: 20px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.navigation-item:hover {
  opacity: 0.9;
}

.navigation-item:active {
  opacity: 0.8;
}

.navigation-item.w--current {
  opacity: 1;
  color: #fff;
  font-weight: 600;
}

.navigation-item.w--current:hover {
  opacity: 0.8;
  color: #32343a;
}

.navigation-item.w--current:active {
  opacity: 0.7;
  color: #32343a;
}

.navigation-items {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.navigation {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  overflow: hidden;
  width: 100%;
  padding: 30px 50px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #252525;
}

.logo-image {
  display: block;
}

.navigation-wrap {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-right: -20px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.intro-wrap {
  margin-top: 100px;
  margin-bottom: 140px;
}

.name-text {
  color: #c0c1c5;
  font-size: 20px;
  line-height: 34px;
  font-weight: 400;
}

.position-name-text {
  margin-bottom: 10px;
  color: #e9e9e9;
  font-size: 20px;
  line-height: 34px;
  font-weight: 400;
  text-align: left;
  text-transform: none;
}

.work-description {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  margin-bottom: 60px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.work-experience-grid {
  margin-bottom: 140px;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  grid-template-areas: ". . . .";
  -ms-grid-columns: 1fr 30px 1fr 30px 1fr 30px 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  -ms-grid-rows: auto;
  grid-template-rows: auto;
}

.works-grid {
  margin-bottom: 80px;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  grid-template-areas: ". . ." ". . .";
  -ms-grid-columns: 1.5fr 30px 1fr 30px 1.5fr;
  grid-template-columns: 1.5fr 1fr 1.5fr;
  -ms-grid-rows: auto 30px auto;
  grid-template-rows: auto auto;
}

.carrer-headline-wrap {
  width: 70%;
  margin-bottom: 50px;
}

.work-image {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  height: 460px;
  margin-bottom: 40px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: stretch;
  -webkit-align-items: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  background-color: #f4f4f4;
  background-image: url("https://d3e54v103j8qbb.cloudfront.net/img/example-bg.png");
  background-position: 50% 50%;
  background-size: cover;
  text-align: center;
  text-decoration: none;
}

.work-image:hover {
  opacity: 0.8;
}

.work-image:active {
  opacity: 0.7;
}

.work-image.cc-work-1 {
  background-image: url("https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5ddd978ea0ceb0813ad9585d_portfolio%201%20-%20wide.svg");
  background-size: cover;
}

.work-image.cc-work-2 {
  -webkit-flex-wrap: nowrap;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  background-image: url("https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5ddd978ea0ceb0073ad9585c_portfolio%202%20-%20wide.svg");
  background-size: cover;
}

.work-image.cc-work-4 {
  background-image: url("https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5ddd978ea0ceb04b8bd9585e_portfolio%203%20-%20wide.svg");
  background-size: cover;
}

.work-image.cc-work-3 {
  background-image: url("https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5ddd978ea0ceb06187d9585f_portfolio%204%20-%20wide.svg");
  background-size: cover;
}

.project-name-link {
  margin-bottom: 5px;
  color: #fff;
  font-size: 20px;
  line-height: 34px;
  font-weight: 400;
  text-decoration: none;
}

.project-name-link:hover {
  opacity: 0.8;
}

.project-name-link:active {
  opacity: 0.7;
}

.text-field {
  margin-bottom: 18px;
  padding: 21px 20px;
  border: 1px solid #e4e4e4;
  border-radius: 0px;
  -webkit-transition: border-color 400ms ease;
  transition: border-color 400ms ease;
  font-size: 14px;
  line-height: 26px;
}

.text-field:hover {
  border-color: #e3e6eb;
}

.text-field:active {
  border-color: #43464d;
}

.text-field:focus {
  border-color: #43464d;
}

.text-field::-webkit-input-placeholder {
  color: rgba(50, 52, 58, 0.4);
}

.text-field:-ms-input-placeholder {
  color: rgba(50, 52, 58, 0.4);
}

.text-field::-ms-input-placeholder {
  color: rgba(50, 52, 58, 0.4);
}

.text-field::placeholder {
  color: rgba(50, 52, 58, 0.4);
}

.text-field.cc-textarea {
  height: 200px;
  padding-top: 12px;
}

.status-message {
  padding: 9px 30px;
  background-color: #202020;
  color: #fff;
  font-size: 14px;
  line-height: 26px;
  text-align: center;
}

.status-message.cc-success-message {
  background-color: #12b878;
}

.status-message.cc-error-message {
  background-color: #db4b68;
}

.contact {
  padding-top: 80px;
  padding-bottom: 90px;
}

.contact-headline {
  width: 70%;
  margin-bottom: 40px;
}

.contact-form-grid {
  grid-column-gap: 30px;
  grid-row-gap: 10px;
}

.contact-form-wrap {
  width: 70%;
}

.footer-wrap {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  overflow: hidden;
  padding: 40px 50px;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.webflow-link {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  opacity: 0.5;
  -webkit-transition: opacity 400ms ease;
  transition: opacity 400ms ease;
  text-decoration: none;
  text-transform: uppercase;
}

.webflow-link:hover {
  opacity: 1;
}

.webflow-link:active {
  opacity: 0.8;
}

.webflow-logo-tiny {
  margin-top: -2px;
  margin-right: 8px;
}

.footer-links {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-right: -20px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.footer-item {
  margin-right: 20px;
  margin-left: 20px;
  opacity: 0.6;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 1px;
  text-decoration: none;
  text-transform: uppercase;
}

.footer-item:hover {
  opacity: 0.9;
}

.footer-item:active {
  opacity: 0.8;
}

.about-intro-grid {
  margin-top: 100px;
  margin-bottom: 140px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  grid-column-gap: 80px;
  grid-row-gap: 30px;
  grid-template-areas: ". .";
  -ms-grid-columns: 1fr 80px 2fr;
  grid-template-columns: 1fr 2fr;
  -ms-grid-rows: auto;
  grid-template-rows: auto;
}

.hi-there-heading {
  margin-top: 10px;
  margin-bottom: 20px;
}

.service-name-text {
  margin-bottom: 10px;
  opacity: 0.6;
  font-size: 30px;
  line-height: 46px;
}

.skillset-wrap {
  padding-right: 60px;
}

.reference-link {
  opacity: 0.6;
  font-size: 14px;
  line-height: 26px;
  text-decoration: none;
}

.reference-link:hover {
  opacity: 1;
}

.reference-link:active {
  opacity: 0.9;
}

.featured-item-wrap {
  margin-bottom: 25px;
}

.services-items-grid {
  padding-top: 10px;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  grid-template-areas: ". .";
  -ms-grid-rows: auto;
  grid-template-rows: auto;
}

.skills-grid {
  margin-bottom: 140px;
  grid-column-gap: 80px;
  grid-row-gap: 30px;
  grid-template-areas: ". .";
  -ms-grid-columns: 1fr 80px 1fr;
  grid-template-columns: 1fr 1fr;
  -ms-grid-rows: auto;
  grid-template-rows: auto;
}

.personal-features-grid {
  margin-bottom: 110px;
  grid-column-gap: 80px;
  grid-row-gap: 20px;
  grid-template-areas: ". ." ". .";
  -ms-grid-rows: auto 20px auto;
  grid-template-rows: auto auto;
}

.speaking-text {
  display: inline-block;
  margin-right: 8px;
}

.speaking-text.cc-past-speaking {
  opacity: 0.6;
}

.speaking-detail {
  display: inline-block;
  opacity: 0.6;
}

.upcoming-wrap {
  margin-bottom: 40px;
}

.social-media-heading {
  margin-bottom: 60px;
}

.social-media-grid {
  margin-bottom: 30px;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  -ms-grid-rows: auto 30px auto;
  grid-template-areas: ". . . ." ". . . .";
  -ms-grid-columns: 1fr 30px 1fr 30px 1fr 30px 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.project-overview-grid {
  margin-top: 120px;
  margin-bottom: 135px;
  grid-column-gap: 50px;
  grid-row-gap: 6px;
  grid-template-areas: ". . . ." ". . Area Area";
  -ms-grid-columns: 1fr 50px 1fr 50px 1fr 50px 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  -ms-grid-rows: auto 6px auto 6px auto;
  grid-template-rows: auto auto auto;
}

.detail-header-image {
  width: 100%;
}

.project-description-grid {
  margin-top: 120px;
  margin-bottom: 120px;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  grid-template-areas: "Area . Area-2";
  -ms-grid-columns: 2fr 30px 2.5fr 30px 1fr;
  grid-template-columns: 2fr 2.5fr 1fr;
  -ms-grid-rows: auto;
  grid-template-rows: auto;
}

.detail-image {
  width: 100%;
  margin-bottom: 30px;
}

.email-section {
  width: 70%;
  margin: 140px auto 200px;
  text-align: center;
}

.email-link {
  margin-top: 15px;
  margin-bottom: 15px;
  color: #888;
  font-size: 64px;
  line-height: 88px;
  font-weight: 400;
  text-decoration: none;
  text-transform: none;
}

.email-link:hover {
  opacity: 0.8;
}

.email-link:active {
  opacity: 0.7;
}

.utility-page-wrap {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100vw;
  height: 100vh;
  max-height: 100%;
  max-width: 100%;
  padding: 30px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  color: #fff;
  text-align: center;
}

._404-wrap {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 30px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #1a1b1f;
}

._404-content-wrap {
  margin-bottom: 20px;
}

.protected-wrap {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding-top: 90px;
  padding-bottom: 100px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  text-align: center;
}

.protected-form {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}

.protected-heading {
  margin-bottom: 30px;
}

.heading {
  color: #fff;
}

.heading-2 {
  color: #fdfdfd;
}

.body {
  background-color: #161616;
  color: #1a1b1f;
}

.heading-3 {
  color: #fff;
}

.field-label {
  color: #a7a7a7;
}

.field-label-2 {
  color: #a7a7a7;
}

.field-label-3 {
  color: #a7a7a7;
}

.paragraph {
  color: #8a8a8a;
}

.heading-4 {
  color: #929292;
}

.image {
  position: relative;
  left: 0%;
  top: 70px;
  right: 0%;
  bottom: 0%;
  display: block;
  height: 450px;
  clear: none;
}

.section-2 {
  overflow: hidden;
  width: 100%;
  height: 900px;
  background-image: url("https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5de704f1524e504495eeb0a3_Screenshot_2019-12-03%2017.58.56_P8wBpW.png");
  background-position: 50% 100%;
  background-size: cover;
}

.position-name-text-right {
  margin-bottom: 10px;
  color: #e9e9e9;
  font-size: 20px;
  line-height: 34px;
  font-weight: 400;
  text-align: right;
  text-transform: none;
}

.div-block {
  height: 200px;
}

.hero-section {
  display: block;
  padding-top: 100px;
  padding-bottom: 100px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.flex-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.hero-media {
  width: 100%;
  margin-left: 25px;
  -webkit-box-flex: 0;
  -webkit-flex: 0 0.5 auto;
  -ms-flex: 0 0.5 auto;
  flex: 0 0.5 auto;
}

.feature-section {
  padding-top: 100px;
  padding-bottom: 100px;
}

.feature-media {
  width: 100%;
  margin-right: 25px;
}

.heading-5 {
  color: #cfcfcf;
}

.paragraph-2 {
  color: #999;
}

.section-3 {
  width: auto;
  margin-right: 0px;
  margin-left: 0px;
}

.section-3.cc-contact {
  padding-right: 80px;
  padding-left: 80px;
  background-color: #292929;
}

.div-block-2 {
  position: static;
}

.project-description-grid-2 {
  width: auto;
  margin-top: 0px;
  margin-right: 19px;
  margin-bottom: 0px;
  grid-column-gap: 74px;
  grid-row-gap: 30px;
  grid-template-areas: "Area Area-3 Area-3" "Area Area-4 Area-4" "Area Area-6 Area-6";
  -ms-grid-columns: 4fr 74px 1.75fr 74px 1fr;
  grid-template-columns: 4fr 1.75fr 1fr;
  -ms-grid-rows: 86px 30px auto 30px auto;
  grid-template-rows: 86px auto auto;
}

.container-2 {
  width: auto;
  height: auto;
  max-width: none;
  margin-right: 0px;
  margin-left: 0px;
}

.paragraph-light-2 {
  margin-top: 0px;
  margin-left: -80px;
  opacity: 0.6;
  color: #fff;
}

.paragraph-light-2.cc-position-name {
  margin-bottom: 5px;
}

.heading-6 {
  margin-left: -80px;
  color: #bdbdbd;
}

.image-2 {
  width: auto;
  max-width: 95%;
  margin-left: -80px;
  padding-top: 24px;
}

.cta-section {
  padding-top: 100px;
  padding-bottom: 100px;
}

.centered-container {
  margin-right: auto;
  margin-left: auto;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  text-align: center;
}

.heading-7 {
  color: #bfc0c2;
}

.paragraph-3 {
  padding-left: 42px;
  color: #b1b2b6;
  font-size: 18px;
  text-align: left;
}

.grid {
  padding: 10px 20px;
  grid-column-gap: 44px;
  grid-row-gap: 37px;
  grid-template-areas: "Area Area-2" "Area-3 Area-4";
  -ms-grid-rows: auto 37px auto 37px auto 37px auto;
  grid-template-rows: auto auto auto auto;
  border-radius: 20px;
  background-color: #2b2b2b;
}

.heading-8 {
  color: #d4d4d4;
}

.text-block {
  color: #d4d4d4;
}

.image-3 {
  width: 100%;
  min-width: 0px;
  margin-top: 35px;
  margin-right: 0px;
  margin-left: 0px;
}

.centered-container-copy {
  display: inline;
  margin-right: auto;
  margin-left: auto;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  grid-auto-columns: 1fr;
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  -ms-grid-columns: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  -ms-grid-rows: auto auto;
  grid-template-rows: auto auto;
  text-align: center;
}

.grid-2 {
  overflow: hidden;
  margin-right: 100px;
  margin-left: 100px;
  grid-column-gap: 164px;
  grid-template-areas: "Area Area-2 Area-3 Area-4 Area-5";
  -ms-grid-columns: 1fr 164px 1fr 164px 1fr 164px 1fr 164px 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  -ms-grid-rows: auto;
  grid-template-rows: auto;
}

.parallaxbarn {
  position: absolute;
  left: 0%;
  top: auto;
  right: 0%;
  bottom: auto;
  z-index: -1;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  overflow: visible;
  width: 100%;
  height: auto;
  min-height: 100%;
  min-width: 100%;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.barn {
  position: static;
  z-index: auto;
  width: 60%;
  height: auto;
  opacity: 0.15;
}

.parallaxfence {
  position: absolute;
  left: 0%;
  top: auto;
  right: 0%;
  bottom: auto;
  z-index: -1;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 50px;
  min-height: 2300px;
  min-width: 100%;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.fence {
  position: static;
  z-index: auto;
  width: 100%;
  height: auto;
  opacity: 0.15;
}

.parallaxsilo {
  position: absolute;
  left: 0%;
  top: auto;
  right: 0%;
  bottom: auto;
  z-index: -1;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  overflow: visible;
  width: 100%;
  height: 100%;
  min-width: 100%;
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.silo {
  position: static;
  left: auto;
  top: 0%;
  right: 0%;
  bottom: 0%;
  z-index: auto;
  overflow: visible;
  width: 40%;
  height: auto;
  margin-right: 32px;
  opacity: 0.15;
}

.div-block-3 {
  position: absolute;
  top: 0px;
  z-index: 1;
  width: 100%;
  height: 1000%;
  margin-top: 120px;
  background-color: #161616;
  color: #1a1b1f;
}

.text-block-2 {
  color: #d4d4d4;
  text-align: center;
}

.container-3 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.container-4 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.image-4 {
  width: auto;
  height: 100%;
}

.project-description-grid-4 {
  width: auto;
  margin-top: 0px;
  margin-right: 19px;
  margin-bottom: 0px;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  grid-template-areas: ". Area-3 Area-4" ". Area-5 Area-4";
  -ms-grid-columns: 2.25fr 30px 2.75fr 30px 1.25fr 30px 2.5fr;
  grid-template-columns: 2.25fr 2.75fr 1.25fr 2.5fr;
  -ms-grid-rows: 86px 30px auto;
  grid-template-rows: 86px auto;
}

.heading-6-co {
  margin-left: -30px;
  color: #bdbdbd;
}

.heading-9 {
  color: #d4d4d4;
  font-size: 200%;
  text-align: center;
}

.text-block-3 {
  color: #d4d4d4;
  font-size: 18px;
  text-align: left;
}

.image-5 {
  position: static;
  left: 0%;
  top: 0%;
  right: 0%;
  bottom: 0%;
  z-index: 1;
  width: 50px;
  max-width: 50px;
  margin-left: 0%;
  padding-top: 0%;
  -webkit-align-self: center;
  -ms-flex-item-align: center;
  -ms-grid-row-align: center;
  align-self: center;
  -webkit-box-flex: 0;
  -webkit-flex: 0 auto;
  -ms-flex: 0 auto;
  flex: 0 auto;
  opacity: 1;
}

.lightbox-link {
  position: relative;
  min-height: 300px;
  cursor: pointer;
}

.div-block-4 {
  position: absolute;
  left: 0%;
  top: 0%;
  right: 0%;
  bottom: 0%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  height: 100%;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #1f1f1f;
  opacity: 0;
  cursor: pointer;
}

.grid-3 {
  margin-right: 0px;
  padding: 25px 15px 30px 25px;
  grid-template-areas: "Area-2 Area" "Area-3 Area";
  border-radius: 20px 0px 0px 20px;
  background-color: #363636;
}

.centered-container-2 {
  position: static;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  text-align: center;
}

.heading-10 {
  width: 100%;
  padding-bottom: 23px;
  color: #d4d4d4;
}

.image-6 {
  width: auto;
  height: auto;
  margin-right: auto;
  margin-left: auto;
}

.image-7 {
  display: inline-block;
  width: auto;
  height: 700px;
}

.section-mockups {
  position: relative;
  overflow: visible;
  margin-right: auto;
  margin-left: auto;
  padding-bottom: 0px;
}

.section-mockups.cc-contact {
  padding-right: 80px;
  padding-left: 80px;
  background-color: #292929;
}

.grid-4 {
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  justify-items: center;
  -webkit-box-align: start;
  -webkit-align-items: start;
  -ms-flex-align: start;
  align-items: start;
  grid-column-gap: 140px;
  grid-template-areas: "Area Area" "Area-2 Area-3";
  -ms-grid-columns: 1fr 140px 1fr;
  grid-template-columns: 1fr 1fr;
}

.image-8 {
  display: inline-block;
  width: 300px;
  height: auto;
  padding: 100px 0px;
}

.cta-section-2 {
  padding-top: 0px;
  padding-bottom: 0px;
}

.heading-hidden {
  width: 100%;
  opacity: 1;
  color: #d4d4d4;
}

.grid-4-copy {
  justify-items: center;
  -webkit-box-align: start;
  -webkit-align-items: start;
  -ms-flex-align: start;
  align-items: start;
  grid-template-areas: "Area Area Area" "Area-2 Area-3 Area-4";
  -ms-grid-columns: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
}

.grid-5 {
  width: auto;
  -webkit-box-pack: stretch;
  -webkit-justify-content: stretch;
  -ms-flex-pack: stretch;
  justify-content: stretch;
  justify-items: center;
  -webkit-box-align: start;
  -webkit-align-items: start;
  -ms-flex-align: start;
  align-items: start;
  -webkit-align-content: start;
  -ms-flex-line-pack: start;
  align-content: start;
  grid-column-gap: 140px;
  grid-template-areas: "Area Area Area" "Area-2 Area-3 Area-4";
  -ms-grid-columns: 1fr 140px 1fr 140px 1fr;
  grid-template-columns: 1fr 1fr 1fr;
}

.centered-container-3 {
  position: static;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  text-align: center;
}

.cta-section-3 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding-top: 0px;
  padding-bottom: 0px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.div-block-5 {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.parallaxcloud1 {
  position: absolute;
  left: 0%;
  top: 1000px;
  right: 0%;
  bottom: auto;
  z-index: -1;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  overflow: hidden;
  width: 100%;
  height: auto;
  min-height: auto;
  min-width: 100%;
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.parallaxappicon {
  position: absolute;
  left: 0%;
  top: auto;
  right: 0%;
  bottom: auto;
  z-index: -1;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  overflow: visible;
  width: 100%;
  height: auto;
  min-height: 100%;
  min-width: 100%;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.cloud {
  position: static;
  left: auto;
  top: 0%;
  right: 0%;
  bottom: 0%;
  z-index: auto;
  width: 60%;
  height: auto;
  margin-right: 32px;
  opacity: 0.15;
}

.parallaxcloud2 {
  position: absolute;
  left: 0%;
  top: 2000px;
  right: 0%;
  bottom: auto;
  z-index: -1;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  overflow: hidden;
  width: 100%;
  height: auto;
  min-height: auto;
  min-width: 100%;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.cloud2 {
  position: static;
  left: auto;
  top: 0%;
  right: 0%;
  bottom: 0%;
  z-index: auto;
  width: 80%;
  height: auto;
  margin-right: 32px;
  opacity: 0.15;
}

.parallaxcloud3 {
  position: absolute;
  left: 0%;
  top: 3000px;
  right: 0%;
  bottom: auto;
  z-index: -1;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  overflow: hidden;
  width: 100%;
  height: auto;
  min-height: auto;
  min-width: 100%;
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.cloud3 {
  position: static;
  left: auto;
  top: 0%;
  right: 0%;
  bottom: 0%;
  z-index: auto;
  width: 90%;
  height: auto;
  margin-right: -115px;
  opacity: 0.15;
}

.image-9 {
  display: inline-block;
  width: auto;
  height: 85%;
  padding: 0px;
}

.centered-container-4 {
  position: static;
  padding-bottom: 100px;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  text-align: center;
}

.project-description-grid-3 {
  width: 100%;
  margin-top: 0px;
  margin-right: 19px;
  margin-bottom: 0px;
  grid-column-gap: 74px;
  grid-row-gap: 30px;
  grid-template-areas: "Area Area-3 Area-3 ." "Area Area-4 Area-4 ." "Area Area-6 Area-6 Area-6";
  -ms-grid-columns: 8fr 74px 1.75fr 74px 1.5fr 74px 0.5fr;
  grid-template-columns: 8fr 1.75fr 1.5fr 0.5fr;
  -ms-grid-rows: 86px 30px auto 30px auto;
  grid-template-rows: 86px auto auto;
}

.section-full {
  overflow: hidden;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-bottom: 100px;
}

.section-full.cc-contact {
  padding-right: 80px;
  padding-left: 80px;
  background-color: #292929;
}

.body-2 {
  overflow: visible;
}

.parallaxcloud2-2 {
  position: absolute;
  left: 0%;
  top: -218px;
  right: 0%;
  bottom: auto;
  z-index: -1;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  overflow: hidden;
  width: 100%;
  height: auto;
  min-height: 100%;
  min-width: 100%;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.section-padding {
  position: relative;
  top: auto;
  display: block;
  margin-bottom: 191px;
}

.section-padding.cc-contact {
  padding-right: 80px;
  padding-left: 80px;
  background-color: #292929;
}

.paragraph-light-3 {
  margin-top: 0px;
  margin-left: -80px;
  padding-bottom: 90px;
  opacity: 0.6;
  color: #fff;
  font-size: 18px;
}

.paragraph-light-3.cc-position-name {
  margin-bottom: 5px;
}

.image-invert {
  position: absolute;
  left: 0%;
  top: 0%;
  right: 0%;
  bottom: 0%;
  z-index: 1;
  display: none;
  width: 50px;
  max-width: 50px;
  margin-left: 37%;
  padding-top: 65%;
  -webkit-align-self: center;
  -ms-flex-item-align: center;
  -ms-grid-row-align: center;
  align-self: center;
  -webkit-box-flex: 0;
  -webkit-flex: 0 auto;
  -ms-flex: 0 auto;
  flex: 0 auto;
  opacity: 0.6;
  -webkit-filter: invert(100%);
  filter: invert(100%);
}

.image-invert-2 {
  position: absolute;
  left: 0%;
  top: 0%;
  right: 0%;
  bottom: 0%;
  z-index: 1;
  display: none;
  width: 50px;
  max-width: 50px;
  margin-left: 37%;
  padding-top: 63%;
  -webkit-align-self: center;
  -ms-flex-item-align: center;
  -ms-grid-row-align: center;
  align-self: center;
  -webkit-box-flex: 0;
  -webkit-flex: 0 auto;
  -ms-flex: 0 auto;
  flex: 0 auto;
  opacity: 1;
  -webkit-filter: blur(5px) invert(100%);
  filter: blur(5px) invert(100%);
}

.navigatorspacer {
  height: 0px;
  padding-bottom: 120px;
}

.text-block-right {
  color: #d4d4d4;
  font-size: 18px;
  text-align: left;
}

.text-block-left {
  color: #d4d4d4;
  font-size: 18px;
  text-align: right;
}

@media (max-width: 991px) {
  .styleguide-block {
    text-align: center;
  }
  .grid-heading {
    font-size: 200%;
    line-height: 70px;
  }
  .paragraph-light {
    text-align: left;
  }
  .paragraph-light.cc-position-name {
    text-align: left;
  }
  .section.cc-contact {
    padding-right: 0px;
    padding-left: 0px;
  }
  .button {
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  .logo-link.w--current {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    background-color: #1a1b1f;
  }
  .menu-icon {
    display: block;
    background-color: transparent;
    -webkit-filter: invert(100%);
    filter: invert(100%);
    -webkit-transform: translate(0px, 0px);
    -ms-transform: translate(0px, 0px);
    transform: translate(0px, 0px);
  }
  .navigation-item {
    padding: 15px 30px;
    -webkit-transition: background-color 400ms ease, opacity 400ms ease, color 400ms ease;
    transition: background-color 400ms ease, opacity 400ms ease, color 400ms ease;
    text-align: center;
  }
  .navigation-item:hover {
    background-color: #f7f8f9;
  }
  .navigation-item:active {
    background-color: #eef0f3;
  }
  .navigation-items {
    background-color: #252525;
  }
  .navigation {
    padding: 25px 30px;
    background-color: #252525;
  }
  .menu-button {
    padding: 0px;
  }
  .menu-button.w--open {
    background-color: transparent;
  }
  .navigation-wrap {
    margin-right: 0px;
  }
  .position-name-text {
    text-align: left;
  }
  .work-experience-grid {
    grid-template-areas: ". ." ". .";
    -ms-grid-columns: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    -ms-grid-rows: auto auto;
    grid-template-rows: auto auto;
  }
  .works-grid {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: stretch;
    -webkit-align-items: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
  }
  .carrer-headline-wrap {
    width: auto;
  }
  .work-image {
    margin-bottom: 30px;
  }
  .contact {
    width: auto;
    padding: 30px 50px 40px;
  }
  .contact-headline {
    width: 100%;
  }
  .contact-form-wrap {
    width: 100%;
  }
  .about-intro-grid {
    grid-row-gap: 50px;
    grid-template-areas: "." ".";
    -ms-grid-columns: 1fr;
    grid-template-columns: 1fr;
    -ms-grid-rows: auto 50px auto;
    grid-template-rows: auto auto;
    text-align: center;
  }
  .about-head-text-wrap {
    width: 80%;
    margin-right: auto;
    margin-left: auto;
  }
  .service-name-text {
    font-size: 24px;
    line-height: 42px;
  }
  .skillset-wrap {
    padding-right: 0px;
  }
  .services-items-grid {
    padding-top: 0px;
    grid-row-gap: 0px;
    grid-template-areas: "." ".";
    -ms-grid-columns: 1fr;
    grid-template-columns: 1fr;
    -ms-grid-rows: auto 0px auto;
    grid-template-rows: auto auto;
  }
  .skills-grid {
    width: 80%;
    margin-right: auto;
    margin-left: auto;
    grid-row-gap: 50px;
    grid-template-areas: "." ".";
    -ms-grid-columns: 1fr;
    grid-template-columns: 1fr;
    -ms-grid-rows: auto 50px auto;
    grid-template-rows: auto auto;
    text-align: center;
  }
  .personal-features-grid {
    width: 80%;
    margin-right: auto;
    margin-left: auto;
    grid-template-areas: "." "." "." ".";
    -ms-grid-columns: 1fr;
    grid-template-columns: 1fr;
    -ms-grid-rows: auto auto auto auto;
    grid-template-rows: auto auto auto auto;
    text-align: center;
  }
  .social-media-heading {
    width: 80%;
    margin-right: auto;
    margin-left: auto;
    text-align: center;
  }
  .social-media-grid {
    grid-template-areas: ". ." ". ." ". ." ". .";
    -ms-grid-columns: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    -ms-grid-rows: auto auto auto auto;
    grid-template-rows: auto auto auto auto;
  }
  .project-overview-grid {
    width: 70%;
    margin: 0px auto;
    padding-top: 30px;
    padding-bottom: 31px;
    -webkit-box-align: start;
    -webkit-align-items: start;
    -ms-flex-align: start;
    align-items: start;
    grid-row-gap: 18px;
    grid-template-areas: "." "." ".";
    -ms-grid-columns: 1fr;
    grid-template-columns: 1fr;
    -ms-grid-rows: 0px 18px auto 18px auto;
    grid-template-rows: 0px auto auto;
    text-align: center;
  }
  .project-description-grid {
    width: 80%;
    margin: 50px auto;
    grid-row-gap: 7px;
    grid-template-areas: "." ".";
    -ms-grid-columns: 1fr;
    grid-template-columns: 1fr;
    -ms-grid-rows: auto 7px auto;
    grid-template-rows: auto auto;
    text-align: center;
  }
  .email-section {
    margin-bottom: 160px;
  }
  .email-link {
    font-size: 36px;
    line-height: 54px;
  }
  .image {
    top: 23px;
    height: 300px;
  }
  .section-2 {
    width: 100%;
    height: 600px;
  }
  .position-name-text-right {
    text-align: left;
  }
  .div-block {
    height: 150px;
  }
  .section-3.cc-contact {
    padding-right: 0px;
    padding-left: 0px;
  }
  .project-description-grid-2 {
    width: 80%;
    margin-right: auto;
    margin-left: auto;
    grid-row-gap: 50px;
    grid-template-areas: "." ".";
    -ms-grid-columns: 1fr;
    grid-template-columns: 1fr;
    -ms-grid-rows: auto 50px auto;
    grid-template-rows: auto auto;
    text-align: center;
  }
  .paragraph-3 {
    text-align: left;
  }
  .parallaxfence {
    min-height: 2500px;
  }
  .fence {
    width: 1000px;
    min-width: 1000px;
  }
  .container-3 {
    padding-top: 52px;
  }
  .project-description-grid-4 {
    width: 80%;
    margin-right: auto;
    margin-left: auto;
    grid-row-gap: 50px;
    grid-template-areas: "." ".";
    -ms-grid-columns: 1fr;
    grid-template-columns: 1fr;
    -ms-grid-rows: auto 50px auto;
    grid-template-rows: auto auto;
    text-align: center;
  }
  .image-7 {
    height: 500px;
  }
  .section-mockups.cc-contact {
    padding-right: 0px;
    padding-left: 0px;
  }
  .grid-4 {
    grid-column-gap: 90px;
    grid-template-areas: "Area Area" "Area-2 Area-3";
  }
  .image-8 {
    width: 200px;
    height: auto;
    padding-top: 0px;
    padding-bottom: 0px;
  }
  .grid-5 {
    grid-column-gap: 50px;
    grid-template-areas: "Area Area Area" "Area-2 Area-3 Area-4";
  }
  .centered-container-4 {
    padding-bottom: 0px;
  }
  .project-description-grid-3 {
    width: 80%;
    margin-right: auto;
    margin-left: auto;
    grid-row-gap: 50px;
    grid-template-areas: ". . Area-4" "Area-3 Area-3 Area-2" ". . ." "Area Area Area";
    -ms-grid-columns: 1fr;
    grid-template-columns: 1fr;
    -ms-grid-rows: auto 50px auto;
    grid-template-rows: auto auto;
    text-align: center;
  }
  .section-full.cc-contact {
    padding-right: 0px;
    padding-left: 0px;
  }
  .section-padding.cc-contact {
    padding-right: 0px;
    padding-left: 0px;
  }
  .paragraph-light-3 {
    text-align: left;
  }
  .image-invert {
    display: block;
  }
  .image-invert-2 {
    display: block;
  }
}

@media (max-width: 767px) {
  .heading-jumbo-small {
    font-size: 30px;
    line-height: 52px;
  }
  .rich-text {
    width: 90%;
    max-width: 470px;
    text-align: left;
  }
  .container {
    text-align: center;
  }
  .grid-heading {
    font-size: 50px;
    line-height: 64px;
  }
  .section {
    margin-right: 15px;
    margin-left: 15px;
  }
  .section.cc-contact {
    padding: 15px;
  }
  .paragraph-bigger {
    font-size: 16px;
    line-height: 28px;
  }
  .logo-link {
    padding-left: 0px;
  }
  .navigation {
    padding: 20px 30px;
  }
  .position-name-text {
    text-align: center;
  }
  .work-experience-grid {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .work-position-wrap {
    margin-bottom: 40px;
  }
  .project-name-link {
    font-size: 16px;
    line-height: 28px;
  }
  .text-field.cc-textarea {
    text-align: left;
  }
  .contact {
    padding-right: 30px;
    padding-left: 30px;
  }
  .contact-form-grid {
    grid-column-gap: 30px;
    grid-template-areas: "." "." ".";
    -ms-grid-columns: 1fr;
    grid-template-columns: 1fr;
    -ms-grid-rows: auto auto auto;
    grid-template-rows: auto auto auto;
  }
  .contact-form {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .contact-form-wrap {
    text-align: left;
  }
  .footer-wrap {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    text-align: center;
  }
  .webflow-link {
    margin-bottom: 15px;
  }
  .footer-links {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .footer-item {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 0px;
  }
  .about-head-text-wrap {
    width: 70%;
    max-width: 470px;
  }
  .skills-grid {
    width: 70%;
    max-width: 470px;
    -ms-grid-columns: 1fr;
    grid-template-columns: 1fr;
  }
  .personal-features-grid {
    width: 70%;
    max-width: 470px;
  }
  .social-media-heading {
    width: 70%;
    max-width: 470px;
  }
  .social-media-grid {
    grid-column-gap: 15px;
    grid-row-gap: 15px;
    -ms-grid-columns: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
  }
  .project-overview-grid {
    width: 80%;
    max-width: 470px;
    margin-top: 90px;
    margin-bottom: 95px;
  }
  .project-description-grid {
    width: 70%;
    max-width: 470px;
    margin-top: 90px;
    margin-bottom: 85px;
    -ms-grid-rows: 38px auto;
    grid-template-rows: 38px auto;
  }
  .detail-image {
    margin-bottom: 15px;
  }
  .email-section {
    width: 80%;
    max-width: 470px;
    margin-top: 120px;
    margin-bottom: 120px;
  }
  .email-link {
    font-size: 36px;
    line-height: 54px;
  }
  .utility-page-wrap {
    padding: 15px;
  }
  ._404-wrap {
    padding: 30px;
  }
  .image {
    height: 200px;
  }
  .section-2 {
    height: 400px;
  }
  .position-name-text-right {
    text-align: center;
  }
  .hero-section {
    padding: 40px 20px;
  }
  .flex-container {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .hero-media {
    margin-top: 25px;
    margin-right: 0px;
    margin-left: 0px;
  }
  .feature-section {
    padding: 40px 20px;
  }
  .feature-media {
    margin-right: 0px;
  }
  .section-3 {
    margin-right: 15px;
    margin-left: 15px;
  }
  .section-3.cc-contact {
    padding: 15px;
  }
  .project-description-grid-2 {
    width: 70%;
    max-width: 470px;
    margin-top: 90px;
    margin-bottom: 85px;
  }
  .container-2 {
    text-align: center;
  }
  .heading-6 {
    margin-left: 0px;
  }
  .image-2 {
    max-width: none;
    margin-left: 0px;
    padding-top: 0px;
    border-radius: 0px;
  }
  .cta-section {
    padding: 40px 20px;
  }
  .text-block {
    font-size: 12px;
  }
  .parallaxfence {
    top: 600px;
    overflow: visible;
  }
  .project-description-grid-4 {
    width: 70%;
    max-width: 470px;
    margin-top: 90px;
    margin-bottom: 85px;
  }
  .grid-3 {
    margin-top: 37px;
    grid-template-areas: "Area-2 Area-2" "Area-3 Area";
    border-radius: 16px;
  }
  .image-7 {
    height: 400px;
  }
  .section-mockups {
    margin-right: 15px;
    margin-left: 15px;
  }
  .section-mockups.cc-contact {
    padding: 15px;
  }
  .grid-4 {
    grid-auto-flow: row;
    grid-column-gap: 56px;
    -ms-grid-columns: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
  }
  .image-8 {
    width: 150px;
    height: auto;
  }
  .cta-section-2 {
    padding: 0px 20px;
  }
  .grid-5 {
    grid-column-gap: 21px;
    grid-template-areas: "Area Area Area" "Area-2 Area-3 Area-4";
  }
  .cta-section-3 {
    padding: 0px 20px;
  }
  .centered-container-4 {
    padding-bottom: 0px;
  }
  .project-description-grid-3 {
    width: 70%;
    max-width: 470px;
    margin-top: 90px;
    margin-bottom: 85px;
    grid-row-gap: 0px;
    grid-template-areas: "Area-4 Area-4 Area-4" "Area-2 Area-2 Area-2" "Area-3 Area-3 Area-3" "Area Area Area";
  }
  .section-full {
    width: auto;
    margin-right: 15px;
    margin-left: 15px;
  }
  .section-full.cc-contact {
    padding: 15px;
  }
  .section-padding {
    display: none;
    margin-right: 15px;
    margin-left: 15px;
  }
  .section-padding.cc-contact {
    padding: 15px;
  }
  .paragraph-light-3 {
    margin-left: 0px;
  }
  .text-block-right {
    font-size: 12px;
  }
  .text-block-left {
    font-size: 12px;
  }
}

@media (max-width: 479px) {
  .rich-text {
    width: 100%;
    max-width: none;
  }
  .grid-heading {
    font-size: 200%;
    line-height: 48px;
  }
  .paragraph-light {
    padding-right: 20px;
    padding-left: 20px;
    font-size: 14px;
    line-height: 20px;
  }
  .paragraph-light.cc-position-name {
    font-size: 14px;
  }
  .navigation {
    padding-right: 20px;
    padding-left: 20px;
  }
  .menu-button {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 auto;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
  }
  .menu-button.w--open {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 auto;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
  }
  .contact {
    padding-right: 15px;
    padding-left: 15px;
  }
  .contact-form {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .contact-form-wrap {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .footer-wrap {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .about-head-text-wrap {
    width: 100%;
    max-width: none;
  }
  .skills-grid {
    width: 100%;
    max-width: none;
    -ms-grid-columns: 1fr;
    grid-template-columns: 1fr;
  }
  .personal-features-grid {
    width: 100%;
    max-width: none;
  }
  .social-media-heading {
    width: 100%;
    max-width: none;
  }
  .project-overview-grid {
    width: 100%;
    max-width: none;
  }
  .project-description-grid {
    width: 100%;
    max-width: none;
  }
  .email-section {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    max-width: none;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .email-link {
    font-size: 30px;
    line-height: 46px;
  }
  .image {
    height: 150px;
  }
  .section-2 {
    height: 275px;
  }
  .div-block {
    height: 100px;
  }
  .project-description-grid-2 {
    width: 100%;
    max-width: none;
  }
  .paragraph-3 {
    font-size: 14px;
    line-height: 20px;
  }
  .grid {
    grid-row-gap: 5px;
  }
  .heading-8 {
    font-size: 15px;
  }
  .text-block {
    overflow: visible;
    font-size: 8px;
    line-height: 15px;
    white-space: normal;
  }
  .parallaxfence {
    display: none;
  }
  .project-description-grid-4 {
    width: 100%;
    max-width: none;
  }
  .text-block-3 {
    font-size: 10px;
  }
  .grid-3 {
    grid-template-areas: "Area-2 Area-2" "Area-3 Area-3" "Area Area";
    -ms-grid-rows: auto auto auto;
    grid-template-rows: auto auto auto;
  }
  .image-7 {
    width: auto;
  }
  .grid-4 {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    padding-right: 0px;
    padding-left: 1px;
    grid-auto-columns: 1fr;
    grid-column-gap: 56px;
    grid-row-gap: 16px;
    -ms-grid-columns: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    -ms-grid-rows: auto auto;
    grid-template-rows: auto auto;
  }
  .image-8 {
    width: 129px;
    height: 250px;
    padding: 10px 5px;
  }
  .grid-5 {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    grid-auto-columns: 1fr;
    grid-column-gap: 21px;
    grid-row-gap: 16px;
    -ms-grid-columns: 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    -ms-grid-rows: auto auto;
    grid-template-rows: auto auto;
  }
  .parallaxcloud2 {
    top: 1500px;
  }
  .parallaxcloud3 {
    top: 1800px;
  }
  .cloud3 {
    width: 90%;
  }
  .project-description-grid-3 {
    display: -ms-grid;
    display: grid;
    width: 100%;
    max-width: none;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    grid-auto-columns: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    grid-template-areas: "Area-4 Area-4 Area-4" "Area-2 Area-2 Area-2" "Area-3 Area-3 Area-3" "Area Area Area";
    -ms-grid-columns: 1fr;
    grid-template-columns: 1fr;
    -ms-grid-rows: auto 0px auto;
    grid-template-rows: auto auto;
  }
  .paragraph-light-3 {
    margin-left: 0px;
    font-size: 14px;
    line-height: 20px;
  }
  .text-block-4 {
    font-size: 13px;
    text-align: center;
  }
  .text-block-right {
    overflow: visible;
    font-size: 8px;
    line-height: 15px;
    white-space: normal;
  }
  .text-block-left {
    overflow: visible;
    font-size: 8px;
    line-height: 15px;
    white-space: normal;
  }
}

#w-node-8f65c72d8fa5-bad9583c {
  -ms-grid-column: 1;
  grid-column-start: 1;
  -ms-grid-column-span: 2;
  grid-column-end: 3;
  -ms-grid-row: 1;
  grid-row-start: 1;
  -ms-grid-row-span: 1;
  grid-row-end: 2;
}

#w-node-8f65c72d8fad-bad9583c {
  -ms-grid-column: 3;
  grid-column-start: 3;
  -ms-grid-column-span: 1;
  grid-column-end: 4;
  -ms-grid-row: 1;
  grid-row-start: 1;
  -ms-grid-row-span: 1;
  grid-row-end: 2;
}

#w-node-e8107b8cba1b-bad9583c {
  -ms-grid-column: 1;
  grid-column-start: 1;
  -ms-grid-column-span: 2;
  grid-column-end: 3;
  -ms-grid-row: 1;
  grid-row-start: 1;
  -ms-grid-row-span: 1;
  grid-row-end: 2;
}

#w-node-e8107b8cba25-bad9583c {
  -ms-grid-column: 3;
  grid-column-start: 3;
  -ms-grid-column-span: 1;
  grid-column-end: 4;
  -ms-grid-row: 1;
  grid-row-start: 1;
  -ms-grid-row-span: 1;
  grid-row-end: 2;
}

#w-node-8f65c72d8fc9-bad9583c {
  -ms-grid-column: 1;
  grid-column-start: 1;
  -ms-grid-column-span: 1;
  grid-column-end: 2;
  -ms-grid-row: 1;
  grid-row-start: 1;
  -ms-grid-row-span: 1;
  grid-row-end: 2;
}

#w-node-8f65c72d8fd1-bad9583c {
  -ms-grid-column: 2;
  grid-column-start: 2;
  -ms-grid-column-span: 1;
  grid-column-end: 3;
  -ms-grid-row: 1;
  grid-row-start: 1;
  -ms-grid-row-span: 1;
  grid-row-end: 2;
}

#w-node-a852d0df4a32-d0df4a24 {
  -ms-grid-column: 1;
  grid-column-start: 1;
  -ms-grid-column-span: 1;
  grid-column-end: 2;
  -ms-grid-row: 1;
  grid-row-start: 1;
  -ms-grid-row-span: 1;
  grid-row-end: 2;
}

#w-node-a852d0df4a36-d0df4a24 {
  -ms-grid-column: 2;
  grid-column-start: 2;
  -ms-grid-column-span: 1;
  grid-column-end: 3;
  -ms-grid-row: 1;
  grid-row-start: 1;
  -ms-grid-row-span: 1;
  grid-row-end: 2;
}

#w-node-a852d0df4a3a-d0df4a24 {
  -ms-grid-column: 1;
  grid-column-start: 1;
  -ms-grid-column-span: 2;
  grid-column-end: 3;
  -ms-grid-row: 2;
  grid-row-start: 2;
  -ms-grid-row-span: 1;
  grid-row-end: 3;
}

#w-node-7dee623c62c1-cbd95841 {
  -ms-grid-column: 1;
  grid-column-start: 1;
  -ms-grid-column-span: 1;
  grid-column-end: 2;
  -ms-grid-row: 1;
  grid-row-start: 1;
  -ms-grid-row-span: 1;
  grid-row-end: 2;
}

#w-node-7dee623c62c8-cbd95841 {
  -ms-grid-column: 2;
  grid-column-start: 2;
  -ms-grid-column-span: 1;
  grid-column-end: 3;
  -ms-grid-row: 1;
  grid-row-start: 1;
  -ms-grid-row-span: 1;
  grid-row-end: 2;
}

#w-node-4224828ffd8a-cbd95841 {
  -ms-grid-column: 1;
  grid-column-start: 1;
  -ms-grid-column-span: 1;
  grid-column-end: 2;
  -ms-grid-row: 1;
  grid-row-start: 1;
  -ms-grid-row-span: 1;
  grid-row-end: 2;
}

#w-node-4224828ffd8f-cbd95841 {
  -ms-grid-column: 2;
  grid-column-start: 2;
  -ms-grid-column-span: 1;
  grid-column-end: 3;
  -ms-grid-row: 1;
  grid-row-start: 1;
  -ms-grid-row-span: 1;
  grid-row-end: 2;
}

#w-node-4224828ffd90-cbd95841 {
  -ms-grid-column: 1;
  grid-column-start: 1;
  -ms-grid-column-span: 1;
  grid-column-end: 2;
  -ms-grid-row: 1;
  grid-row-start: 1;
  -ms-grid-row-span: 1;
  grid-row-end: 2;
}

#w-node-4224828ffd99-cbd95841 {
  -ms-grid-column: 2;
  grid-column-start: 2;
  -ms-grid-column-span: 1;
  grid-column-end: 3;
  -ms-grid-row: 1;
  grid-row-start: 1;
  -ms-grid-row-span: 1;
  grid-row-end: 2;
}

#w-node-4224828ffda1-cbd95841 {
  -ms-grid-column: 1;
  grid-column-start: 1;
  -ms-grid-column-span: 1;
  grid-column-end: 2;
  -ms-grid-row: 1;
  grid-row-start: 1;
  -ms-grid-row-span: 1;
  grid-row-end: 2;
}

#w-node-4224828ffda6-cbd95841 {
  -ms-grid-column: 1;
  grid-column-start: 1;
  -ms-grid-column-span: 1;
  grid-column-end: 2;
  -ms-grid-row: 2;
  grid-row-start: 2;
  -ms-grid-row-span: 1;
  grid-row-end: 3;
}

#w-node-4224828ffdd8-cbd95841 {
  -ms-grid-column: 2;
  grid-column-start: 2;
  -ms-grid-column-span: 1;
  grid-column-end: 3;
  -ms-grid-row: 2;
  grid-row-start: 2;
  -ms-grid-row-span: 1;
  grid-row-end: 3;
}

#w-node-4224828ffe12-cbd95841 {
  -ms-grid-column: 2;
  grid-column-start: 2;
  -ms-grid-column-span: 1;
  grid-column-end: 3;
  -ms-grid-row: 1;
  grid-row-start: 1;
  -ms-grid-row-span: 1;
  grid-row-end: 2;
}

#w-node-8239d41d1e9d-cbd95841 {
  -ms-grid-column: 1;
  grid-column-start: 1;
  -ms-grid-column-span: 1;
  grid-column-end: 2;
  -ms-grid-row: 1;
  grid-row-start: 1;
  -ms-grid-row-span: 1;
  grid-row-end: 2;
}

#w-node-8239d41d1e9d-cbd95841:active {
  -ms-grid-column: 1;
  grid-column-start: 1;
  -ms-grid-column-span: 1;
  grid-column-end: 2;
  -ms-grid-row: 1;
  grid-row-start: 1;
  -ms-grid-row-span: 1;
  grid-row-end: 2;
}

#w-node-8239d41d1e9e-cbd95841 {
  -ms-grid-column: 2;
  grid-column-start: 2;
  -ms-grid-column-span: 1;
  grid-column-end: 3;
  -ms-grid-row: 2;
  grid-row-start: 2;
  -ms-grid-row-span: 1;
  grid-row-end: 3;
}

#w-node-8239d41d1e9f-cbd95841 {
  -ms-grid-column: 2;
  grid-column-start: 2;
  -ms-grid-column-span: 1;
  grid-column-end: 3;
  -ms-grid-row: 1;
  grid-row-start: 1;
  -ms-grid-row-span: 1;
  grid-row-end: 2;
}

#w-node-8239d41d1ea0-cbd95841 {
  -ms-grid-column: 1;
  grid-column-start: 1;
  -ms-grid-column-span: 1;
  grid-column-end: 2;
  -ms-grid-row: 2;
  grid-row-start: 2;
  -ms-grid-row-span: 1;
  grid-row-end: 3;
}

#w-node-8239d41d1ea1-cbd95841 {
  -ms-grid-column: 3;
  grid-column-start: 3;
  -ms-grid-column-span: 1;
  grid-column-end: 4;
  -ms-grid-row: 1;
  grid-row-start: 1;
  -ms-grid-row-span: 1;
  grid-row-end: 2;
}

#w-node-8239d41d1ea2-cbd95841 {
  -ms-grid-column: 4;
  grid-column-start: 4;
  -ms-grid-column-span: 1;
  grid-column-end: 5;
  -ms-grid-row: 1;
  grid-row-start: 1;
  -ms-grid-row-span: 1;
  grid-row-end: 2;
}

#w-node-8239d41d1ea3-cbd95841 {
  -ms-grid-column: 3;
  grid-column-start: 3;
  -ms-grid-column-span: 1;
  grid-column-end: 4;
  -ms-grid-row: 2;
  grid-row-start: 2;
  -ms-grid-row-span: 1;
  grid-row-end: 3;
}

#w-node-8239d41d1ea4-cbd95841 {
  -ms-grid-column: 4;
  grid-column-start: 4;
  -ms-grid-column-span: 1;
  grid-column-end: 5;
  -ms-grid-row: 2;
  grid-row-start: 2;
  -ms-grid-row-span: 1;
  grid-row-end: 3;
}

#w-node-f2c6de040bbf-8ed95842 {
  -ms-grid-column: 1;
  grid-column-start: 1;
  -ms-grid-column-span: 3;
  grid-column-end: 4;
  -ms-grid-row: 1;
  grid-row-start: 1;
  -ms-grid-row-span: 1;
  grid-row-end: 2;
}

#w-node-f2c6de040bc4-8ed95842 {
  -ms-grid-column: 1;
  grid-column-start: 1;
  -ms-grid-column-span: 2;
  grid-column-end: 3;
  -ms-grid-row: 2;
  grid-row-start: 2;
  -ms-grid-row-span: 1;
  grid-row-end: 3;
}

#w-node-f2c6de040bc9-8ed95842 {
  -ms-grid-column: 3;
  grid-column-start: 3;
  -ms-grid-column-span: 2;
  grid-column-end: 5;
  -ms-grid-row: 2;
  grid-row-start: 2;
  -ms-grid-row-span: 1;
  grid-row-end: 3;
}

#w-node-ee63d52fd223-8ed95842 {
  -ms-grid-column: 1;
  grid-column-start: 1;
  -ms-grid-column-span: 1;
  grid-column-end: 2;
  -ms-grid-row: 1;
  grid-row-start: 1;
  -ms-grid-row-span: 1;
  grid-row-end: 2;
}

#w-node-ee63d52fd22b-8ed95842 {
  -ms-grid-column: 2;
  grid-column-start: 2;
  -ms-grid-column-span: 1;
  grid-column-end: 3;
  -ms-grid-row: 1;
  grid-row-start: 1;
  -ms-grid-row-span: 1;
  grid-row-end: 2;
}

#w-node-f2c6de040bc4-39d95844 {
  -ms-grid-column: 1;
  grid-column-start: 1;
  -ms-grid-column-span: 2;
  grid-column-end: 3;
  -ms-grid-row: 2;
  grid-row-start: 2;
  -ms-grid-row-span: 1;
  grid-row-end: 3;
}

#w-node-f2c6de040bc9-39d95844 {
  -ms-grid-column: 3;
  grid-column-start: 3;
  -ms-grid-column-span: 2;
  grid-column-end: 5;
  -ms-grid-row: 2;
  grid-row-start: 2;
  -ms-grid-row-span: 1;
  grid-row-end: 3;
  -ms-grid-column-align: center;
  justify-self: center;
  -ms-grid-row-align: center;
  align-self: center;
}

#w-node-3920c47f98cf-39d95844 {
  -ms-grid-column: 2;
  grid-column-start: 2;
  -ms-grid-column-span: 1;
  grid-column-end: 3;
  -ms-grid-row: 1;
  grid-row-start: 1;
  -ms-grid-row-span: 1;
  grid-row-end: 2;
}

#w-node-3920c47f98d1-39d95844 {
  -ms-grid-column: 1;
  grid-column-start: 1;
  -ms-grid-column-span: 1;
  grid-column-end: 2;
  -ms-grid-row: 1;
  grid-row-start: 1;
  -ms-grid-row-span: 1;
  grid-row-end: 2;
}

#w-node-c71e3091b869-39d95844 {
  -ms-grid-row: 3;
  -ms-grid-column: 5;
  -ms-grid-column-span: 3;
  grid-area: Area;
}

.project-description-grid>#w-node-c71e3091b869-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
}

.project-description-grid-2>#w-node-c71e3091b869-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-row-span: 5;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
}

.grid>#w-node-c71e3091b869-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-row-span: 1;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
}

.grid-2>#w-node-c71e3091b869-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-row-span: 1;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
}

.grid-3>#w-node-c71e3091b869-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-row-span: 2;
  -ms-grid-column: 2;
  -ms-grid-column-span: 1;
}

.grid-4>#w-node-c71e3091b869-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-row-span: 1;
  -ms-grid-column: 1;
  -ms-grid-column-span: 3;
}

.grid-4-copy>#w-node-c71e3091b869-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-row-span: 1;
  -ms-grid-column: 1;
  -ms-grid-column-span: 3;
}

.grid-5>#w-node-c71e3091b869-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-row-span: 1;
  -ms-grid-column: 1;
  -ms-grid-column-span: 5;
}

.project-description-grid-3>#w-node-c71e3091b869-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-row-span: 5;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
}

#w-node-a572e9c002f1-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 5;
  grid-area: Area-2;
}

.grid>#w-node-a572e9c002f1-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 3;
}

.grid-2>#w-node-a572e9c002f1-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 3;
}

.grid-3>#w-node-a572e9c002f1-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 1;
}

.grid-4>#w-node-a572e9c002f1-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 1;
}

.grid-4-copy>#w-node-a572e9c002f1-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 1;
}

.grid-5>#w-node-a572e9c002f1-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 1;
}

#w-node-ee63d52fd22b-39d95844 {
  -ms-grid-row: 3;
  -ms-grid-column: 3;
  -ms-grid-column-span: 3;
  grid-area: Area-4;
}

.grid>#w-node-ee63d52fd22b-39d95844 {
  -ms-grid-row: 3;
  -ms-grid-column: 3;
  -ms-grid-column-span: 1;
}

.grid-2>#w-node-ee63d52fd22b-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 7;
  -ms-grid-column-span: 1;
}

.project-description-grid-4>#w-node-ee63d52fd22b-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-row-span: 3;
  -ms-grid-column: 5;
  -ms-grid-column-span: 1;
}

.grid-4-copy>#w-node-ee63d52fd22b-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-row-span: 1;
  -ms-grid-column: 3;
  -ms-grid-column-span: 1;
}

.grid-5>#w-node-ee63d52fd22b-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-row-span: 1;
  -ms-grid-column: 5;
  -ms-grid-column-span: 1;
}

.project-description-grid-3>#w-node-ee63d52fd22b-39d95844 {
  -ms-grid-row: 3;
  -ms-grid-row-span: 1;
  -ms-grid-column: 3;
  -ms-grid-column-span: 3;
}

#w-node-b9bdeb8c7453-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 3;
  -ms-grid-column-span: 3;
  grid-area: Area-3;
  -ms-grid-row-align: start;
  align-self: start;
}

.grid>#w-node-b9bdeb8c7453-39d95844 {
  -ms-grid-row: 3;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
}

.grid-2>#w-node-b9bdeb8c7453-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 5;
  -ms-grid-column-span: 1;
}

.project-description-grid-4>#w-node-b9bdeb8c7453-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 3;
  -ms-grid-column-span: 1;
}

.grid-3>#w-node-b9bdeb8c7453-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
}

.grid-4>#w-node-b9bdeb8c7453-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 3;
  -ms-grid-column-span: 1;
}

.grid-4-copy>#w-node-b9bdeb8c7453-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 2;
  -ms-grid-column-span: 1;
}

.grid-5>#w-node-b9bdeb8c7453-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 3;
  -ms-grid-column-span: 1;
}

.project-description-grid-3>#w-node-b9bdeb8c7453-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 3;
  -ms-grid-column-span: 3;
}

#w-node-32dfc0ad5cb5-39d95844 {
  -ms-grid-row: 3;
  -ms-grid-column: 5;
  -ms-grid-column-span: 3;
  grid-area: Area;
  -ms-grid-row-align: start;
  align-self: start;
  -ms-grid-column-align: center;
  justify-self: center;
}

.project-description-grid>#w-node-32dfc0ad5cb5-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
}

.project-description-grid-2>#w-node-32dfc0ad5cb5-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-row-span: 5;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
}

.grid>#w-node-32dfc0ad5cb5-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-row-span: 1;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
}

.grid-2>#w-node-32dfc0ad5cb5-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-row-span: 1;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
}

.grid-3>#w-node-32dfc0ad5cb5-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-row-span: 2;
  -ms-grid-column: 2;
  -ms-grid-column-span: 1;
}

.grid-4>#w-node-32dfc0ad5cb5-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-row-span: 1;
  -ms-grid-column: 1;
  -ms-grid-column-span: 3;
}

.grid-4-copy>#w-node-32dfc0ad5cb5-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-row-span: 1;
  -ms-grid-column: 1;
  -ms-grid-column-span: 3;
}

.grid-5>#w-node-32dfc0ad5cb5-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-row-span: 1;
  -ms-grid-column: 1;
  -ms-grid-column-span: 5;
}

.project-description-grid-3>#w-node-32dfc0ad5cb5-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-row-span: 5;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
}

#w-node-2aa46c9cf7ac-39d95844 {
  -ms-grid-row: 5;
  -ms-grid-column: 3;
  -ms-grid-column-span: 3;
  grid-area: Area-6;
}

.project-description-grid-3>#w-node-2aa46c9cf7ac-39d95844 {
  -ms-grid-row: 5;
  -ms-grid-column: 3;
  -ms-grid-column-span: 5;
}

#w-node-9aba29f5b2d9-39d95844 {
  -ms-grid-column: 1;
  grid-column-start: 1;
  -ms-grid-row: 1;
  grid-row-start: 1;
  -ms-grid-column-span: 1;
  grid-column-end: 2;
  -ms-grid-row-span: 1;
  grid-row-end: 2;
}

#w-node-41e6ca14d62a-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 3;
  -ms-grid-column-span: 3;
  grid-area: Area-3;
}

.grid>#w-node-41e6ca14d62a-39d95844 {
  -ms-grid-row: 3;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
}

.grid-2>#w-node-41e6ca14d62a-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 5;
  -ms-grid-column-span: 1;
}

.project-description-grid-4>#w-node-41e6ca14d62a-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 3;
  -ms-grid-column-span: 1;
}

.grid-3>#w-node-41e6ca14d62a-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
}

.grid-4>#w-node-41e6ca14d62a-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 3;
  -ms-grid-column-span: 1;
}

.grid-4-copy>#w-node-41e6ca14d62a-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 2;
  -ms-grid-column-span: 1;
}

.grid-5>#w-node-41e6ca14d62a-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 3;
  -ms-grid-column-span: 1;
}

.project-description-grid-3>#w-node-41e6ca14d62a-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 3;
  -ms-grid-column-span: 3;
}

#w-node-3763a989617a-39d95844 {
  -ms-grid-row: 3;
  -ms-grid-column: 5;
  -ms-grid-column-span: 3;
  grid-area: Area;
  -ms-grid-column-align: center;
  justify-self: center;
  -ms-grid-row-align: center;
  align-self: center;
}

.project-description-grid>#w-node-3763a989617a-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
}

.project-description-grid-2>#w-node-3763a989617a-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-row-span: 5;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
}

.grid>#w-node-3763a989617a-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-row-span: 1;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
}

.grid-2>#w-node-3763a989617a-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-row-span: 1;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
}

.grid-3>#w-node-3763a989617a-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-row-span: 2;
  -ms-grid-column: 2;
  -ms-grid-column-span: 1;
}

.grid-4>#w-node-3763a989617a-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-row-span: 1;
  -ms-grid-column: 1;
  -ms-grid-column-span: 3;
}

.grid-4-copy>#w-node-3763a989617a-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-row-span: 1;
  -ms-grid-column: 1;
  -ms-grid-column-span: 3;
}

.grid-5>#w-node-3763a989617a-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-row-span: 1;
  -ms-grid-column: 1;
  -ms-grid-column-span: 5;
}

.project-description-grid-3>#w-node-3763a989617a-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-row-span: 5;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
}

#w-node-ec8a6254ee28-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 5;
  grid-area: Area-2;
  -ms-grid-column-align: end;
  justify-self: end;
}

.grid>#w-node-ec8a6254ee28-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 3;
}

.grid-2>#w-node-ec8a6254ee28-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 3;
}

.grid-3>#w-node-ec8a6254ee28-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 1;
}

.grid-4>#w-node-ec8a6254ee28-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 1;
}

.grid-4-copy>#w-node-ec8a6254ee28-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 1;
}

.grid-5>#w-node-ec8a6254ee28-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 1;
}

#w-node-ca1a9865a26e-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 3;
  -ms-grid-column-span: 3;
  grid-area: Area-3;
  -ms-grid-column-align: start;
  justify-self: start;
}

.grid>#w-node-ca1a9865a26e-39d95844 {
  -ms-grid-row: 3;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
}

.grid-2>#w-node-ca1a9865a26e-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 5;
  -ms-grid-column-span: 1;
}

.project-description-grid-4>#w-node-ca1a9865a26e-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 3;
  -ms-grid-column-span: 1;
}

.grid-3>#w-node-ca1a9865a26e-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
}

.grid-4>#w-node-ca1a9865a26e-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 3;
  -ms-grid-column-span: 1;
}

.grid-4-copy>#w-node-ca1a9865a26e-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 2;
  -ms-grid-column-span: 1;
}

.grid-5>#w-node-ca1a9865a26e-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 3;
  -ms-grid-column-span: 1;
}

.project-description-grid-3>#w-node-ca1a9865a26e-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 3;
  -ms-grid-column-span: 3;
}

#w-node-f8cc38fe883a-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 3;
  -ms-grid-column-span: 3;
  grid-area: Area-3;
}

.grid>#w-node-f8cc38fe883a-39d95844 {
  -ms-grid-row: 3;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
}

.grid-2>#w-node-f8cc38fe883a-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 5;
  -ms-grid-column-span: 1;
}

.project-description-grid-4>#w-node-f8cc38fe883a-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 3;
  -ms-grid-column-span: 1;
}

.grid-3>#w-node-f8cc38fe883a-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
}

.grid-4>#w-node-f8cc38fe883a-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 3;
  -ms-grid-column-span: 1;
}

.grid-4-copy>#w-node-f8cc38fe883a-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 2;
  -ms-grid-column-span: 1;
}

.grid-5>#w-node-f8cc38fe883a-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 3;
  -ms-grid-column-span: 1;
}

.project-description-grid-3>#w-node-f8cc38fe883a-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 3;
  -ms-grid-column-span: 3;
}

#w-node-f8cc38fe883b-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 5;
  grid-area: Area-2;
  -ms-grid-column-align: end;
  justify-self: end;
}

.grid>#w-node-f8cc38fe883b-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 3;
}

.grid-2>#w-node-f8cc38fe883b-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 3;
}

.grid-3>#w-node-f8cc38fe883b-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 1;
}

.grid-4>#w-node-f8cc38fe883b-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 1;
}

.grid-4-copy>#w-node-f8cc38fe883b-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 1;
}

.grid-5>#w-node-f8cc38fe883b-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 1;
}

#w-node-f36cabfeea46-39d95844 {
  -ms-grid-row: 3;
  -ms-grid-column: 3;
  -ms-grid-column-span: 3;
  grid-area: Area-4;
  -ms-grid-column-align: start;
  justify-self: start;
}

.grid>#w-node-f36cabfeea46-39d95844 {
  -ms-grid-row: 3;
  -ms-grid-column: 3;
  -ms-grid-column-span: 1;
}

.grid-2>#w-node-f36cabfeea46-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 7;
  -ms-grid-column-span: 1;
}

.project-description-grid-4>#w-node-f36cabfeea46-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-row-span: 3;
  -ms-grid-column: 5;
  -ms-grid-column-span: 1;
}

.grid-4-copy>#w-node-f36cabfeea46-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-row-span: 1;
  -ms-grid-column: 3;
  -ms-grid-column-span: 1;
}

.grid-5>#w-node-f36cabfeea46-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-row-span: 1;
  -ms-grid-column: 5;
  -ms-grid-column-span: 1;
}

.project-description-grid-3>#w-node-f36cabfeea46-39d95844 {
  -ms-grid-row: 3;
  -ms-grid-row-span: 1;
  -ms-grid-column: 3;
  -ms-grid-column-span: 3;
}

#w-node-35a86a7a62be-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 3;
  -ms-grid-column-span: 3;
  grid-area: Area-3;
  -ms-grid-column-align: start;
  justify-self: start;
}

.grid>#w-node-35a86a7a62be-39d95844 {
  -ms-grid-row: 3;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
}

.grid-2>#w-node-35a86a7a62be-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 5;
  -ms-grid-column-span: 1;
}

.project-description-grid-4>#w-node-35a86a7a62be-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 3;
  -ms-grid-column-span: 1;
}

.grid-3>#w-node-35a86a7a62be-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
}

.grid-4>#w-node-35a86a7a62be-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 3;
  -ms-grid-column-span: 1;
}

.grid-4-copy>#w-node-35a86a7a62be-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 2;
  -ms-grid-column-span: 1;
}

.grid-5>#w-node-35a86a7a62be-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 3;
  -ms-grid-column-span: 1;
}

.project-description-grid-3>#w-node-35a86a7a62be-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 3;
  -ms-grid-column-span: 3;
}

#w-node-35a86a7a62bf-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 5;
  grid-area: Area-2;
  -ms-grid-column-align: end;
  justify-self: end;
}

.grid>#w-node-35a86a7a62bf-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 3;
}

.grid-2>#w-node-35a86a7a62bf-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 3;
}

.grid-3>#w-node-35a86a7a62bf-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 1;
}

.grid-4>#w-node-35a86a7a62bf-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 1;
}

.grid-4-copy>#w-node-35a86a7a62bf-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 1;
}

.grid-5>#w-node-35a86a7a62bf-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 1;
}

#w-node-6b35de84a773-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 3;
  -ms-grid-column-span: 3;
  grid-area: Area-3;
  -ms-grid-column-align: start;
  justify-self: start;
}

.grid>#w-node-6b35de84a773-39d95844 {
  -ms-grid-row: 3;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
}

.grid-2>#w-node-6b35de84a773-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 5;
  -ms-grid-column-span: 1;
}

.project-description-grid-4>#w-node-6b35de84a773-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 3;
  -ms-grid-column-span: 1;
}

.grid-3>#w-node-6b35de84a773-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
}

.grid-4>#w-node-6b35de84a773-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 3;
  -ms-grid-column-span: 1;
}

.grid-4-copy>#w-node-6b35de84a773-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 2;
  -ms-grid-column-span: 1;
}

.grid-5>#w-node-6b35de84a773-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 3;
  -ms-grid-column-span: 1;
}

.project-description-grid-3>#w-node-6b35de84a773-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 3;
  -ms-grid-column-span: 3;
}

#w-node-6b35de84a774-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 5;
  grid-area: Area-2;
  -ms-grid-column-align: end;
  justify-self: end;
}

.grid>#w-node-6b35de84a774-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 3;
}

.grid-2>#w-node-6b35de84a774-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 3;
}

.grid-3>#w-node-6b35de84a774-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 1;
}

.grid-4>#w-node-6b35de84a774-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 1;
}

.grid-4-copy>#w-node-6b35de84a774-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 1;
}

.grid-5>#w-node-6b35de84a774-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 1;
}

#w-node-f2c6de040bbf-1bd95845 {
  -ms-grid-column: 1;
  grid-column-start: 1;
  -ms-grid-column-span: 3;
  grid-column-end: 4;
  -ms-grid-row: 1;
  grid-row-start: 1;
  -ms-grid-row-span: 1;
  grid-row-end: 2;
}

#w-node-f2c6de040bc4-1bd95845 {
  -ms-grid-column: 1;
  grid-column-start: 1;
  -ms-grid-column-span: 2;
  grid-column-end: 3;
  -ms-grid-row: 2;
  grid-row-start: 2;
  -ms-grid-row-span: 1;
  grid-row-end: 3;
}

#w-node-f2c6de040bc9-1bd95845 {
  -ms-grid-column: 3;
  grid-column-start: 3;
  -ms-grid-column-span: 2;
  grid-column-end: 5;
  -ms-grid-row: 2;
  grid-row-start: 2;
  -ms-grid-row-span: 1;
  grid-row-end: 3;
}

#w-node-ee63d52fd22b-1bd95845 {
  -ms-grid-column: 2;
  grid-column-start: 2;
  -ms-grid-column-span: 1;
  grid-column-end: 3;
  -ms-grid-row: 1;
  grid-row-start: 1;
  -ms-grid-row-span: 1;
  grid-row-end: 2;
}

#w-node-e6c78f8a716d-1bd95845 {
  -ms-grid-column: 1;
  grid-column-start: 1;
  -ms-grid-column-span: 1;
  grid-column-end: 2;
  -ms-grid-row: 1;
  grid-row-start: 1;
  -ms-grid-row-span: 1;
  grid-row-end: 2;
}

#w-node-f2c6de040bbf-ebd95846 {
  -ms-grid-column: 1;
  grid-column-start: 1;
  -ms-grid-column-span: 3;
  grid-column-end: 4;
  -ms-grid-row: 1;
  grid-row-start: 1;
  -ms-grid-row-span: 1;
  grid-row-end: 2;
}

#w-node-f2c6de040bc4-ebd95846 {
  -ms-grid-column: 1;
  grid-column-start: 1;
  -ms-grid-column-span: 2;
  grid-column-end: 3;
  -ms-grid-row: 2;
  grid-row-start: 2;
  -ms-grid-row-span: 1;
  grid-row-end: 3;
}

#w-node-f2c6de040bc9-ebd95846 {
  -ms-grid-column: 3;
  grid-column-start: 3;
  -ms-grid-column-span: 2;
  grid-column-end: 5;
  -ms-grid-row: 2;
  grid-row-start: 2;
  -ms-grid-row-span: 1;
  grid-row-end: 3;
}

#w-node-ee63d52fd22b-ebd95846 {
  -ms-grid-column: 2;
  grid-column-start: 2;
  -ms-grid-column-span: 1;
  grid-column-end: 3;
  -ms-grid-row: 1;
  grid-row-start: 1;
  -ms-grid-row-span: 1;
  grid-row-end: 2;
}

#w-node-c086a8d10760-ebd95846 {
  -ms-grid-column: 1;
  grid-column-start: 1;
  -ms-grid-column-span: 1;
  grid-column-end: 2;
  -ms-grid-row: 1;
  grid-row-start: 1;
  -ms-grid-row-span: 1;
  grid-row-end: 2;
}

@media screen and (max-width: 991px) {
  #w-node-7dee623c62c8-cbd95841 {
    -ms-grid-column: 1;
    grid-column-start: 1;
    -ms-grid-row: 2;
    grid-row-start: 2;
    -ms-grid-column-span: 1;
    grid-column-end: 2;
    -ms-grid-row-span: 1;
    grid-row-end: 3;
  }
  #w-node-4224828ffd8f-cbd95841 {
    -ms-grid-column: 1;
    grid-column-start: 1;
    -ms-grid-row: 2;
    grid-row-start: 2;
    -ms-grid-column-span: 1;
    grid-column-end: 2;
    -ms-grid-row-span: 1;
    grid-row-end: 3;
  }
  #w-node-4224828ffd99-cbd95841 {
    -ms-grid-column: 1;
    grid-column-start: 1;
    -ms-grid-row: 2;
    grid-row-start: 2;
    -ms-grid-column-span: 1;
    grid-column-end: 2;
    -ms-grid-row-span: 1;
    grid-row-end: 3;
  }
  #w-node-4224828ffdd8-cbd95841 {
    -ms-grid-column: 1;
    grid-column-start: 1;
    -ms-grid-row: 4;
    grid-row-start: 4;
    -ms-grid-column-span: 1;
    grid-column-end: 2;
    -ms-grid-row-span: 1;
    grid-row-end: 5;
  }
  #w-node-4224828ffe12-cbd95841 {
    -ms-grid-column: 1;
    grid-column-start: 1;
    -ms-grid-row: 3;
    grid-row-start: 3;
    -ms-grid-column-span: 1;
    grid-column-end: 2;
    -ms-grid-row-span: 1;
    grid-row-end: 4;
  }
  #w-node-8239d41d1e9e-cbd95841 {
    -ms-grid-column: 2;
    grid-column-start: 2;
    -ms-grid-row: 3;
    grid-row-start: 3;
    -ms-grid-column-span: 1;
    grid-column-end: 3;
    -ms-grid-row-span: 1;
    grid-row-end: 4;
  }
  #w-node-8239d41d1ea0-cbd95841 {
    -ms-grid-column: 1;
    grid-column-start: 1;
    -ms-grid-row: 3;
    grid-row-start: 3;
    -ms-grid-column-span: 1;
    grid-column-end: 2;
    -ms-grid-row-span: 1;
    grid-row-end: 4;
  }
  #w-node-8239d41d1ea1-cbd95841 {
    -ms-grid-column: 1;
    grid-column-start: 1;
    -ms-grid-row: 2;
    grid-row-start: 2;
    -ms-grid-column-span: 1;
    grid-column-end: 2;
    -ms-grid-row-span: 1;
    grid-row-end: 3;
  }
  #w-node-8239d41d1ea2-cbd95841 {
    -ms-grid-column: 2;
    grid-column-start: 2;
    -ms-grid-row: 2;
    grid-row-start: 2;
    -ms-grid-column-span: 1;
    grid-column-end: 3;
    -ms-grid-row-span: 1;
    grid-row-end: 3;
  }
  #w-node-8239d41d1ea3-cbd95841 {
    -ms-grid-column: 1;
    grid-column-start: 1;
    -ms-grid-row: 4;
    grid-row-start: 4;
    -ms-grid-column-span: 1;
    grid-column-end: 2;
    -ms-grid-row-span: 1;
    grid-row-end: 5;
  }
  #w-node-8239d41d1ea4-cbd95841 {
    -ms-grid-column: 2;
    grid-column-start: 2;
    -ms-grid-row: 4;
    grid-row-start: 4;
    -ms-grid-column-span: 1;
    grid-column-end: 3;
    -ms-grid-row-span: 1;
    grid-row-end: 5;
  }
  #w-node-f2c6de040bbf-8ed95842 {
    -ms-grid-column: 1;
    grid-column-start: 1;
    -ms-grid-column-span: 1;
    grid-column-end: 2;
    -ms-grid-row: 1;
    grid-row-start: 1;
    -ms-grid-row-span: 1;
    grid-row-end: 2;
  }
  #w-node-f2c6de040bc4-8ed95842 {
    -ms-grid-column-span: 2;
    grid-column-end: 2;
  }
  #w-node-f2c6de040bc9-8ed95842 {
    -ms-grid-column: 1;
    grid-column-start: 1;
    -ms-grid-row: 3;
    grid-row-start: 3;
    -ms-grid-column-span: 1;
    grid-column-end: 2;
    -ms-grid-row-span: 1;
    grid-row-end: 4;
  }
  #w-node-ee63d52fd22b-8ed95842 {
    -ms-grid-column: 1;
    grid-column-start: 1;
    -ms-grid-column-span: 1;
    grid-column-end: 2;
    -ms-grid-row: 2;
    grid-row-start: 2;
    -ms-grid-row-span: 1;
    grid-row-end: 3;
  }
  #w-node-f2c6de040bc4-39d95844 {
    -ms-grid-column-span: 2;
    grid-column-end: 2;
  }
  #w-node-f2c6de040bc9-39d95844 {
    -ms-grid-column: 1;
    grid-column-start: 1;
    -ms-grid-row: 3;
    grid-row-start: 3;
    -ms-grid-column-span: 1;
    grid-column-end: 2;
    -ms-grid-row-span: 1;
    grid-row-end: 4;
  }
  #w-node-3920c47f98cf-39d95844 {
    -ms-grid-column: 1;
    grid-column-start: 1;
    -ms-grid-column-span: 1;
    grid-column-end: 2;
    -ms-grid-row: 2;
    grid-row-start: 2;
    -ms-grid-row-span: 1;
    grid-row-end: 3;
  }
  #w-node-ee63d52fd22b-39d95844 {
    -ms-grid-row: 1;
    -ms-grid-column: 5;
    grid-area: Area-2;
  }
  #w-node-b9bdeb8c7453-39d95844 {
    -ms-grid-row: 3;
    -ms-grid-column: 3;
    -ms-grid-column-span: 3;
    grid-area: Area-4;
    -ms-grid-row-align: start;
    align-self: start;
  }
  .grid>#w-node-b9bdeb8c7453-39d95844 {
    -ms-grid-row: 3;
    -ms-grid-column: 3;
    -ms-grid-column-span: 1;
  }
  .grid-2>#w-node-b9bdeb8c7453-39d95844 {
    -ms-grid-row: 1;
    -ms-grid-column: 7;
    -ms-grid-column-span: 1;
  }
  .project-description-grid-4>#w-node-b9bdeb8c7453-39d95844 {
    -ms-grid-row: 1;
    -ms-grid-row-span: 3;
    -ms-grid-column: 5;
    -ms-grid-column-span: 1;
  }
  #w-node-32dfc0ad5cb5-39d95844 {
    -ms-grid-row: 1;
    -ms-grid-column: 3;
    -ms-grid-column-span: 3;
    -ms-grid-row-align: start;
    align-self: start;
    -ms-grid-column-align: center;
    justify-self: center;
    grid-area: Area-3;
  }
  .grid>#w-node-32dfc0ad5cb5-39d95844 {
    -ms-grid-row: 3;
    -ms-grid-column: 1;
    -ms-grid-column-span: 1;
  }
  .grid-2>#w-node-32dfc0ad5cb5-39d95844 {
    -ms-grid-row: 1;
    -ms-grid-column: 5;
    -ms-grid-column-span: 1;
  }
  .project-description-grid-4>#w-node-32dfc0ad5cb5-39d95844 {
    -ms-grid-row: 1;
    -ms-grid-column: 3;
    -ms-grid-column-span: 1;
  }
  .grid-3>#w-node-32dfc0ad5cb5-39d95844 {
    -ms-grid-row: 2;
    -ms-grid-column: 1;
    -ms-grid-column-span: 1;
  }
  .grid-4>#w-node-32dfc0ad5cb5-39d95844 {
    -ms-grid-row: 2;
    -ms-grid-column: 3;
    -ms-grid-column-span: 1;
  }
  .grid-4-copy>#w-node-32dfc0ad5cb5-39d95844 {
    -ms-grid-row: 2;
    -ms-grid-column: 2;
    -ms-grid-column-span: 1;
  }
  .grid-5>#w-node-32dfc0ad5cb5-39d95844 {
    -ms-grid-row: 2;
    -ms-grid-column: 3;
    -ms-grid-column-span: 1;
  }
  .project-description-grid-3>#w-node-32dfc0ad5cb5-39d95844 {
    -ms-grid-row: 1;
    -ms-grid-column: 3;
    -ms-grid-column-span: 3;
  }
  #w-node-2aa46c9cf7ac-39d95844 {
    -ms-grid-row: 3;
    -ms-grid-column: 5;
    -ms-grid-column-span: 3;
    grid-area: Area;
  }
  .project-description-grid>#w-node-2aa46c9cf7ac-39d95844 {
    -ms-grid-row: 1;
    -ms-grid-column: 1;
    -ms-grid-column-span: 1;
  }
  .project-description-grid-2>#w-node-2aa46c9cf7ac-39d95844 {
    -ms-grid-row: 1;
    -ms-grid-row-span: 5;
    -ms-grid-column: 1;
    -ms-grid-column-span: 1;
  }
  .grid>#w-node-2aa46c9cf7ac-39d95844 {
    -ms-grid-row: 1;
    -ms-grid-row-span: 1;
    -ms-grid-column: 1;
    -ms-grid-column-span: 1;
  }
  .grid-2>#w-node-2aa46c9cf7ac-39d95844 {
    -ms-grid-row: 1;
    -ms-grid-row-span: 1;
    -ms-grid-column: 1;
    -ms-grid-column-span: 1;
  }
  #w-node-41e6ca14d62a-39d95844 {
    -ms-grid-column: 1;
    grid-column-start: 1;
    -ms-grid-column-span: 1;
    grid-column-end: 2;
    -ms-grid-row: 2;
    grid-row-start: 2;
    -ms-grid-row-span: 1;
    grid-row-end: 3;
  }
  #w-node-f2c6de040bbf-1bd95845 {
    -ms-grid-column: 1;
    grid-column-start: 1;
    -ms-grid-column-span: 1;
    grid-column-end: 2;
    -ms-grid-row: 1;
    grid-row-start: 1;
    -ms-grid-row-span: 1;
    grid-row-end: 2;
  }
  #w-node-f2c6de040bc4-1bd95845 {
    -ms-grid-column-span: 2;
    grid-column-end: 2;
  }
  #w-node-f2c6de040bc9-1bd95845 {
    -ms-grid-column: 1;
    grid-column-start: 1;
    -ms-grid-row: 3;
    grid-row-start: 3;
    -ms-grid-column-span: 1;
    grid-column-end: 2;
    -ms-grid-row-span: 1;
    grid-row-end: 4;
  }
  #w-node-ee63d52fd22b-1bd95845 {
    -ms-grid-column: 1;
    grid-column-start: 1;
    -ms-grid-column-span: 1;
    grid-column-end: 2;
    -ms-grid-row: 2;
    grid-row-start: 2;
    -ms-grid-row-span: 1;
    grid-row-end: 3;
  }
  #w-node-e6c78f8a716d-1bd95845 {
    -ms-grid-column: 1;
    grid-column-start: 1;
    -ms-grid-row: 1;
    grid-row-start: 1;
    -ms-grid-column-span: 1;
    grid-column-end: 2;
    -ms-grid-row-span: 1;
    grid-row-end: 2;
  }
  #w-node-f2c6de040bbf-ebd95846 {
    -ms-grid-column: 1;
    grid-column-start: 1;
    -ms-grid-column-span: 1;
    grid-column-end: 2;
    -ms-grid-row: 1;
    grid-row-start: 1;
    -ms-grid-row-span: 1;
    grid-row-end: 2;
  }
  #w-node-f2c6de040bc4-ebd95846 {
    -ms-grid-column-span: 2;
    grid-column-end: 2;
  }
  #w-node-f2c6de040bc9-ebd95846 {
    -ms-grid-column: 1;
    grid-column-start: 1;
    -ms-grid-row: 3;
    grid-row-start: 3;
    -ms-grid-column-span: 1;
    grid-column-end: 2;
    -ms-grid-row-span: 1;
    grid-row-end: 4;
  }
  #w-node-ee63d52fd22b-ebd95846 {
    -ms-grid-column: 1;
    grid-column-start: 1;
    -ms-grid-column-span: 1;
    grid-column-end: 2;
    -ms-grid-row: 2;
    grid-row-start: 2;
    -ms-grid-row-span: 1;
    grid-row-end: 3;
  }
  #w-node-c086a8d10760-ebd95846 {
    -ms-grid-column: 1;
    grid-column-start: 1;
    -ms-grid-row: 1;
    grid-row-start: 1;
    -ms-grid-column-span: 1;
    grid-column-end: 2;
    -ms-grid-row-span: 1;
    grid-row-end: 2;
  }
}

.grid-3>#w-node-2aa46c9cf7ac-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-row-span: 2;
  -ms-grid-column: 2;
  -ms-grid-column-span: 1;
}

.grid-4>#w-node-2aa46c9cf7ac-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-row-span: 1;
  -ms-grid-column: 1;
  -ms-grid-column-span: 3;
}

.grid-4-copy>#w-node-2aa46c9cf7ac-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-row-span: 1;
  -ms-grid-column: 1;
  -ms-grid-column-span: 3;
}

.grid-5>#w-node-2aa46c9cf7ac-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-row-span: 1;
  -ms-grid-column: 1;
  -ms-grid-column-span: 5;
}

.project-description-grid-3>#w-node-2aa46c9cf7ac-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-row-span: 5;
  -ms-grid-column: 1;
  -ms-grid-column-span: 1;
}

.grid-4-copy>#w-node-b9bdeb8c7453-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-row-span: 1;
  -ms-grid-column: 3;
  -ms-grid-column-span: 1;
}

.grid-5>#w-node-b9bdeb8c7453-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-row-span: 1;
  -ms-grid-column: 5;
  -ms-grid-column-span: 1;
}

.project-description-grid-3>#w-node-b9bdeb8c7453-39d95844 {
  -ms-grid-row: 3;
  -ms-grid-row-span: 1;
  -ms-grid-column: 3;
  -ms-grid-column-span: 3;
}

.grid>#w-node-ee63d52fd22b-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 3;
}

.grid-2>#w-node-ee63d52fd22b-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 3;
}

.grid-3>#w-node-ee63d52fd22b-39d95844 {
  -ms-grid-row: 1;
  -ms-grid-column: 1;
}

.grid-4>#w-node-ee63d52fd22b-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 1;
}

.grid-4-copy>#w-node-ee63d52fd22b-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 1;
}

.grid-5>#w-node-ee63d52fd22b-39d95844 {
  -ms-grid-row: 2;
  -ms-grid-column: 1;
}

@media screen and (max-width: 767px) {
  #w-node-a852d0df4a36-d0df4a24 {
    -ms-grid-column: 1;
    grid-column-start: 1;
    -ms-grid-row: 2;
    grid-row-start: 2;
    -ms-grid-column-span: 1;
    grid-column-end: 2;
    -ms-grid-row-span: 1;
    grid-row-end: 3;
  }
  #w-node-a852d0df4a3a-d0df4a24 {
    -ms-grid-column: 1;
    grid-column-start: 1;
    -ms-grid-row: 3;
    grid-row-start: 3;
    -ms-grid-column-span: 1;
    grid-column-end: 2;
    -ms-grid-row-span: 1;
    grid-row-end: 4;
  }
  #w-node-9aba29f5b2d9-39d95844 {
    -ms-grid-column: 1;
    grid-column-start: 1;
    -ms-grid-row: 1;
    grid-row-start: 1;
    -ms-grid-row-span: 1;
    grid-row-end: 2;
    -ms-grid-column-span: 2;
    grid-column-end: 3;
  }
}

@media screen and (max-width: 479px) {
  #w-node-41e6ca14d62a-39d95844 {
    -ms-grid-row: 1;
    -ms-grid-column: 3;
    -ms-grid-column-span: 3;
    grid-area: Area-3;
    margin-left: 0px !important;
  }
  .grid>#w-node-41e6ca14d62a-39d95844 {
    -ms-grid-row: 3;
    -ms-grid-column: 1;
    -ms-grid-column-span: 1;
  }
  .grid-2>#w-node-41e6ca14d62a-39d95844 {
    -ms-grid-row: 1;
    -ms-grid-column: 5;
    -ms-grid-column-span: 1;
  }
  .project-description-grid-4>#w-node-41e6ca14d62a-39d95844 {
    -ms-grid-row: 1;
    -ms-grid-column: 3;
    -ms-grid-column-span: 1;
  }
  .grid-3>#w-node-41e6ca14d62a-39d95844 {
    -ms-grid-row: 2;
    -ms-grid-column: 1;
    -ms-grid-column-span: 1;
  }
  .grid-4>#w-node-41e6ca14d62a-39d95844 {
    -ms-grid-row: 2;
    -ms-grid-column: 3;
    -ms-grid-column-span: 1;
  }
  .grid-4-copy>#w-node-41e6ca14d62a-39d95844 {
    -ms-grid-row: 2;
    -ms-grid-column: 2;
    -ms-grid-column-span: 1;
  }
  .grid-5>#w-node-41e6ca14d62a-39d95844 {
    -ms-grid-row: 2;
    -ms-grid-column: 3;
    -ms-grid-column-span: 1;
  }
  .project-description-grid-3>#w-node-41e6ca14d62a-39d95844 {
    -ms-grid-row: 1;
    -ms-grid-column: 3;
    -ms-grid-column-span: 3;
  }
  @media (max-width: 991px) {
    .grid-4>#w-node-c71e3091b869-39d95844 {
      -ms-grid-row: 1;
      -ms-grid-row-span: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 3;
    }
    .grid-5>#w-node-c71e3091b869-39d95844 {
      -ms-grid-row: 1;
      -ms-grid-row-span: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 5;
    }
    .project-description-grid-3>#w-node-c71e3091b869-39d95844 {
      -ms-grid-row: 7;
      -ms-grid-row-span: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 3;
    }
    .grid-4>#w-node-a572e9c002f1-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
    }
    .grid-5>#w-node-a572e9c002f1-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
    }
    #w-node-a572e9c002f1-39d95844 {
      -ms-grid-row: 3;
      -ms-grid-column: 3;
    }
    .grid-5>#w-node-ee63d52fd22b-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-row-span: 1;
      -ms-grid-column: 5;
      -ms-grid-column-span: 1;
    }
    .project-description-grid-3>#w-node-ee63d52fd22b-39d95844 {
      -ms-grid-row: 1;
      -ms-grid-row-span: 1;
      -ms-grid-column: 3;
      -ms-grid-column-span: 1;
    }
    .grid-4>#w-node-b9bdeb8c7453-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 3;
      -ms-grid-column-span: 1;
    }
    .grid-5>#w-node-b9bdeb8c7453-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 3;
      -ms-grid-column-span: 1;
    }
    .project-description-grid-3>#w-node-b9bdeb8c7453-39d95844 {
      -ms-grid-row: 3;
      -ms-grid-column: 1;
      -ms-grid-column-span: 2;
    }
    .grid-4>#w-node-32dfc0ad5cb5-39d95844 {
      -ms-grid-row: 1;
      -ms-grid-row-span: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 3;
    }
    .grid-5>#w-node-32dfc0ad5cb5-39d95844 {
      -ms-grid-row: 1;
      -ms-grid-row-span: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 5;
    }
    .project-description-grid-3>#w-node-32dfc0ad5cb5-39d95844 {
      -ms-grid-row: 7;
      -ms-grid-row-span: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 3;
    }
    .grid-4>#w-node-41e6ca14d62a-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 3;
      -ms-grid-column-span: 1;
    }
    .grid-5>#w-node-41e6ca14d62a-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 3;
      -ms-grid-column-span: 1;
    }
    .project-description-grid-3>#w-node-41e6ca14d62a-39d95844 {
      -ms-grid-row: 3;
      -ms-grid-column: 1;
      -ms-grid-column-span: 2;
    }
    .grid-4>#w-node-3763a989617a-39d95844 {
      -ms-grid-row: 1;
      -ms-grid-row-span: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 3;
    }
    .grid-5>#w-node-3763a989617a-39d95844 {
      -ms-grid-row: 1;
      -ms-grid-row-span: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 5;
    }
    .project-description-grid-3>#w-node-3763a989617a-39d95844 {
      -ms-grid-row: 7;
      -ms-grid-row-span: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 3;
    }
    .grid-4>#w-node-ec8a6254ee28-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
    }
    .grid-5>#w-node-ec8a6254ee28-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
    }
    #w-node-ec8a6254ee28-39d95844 {
      -ms-grid-row: 3;
      -ms-grid-column: 3;
    }
    .grid-4>#w-node-ca1a9865a26e-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 3;
      -ms-grid-column-span: 1;
    }
    .grid-5>#w-node-ca1a9865a26e-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 3;
      -ms-grid-column-span: 1;
    }
    .project-description-grid-3>#w-node-ca1a9865a26e-39d95844 {
      -ms-grid-row: 3;
      -ms-grid-column: 1;
      -ms-grid-column-span: 2;
    }
    .grid-4>#w-node-f8cc38fe883a-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 3;
      -ms-grid-column-span: 1;
    }
    .grid-5>#w-node-f8cc38fe883a-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 3;
      -ms-grid-column-span: 1;
    }
    .project-description-grid-3>#w-node-f8cc38fe883a-39d95844 {
      -ms-grid-row: 3;
      -ms-grid-column: 1;
      -ms-grid-column-span: 2;
    }
    .grid-4>#w-node-f8cc38fe883b-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
    }
    .grid-5>#w-node-f8cc38fe883b-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
    }
    #w-node-f8cc38fe883b-39d95844 {
      -ms-grid-row: 3;
      -ms-grid-column: 3;
    }
    .grid-5>#w-node-f36cabfeea46-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-row-span: 1;
      -ms-grid-column: 5;
      -ms-grid-column-span: 1;
    }
    .project-description-grid-3>#w-node-f36cabfeea46-39d95844 {
      -ms-grid-row: 1;
      -ms-grid-row-span: 1;
      -ms-grid-column: 3;
      -ms-grid-column-span: 1;
    }
    .grid-4>#w-node-35a86a7a62be-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 3;
      -ms-grid-column-span: 1;
    }
    .grid-5>#w-node-35a86a7a62be-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 3;
      -ms-grid-column-span: 1;
    }
    .project-description-grid-3>#w-node-35a86a7a62be-39d95844 {
      -ms-grid-row: 3;
      -ms-grid-column: 1;
      -ms-grid-column-span: 2;
    }
    .grid-4>#w-node-35a86a7a62bf-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
    }
    .grid-5>#w-node-35a86a7a62bf-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
    }
    #w-node-35a86a7a62bf-39d95844 {
      -ms-grid-row: 3;
      -ms-grid-column: 3;
    }
    .grid-4>#w-node-6b35de84a773-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 3;
      -ms-grid-column-span: 1;
    }
    .grid-5>#w-node-6b35de84a773-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 3;
      -ms-grid-column-span: 1;
    }
    .project-description-grid-3>#w-node-6b35de84a773-39d95844 {
      -ms-grid-row: 3;
      -ms-grid-column: 1;
      -ms-grid-column-span: 2;
    }
    .grid-4>#w-node-6b35de84a774-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
    }
    .grid-5>#w-node-6b35de84a774-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
    }
    #w-node-6b35de84a774-39d95844 {
      -ms-grid-row: 3;
      -ms-grid-column: 3;
    }
    .grid-4>#w-node-ee63d52fd22b-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
    }
    .grid-5>#w-node-ee63d52fd22b-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
    }
    #w-node-ee63d52fd22b-39d95844 {
      -ms-grid-row: 3;
      -ms-grid-column: 3;
    }
    .grid-5>#w-node-b9bdeb8c7453-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-row-span: 1;
      -ms-grid-column: 5;
      -ms-grid-column-span: 1;
    }
    .project-description-grid-3>#w-node-b9bdeb8c7453-39d95844 {
      -ms-grid-row: 1;
      -ms-grid-row-span: 1;
      -ms-grid-column: 3;
      -ms-grid-column-span: 1;
    }
    .grid-4>#w-node-32dfc0ad5cb5-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 3;
      -ms-grid-column-span: 1;
    }
    .grid-5>#w-node-32dfc0ad5cb5-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 3;
      -ms-grid-column-span: 1;
    }
    .project-description-grid-3>#w-node-32dfc0ad5cb5-39d95844 {
      -ms-grid-row: 3;
      -ms-grid-column: 1;
      -ms-grid-column-span: 2;
    }
    .grid-4>#w-node-2aa46c9cf7ac-39d95844 {
      -ms-grid-row: 1;
      -ms-grid-row-span: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 3;
    }
    .grid-5>#w-node-2aa46c9cf7ac-39d95844 {
      -ms-grid-row: 1;
      -ms-grid-row-span: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 5;
    }
    .project-description-grid-3>#w-node-2aa46c9cf7ac-39d95844 {
      -ms-grid-row: 7;
      -ms-grid-row-span: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 3;
    }
    .grid-4>#w-node-41e6ca14d62a-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 3;
      -ms-grid-column-span: 1;
    }
    .grid-5>#w-node-41e6ca14d62a-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 3;
      -ms-grid-column-span: 1;
    }
    .project-description-grid-3>#w-node-41e6ca14d62a-39d95844 {
      -ms-grid-row: 3;
      -ms-grid-column: 1;
      -ms-grid-column-span: 2;
    }
  }
  @media (max-width: 767px) {
    .grid-3>#w-node-c71e3091b869-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-row-span: 1;
      -ms-grid-column: 2;
      -ms-grid-column-span: 1;
    }
    .grid-5>#w-node-c71e3091b869-39d95844 {
      -ms-grid-row: 1;
      -ms-grid-row-span: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 5;
    }
    .project-description-grid-3>#w-node-c71e3091b869-39d95844 {
      -ms-grid-row: 7;
      -ms-grid-row-span: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 3;
    }
    .grid-3>#w-node-a572e9c002f1-39d95844 {
      -ms-grid-row: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 2;
    }
    .grid-5>#w-node-a572e9c002f1-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
      -ms-grid-column-span: 1;
    }
    #w-node-a572e9c002f1-39d95844 {
      -ms-grid-row: 3;
      -ms-grid-column: 1;
      -ms-grid-column-span: 3;
    }
    .grid-5>#w-node-ee63d52fd22b-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-row-span: 1;
      -ms-grid-column: 5;
      -ms-grid-column-span: 1;
    }
    .project-description-grid-3>#w-node-ee63d52fd22b-39d95844 {
      -ms-grid-row: 1;
      -ms-grid-row-span: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 3;
    }
    .grid-3>#w-node-b9bdeb8c7453-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
      -ms-grid-column-span: 1;
    }
    .grid-5>#w-node-b9bdeb8c7453-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 3;
      -ms-grid-column-span: 1;
    }
    .project-description-grid-3>#w-node-b9bdeb8c7453-39d95844 {
      -ms-grid-row: 5;
      -ms-grid-column: 1;
      -ms-grid-column-span: 3;
    }
    .grid-3>#w-node-32dfc0ad5cb5-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-row-span: 1;
      -ms-grid-column: 2;
      -ms-grid-column-span: 1;
    }
    .grid-5>#w-node-32dfc0ad5cb5-39d95844 {
      -ms-grid-row: 1;
      -ms-grid-row-span: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 5;
    }
    .project-description-grid-3>#w-node-32dfc0ad5cb5-39d95844 {
      -ms-grid-row: 7;
      -ms-grid-row-span: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 3;
    }
    .grid-3>#w-node-41e6ca14d62a-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
      -ms-grid-column-span: 1;
    }
    .grid-5>#w-node-41e6ca14d62a-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 3;
      -ms-grid-column-span: 1;
    }
    .project-description-grid-3>#w-node-41e6ca14d62a-39d95844 {
      -ms-grid-row: 5;
      -ms-grid-column: 1;
      -ms-grid-column-span: 3;
    }
    .grid-3>#w-node-3763a989617a-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-row-span: 1;
      -ms-grid-column: 2;
      -ms-grid-column-span: 1;
    }
    .grid-5>#w-node-3763a989617a-39d95844 {
      -ms-grid-row: 1;
      -ms-grid-row-span: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 5;
    }
    .project-description-grid-3>#w-node-3763a989617a-39d95844 {
      -ms-grid-row: 7;
      -ms-grid-row-span: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 3;
    }
    .grid-3>#w-node-ec8a6254ee28-39d95844 {
      -ms-grid-row: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 2;
    }
    .grid-5>#w-node-ec8a6254ee28-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
      -ms-grid-column-span: 1;
    }
    #w-node-ec8a6254ee28-39d95844 {
      -ms-grid-row: 3;
      -ms-grid-column: 1;
      -ms-grid-column-span: 3;
    }
    .grid-3>#w-node-ca1a9865a26e-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
      -ms-grid-column-span: 1;
    }
    .grid-5>#w-node-ca1a9865a26e-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 3;
      -ms-grid-column-span: 1;
    }
    .project-description-grid-3>#w-node-ca1a9865a26e-39d95844 {
      -ms-grid-row: 5;
      -ms-grid-column: 1;
      -ms-grid-column-span: 3;
    }
    .grid-3>#w-node-f8cc38fe883a-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
      -ms-grid-column-span: 1;
    }
    .grid-5>#w-node-f8cc38fe883a-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 3;
      -ms-grid-column-span: 1;
    }
    .project-description-grid-3>#w-node-f8cc38fe883a-39d95844 {
      -ms-grid-row: 5;
      -ms-grid-column: 1;
      -ms-grid-column-span: 3;
    }
    .grid-3>#w-node-f8cc38fe883b-39d95844 {
      -ms-grid-row: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 2;
    }
    .grid-5>#w-node-f8cc38fe883b-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
      -ms-grid-column-span: 1;
    }
    #w-node-f8cc38fe883b-39d95844 {
      -ms-grid-row: 3;
      -ms-grid-column: 1;
      -ms-grid-column-span: 3;
    }
    .grid-5>#w-node-f36cabfeea46-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-row-span: 1;
      -ms-grid-column: 5;
      -ms-grid-column-span: 1;
    }
    .project-description-grid-3>#w-node-f36cabfeea46-39d95844 {
      -ms-grid-row: 1;
      -ms-grid-row-span: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 3;
    }
    .grid-3>#w-node-35a86a7a62be-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
      -ms-grid-column-span: 1;
    }
    .grid-5>#w-node-35a86a7a62be-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 3;
      -ms-grid-column-span: 1;
    }
    .project-description-grid-3>#w-node-35a86a7a62be-39d95844 {
      -ms-grid-row: 5;
      -ms-grid-column: 1;
      -ms-grid-column-span: 3;
    }
    .grid-3>#w-node-35a86a7a62bf-39d95844 {
      -ms-grid-row: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 2;
    }
    .grid-5>#w-node-35a86a7a62bf-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
      -ms-grid-column-span: 1;
    }
    #w-node-35a86a7a62bf-39d95844 {
      -ms-grid-row: 3;
      -ms-grid-column: 1;
      -ms-grid-column-span: 3;
    }
    .grid-3>#w-node-6b35de84a773-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
      -ms-grid-column-span: 1;
    }
    .grid-5>#w-node-6b35de84a773-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 3;
      -ms-grid-column-span: 1;
    }
    .project-description-grid-3>#w-node-6b35de84a773-39d95844 {
      -ms-grid-row: 5;
      -ms-grid-column: 1;
      -ms-grid-column-span: 3;
    }
    .grid-3>#w-node-6b35de84a774-39d95844 {
      -ms-grid-row: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 2;
    }
    .grid-5>#w-node-6b35de84a774-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
      -ms-grid-column-span: 1;
    }
    #w-node-6b35de84a774-39d95844 {
      -ms-grid-row: 3;
      -ms-grid-column: 1;
      -ms-grid-column-span: 3;
    }
    .grid-3>#w-node-ee63d52fd22b-39d95844 {
      -ms-grid-row: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 2;
    }
    .grid-5>#w-node-ee63d52fd22b-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
      -ms-grid-column-span: 1;
    }
    #w-node-ee63d52fd22b-39d95844 {
      -ms-grid-row: 3;
      -ms-grid-column: 1;
      -ms-grid-column-span: 3;
    }
    .grid-5>#w-node-b9bdeb8c7453-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-row-span: 1;
      -ms-grid-column: 5;
      -ms-grid-column-span: 1;
    }
    .project-description-grid-3>#w-node-b9bdeb8c7453-39d95844 {
      -ms-grid-row: 1;
      -ms-grid-row-span: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 3;
    }
    .grid-3>#w-node-32dfc0ad5cb5-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
      -ms-grid-column-span: 1;
    }
    .grid-5>#w-node-32dfc0ad5cb5-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 3;
      -ms-grid-column-span: 1;
    }
    .project-description-grid-3>#w-node-32dfc0ad5cb5-39d95844 {
      -ms-grid-row: 5;
      -ms-grid-column: 1;
      -ms-grid-column-span: 3;
    }
    .grid-3>#w-node-2aa46c9cf7ac-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-row-span: 1;
      -ms-grid-column: 2;
      -ms-grid-column-span: 1;
    }
    .grid-5>#w-node-2aa46c9cf7ac-39d95844 {
      -ms-grid-row: 1;
      -ms-grid-row-span: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 5;
    }
    .project-description-grid-3>#w-node-2aa46c9cf7ac-39d95844 {
      -ms-grid-row: 7;
      -ms-grid-row-span: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 3;
    }
    .grid-3>#w-node-41e6ca14d62a-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
      -ms-grid-column-span: 1;
    }
    .grid-5>#w-node-41e6ca14d62a-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 3;
      -ms-grid-column-span: 1;
    }
    .project-description-grid-3>#w-node-41e6ca14d62a-39d95844 {
      -ms-grid-row: 5;
      -ms-grid-column: 1;
      -ms-grid-column-span: 3;
    }
  }
  @media (max-width: 479px) {
    .grid-3>#w-node-c71e3091b869-39d95844 {
      -ms-grid-row: 3;
      -ms-grid-row-span: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 2;
    }
    .project-description-grid-3>#w-node-c71e3091b869-39d95844 {
      -ms-grid-row: 7;
      -ms-grid-row-span: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 5;
    }
    .grid-3>#w-node-a572e9c002f1-39d95844 {
      -ms-grid-row: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 2;
    }
    #w-node-a572e9c002f1-39d95844 {
      -ms-grid-row: 3;
      -ms-grid-column: 1;
      -ms-grid-column-span: 5;
    }
    .project-description-grid-3>#w-node-ee63d52fd22b-39d95844 {
      -ms-grid-row: 1;
      -ms-grid-row-span: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 5;
    }
    .grid-3>#w-node-b9bdeb8c7453-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
      -ms-grid-column-span: 2;
    }
    .project-description-grid-3>#w-node-b9bdeb8c7453-39d95844 {
      -ms-grid-row: 5;
      -ms-grid-column: 1;
      -ms-grid-column-span: 5;
    }
    .grid-3>#w-node-32dfc0ad5cb5-39d95844 {
      -ms-grid-row: 3;
      -ms-grid-row-span: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 2;
    }
    .project-description-grid-3>#w-node-32dfc0ad5cb5-39d95844 {
      -ms-grid-row: 7;
      -ms-grid-row-span: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 5;
    }
    .grid-3>#w-node-41e6ca14d62a-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
      -ms-grid-column-span: 2;
    }
    .project-description-grid-3>#w-node-41e6ca14d62a-39d95844 {
      -ms-grid-row: 5;
      -ms-grid-column: 1;
      -ms-grid-column-span: 5;
    }
    .grid-3>#w-node-3763a989617a-39d95844 {
      -ms-grid-row: 3;
      -ms-grid-row-span: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 2;
    }
    .project-description-grid-3>#w-node-3763a989617a-39d95844 {
      -ms-grid-row: 7;
      -ms-grid-row-span: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 5;
    }
    .grid-3>#w-node-ec8a6254ee28-39d95844 {
      -ms-grid-row: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 2;
    }
    #w-node-ec8a6254ee28-39d95844 {
      -ms-grid-row: 3;
      -ms-grid-column: 1;
      -ms-grid-column-span: 5;
    }
    .grid-3>#w-node-ca1a9865a26e-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
      -ms-grid-column-span: 2;
    }
    .project-description-grid-3>#w-node-ca1a9865a26e-39d95844 {
      -ms-grid-row: 5;
      -ms-grid-column: 1;
      -ms-grid-column-span: 5;
    }
    .grid-3>#w-node-f8cc38fe883a-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
      -ms-grid-column-span: 2;
    }
    .project-description-grid-3>#w-node-f8cc38fe883a-39d95844 {
      -ms-grid-row: 5;
      -ms-grid-column: 1;
      -ms-grid-column-span: 5;
    }
    .grid-3>#w-node-f8cc38fe883b-39d95844 {
      -ms-grid-row: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 2;
    }
    #w-node-f8cc38fe883b-39d95844 {
      -ms-grid-row: 3;
      -ms-grid-column: 1;
      -ms-grid-column-span: 5;
    }
    .project-description-grid-3>#w-node-f36cabfeea46-39d95844 {
      -ms-grid-row: 1;
      -ms-grid-row-span: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 5;
    }
    .grid-3>#w-node-35a86a7a62be-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
      -ms-grid-column-span: 2;
    }
    .project-description-grid-3>#w-node-35a86a7a62be-39d95844 {
      -ms-grid-row: 5;
      -ms-grid-column: 1;
      -ms-grid-column-span: 5;
    }
    .grid-3>#w-node-35a86a7a62bf-39d95844 {
      -ms-grid-row: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 2;
    }
    #w-node-35a86a7a62bf-39d95844 {
      -ms-grid-row: 3;
      -ms-grid-column: 1;
      -ms-grid-column-span: 5;
    }
    .grid-3>#w-node-6b35de84a773-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
      -ms-grid-column-span: 2;
    }
    .project-description-grid-3>#w-node-6b35de84a773-39d95844 {
      -ms-grid-row: 5;
      -ms-grid-column: 1;
      -ms-grid-column-span: 5;
    }
    .grid-3>#w-node-6b35de84a774-39d95844 {
      -ms-grid-row: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 2;
    }
    #w-node-6b35de84a774-39d95844 {
      -ms-grid-row: 3;
      -ms-grid-column: 1;
      -ms-grid-column-span: 5;
    }
    .grid-3>#w-node-ee63d52fd22b-39d95844 {
      -ms-grid-row: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 2;
    }
    #w-node-ee63d52fd22b-39d95844 {
      -ms-grid-row: 3;
      -ms-grid-column: 1;
      -ms-grid-column-span: 5;
    }
    .project-description-grid-3>#w-node-b9bdeb8c7453-39d95844 {
      -ms-grid-row: 1;
      -ms-grid-row-span: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 5;
    }
    .grid-3>#w-node-32dfc0ad5cb5-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
      -ms-grid-column-span: 2;
    }
    .project-description-grid-3>#w-node-32dfc0ad5cb5-39d95844 {
      -ms-grid-row: 5;
      -ms-grid-column: 1;
      -ms-grid-column-span: 5;
    }
    .grid-3>#w-node-2aa46c9cf7ac-39d95844 {
      -ms-grid-row: 3;
      -ms-grid-row-span: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 2;
    }
    .project-description-grid-3>#w-node-2aa46c9cf7ac-39d95844 {
      -ms-grid-row: 7;
      -ms-grid-row-span: 1;
      -ms-grid-column: 1;
      -ms-grid-column-span: 5;
    }
    .grid-3>#w-node-41e6ca14d62a-39d95844 {
      -ms-grid-row: 2;
      -ms-grid-column: 1;
      -ms-grid-column-span: 2;
    }
    .project-description-grid-3>#w-node-41e6ca14d62a-39d95844 {
      -ms-grid-row: 5;
      -ms-grid-column: 1;
      -ms-grid-column-span: 5;
    }
  }
}
       
       </style>
   </head>
   <body class="body-2">
      <div class="section-2">
         <div class="container-4 w-container"><img src="./Project 2_files/5de6f644154e7e230b60908f_FarmerJoeIcon.svg" width="428" height="200" data-w-id="3eadbaab-4113-b99a-852f-f334155acf81" alt="" class="image" style="transform: translate3d(0px, -4.241px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d; will-change: transform;"></div>
      </div>
      <div class="section">
         <div data-w-id="3b72636b-6881-1991-9ff8-c0b1ca1c6ed7" class="parallaxfence"><img src="./Project 2_files/5de9939451909585c024952f_fenceShort.svg" width="1001" alt="" class="fence" style="will-change: transform; transform: translate3d(0px, -150px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;"></div>
         <div class="container">
            <div class="w-layout-grid project-overview-grid">
               <div id="w-node-f2c6de040bc4-39d95844">
                  <div class="position-name-text">Overview</div>
                  <div class="paragraph-light cc-position-name">Backyard Joe is an app centered on the buying and selling of home-grown produce, much like traditional farmer’s markets. It sets out to make produce more available, with the same level of quality that is found at a farmer’s market, and often at a much cheaper price. It is community driven, so it can appeal to avid health entusiasts as well as just your average Joe.</div>
               </div>
               <div id="w-node-f2c6de040bc9-39d95844" data-w-id="0befc76b-828c-2822-f9fa-f2c6de040bc9" class="div-block"><img src="./Project 2_files/5de97fda49103cf4839556c1_FarmerJoeBasketIcon.svg" alt="" class="image-4"></div>
            </div>
         </div>
      </div>
      <div class="section"><img src="./Project 2_files/5de7032bdccb9f8416eb68d2_Screenshot_2019-12-03 17.51.12_Yaw1XZ.png" srcset="https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5de7032bdccb9f8416eb68d2_Screenshot_2019-12-03%2017.51.12_Yaw1XZ-p-500.png 500w, https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5de7032bdccb9f8416eb68d2_Screenshot_2019-12-03%2017.51.12_Yaw1XZ-p-800.png 800w, https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5de7032bdccb9f8416eb68d2_Screenshot_2019-12-03%2017.51.12_Yaw1XZ-p-1080.png 1080w, https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5de7032bdccb9f8416eb68d2_Screenshot_2019-12-03%2017.51.12_Yaw1XZ-p-1600.png 1600w, https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5de7032bdccb9f8416eb68d2_Screenshot_2019-12-03%2017.51.12_Yaw1XZ-p-2000.png 2000w, https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5de7032bdccb9f8416eb68d2_Screenshot_2019-12-03%2017.51.12_Yaw1XZ-p-2600.png 2600w, https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5de7032bdccb9f8416eb68d2_Screenshot_2019-12-03%2017.51.12_Yaw1XZ-p-3200.png 3200w, https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5de7032bdccb9f8416eb68d2_Screenshot_2019-12-03%2017.51.12_Yaw1XZ.png 3236w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 96vw, 100vw" alt="" class="detail-header-image"></div>
      <div class="container">
         <div data-w-id="f65cea40-cc86-e475-b8f0-6777509bf7ac" class="parallaxbarn"><img src="./Project 2_files/5de967d8ce8d01c1f168b374_barn.svg" width="1001" alt="" class="barn" style="will-change: transform; transform: translate3d(0px, -300px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;"></div>
         <div class="w-layout-grid project-description-grid">
            <div id="w-node-3920c47f98cf-39d95844" class="paragraph-light">The idea for this app stemmed from my own family’s backyard. We have always had a variety of fruit trees and other plants in our yard, but we never were able to pick and use all of the fruit and vegetables before it was too late. Every year we would waste cherries, raspberries, pears, apricots and other fruit that someone else would have loved to use. This app can reduce waste and get this unused produce into the hands of others who would love to have it.</div>
            <div id="w-node-3920c47f98d1-39d95844" class="work-position-wrap">
               <div class="position-name-text-right">The Idea</div>
            </div>
         </div>
      </div>
      <div class="section">
         <section class="cta-section">
            <div class="centered-container w-container">
               <h2 class="heading-7">User Research</h2>
               <p class="paragraph-3">The idea sounds fun. An online farmers market could still have some of the appeal that a regular farmers market, but with much more accessibility and cheaper prices. But what would it take to make an app like this fit into the lives of even the average person? Would people even use it?<br><br>I conducted interviews with some average people to discover some of the issues that would need to be resolved:</p>
               <div class="w-layout-grid grid">
                  <div class="text-block-left">"I don't want to worry about coordinating and communicating in order to sell fruit."</div>
                  <div class="text-block-right">Coordination will be done by the app itself. The seller will choose what hours they are comforable having other people come to their backyard to gather some produce, and the buyer schedules an appointment through the app. The app then does all of the address and payment coordination for you.</div>
                  <div class="text-block-left">"How do I&nbsp;know if I&nbsp;can trust a certain seller or buyer?"</div>
                  <div class="text-block-right">The app is focused upon building a community. You can rate your experience with a certain seller or buyer so that others can tell if another user is trustworthy or not.</div>
                  <div class="text-block-left">"I don't want to have to hunt through thousands of irrelevant or badly curated listings just to find what I want."</div>
                  <div class="text-block-right">The app itself focuses a lot on curating listings for each particular user so they don't have to look long and far for what they want. It also has rigid categorization rules for users when they create a new listing so that things stay clean and orderly.</div>
                  <h4 id="w-node-c71e3091b869-39d95844" class="heading-8">Discovered Issue</h4>
                  <h4 id="w-node-a572e9c002f1-39d95844" class="heading-8">Resolution</h4>
               </div>
            </div>
         </section>
      </div>
      <!--<div class="w-layout-grid grid-2"><img src="./Project 2_files/5de956cc31edea644eb2099b_Lemon-01.svg" alt="" class="animatein" style="opacity: 1;"><img src="./Project 2_files/5de956ce1184b8d06f04c434_Lemon-02.svg" alt="" class="animatein" style="opacity: 1;"><img src="./Project 2_files/5de956cd58e6cb1c085239b2_Lemon-03.svg" alt="" class="animatein" style="opacity: 1;"><img src="./Project 2_files/5de956cd4b9e5a05e99e07b5_Lemon-04.svg" alt="" class="animatein" style="opacity: 1;"><img src="./Project 2_files/5de956cc49103cc4d293d6bf_Lemon-05.svg" alt="" class="animatein" style="opacity: 1;"></div>-->
      <div class="section">
         <div data-w-id="f417f67b-16da-a61b-8f96-15fdd864c412" class="parallaxsilo" style="will-change: transform; transform: translate3d(0px, -300px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;"><img src="./Project 2_files/5de96fd35190953ae82327c2_silo.svg" width="1001" alt="" class="silo"></div>
         <section class="cta-section">
            <div class="centered-container w-container">
               <h2 class="heading-7">App Organization</h2>
               <p class="paragraph-3">The next step was to figure out how the different features of the app should be arranged. What make the most sense to my users?</p>
               <img src="./Project 2_files/5de951311184b8f2ff047f40_SiteMap.svg" alt="">
            </div>
         </section>
         <div class="centered-container-copy w-container">
            <p class="paragraph-3">Now with the app organized, I&nbsp;needed to figure out how these features should actually be arranged in the app in this way. <br>What would make the most sense to my users?<br>These wireframes were my first solution, allowing me to test my navigation with users (which were far from perfect at this stage).</p>
            <img src="./Project 2_files/5de9530e82b84afeb58897bb_06_BritonHainsworth_Wireframes_Small.png" width="1001" srcset="https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5de9530e82b84afeb58897bb_06_BritonHainsworth_Wireframes_Small-p-500.png 500w, https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5de9530e82b84afeb58897bb_06_BritonHainsworth_Wireframes_Small-p-800.png 800w, https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5de9530e82b84afeb58897bb_06_BritonHainsworth_Wireframes_Small-p-1080.png 1080w, https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5de9530e82b84afeb58897bb_06_BritonHainsworth_Wireframes_Small-p-1600.png 1600w, https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5de9530e82b84afeb58897bb_06_BritonHainsworth_Wireframes_Small-p-2000.png 2000w, https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5de9530e82b84afeb58897bb_06_BritonHainsworth_Wireframes_Small-p-2600.png 2600w, https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5de9530e82b84afeb58897bb_06_BritonHainsworth_Wireframes_Small-p-3200.png 3200w, https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5de9530e82b84afeb58897bb_06_BritonHainsworth_Wireframes_Small.png 6275w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 96vw, 100vw" alt="" class="image-3">
         </div>
      </div>
      <div class="section-padding">
         <div data-w-id="638fc4f2-242c-7191-70be-b859f0b5e9ea" class="parallaxcloud2-2" style="will-change: transform; transform: translate3d(0px, -300px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;"><img src="./Project 2_files/5debd508675ba827e6781f69_cloud2.svg" width="1001" alt="" class="cloud2"></div>
      </div>
      <div class="section-full">
         <div class="container-2">
            <div class="w-layout-grid project-description-grid-3">
               <div id="w-node-ee63d52fd22b-39d95844" class="paragraph-light-3">When it came down to it, I&nbsp;wanted Backyard Joe to be built for just that - the average Joe. It is focused toward those who want more fresh produce in their life, or want to easily share their produce with others.<br><br>This is David Billings. He represents in many ways the kind of person that this app hopes to spark interest in.</div>
               <h1 id="w-node-b9bdeb8c7453-39d95844" class="heading-6">User Base</h1>
               <img src="./Project 2_files/5de7154f65d48a8563da21cd_UserPersonaForWebsite.svg" id="w-node-32dfc0ad5cb5-39d95844" alt="" class="image-2">
               <div id="w-node-2aa46c9cf7ac-39d95844" class="w-layout-grid grid-3">
                  <h1 id="w-node-9aba29f5b2d9-39d95844" class="heading-9">A Day In David's Life</h1>
                  <div id="w-node-41e6ca14d62a-39d95844" class="text-block-3">After my user base had been identified and defined, I&nbsp;wanted to understand how exactly this app might fit into the day-to-day life of someone like David Billings.<br><br> The chart on the right outlines a scenario showing how useful an app like this could<br>be in everyday life.</div>
                    <img src="https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5de99affbb83ab55b3fc8de5_JourneyMap.svg" height="300" alt="" style="grid-row: 2; margin-bottom: 70px;">
               </div>
            </div>
         </div>
      </div>
      <div class="section-mockups">
         <div data-w-id="590e52fe-2d72-8b16-d43d-9e9cdd1d509f" class="parallaxappicon"><img src="./Project 2_files/5debd2fccad2177f03d261bb_AppIconBlack.svg" width="1001" alt="" class="barn" style="will-change: transform; transform: translate3d(0px, -300px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;"></div>
         <div data-w-id="8d2708f0-9bec-1ad8-23f4-72935bdfd90e" class="parallaxcloud1" style="will-change: transform; transform: translate3d(0px, -300px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;"><img src="./Project 2_files/5debd39e517687177211bdbc_cloud1.svg" width="1001" alt="" class="cloud"></div>
         <div data-w-id="fe77866f-3386-77ef-9b3a-c6e83bad5d3b" class="parallaxcloud2" style="will-change: transform; transform: translate3d(0px, -300px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;"><img src="./Project 2_files/5debd508675ba827e6781f69_cloud2.svg" width="1001" alt="" class="cloud2"></div>
         <div data-w-id="75d51a25-7c95-64b1-85d6-28f93153cba1" class="parallaxcloud3" style="will-change: transform; transform: translate3d(0px, -300px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;"><img src="./Project 2_files/5debd5cb675ba817d078235b_cloud3.svg" width="1001" alt="" class="cloud3"></div>
         <section class="cta-section-2">
            <div data-w-id="f89984de-2f2e-871b-44b7-66091962d0ca" class="centered-container-4 w-container" style="will-change: opacity, transform; opacity: 1; transform: scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;">
               <h2 class="heading-10">The Solution</h2>
               <img src="./Project 2_files/5deaaeb1cad217355dcc015e_TodaysPicks.png" srcset="https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5deaaeb1cad217355dcc015e_TodaysPicks-p-500.png 500w, https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5deaaeb1cad217355dcc015e_TodaysPicks.png 600w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 206px, (max-width: 991px) 258px, 361px" alt="" class="image-7">
            </div>
         </section>
         <section class="cta-section-2">
            <div class="centered-container-2 w-container">
               <div class="w-layout-grid grid-4"><img class="image-8" src="./Project 2_files/5deaad235176876a110a67be_SearchPopup.png" width="360" height="700" alt="" style="opacity: 1;" sizes="(max-width: 479px) 54vw, (max-width: 767px) 150px, (max-width: 991px) 200px, 300px" data-w-id="52efc1d5-dc3b-4ce2-1c21-ec8a6254ee28" id="w-node-ec8a6254ee28-39d95844" srcset="https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5deaad235176876a110a67be_SearchPopup-p-500.png 500w, https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5deaad235176876a110a67be_SearchPopup.png 600w"><img src="./Project 2_files/5df1542037d24d3cbec1d590_Recent.png" srcset="https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5df1542037d24d3cbec1d590_Recent-p-500.png 500w, https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5df1542037d24d3cbec1d590_Recent.png 600w" sizes="(max-width: 479px) 54vw, (max-width: 767px) 150px, (max-width: 991px) 200px, 300px" id="w-node-ca1a9865a26e-39d95844" data-w-id="f8f8f565-0f4f-2114-8198-ca1a9865a26e" style="opacity: 1;" alt="" class="image-8"></div>
            </div>
         </section>
         <section class="cta-section-3">
            <div class="div-block-5">
               <div class="w-layout-grid grid-5"><img src="./Project 2_files/5debccc151768722aa1191e0_Listing Details.png" srcset="https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5debccc151768722aa1191e0_Listing%20Details-p-500.png 500w, https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5debccc151768722aa1191e0_Listing%20Details.png 600w" sizes="(max-width: 479px) 54vw, (max-width: 767px) 150px, (max-width: 991px) 200px, 300px" id="w-node-f8cc38fe883a-39d95844" data-w-id="fb7e1678-0387-2790-0ae2-f8cc38fe883a" style="opacity: 1;" alt="" class="image-8"><img src="./Project 2_files/5debcca2e942e7b3d63d8dad_ListingPopup.png" srcset="https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5debcca2e942e7b3d63d8dad_ListingPopup-p-500.png 500w, https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5debcca2e942e7b3d63d8dad_ListingPopup.png 600w" sizes="(max-width: 479px) 54vw, (max-width: 767px) 150px, (max-width: 991px) 200px, 300px" id="w-node-f8cc38fe883b-39d95844" data-w-id="fb7e1678-0387-2790-0ae2-f8cc38fe883b" style="opacity: 1;" alt="" class="image-8"><img src="./Project 2_files/5debccdee942e746b93d9044_UserProfile.png" srcset="https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5debccdee942e746b93d9044_UserProfile-p-500.png 500w, https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5debccdee942e746b93d9044_UserProfile.png 600w" sizes="(max-width: 479px) 54vw, (max-width: 767px) 150px, (max-width: 991px) 200px, 300px" id="w-node-f36cabfeea46-39d95844" data-w-id="9d83aced-8bb6-3556-6a8f-f36cabfeea46" style="opacity: 1;" alt="" class="image-8"></div>
            </div>
         </section>
         <section class="cta-section-2">
            <div class="centered-container-2 w-container">
               <div class="w-layout-grid grid-4"><img src="./Project 2_files/5debcd97675ba8716777e654_CreateNewListing.png" srcset="https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5debcd97675ba8716777e654_CreateNewListing-p-500.png 500w, https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5debcd97675ba8716777e654_CreateNewListing.png 600w" sizes="(max-width: 479px) 54vw, (max-width: 767px) 150px, (max-width: 991px) 200px, 300px" id="w-node-35a86a7a62be-39d95844" data-w-id="44683a5a-e168-618a-3294-35a86a7a62be" style="opacity: 1;" alt="" class="image-8"><img class="image-8" src="./Project 2_files/5debcd89675ba8d15977e5ea_MyFarm.png" width="360" height="700" alt="" style="opacity: 1;" sizes="(max-width: 479px) 54vw, (max-width: 767px) 150px, (max-width: 991px) 200px, 300px" data-w-id="44683a5a-e168-618a-3294-35a86a7a62bf" id="w-node-35a86a7a62bf-39d95844" srcset="https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5debcd89675ba8d15977e5ea_MyFarm-p-500.png 500w, https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5debcd89675ba8d15977e5ea_MyFarm.png 600w"></div>
            </div>
         </section>
         <section class="cta-section-2">
            <div class="centered-container-2 w-container">
               <div class="w-layout-grid grid-4"><img src="./Project 2_files/5debcde2cd17303179952226_SelectedTimePopup.png" srcset="https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5debcde2cd17303179952226_SelectedTimePopup-p-500.png 500w, https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5debcde2cd17303179952226_SelectedTimePopup.png 600w" sizes="(max-width: 479px) 54vw, (max-width: 767px) 150px, (max-width: 991px) 200px, 300px" id="w-node-6b35de84a773-39d95844" data-w-id="5011ee3c-1b14-f9aa-7fd0-6b35de84a773" style="opacity: 1;" alt="" class="image-8"><img class="image-8" src="./Project 2_files/5debcdcdcd1730332e9521d5_10am.png" width="360" height="700" alt="" style="opacity: 1;" sizes="(max-width: 479px) 54vw, (max-width: 767px) 150px, (max-width: 991px) 200px, 300px" data-w-id="5011ee3c-1b14-f9aa-7fd0-6b35de84a774" id="w-node-6b35de84a774-39d95844" srcset="https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5debcdcdcd1730332e9521d5_10am-p-500.png 500w, https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5debcdcdcd1730332e9521d5_10am.png 600w"></div>
            </div>
            <div data-w-id="081a8191-81cc-ee04-1afc-1302e0c5f0e2" class="centered-container-4 w-container" style="will-change: opacity, transform; opacity: 1; transform: scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;">
               <h2 class="heading-10">Backyard Joe</h2>
               <img src="./Project 2_files/5dea8f3a11ccf3af95da4811_SplashScreenInPhone.png" srcset="https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5dea8f3a11ccf3af95da4811_SplashScreenInPhone-p-500.png 500w, https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5dea8f3a11ccf3af95da4811_SplashScreenInPhone-p-800.png 800w, https://uploads-ssl.webflow.com/5ddd978ea0ceb0e29ed95839/5dea8f3a11ccf3af95da4811_SplashScreenInPhone.png 974w" sizes="(max-width: 479px) 100vw, (max-width: 767px) 242px, (max-width: 991px) 303px, 424px" alt="" class="image-7">
            </div>
         </section>
         <div class="container-3 w-container">
            <a href="https://xd.adobe.com/spec/fba4c794-a212-4759-5fe6-2d5dc8205667-8d95/" target="_blank" class="button w-inline-block">
               <div class="text-block-4">Click here to try the App prototype</div>
            </a>
         </div>
      </div>
      <div class="footer-wrap">
      <div>
         <a href="https://webflow.com/" target="_blank" class="webflow-link w-inline-block">
            <img src="./Project 2_files/5ddd978ea0ceb0d165d95854_webflow-w-small@2x.png" width="15" alt="" class="webflow-logo-tiny">
            <div class="paragraph-tiny">Briton Hainsworth 2019</div>
         </a>
      </div>
   </body>
</html>
`