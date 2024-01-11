window.addEventListener("pageshow", function ( event ) {
    if(localStorage.getItem("courseChangedIndex") == "true") {
        localStorage.setItem("courseChangedIndex", "false");
        location.reload(true);
    }
});

if(!navigator.onLine) {
    document.getElementById("noConnectionBoxBackground").style.display = "block";
}

document.getElementById("reloadApp").onclick = function() {
    location.reload();
}

Trimesters.forEach(function(e) {
    document.getElementById("trimesterList").innerHTML += `<option value="${e.courses}">Trimester ${e.trimester}</option>`
});

if(localStorage.getItem("bookmarkedCourseAdded") == null) {
    localStorage.setItem("bookmarkedCourse", "MAT1151,CSE1115,CSE1325");
    localStorage.setItem("bookmarkedCourseAdded", "true");
}

function fillUpCourseBoxContainer(courses, length) {
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
        var n;
        if(courses.length > length) {
            n = length;
        }
        else {
            n = courses.length;
        }

        for(var i=0; i<n; i++) {
            course = courses[i];
            document.getElementById("courseBoxContainer").innerHTML += 
            `
            <a href="course.html?id=${course.id}">            
                <div class="courseBox rippleButton" style="background: ${course.css}">
                    <div class="text">
                        <div class="title">${course.title}</div>
                        <div class="semiTitle">${course.code}</div>
                    </div>
                </div>
            </a>
            `;
        }
    }
}

bookmarkedCourseData = localStorage.getItem("bookmarkedCourse");
bookmarkedCourse = [];

if(bookmarkedCourseData != '') {
    bookmarkedCourseData = bookmarkedCourseData.split(",");
    bookmarkedCourseData.forEach(function(code) {
        matchedCourse = Courses.filter(function(el) {
            return el.id.includes(code);
        });
        bookmarkedCourse.push(matchedCourse[0]);
    });
}

fillUpCourseBoxContainer(bookmarkedCourse, bookmarkedCourse.length);

document.getElementById("searchCourse").oninput = function(e) {
    var searchValue = e.target.value;
    
    if(searchValue == "" || searchValue == " ") {
        fillUpCourseBoxContainer(bookmarkedCourse, bookmarkedCourse.length);
    }
    else {
        searchCourses = Courses.filter(function(el) {
            return el.title.toLowerCase().includes(searchValue.toLowerCase()) || el.code.toLowerCase().includes(searchValue.toLowerCase()) || el.abbr.toLowerCase().includes(searchValue.toLowerCase());
        });
        fillUpCourseBoxContainer(searchCourses, 3);
    }
}

document.getElementById("openMenu").onclick = function() {
    document.getElementById("sidebarMenuBackground").style.display = "block";
    document.getElementById("sidebarMenu").style.left = "0px";
}

document.getElementById("sidebarMenuBackground").onclick = function() {
    document.getElementById("sidebarMenuBackground").style.display = "none";
    document.getElementById("sidebarMenu").style.left = "-300px";
}

document.getElementById("openAboutBox").onclick = function() {
    document.getElementById("sidebarMenuBackground").style.display = "none";
    document.getElementById("sidebarMenu").style.left = "-300px";
    document.getElementById("aboutBoxBackground").style.display = "block";
}
document.getElementById("closeAboutBox").onclick = function() {
    document.getElementById("aboutBoxBackground").style.display = "none";
}

document.getElementById("openAcknowledgmentBox").onclick = function() {
    document.getElementById("sidebarMenuBackground").style.display = "none";
    document.getElementById("sidebarMenu").style.left = "-300px";
    document.getElementById("acknowledgmentBoxBackground").style.display = "block";
}
document.getElementById("closeAcknowledgmentBox").onclick = function() {
    document.getElementById("acknowledgmentBoxBackground").style.display = "none";
}

document.getElementById("openTrimesterBox").onclick = function() {
    document.getElementById("sidebarMenuBackground").style.display = "none";
    document.getElementById("sidebarMenu").style.left = "-300px";
    document.getElementById("trimesterBoxBackground").style.display = "block";
}
document.getElementById("selectTrimester").onclick = function() {
    document.getElementById("trimesterBoxBackground").style.display = "none";
}
document.getElementById("selectTrimester").onclick = function() {
    var newBookmarkedCourse = document.getElementById("trimesterList").value;
    localStorage.setItem("bookmarkedCourse", newBookmarkedCourse);
    location.reload();
}

function exitApp() {
    document.getElementById("sidebarMenuBackground").style.display = "none";
    document.getElementById("sidebarMenu").style.left = "-300px";
    document.getElementById("exitBoxBackground").style.display = "block";
}
document.getElementById("closeExitBox").onclick = function() {
    document.getElementById("exitBoxBackground").style.display = "none";
}
document.getElementById("exitApp").onclick = function() {
    document.getElementById("exitBoxBackground").style.display = "none";
    console.log("Exit App")
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
