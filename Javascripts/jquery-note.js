//https://www.w3schools.com/jquery/default.asp

// jQuery methods go here...
$(document).ready(function () {

    // jQuery methods go here...

});

// jQuery methods go here...
$(function () {

    // jQuery methods go here...

});

// select all <p> elements
$("p")

$(document).ready(function () {
    $("button").click(function () {
        $("p").hide();
    });
});
// select all #id elements
$("#test")

$(document).ready(function () {
    $("button").click(function () {
        $("#test").hide();
    });
});

// select all .class elements
$(".test")

$(document).ready(function () {
    $("button").click(function () {
        $(".test").hide();
    });
});

// click event
$("p").click();

$("p").click(function () {
    // action goes here!!
    $(this).hide();
});

// double click event
$("p").dblclick(function () {
    $(this).hide();
});

// mouseenter event
$("#p1").mouseenter(function () {
    alert("You entered p1!");
});

// mouseleave event
$("#p1").mouseleave(function () {
    alert("Bye! You now leave p1!");
});

// mousedown event
$("#p1").mousedown(function () {
    alert("Mouse down over p1!");
});

// mouseup event
$("#p1").mouseup(function () {
    alert("Mouse up over p1!");
});

// hover
$("#p1").hover(function(){
    alert("You entered p1!");
  },
  function(){
    alert("Bye! You now leave p1!");
});

// focus
$("input").focus(function(){
    $(this).css("background-color", "#cccccc");
});

// blur
$("input").blur(function(){
    $(this).css("background-color", "#ffffff");
});

// on
$("p").on("click", function(){
    $(this).hide();
});

// event object selector and method together
$("p").on({
    mouseenter: function(){
      $(this).css("background-color", "lightgray");
    },
    mouseleave: function(){
      $(this).css("background-color", "lightblue");
    },
    click: function(){
      $(this).css("background-color", "yellow");
    }
});

// hide and show
$("#hide").click(function(){
    $("p").hide();
});
  
$("#show").click(function(){
    $("p").show();
});

// hide and no callback
$("button").click(function(){
    $("p").hide(1000);
});