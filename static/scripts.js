// A $( document ).ready() block.
$(document).ready(function(){
    init();
});
function init(){
    renew();
}
// https://www.w3schools.com/js/tryit.asp?filename=tryjs_timing_clock
function renew() {
    let date = new Date();
    $("#localtime").html(date);
    let t = setTimeout(renew, 500)
}
$("#gsearchbox").submit(); // https://stackoverflow.com/questions/7704976