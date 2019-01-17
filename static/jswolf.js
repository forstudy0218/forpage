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

var rolecon = 0;

$(document).ready(function(){
    // ready
    ready();
});

function ready(){
    // Check gamephase
    // On creation phase
    if (gamephase === "0") {
        // Confirm zero
        setzero();
    }
    // Game start
    if (gamephase === "1") {
        // Confirm one
        starting();
    }
}

function addnew() {
    if ($("#newname")[0].value != "") {
        let playname = $("#newname")[0].value;
        let playdata = {"playname": playname, "role": '', "alive": 1};
        for (let i = 0; i < playersdata.length; i++) {
            if (playname === playersdata[i].playname) {
                alert("Already exist.");
                setTimeout(function() {
                    $('#newplayer')[0].reset();
                }, 500);
                return false;
            }
        }
        playersdata.push(playdata);
        localStorage.setItem('playersdata', JSON.stringify(playersdata));
        $("#creation").append(`<div class='wrappee'>${playname}</div>`);
        alert('Added.');
        setTimeout(function() {
            $('#newplayer')[0].reset();
        }, 500);
        return false;
    } else {
        alert("Name needed!");
        return false;
    }
}

function setzero() {
    // Setting zero
    // make anything unseen and disable
    $("#startgame").prop("disabled", true);
    $("#rolesetting").css("display", "none");
    $(".backtolist").prop("disabled", true);
    $(".backtolist").css("display", "none");
    $("#rolecheck").css("display", "none");
    $(".description").css("display", "none");
    // except current stage
    $("#creation").css("display", "block");
    $("#newplayer").prop("disabled", false);
    $("#deletion").prop("disabled", false);
    $("#playerset").prop("disabled", false);
    // Have playersdata
    if (playersdata.length != 0) {
        for (let i = 0; i < playersdata.length; i++) {
            playdata = playersdata[i];
            playdata["role"] = '';
            playdata["alive"] = 1;
            playname = playdata["playname"];
            $("#creation").append(`<div class='wrappee'>${playname}</div>`);
        }
        console.log(playersdata);
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

// roles setting stage

function playerset() {
    if (playersdata.length < 5) {
        alert("At least five players.");
    } else {
        // Setting roles
        // make anything unseen and disable
        $("#creation").css("display", "none");
        $("#newplayer").prop("disabled", true);
        $("#deletion").prop("disabled", true);
        $("#playerset").prop("disabled", true);
        $("#rolecheck").css("display", "none");
        $(".description").css("display", "none");
        // except current stage
        $("#startgame").prop("disabled", false);
        $("#rolesetting").css("display", "block");
        $(".backtolist").prop("disabled", false);
        $(".backtolist").css("display", "block");
        // create form
        let playnum = playersdata.length;
        for (let i = 0; i < playnum; i++) {
            $(".rolesnum").append(`<option>${i}</option>`);
        }
    }
}

function backplaylist(){
    // refresh page should work
    // reset gamephase
    localStorage.setItem('gamephase', "0");
    rolecon = 0;
    window.location.reload();
    /* make anything unseen and disable
    $("#startgame").prop("disabled", true);
    $("#rolesetting").css("display", "none");
    $(".backtolist").prop("disabled", true);
    $(".backtolist").css("display", "none");
    $(".rolesnum").empty();
    // except current stage
    $("#creation").css("display", "block");
    $("#newplayer").prop("disabled", false);
    $("#deletion").prop("disabled", false);
    $("#playerset").prop("disabled", false); */
}

function startgame() {
    let roleslist = [];
    let venum = Number($("#vecount option:selected").text());
    if (venum > 0) {
        for (let i = 0; i < venum; i++){
            roleslist.push('ve');
        }
    }
    let ftnum = Number($("#ftcount option:selected").text());
    if (ftnum > 0) {
        for (let i = 0; i < ftnum; i++){
            roleslist.push('ft');
        }
    }
    let htnum = Number($("#htcount option:selected").text());
    if (htnum > 0) {
        for (let i = 0; i < htnum; i++){
            roleslist.push('ht');
        }
    }
    let dsnum = Number($("#dscount option:selected").text());
    if (dsnum > 0) {
        for (let i = 0; i < dsnum; i++){
            roleslist.push('ds');
        }
    }
    let wwnum = Number($("#wwcount option:selected").text());
    if (wwnum > 0) {
        for (let i = 0; i < wwnum; i++){
            roleslist.push('ww');
        }
    } else {
        alert("No werewolf.");
    }
    let mmnum = Number($("#mmcount option:selected").text());
    if (mmnum > 0) {
        for (let i = 0; i < mmnum; i++){
            roleslist.push('mm');
        }
    }
    let sfnum = Number($("#sfcount option:selected").text());
    if (sfnum > 0) {
        for (let i = 0; i < sfnum; i++){
            roleslist.push('sf');
        }
    }
    if (roleslist.length != playersdata.length) {
        alert("Not match.");
    } else {
        alert("Randomizing.");
        roleslist = shuffle(roleslist);
        // assign roles
        for (let i = 0; i < playersdata.length; i++) {
            playersdata[i]["role"] = roleslist[i];
        }
        starting();
    }
}

// https://stackoverflow.com/questions/2450954/
// randomize list
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function starting() {
    alert("Game Start!");
    console.log(playersdata);
    localStorage.setItem('gamephase', "1");
    // make everything unseen and disable
    $("#startgame").prop("disabled", true);
    $("#rolesetting").css("display", "none");
    $("#creation").css("display", "none");
    $("#newplayer").prop("disabled", true);
    $("#deletion").prop("disabled", true);
    $("#playerset").prop("disabled", true);
    $("#rolecheck").css("display", "none");
    $(".description").css("display", "none");
    // start role confirmation
    checkrole(rolecon);
}

function checkrole(pos) {
    if (pos >= playersdata.length) {
        alert("Confirmation done.");
        // move to next phase
    } else {
        let playdata = playersdata[pos];
        let playname = playdata["playname"];
        let playrole = playdata["role"];
        $("#checkarea").prepend(`<h1 class="nametext">${playname}</h1>`);
        $("#checkarea").append(`<button class="checkbtn btn btn-success" onclick="showrole(${playrole})">我是${playname}</button>`);
        $("#rolecheck").css("display", "block");
    }
}

function showrole(rolename) {
    // ve, ft, ht, ds, ww, mm, sf
    $("#rolecheck").css("display", "none");
    $("#checkarea").empty();
    roletag = rolename;
    let playdata = playersdata[rolecon];
    let playrole = playdata["role"];
    $(roletag).append(`<button class="checkbtn btn btn-success" onclick="roled(${playrole})">確認</button>`);
    $(roletag).css("display", "block");
}

function roled(rolename) {
    $(rolename).css("display", "none");
    $(".checkbtn").detach();
    // next player
    rolecon++;
    checkrole(rolecon);
}