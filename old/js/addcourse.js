var Courses = [];

function fillUpCourseBoxContainer(courses) {
    document.getElementById("courseBoxContainer").innerHTML = ""; 
    if(courses.length == 0) {
        document.getElementById("courseBoxContainer").innerHTML += 
        `            
        <div class="notFound">
            <div class="icon">
                <i class="fas fa-list-ul"></i>
            </div>
            <div class="text">
                <div class="title">No Course Found</div>
                <div class="semiTitle">Please Check Spelling</div>
            </div>
        </div>
        `;
    }
    else {
        courses.forEach(function(course) {
            document.getElementById("courseBoxContainer").innerHTML += 
            `
            <a onclick="addCourse('${course.id}')">            
                <div class="courseBox rippleButton" style="background-image: ${course.css}">
                    <div class="text">
                        <div class="title">${course.title}</div>
                        <div class="semiTitle">${course.code}</div>
                    </div>
                </div>
            </a>
            `;
        });
    }
}

var randomVersion = Math.floor(Math.random()*10**15);
async function loadCourseData() {
    const response = await fetch("js/data.json?"+randomVersion);
    const courses = await response.json();
    Courses = await courses;
    fillUpCourseBoxContainer(await courses);
}
loadCourseData();

document.getElementById("searchCourse").oninput = function(e) {
    var searchValue = e.target.value;
    
    searchCourses = Courses.filter(function(el) {
        return el.title.toLowerCase().includes(searchValue.toLowerCase()) || el.code.toLowerCase().includes(searchValue.toLowerCase()) || el.abbr.toLowerCase().includes(searchValue.toLowerCase());
    })

    fillUpCourseBoxContainer(searchCourses);
}

function addCourse(courseId) {
    var currentBookmarkedCourseData = localStorage.getItem("bookmarkedCourse");
    var currentBookmarkedCourse = currentBookmarkedCourseData.split(",");
    var isOverlap = true;
    currentBookmarkedCourse.forEach(function(e) {
        if(e==courseId) {
            isOverlap = false;
        }
    });
    if(isOverlap) {
        if(currentBookmarkedCourseData == '') {
            var newBookmarkedCourseData = courseId;
        }
        else {
            var newBookmarkedCourseData = currentBookmarkedCourseData+","+courseId;
        }
        localStorage.setItem("bookmarkedCourse",newBookmarkedCourseData);
        localStorage.setItem("courseChanged", "true");
        localStorage.setItem("courseChangedIndex", "true");
        window.history.back();
    }
    else {
        showToast("This course is already added!")
    }
}

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
