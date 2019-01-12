// Code created by JoelBesada.
// To make a screenshot or copy of image to a temporary source to do more

// http://joelb.me/blog/2011/code-snippet-accessing-clipboard-images-with-javascript/

// We start by checking if the browser supports the
// Clipboard object. If not, we need to create a
// contenteditable element that catches all pasted data
if (!window.Clipboard) {
   let pasteCatcher = document.createElement("div");

   // Firefox allows images to be pasted into contenteditable elements
   pasteCatcher.setAttribute("contenteditable", "");

   // We can hide the element and append it to the body,
   pasteCatcher.style.opacity = 0;
   document.body.appendChild(pasteCatcher);

   // as long as we make sure it is always in focus
   pasteCatcher.focus();
   document.addEventListener("click", function() { pasteCatcher.focus(); });
}
// Add the paste event listener
window.addEventListener("paste", pasteHandler);

// Stop after append image https://stackoverflow.com/questions/12713564
let executed = false;

/* Handle paste events */
function pasteHandler(e) {
   // We need to check if event.clipboardData is supported (Chrome)
   if (e.clipboardData) {
      // Get the items from the clipboard
      let items = e.clipboardData.items;
      if (items) {
         // Loop through all items, looking for any kind of image
         for (let i = 0; i < items.length; i++) {
            if ((items[i].type.indexOf("image") !== -1) && (!executed)) {
               // We need to represent the image as a file,
               let blob = items[i].getAsFile();
               // and use a URL or webkitURL (whichever is available to the browser)
               // to create a temporary URL to the object
               let URLObj = window.URL || window.webkitURL;
               let source = URLObj.createObjectURL(blob);

               // The URL can then be used as the source of an image
               createImage(source);
               // Act once
               executed = true;
            }
         }
      }
   // If we can't handle clipboard data directly (Firefox),
   // we need to read what was pasted from the contenteditable element
   } else {
      // This is a cheap trick to make sure we read the data
      // AFTER it has been inserted.
      setTimeout(checkInput, 1);
   }
}

/* Parse the input in the paste catcher element */
function checkInput() {
   // Store the pasted content in a letiable
   let child = pasteCatcher.childNodes[0];

   // Clear the inner html to make sure we're always
   // getting the latest inserted content
   pasteCatcher.innerHTML = "";

   if (child) {
      // If the user pastes an image, the src attribute
      // will represent the image as a base64 encoded string.
      if ((child.tagName === "IMG") && (!executed)) {
         createImage(child.src);
         // Act once
         executed = true;
      }
   }
}

// Creates a new image from a given source
// https://stackoverflow.com/questions/34651017
// jQuery Image Cropping Plugin - released under MIT License
// Using Jcrop
// Copyright (c) 2008-2018 Tapmodo Interactive LLC
// https://github.com/tapmodo/Jcrop

let picture_width;
let picture_height;
let crop_max_width = 3000;
let crop_max_height = 3000;
function createImage(source) {
   let pastedImage = new Image();
   pastedImage.onload = function() {
      // You now have the image!
      $("#pasted")[0].style.overflow = 'scroll';
      $("#pasted")[0].style.cursor = 'crosshair';
      $("#pasted").append(this);
      document.getElementById("repaste").style.visibility = 'visible';
      document.getElementById("Icomfirm").style.visibility = 'visible';
      document.getElementById("Icomfirm").style.visibility = 'visible';
      document.getElementById("Iheader").style.visibility = 'hidden';
      document.getElementById("Iheader").style.height = '0px';
      document.getElementById("Itext").style.display = 'block';
      document.getElementById("imgcanvas").style.height = '100%';
      picture_width = $("#pasted img").width();
		picture_height = $("#pasted img").height();
		console.log("Drawing.");
		$("#pasted  img").Jcrop({
			onChange: canvas,
			onSelect: canvas,
			boxWidth: crop_max_width,
			boxHeight: crop_max_height
		});
   };
   pastedImage.src = source;
   console.log("Image should be created.");
}
function canvas(coords){
	document.getElementById("imgcanvas").style.height = '100%';
	let imageObj = $("#pasted img")[0];
	let canvas = $("#imgcanvas")[0];
	canvas.width  = coords.w;
	canvas.height = coords.h;
	let context = canvas.getContext("2d");
	context.drawImage(imageObj, coords.x, coords.y, coords.w, coords.h, 0, 0, canvas.width, canvas.height);
}

function imgreset() {
   executed = false;
   $("#pasted").empty();
   $("#imgcanvas").empty();
   $("#imageraw").empty();
   $("#pasted")[0].style.overflow = 'hidden';
   $("#pasted")[0].style.cursor = 'default';
   console.log("Image should be deleted.");
   document.getElementById("repaste").style.visibility = 'hidden';
   document.getElementById("Igoogle").style.visibility = 'hidden';
   document.getElementById("Icomfirm").style.visibility = 'hidden';
   document.getElementById("Iheader").style.visibility = 'visible';
   document.getElementById("Iheader").style.height = '96px';
   document.getElementById("Itext").style.display = 'none';
   document.getElementById("imgcanvas").style.height = '0px';
}

// toBlob
function imgconfirm() {
   $("#imgcanvas")[0].toBlob(function(blob) {
      $("#imageraw").empty();
      let qImg = document.createElement('img'),
          qurl = URL.createObjectURL(blob);
      qImg.onload = function() {
         URL.revokeObjectURL(qurl);
         console.log(qurl);
         let searchurl = "https://www.google.com/searchbyimage?image_url=" + qurl;
	      $("#Igoogle").attr("href", searchurl);
	      document.getElementById("imgcanvas").style.height = '0px';
	      $("#imageraw")[0].append(this);
	      /* document.getElementById("Igoogle").style.visibility = 'visible';
	      seem not support search through URL */
      };
      qImg.src = qurl;
   });
}