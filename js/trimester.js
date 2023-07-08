var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var getTrimester = urlParams.get('n');

document.getElementById("trimesterTitle").innerHTML = "Trimester "+getTrimester;

Courses = Courses.filter(function(el) {
    return el.trimester == getTrimester;
});

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
            <div class="courseBox rippleButton" style="${course.css}">
                <div class="text">
                    <div class="title">${course.title}</div>
                    <div class="semiTitle">${course.code}</div>
                </div>
            </div>
            `;
        });
    }
}

fillUpCourseBoxContainer(Courses);

document.getElementById("searchCourse").oninput = function(e) {
    var searchValue = e.target.value;
    
    searchCourses = Courses.filter(function(el) {
        return el.title.toLowerCase().includes(searchValue.toLowerCase()) || el.code.toLowerCase().includes(searchValue.toLowerCase());
    })

    fillUpCourseBoxContainer(searchCourses);
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