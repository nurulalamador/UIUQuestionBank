var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var getId = urlParams.get('id');
var getTerm = urlParams.get('term');

var fileUrls = [];
var Course = [];
var termName;

function loadQuestions(courses) {
    Courses = courses.filter(function(el) {
        return el.id == getId;
    });
    
    Course = Courses[0];
    termName = getTerm == "mid" ? "Mid-Term" : "Final";
    document.getElementById("mainTitle").innerHTML = termName+" Questions";
    document.getElementById("titleDiv").innerHTML = Course.code;
    document.getElementById("semiTitleDiv").innerHTML = Course.title;
    document.getElementById("courseInfoBox").style.backgroundImage = Course.css;
    document.getElementById("courseTitle").innerHTML = Course.title;
    document.getElementById("courseCode").innerHTML = Course.code;
    
    if(Course[getTerm].length == 0) {
        document.getElementById("questionBoxContainer").innerHTML += 
        `            
        <div class="notFound">
            <div class="icon">
                <i class="fas fa-poll-h"></i>
            </div>
            <div class="text">
                <div class="title">No Question Found</div>
                <div class="semiTitle">Please check again later!</div>
            </div>
        </div>
        `;
    }
    else {
        Course[getTerm].forEach(function (course) {
            fileUrls.push(course.url);
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
                <a href="question.html?id=${getId}&term=${getTerm}&tri=${course.code}">
                    <div class="questionBox">
                        <div class="code" style="background: ${Course.css}">${course.code}</div>
                        <div class="name">${trimesterName}</div>
                    </div>
                </a>
            `
        });
    }
}

var randomVersion = Math.floor(Math.random()*10**15);
async function loadCourseData() {
    const response = await fetch("js/data.json?"+randomVersion);
    const courses = await response.json();
    loadQuestions(await courses);
}

loadCourseData();

document.getElementById("openToolMenu").onclick = function() {
    document.getElementById("toolMenu").style.display = "block";
}

document.getElementById("toolMenu").onclick = function() {
    document.getElementById("toolMenu").style.display = "none";
}


function GenerateZIP() {
    function isFacebookApp() {
        var isTrue = /FB_IAB/.test(navigator.userAgent) || /FBAN/.test(navigator.userAgent) || /FBAV/.test(navigator.userAgent);
        return isTrue;
    }

    if (isFacebookApp()) {
        showToast("This feature is not supported in this browser. Try with Google Chrome.");
        return;
    }

    var zip = new JSZip();
    document.getElementById("zipBoxBackground").style.display = "block";
    var count = 0;
    document.getElementById("zipComplete").style.width = "0%";
    var percentRate = 100/(fileUrls.length);
    var currentPercent = percentRate;
    fileUrls.forEach(function(url) {
      fetch(url)
        .then(function(response) {
          return response.blob();
        })
        .then(function(blob) {
          // Get the filename from the URL
          var filename = url.substring(url.lastIndexOf("/") + 1);

          // Add the file to the zip
          zip.file(filename, blob, { binary: true });

          count++;
          // Check if all files have been added to the zip
          if (count === fileUrls.length) {
            // Generate the zip and create a download link
            zip.generateAsync({ type: "blob" })
              .then(function(content) {
                // Create a download link and trigger the download
                var downloadLink = document.createElement("a");
                downloadLink.href = URL.createObjectURL(content);
                downloadLink.download = Course.title+" - "+termName+".zip";
                downloadLink.click();
              });
            
            setTimeout(function() {
                document.getElementById("zipBoxBackground").style.display = "none";
                showToast("ZIP download will start soon...");
            },1000);
          }
          document.getElementById("zipComplete").style.width = currentPercent+"%";
          currentPercent += percentRate; 
        });
    });
};

function showToast(string) {
    var x = document.getElementById("snackbar");
    if(x.className != "show") {
        x.className = "show";
        x.innerHTML = string;
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
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
