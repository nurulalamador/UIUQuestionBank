var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var getId = urlParams.get('id');

Courses = Courses.filter(function(el) {
    return el.id == getId;
});

var Course = Courses[0];

document.getElementById("titleDiv").innerHTML = Course.code;
document.getElementById("semiTitleDiv").innerHTML = Course.title;
document.getElementById("courseInfoBox").style.backgroundImage = Course.css;
document.getElementById("iconOne").style.backgroundImage = Course.css;
document.getElementById("iconTwo").style.backgroundImage = Course.css;
document.getElementById("courseTitle").innerHTML = Course.title;
document.getElementById("courseCode").innerHTML = Course.code;
document.getElementById("mid").setAttribute("href", `mid.html?id=${Course.id}`);
document.getElementById("final").setAttribute("href", `final.html?id=${Course.id}`);

$("html").on("pointerdown", ".rippleButton, .rippleButtonBlack", function(evt) {
    var btn = $(evt.currentTarget);
    var x = evt.pageX - btn.offset().left;
    var y = evt.pageY - btn.offset().top;

    $("<span class='ripple'/>").appendTo(btn).css({
        left: x,
        top: y
    });
});
$("html").on("pointerup", ".rippleButton, .rippleButtonBlack", function(evt) {
    setTimeout(function() {
        $('.ripple').remove();
    }, 500);
});