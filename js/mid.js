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
document.getElementById("courseTitle").innerHTML = Course.title;
document.getElementById("courseCode").innerHTML = Course.code;

Course.mid.forEach(function (course) {
    var trimesterCode = course.code.toString().charAt(2);
    var trimesterName = "";
    if(trimesterCode == "1") {
        trimesterName = "Spring";
    }
    else if(trimesterCode == "2") {
        trimesterName = "Summer";
    }
    else {
        trimesterName = "Fall"
    };
    var trimesterName = trimesterName+" 20"+course.code.toString().charAt(0)+course.code.toString().charAt(1);
    
    document.getElementById("questionBoxContainer").innerHTML += `
        <a href="question.html?id=${getId}&term=mid&tri=${course.code}">
            <div class="questionBox">
                <div class="code" style="background: ${Course.css}">${course.code}</div>
                <div class="name">${trimesterName}</div>
            </div>
        </a>
    `
})

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