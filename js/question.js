var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var getId = urlParams.get('id');
var getId = urlParams.get('id');
var getTerm = urlParams.get('term');
var getTri = urlParams.get('tri');

Courses = Courses.filter(function(el) {
    return el.id == getId;
});

var Course = Courses[0];

Questions = Course[getTerm];

Question = Questions.filter(function(el) {
    return el.code == getTri;
});

var termName = getTerm = "mid" ? "Mid" : "Final";

var trimesterCode = getTri.charAt(2);
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
var trimesterName = trimesterName+" 20"+getTri.charAt(0)+getTri.charAt(1);

document.getElementById("titleDiv").innerHTML = termName+" - "+trimesterName;
document.getElementById("semiTitleDiv").innerHTML = Course.title;

try {
    var adobeDCView = new AdobeDC.View({clientId: "adb7ebc00d5649b184f5e4ac5e73acce", divId: "questionHere"});
    adobeDCView.previewFile({
        content:{location: {url: `https://files.catbox.moe/${Question[0].url}.pdf`}},
        metaData:{fileName: trimesterName}
    }, {showAnnotationTools: false, showDownloadPDF: false, showPrintPDF: false});
} catch (error) {
    document.addEventListener("adobe_dc_view_sdk.ready", function(){ 
        var adobeDCView = new AdobeDC.View({clientId: "adb7ebc00d5649b184f5e4ac5e73acce", divId: "questionHere"});
        adobeDCView.previewFile({
            content:{location: {url: `https://files.catbox.moe/${Question[0].url}.pdf`}},
            metaData:{fileName: trimesterName}
        }, {enableLinearization: true, showAnnotationTools: false, showDownloadPDF: false, showPrintPDF: false});
    });
}


document.getElementById("openToolMenu").onclick = function() {
    document.getElementById("toolMenu").style.display = "block";
}

document.getElementById("downloadLink").innerHTML = `
        <a href="https://files.catbox.moe/${Question[0].url}.pdf" download="${Course.title+" - "+trimesterName}.pdf">
            <div class="tool rippleButtonBlack">
                <div class="icon"><i class="fas fa-file-pdf"></i></div>
                <div class="name">Download PDF</div>
            </div>
        </a>
` ;

document.getElementById("toolMenu").onclick = function() {
    document.getElementById("toolMenu").style.display = "none";
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
