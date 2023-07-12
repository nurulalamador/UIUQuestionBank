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

document.addEventListener("adobe_dc_view_sdk.ready", function(){ 
    var adobeDCView = new AdobeDC.View({clientId: "<YOUR_CLIENT_ID>", divId: "questionHere"});
    adobeDCView.previewFile({
        content:{location: {url: `https://files.catbox.moe/${Question[0].url}.pdf`}},
        metaData:{fileName: trimesterName}
    }, {showAnnotationTools: false, showDownloadPDF: false, showPrintPDF: false});
});

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