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
        var n;
        if(courses.length > 3) {
            n = 3;
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