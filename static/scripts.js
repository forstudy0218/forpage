// A $( document ).ready() block.
$(document).ready(function(){
    init();
});
function init(){
    renew();
    navsearch();
    showmapbtn();
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

// secret map button
let togglecount = 0;
function clickedmenu () {
    togglecount++;
    if (togglecount === 7) {
        // create button
        // https://stackoverflow.com/questions/4772774/
        let a_for_map = document.createElement('a');
        var linkText = document.createTextNode("Map");
        a_for_map.appendChild(linkText);
        a_for_map.className = "btn btn-primary";
        a_for_map.href = "/map_for_test";
        const btnZone = document.getElementById("btn_zone");
        btnZone.appendChild(a_for_map);
    }
}
function showmapbtn () {
    const menutotoggle = document.getElementById("menubtn");
    menutotoggle.addEventListener("click",clickedmenu,false);
}