var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var getId = urlParams.get('id');

var Course = [];

function loadQuestionBox(courses) {
    Courses = courses.filter(function(el) {
        return el.id == getId;
    });
    
    Course = Courses[0];
    
    document.getElementById("titleDiv").innerHTML = Course.code;
    document.getElementById("semiTitleDiv").innerHTML = Course.title;
    document.getElementById("courseInfoBox").style.backgroundImage = Course.css;
    document.getElementById("iconOne").style.backgroundImage = Course.css;
    document.getElementById("iconTwo").style.backgroundImage = Course.css;
    document.getElementById("iconThree").style.backgroundImage = Course.css;
    document.getElementById("iconFour").style.backgroundImage = Course.css;
    document.getElementById("courseTitle").innerHTML = Course.title;
    document.getElementById("courseCode").innerHTML = Course.code;
    document.getElementById("mid").setAttribute("href", `questions.html?term=mid&id=${Course.id}`);
    document.getElementById("final").setAttribute("href", `questions.html?term=final&id=${Course.id}`);
    
    if(Course.midSolve != "null") {
        document.getElementById("disableMid").remove();
        document.getElementById("midSolve").setAttribute("href", `question.html?id=${Course.id}&term=mid&tri=solve`);
    }
    if(Course.finalSolve != "null") {
        document.getElementById("disableFinal").remove();
        document.getElementById("finalSolve").setAttribute("href", `question.html?id=${Course.id}&term=final&tri=solve`);
    }
}

var randomVersion = Math.floor(Math.random()*10**15);
async function loadCourseData() {
    const response = await fetch("js/data.json?"+randomVersion);
    const courses = await response.json();
    loadQuestionBox(await courses);
}

loadCourseData();


document.getElementById("back").onclick = function() {
    if (window.history.length >= 2) {
        window.history.back();
    }
    else { 
        window.location.href = 'index.html';
    }
}

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


function showToast(string) {
    var x = document.getElementById("snackbar");
    if(x.className != "show") {
        x.className = "show";
        x.innerHTML = string;
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
}

document.getElementById("disableMid").onclick = function() {
    showToast("Sorry, Mid-Term Solution of this course is still not completed!");
}
document.getElementById("disableFinal").onclick = function() {
    showToast("Sorry, Final Solution of this course is still not completed!");
}