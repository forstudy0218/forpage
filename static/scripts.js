// A $( document ).ready() block.
$(document).ready(function(){
    init();
});
function init(){
    renew();
    navsearch();
}
// https://www.w3schools.com/js/tryit.asp?filename=tryjs_timing_clock
function renew() {
    let date = new Date();
    $("#localtime").html(date);
    let t = setTimeout(renew, 500);
}
// https://stackoverflow.com/questions/10011802/
function navsearch() {
    $('#navselect').change(function() {
        let site = $('option:selected',this).attr('value');
        if (site === "search") {
            $('#navsearchbox').attr("action", "https://www.google.com/search");
            $('#navquery').attr("name", "q");
            $('#navquery').attr("placeholder", "Google it!");
        } else if (site === "map") {
            $('#navsearchbox').attr("action", "https://www.google.com/maps");
            $('#navquery').attr("name", "q");
            $('#navquery').attr("placeholder", "Where to go?");
        } else if (site === "youtube") {
            $('#navsearchbox').attr("action", "https://www.youtube.com/results");
            $('#navquery').attr("name", "search_query");
            $('#navquery').attr("placeholder", "Watch this!");
        } else if (site === "twitter") {
            $('#navsearchbox').attr("action", "https://twitter.com/search");
            $('#navquery').attr("name", "q");
            $('#navquery').attr("placeholder", "What's new?");
        }
    });
}
// Default after submit
function navsubmit () {
    setTimeout(function() {
        $('#navsearchbox').attr("action", "https://www.google.com/search");
        $('#navquery').attr("name", "q");
        $('#navquery').attr("placeholder", "Google it!");
        $('#navsearchbox')[0].reset();
    }, 500);
}