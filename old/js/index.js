var Courses = [];

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

if(localStorage.getItem("isBookmarkedCourseAdded") == null) {
    localStorage.setItem("bookmarkedCourse", "MATH1151,CSE1115,CSE1325");
    localStorage.setItem("isBookmarkedCourseAdded", "true");
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

function setBookmark(courses) {
    if(bookmarkedCourseData != ""){
        bookmarkedCourseData = bookmarkedCourseData.split(",");
        bookmarkedCourseData.forEach(function(code) {
            matchedCourse = courses.filter(function(el) {
                return el.id.includes(code);
            });
            bookmarkedCourse.push(matchedCourse[0]);
        });
    }

    fillUpCourseBoxContainer(bookmarkedCourse, bookmarkedCourse.length);
}

var randomVersion = Math.floor(Math.random()*10**15);
async function loadCourseData() {
    const response = await fetch("js/data.json?"+randomVersion);
    const courses = await response.json();
    Courses = await courses;
    setBookmark(await courses);
}
loadCourseData();

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
    let newBookmarkedCourseData = [];
    var newTrimester = document.getElementById("trimesterList").value;
    let matchedCourses = Courses.filter(function(el) {
        return el.trimester == newTrimester;
    });
    matchedCourses.forEach(function(course) { 
        newBookmarkedCourseData.push(course.id);
    });

   localStorage.setItem("bookmarkedCourse", newBookmarkedCourseData.toString());
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


fetch("js/ayat.json?new")
.then(res => res.json())
.then(function (res) {
    var randomInteger = Math.floor(Math.random() * 100);
    var randomAyat = randomInteger%8;
    document.getElementById("ayatBoxHere").innerHTML = `
    <div class="ayatBox">
        <div class="arabicAyat">${res[randomAyat].ayatAR}</div>
        <div class="ayatTranslation">
            <div class="englishAyat">${res[randomAyat].ayatEN}</div>
            <div class="englishAyat">${res[randomAyat].ayatBN}</div>
            <div class="surahName">
                <div class="title">${res[randomAyat].surah}</div>
                <div class="semiTitle">Ayat ${res[randomAyat].ayatNo}</div>
            </div> 
        </div>
    </div>
    `;
})
.catch(function() {
});
