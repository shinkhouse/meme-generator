var canvas = document.getElementById("memegenerator");
var ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
var fontMainColor = "";
var fontOutlineColor = "";
var topFontText = "";
var bottomFontText = "";
var image = new Image();
var fontFamily = "Impact";
var fontSize = "24";
var fontSettings = fontSize + "px " + fontFamily;

window.onload = function() {
    $(".style-menu").hide();
};

function activateImageFinder() {
    $(".image-finder").show();
    $(".style-menu").hide();
}

function activateStyleEditor() {
    $(".style-menu").show();
    $(".image-finder").hide();
}

function resetCanvas() {
    canvas = document.getElementById("memegenerator");
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);

    ctx.font = fontSettings;
    ctx.fillStyle = fontMainColor;
    ctx.strokeStyle = fontOutlineColor;
    ctx.textAlign = "center";
    if (image != "<img>" || image != undefined) {
        ctx.drawImage(
            image,
            canvas.width / 2 - image.width / 2,
            canvas.height / 2 - image.height / 2
        );
        ctx.fillText(
            topFontText,
            canvas.width / 2,
            canvas.height / 2 - image.height / 2 + 40
        );
        ctx.fillText(
            bottomFontText,
            canvas.width / 2,
            canvas.height - (canvas.height / 2 - image.height / 2 + 20)
        );
        ctx.strokeText(
            topFontText,
            canvas.width / 2,
            canvas.height / 2 - image.height / 2 + 40
        );
        ctx.strokeText(
            bottomFontText,
            canvas.width / 2,
            canvas.height - (canvas.height / 2 - image.height / 2 + 20)
        );
        console.log(image.height);
        console.log(
            canvas.height - (canvas.height / 2 - image.height / 2 + 40)
        );
    }
}
/* Changing rectangle color */
function updateFontColor(jscolor) {
    fontMainColor = "#" + jscolor;
}

function updateFontOutlineColor(jscolor) {
    fontOutlineColor = "#" + jscolor;
    console.log(fontOutlineColor);
}
$(".bottomFontText").keyup(function() {
    bottomFontText = $(this).val();
    resetCanvas();
});
$(".topFontText").keyup(function() {
    topFontText = $(this).val();
    resetCanvas();
});

$("#fontMainColor").change(function() {
    resetCanvas();
});

$("#fontOutlineColor").change(function() {
    resetCanvas();
});

$("#font-family").change(function() {
    fontFamily = $(this).val();
    fontSettings = fontSize + "px " + fontFamily;
    resetCanvas();
});

var imagesData = "";

function setImageData(imageData) {
    imagesData = imageData;
    console.log(imagesData.photos);
}
$(document).ready(function() {
    $(".imageSearchSubmit").on("click", function() {
        getJSON(13);
    });
});

function getJSON(e) {
    if (e.keyCode == 13 || e == 13) {
        $.getJSON(
            "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=<--api_key-->&tags=" +
                $(".imageSearchBox").val() +
                "&format=json&nojsoncallback=1",
            function(result) {
                setImageData(result);
                console.log(imagesData);
                console.log(imagesData.photos.photo);
                getPhotoData();
            }
        );
    }
}
function getFullImage(src) {
    console.log("test");
    console.log(src);
    $(".fullImage").attr("src", src);
    image.src = src;
    resetCanvas();
}

function getPhotoData() {
    var imageCount = 0;
    var rowCount = 0;
    $(".galleryTable").html("");

    while (imageCount < imagesData.photos.photo.length) {
        $(".galleryTable").append('<tr class="row' + rowCount + '">');
        //console.log(imagesData.photos.photo[i].farm);
        //console.log(imagesData.photos.photo[i].secret);
        //console.log(imagesData.photos.photo[i].id);
        //console.log(imagesData.photos.photo[i].server);

        for (j = 0; j < 4; j++) {
            var farmId = imagesData.photos.photo[imageCount].farm;
            var secret = imagesData.photos.photo[imageCount].secret;
            var id = imagesData.photos.photo[imageCount].id;
            var serverId = imagesData.photos.photo[imageCount].server;
            $(".row" + rowCount).append(
                '<td class="image"><img class="thumbnail" onclick="getFullImage(this.src)" src="' +
                    "https://farm" +
                    farmId +
                    ".staticflickr.com/" +
                    serverId +
                    "/" +
                    id +
                    "_" +
                    secret +
                    ".jpg" +
                    '" data-id="' +
                    imageCount +
                    '" width="50" height="50"></td> '
            );
            imageCount++;
        }
        rowCount++;
        $(".galleryTable").append("</tr>");
    }
}

/* Drawing an image */
//var img = document.getElementById("imageId");
//ctx.drawImage(img,10,10);
