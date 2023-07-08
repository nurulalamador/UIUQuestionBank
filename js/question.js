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
document.getElementById("iframeHere").innerHTML = `
    <iframe src="https://drive.google.com/file/d/${Question[0].url}/preview" allow="autoplay"></iframe>
`;

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