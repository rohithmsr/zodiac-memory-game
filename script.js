var boxOpened = "";
var imgOpened = "";
var counter = 0;
var imgFound = 0;

var source = "#gameboard-cards";

var images = [
    "public/images/zod-1.png",
    "public/images/zod-2.png",
    "public/images/zod-3.png",
    "public/images/zod-4.png",
    "public/images/zod-6.png",
    "public/images/zod-7.png",
    "public/images/zod-9.png",
    "public/images/zod-10.png",
    "public/images/zod-11.png",
    "public/images/zod-12.png",
];

function generateRandomNumber(maxValue, minValue) {
    return Math.round(Math.random() * (maxValue - minValue) + minValue);
}

function shuffleImages() {
    var allImageCards = $(source).children();
    var currentDivCard = $(source + " div:first-child");
    var imgArr = new Array();

    for (var i = 0; i < allImageCards.length; i++) {
        imgArr[i] = $("#" + currentDivCard.attr("id") + " img").attr("src");
        currentDivCard = currentDivCard.next();
    }

    currentDivCard = $(source + " div:first-child");

    for (var z = 0; z < allImageCards.length; z++) {
        var randNum = generateRandomNumber(0, imgArr.length - 1);

        $("#" + currentDivCard.attr("id") + " img").attr("src", imgArr[randNum]);
        imgArr.splice(randNum, 1);
        currentDivCard = currentDivCard.next();
    }
}

function resetGame() {
    shuffleImages();
    $(source + " div img").hide();
    $(source + " div").css("visibility", "visible");
    counter = 0;
    $("#success").remove();
    $("#counter").html("" + counter);
    boxOpened = "";
    imgOpened = "";
    imgFound = 0;
    return false;
}

function openTheCard() {
    var id = $(this).attr("id");
    // console.log(id);

    if ($("#" + id + " img").is(":hidden")) {
        $(source + " div").unbind("click", openTheCard);

        $("#" + id + " img").slideDown("fast");

        if (imgOpened == "") {
            boxOpened = id;
            imgOpened = $("#" + id + " img").attr("src");
            setTimeout(function () {
                $(source + " div").bind("click", openTheCard);
            }, 300);
        } else {
            currentlyOpened = $("#" + id + " img").attr("src");
            if (imgOpened != currentlyOpened) {
                setTimeout(function () {
                    $("#" + id + " img").slideUp("fast");
                    $("#" + boxOpened + " img").slideUp("fast");
                    boxOpened = "";
                    imgOpened = "";
                }, 400);
            } else {
                $("#" + id + " img")
                    .parent()
                    .css("visibility", "hidden");
                $("#" + boxOpened + " img")
                    .parent()
                    .css("visibility", "hidden");
                imgFound++;
                boxOpened = "";
                imgOpened = "";
            }
            setTimeout(function () {
                $(source + " div").bind("click", openTheCard);
            }, 400);
        }
        counter++;
        $("#counter").html(" " + counter);

        if (imgFound == images.length) {
            $("#counter").prepend(
                '<span id="success">You have found all the pictues within</span>'
            );
        }
    }
}

$(function () {
    var num = 1;
    var sets = 1;
    for (var y = 0; y < sets * 2; y++) {
        $.each(images, function (i, val) {
            $(source).append("<div id=card" + y + i + ">" + num++ + "<img height=80 width=70 src=" + val + " />");
        });
    }
    $(source + " div").click(openTheCard);
    shuffleImages();
});
