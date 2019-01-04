// A $( document ).ready() block.
// https://www.w3schools.com/js/tryit.asp?filename=tryjs_timing_clock
$(document).ready(function renew() {
    let date = new Date();
    $("#localtime").html(date);
    let t = setTimeout(renew, 500)
});