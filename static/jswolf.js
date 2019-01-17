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
if (!localStorage.getItem('hanglist')) {
    var hanglist = [];
    localStorage.setItem('hanglist', JSON.stringify(hanglist));
} else {
    let tempdata = localStorage.getItem('hanglist');
    var hanglist = JSON.parse(tempdata);
}
if (!localStorage.getItem('nightcount')) {
    localStorage.setItem('nightcount', 0);
}

var nightcount = Number(localStorage.getItem('nightcount'));

var rolecon = 0;

// save death list for night
var nightdeathlist = [];
// wolf vote for night
var wolfvotelist = [];
// hunter protection;
var htpro = "";

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
    // Night time
    if (gamephase === "2") {
        // Confirm two
        night();
    }
    // day time
    if (gamephase === "3") {
        // Confirm two
        day();
    }
}

function rezero() {
    // make everything unseen and disable
    $("#startgame").prop("disabled", true);
    $("#rolesetting").css("display", "none");
    $("#creation").css("display", "none");
    $("#newplayer").prop("disabled", true);
    $("#deletion").prop("disabled", true);
    $("#playerset").prop("disabled", true);
    $("#rolecheck").css("display", "none");
    $(".description").css("display", "none");
    $("#checkarea").empty();
    $(".rolesnum").empty();
    $(".checkbtn").detach();
    $(".nightinfo").detach();
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
    rezero();
    $(".playerlist").detach();
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
            $("#creation").append(`<div class='wrappee playerlist'>${playname}</div>`);
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
        rezero();
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
// base button function to reset everything
function backplaylist(){
    // refresh page should work
    // reset gamesave
    hanglist = [];
    localStorage.setItem('hanglist', JSON.stringify(hanglist));
    localStorage.setItem('gamephase', "0");
    gamephase = "0";
    localStorage.setItem('nightcount', 0);
    nightcount = 0;
    rolecon = 0;
    nightdeathlist = [];
    wolfvotelist =[];
    htpro = "";
    setzero();
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
        roleslist = [];
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
    rezero();
    // start role confirmation
    checkrole(rolecon);
}

function checkrole(pos) {
    if (pos >= playersdata.length) {
        alert("Confirmation done.");
        // move to next phase
        localStorage.setItem('gamephase', "2");
        rolecon = 0;
        night();
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

function night() {
    // make everything unseen and disable
    rezero();
    nightact(rolecon);
}

function nightact(pos) {
    if (pos >= playersdata.length) {
        alert("Night End.");
        // the death
        nightcommit();
    } else {
        let playdata = playersdata[pos];
        if (playdata["alive"] === 1) {
            let playname = playdata["playname"];
            let playrole = playdata["role"];
            $("#checkarea").prepend(`<h1 class="nametext">${playname}</h1>`);
            $("#checkarea").append(`<button class="checkbtn btn btn-success" onclick="shownight(${playrole})">我是${playname}</button>`);
            $("#rolecheck").css("display", "block");
        } else {
            rolecon++;
            nightact(rolecon);
        }
    }
}

function shownight(rolename) {
    $("#rolecheck").css("display", "none");
    $("#checkarea").empty();
    roletag = rolename;
    let playdata = playersdata[rolecon];
    let playrole = playdata["role"];
    // ft, ht, ds, ww have action
    if (playrole === "ft") {
        showft(roletag);
    } else if (playrole === "ht") {
        showht(roletag);
    } else if (playrole === "ds") {
        showds(roletag);
    } else if (playrole === "ww") {
        showww(roletag);
    } else {
        showno(roletag);
    }
    $(roletag).css("display", "block");
}

// Action html generate
// ft
function showft(roletag) {
    let playdata = playersdata[rolecon];
    let playname = playdata["playname"];
    $(roletag).append("<h2 class='nightinfo'>請選擇要占卜的人</h2>");
    $(roletag).append("<select id='tempft' class='nightinfo'></select>");
    for (let i = 0; i < playersdata.length; i++) {
     if ((playersdata[i]["playname"] != playname) && (playersdata[i]["alive"] === 1)) {
            let ftname = playersdata[i]["playname"];
            $("#tempft").append(`<option class='nightinfo'>${ftname}</option>`);
        }
    }
    $(roletag).append("<button class='nightinfo btn btn-success' onclick='ftact()'>確認</button>");
}

// ht
function showht(roletag) {
    let playdata = playersdata[rolecon];
    let playname = playdata["playname"];
    if (nightcount === 0) {
        // first night no guard
        $(roletag).append("<h2 class='nightinfo'>第一晚,無需保護,請隨意選一人</h2>");
        $(roletag).append("<select id='templist' class='nightinfo'></select>");
        for (let i = 0; i < playersdata.length; i++) {
            if (playersdata[i]["alive"] === 1) {
                let tempname = playersdata[i]["playname"];
                $("#templist").append(`<option class='nightinfo'>${tempname}</option>`);
            }
        }
        $(roletag).append("<button class='nightinfo btn btn-success' onclick='npact()'>確認</button>");
    } else {
        $(roletag).append("<h2 class='nightinfo'>請選一人保護,對方今晚將不會被咬殺</h2>");
        $(roletag).append("<select id='tempht' class='nightinfo'></select>");
        for (let i = 0; i < playersdata.length; i++) {
            if ((playersdata[i]["playname"] != playname) && (playersdata[i]["alive"] === 1)) {
                let tempname = playersdata[i]["playname"];
                $("#tempht").append(`<option class='nightinfo'>${tempname}</option>`);
            }
        }
        $(roletag).append("<button class='nightinfo btn btn-success' onclick='htact()'>確認</button>");
    }
}
// ds
function showds(roletag) {
    $(roletag).append("<h2 class='nightinfo'>上一晚無人被投票驅逐</h2>");
    hanglen = hanglist.length;
    if (hanglen > 0) {
        let ttname = hanglist[hanglen - 1];
        for (let i = 0; i < playersdata.length; i++) {
            if (playersdata[i]["playname"] === ttname) {
                if (playersdata[i]["role"] === "ww") {
                    $(".nightinfo").detach();
                    $(roletag).append("<h1 class='nightinfo'>上一晚被投票驅逐的是狼人!</h1>");
                } else {
                    $(".nightinfo").detach();
                    $(roletag).append("<h2 class='nightinfo'>上一晚被投票驅逐的是無辜的</h2>");
                }
            }
        }
    }
    showno(roletag);
}
// ww
function showww(roletag) {
    let wwlist = playersdata.filter(el => el.role === "ww");
    // show list of ww
    $(roletag).append("<h2 class='nightinfo'>你的狼人同伴: </h2>");
    for (let i = 0; i < wwlist.length; i++) {
        let wwname = wwlist[i]["playname"];
        $(roletag).append(`<h2 class='nightinfo'>${wwname} (狼人)</h2>`);
    }
    if (nightcount != 0) {
        $(roletag).append("<h1 class='nightinfo'>請選擇你想咬殺的人(若存活狼人多於一人,選擇較多的對象為最終目標,票數相同則隨機一人)</h1>");
        $(roletag).append("<select id='tempww' class='nightinfo'></select>");
        let ttlist = playersdata.filter(el => el.role !== "ww");
        ttlist = ttlist.filter(el => el.alive !== 0);
        for (let i = 0; i < ttlist.length; i++) {
            let tempname = ttlist[i]["playname"];
            $("#wwlist").append(`<option class='nightinfo'>${tempname}</option>`);
        }
        $(roletag).append("<button class='nightinfo btn btn-danger' onclick='wwact()'>確認</button>");
    } else {
        showno(roletag);
    }
}
// no power
function showno(roletag) {
    let playdata = playersdata[rolecon];
    let playname = playdata["playname"];
    $(roletag).append("<h2 class='nightinfo'>請隨意選一人</h2>");
    $(roletag).append("<select id='templist' class='nightinfo'></select>");
    for (let i = 0; i < playersdata.length; i++) {
        if ((playersdata[i]["playname"] != playname) && (playersdata[i]["alive"] === 1)) {
            let tempname = playersdata[i]["playname"];
            $("#templist").append(`<option class='nightinfo'>${tempname}</option>`);
        }
    }
    $(roletag).append("<button class='nightinfo btn btn-success' onclick='npact()'>確認</button>");
}

// general action
function nightnext() {
    $(".description").css("display", "none");
    $(".nightinfo").detach();
    rolecon++;
    nightact(rolecon);
}

// ft action
function ftact() {
    let ttname = $("#tempft option:selected").text();
    console.log(`see ${ttname}`);
    for (let i = 0; i < playersdata.length; i++) {
        if (playersdata[i]["playname"] === ttname) {
            if (playersdata[i]["role"] === "ww") {
                alert(`${ttname} 是狼人!`);
            } else if (playersdata[i]["role"] === "sf") {
                nightdeathlist.push(ttname);
                alert(`${ttname} 是無辜的!`);
            } else {
                alert(`${ttname} 是無辜的!`);
            }
        }
    }
    nightnext();
}

// ht action
function htact() {
    let ttname = $("#tempht option:selected").text();
    console.log(ttname);
    alert(`你決定保護 ${ttname}`);
    htpro = ttname;
    nightnext();
}

// ww action
function wwact() {
    let ttname = $("#tempww option:selected").text();
    alert(`你決定咬 ${ttname}`);
    wolfvotelist.push(ttname);
    nightnext();
}

// no power alert
function npact() {
    alert("你又睡著了");
    nightnext();
}

// night end
function nightcommit() {
    // count wolf vote
    if (wolfvotelist.length > 0) {
        let possible = playersdata.filter(el => el.role !== "ww");
        possible = possible.filter(el => el.role !== "ww");
        let deadbite = countvote(wolfvotelist, possible);
        // check hunter protection
        if (htpro != deadbite) {
            nightdeathlist.push(deadbite);
        }
    }
    // commit dead
    for (let i = 0; i < nightdeathlist.length; i++) {
        let deadname = nightdeathlist[i];
        for (let j = 0; j < playersdata.length; j++) {
            if (deadname === playersdata[j]["playname"]) {
                playersdata[j]["alive"] = 0;
                alert(`${deadname} 已被殺死`);
            }
        }
    }
    // save the alive list
    localStorage.setItem('playersdata', JSON.stringify(playersdata));
    // move to day
    nightcount++;
    localStorage.setItem('nightcount', nightcount);
    localStorage.setItem('gamephase', "3");
    rolecon = 0;
    day();
}

// vote count; return most vote name
function countvote(votelist, poslist) {
    let countlist = [];
    for (let i = 0; i < poslist.length; i++) {
        let votename = poslist[i]["playname"];
        let icount = 0;
        for (let j = 0; j < votelist.length; j++) {
            if (votelist[j] === votename) {
                icount++;
            }
        }
        countlist.push(icount);
    }
    let mostpos = [];
    let votecount = 0;
    for (let k = 0; k < countlist.length; k++) {
        if (countlist[k] > votecount) {
            mostpos = [];
            votecount = countlist[k];
            mostpos.push(k);
        } else if (countlist[k] === votecount) {
            mostpos.push(k);
        }
    }
    mostpos = shuffle(mostpos);
    votepos = mostpos[0];
    ttname = poslist[votepos]["playname"];
    return ttname;
}

// day time; need table of alive
function day(){
    alert("早上好");
    // nightdeathlist = [];
    // htpro = "";
    // wolfvotelist = [];
}