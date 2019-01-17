// Starting game
// Set game phase
if (!localStorage.getItem('gamephase')) {
    localStorage.setItem('gamephase', "0");
    var gamephase = "0";
} else {
    var gamephase = localStorage.getItem('gamephase');
}
if (!localStorage.getItem('playersdata')) {
    var playersdata = [];
    localStorage.setItem('playersdata', JSON.stringify(playersdata));
} else {
    let tempdata = localStorage.getItem('playersdata');
    var playersdata = JSON.parse(tempdata);
}

$(document).ready(function(){
    console.log("go ready");
    ready();
});

function ready(){
    console.log(gamephase);
    // On creation phase
    if (gamephase === "0") {
        console.log("Confirm zero");
        setzero();
    }
}

function addnew() {
    if ($("#newname")[0].value != "") {
        let playname = $("#newname")[0].value;
        let playdata = {"playname": playname, "face": '', "alive": 1};
        for (let i = 0; i < playersdata.length; i++) {
            if (playname === playersdata[i].playname) {
                alert("Already exist.");
                return false;
            }
        }
        playersdata.push(playdata);
        localStorage.setItem('playersdata', JSON.stringify(playersdata));
        $("#creation").append(`<div class='wrappee'>${playname}</div>`);
        alert('Added.');
        return false;
    } else {
        alert("Name needed!");
        return false;
    }
}

function setzero() {
    console.log("Setting zero");
    $("#creation").css("display", "block");
    $("#newplayer").prop("disabled", false);
    $("#deletion").prop("disabled", false);
    console.log(playersdata);
    // No playersdata
    if (playersdata.length != 0) {
        for (let i = 0; i < playersdata.length; i++) {
            playdata = playersdata[i];
            playdata["face"] = '';
            playdata["alive"] = 1;
            playname = playdata["playname"];
            $("#creation").append(`<div class='wrappee'>${playname}</div>`);
            console.log(playdata);
        }
    }
}

function deleteplay() {
    let playname = $("#delname")[0].value;
    // https://stackoverflow.com/questions/10024866
    playersdata = playersdata.filter(el => el.playname !== playname);
    alert(`deleted ${playname}`);
    localStorage.setItem('playersdata', JSON.stringify(playersdata));
    return true;
}