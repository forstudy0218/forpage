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

// Winning side. 1 for good, 2 for ww, 3 for sf
if (!localStorage.getItem('winside')) {
    localStorage.setItem('winside', "0");
    var winside = "0";
} else {
    var winside = localStorage.getItem('winside');
}

// save death list for night
var nightdeathlist = [];
// wolf vote for night
var wolfvotelist = [];
// hunter protection;
var htpro = [];

// save vote list
var dayvotelist =[];

$(document).ready(function() {
    // ready
    ready();
});

function ready() {
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
        // Confirm three
        day();
    }
    // endgame
    if (gamephase === "4") {
        end();
    }
}

function rezero() {
    // make everything unseen and disable
    $(".gbtn").prop("disabled", true);
    $("#newplayer").prop("disabled", true);
    $("#deletion").prop("disabled", true);
    $(".ckstop").css("display", "none");
    $(".ntstop").css("display", "none");
    $("#rolesetting").css("display", "none");
    $("#creation").css("display", "none");
    $("#rolecheck").css("display", "none");
    $(".description").css("display", "none");
    $("#daylayout").css("display", "none");
    $("#voteresult").css("display", "none");
    $("#voteplayers").css("display", "none");
    $("#votelayout").css("display", "none");
    $(".wwstorynote").css("display", "none");
    $("#geinfo").css("display", "none");
    $(".gegrid").css("visibility", "collapse");
    $("#gamerlist").css("visibility", "collapse");
    $("#dayalive").css("visibility", "collapse");
    $("#rolecheck").css("background", "");
    $("#rolecheck").css("color", "");
    $(".description").css("background", "");
    $(".description").css("color", "");
    $("#checkarea").empty();
    $(".rolesnum").empty();
    $(".checkbtn").detach();
    $(".nightinfo").detach();
    $(".dayinfo").detach();
    $(".voteinfo").detach();
    $(".vtres").detach();
    $(".endgame").detach();
}

function addnew() {
    if ($("#newname")[0].value !== "") {
        let playname = $("#newname")[0].value;
        let playdata = {"playname": playname, "role": '', "alive": 1};
        for (let i = 0; i < playersdata.length; i++) {
            if (playname === playersdata[i].playname) {
                showdialog("Already exist.");
                setTimeout(function() {
                    $('#newplayer')[0].reset();
                }, 500);
                return false;
            }
        }
        playersdata.push(playdata);
        localStorage.setItem('playersdata', JSON.stringify(playersdata));
        showdialog('Added.');
        setTimeout(function() {
            $('#newplayer')[0].reset();
        }, 500);
        setzero();
        return false;
    } else {
        showdialog("Name needed!");
        return false;
    }
}
// overflow
function turnoverflow() {
    let listht = $("#gamerlist").outerHeight();
    let addht = $("#newplayer").outerHeight();
    let delht = $("#deletion").outerHeight();
    let pauseht = $(".pausebtn").outerHeight();
    let wholeht = $("#creation").outerHeight();
    listht = wholeht - (addht + delht + pauseht);
    $("#gamerlist").css("overflow", "auto");
    $("#gamerlist").css("max-height", `${listht}px`);
}

function setzero() {
    // Setting zero
    // make anything unseen and disable
    rezero();
    $(".playerlist").detach();
    // except current stage
    $("#gamerlist").css("visibility", "visible");
    $("#creation").css("display", "block");
    $("#addplayer").prop("disabled", false);
    $("#delplayer").prop("disabled", false);
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
            $("#gamerlist").append(`<div class="playerlist col-5 col-lg-3">${playname}</div>`);
        }
        turnoverflow();
    }
}

function deleteplay() {
    let playname = $("#delname")[0].value;
    // https://stackoverflow.com/questions/10024866
    playersdata = playersdata.filter(el => el.playname !== playname);
    showdialog(`deleted ${playname}`);
    localStorage.setItem('playersdata', JSON.stringify(playersdata));
    let tempdata = localStorage.getItem('playersdata');
    playersdata = JSON.parse(tempdata);
    setTimeout(function() {
        $('#deletion')[0].reset();
    }, 500);
    setzero();
    return false;
}

// roles setting stage

function playerset() {
    if (playersdata.length < 5) {
        showdialog("At least five players.");
    } else {
        // Setting roles
        // make anything unseen and disable
        rezero();
        // except current stage
        $("#startgame").prop("disabled", false);
        $("#rolesetting").css("display", "block");
        // create form
        let playnum = playersdata.length;
        for (let i = 0; i < playnum; i++) {
            $(".rolesnum").append(`<option>${i}</option>`);
        }
    }
}
// base button function to reset everything
function backplaylist(){
    // reset gamesave
    localStorage.removeItem('hanglist');
    localStorage.removeItem('gamephase');
    localStorage.removeItem('winside');
    localStorage.removeItem('nightcount');
    hanglist = [];
    winside = "0";
    gamephase = "0";
    nightcount = 0;
    rolecon = 0;
    dayvotelist =[];
    nightdeathlist = [];
    wolfvotelist =[];
    htpro = [];
    pauseww();
    setzero();
}

function startgame() {
    let roleslist = [];
    let venum = Number($("#vecount option:selected").text());
    if (venum > 0) {
        for (let i = 0; i < venum; i++) {
            roleslist.push('ve');
        }
    }
    let ftnum = Number($("#ftcount option:selected").text());
    if (ftnum > 0) {
        for (let i = 0; i < ftnum; i++) {
            roleslist.push('ft');
        }
    }
    let htnum = Number($("#htcount option:selected").text());
    if (htnum > 0) {
        for (let i = 0; i < htnum; i++) {
            roleslist.push('ht');
        }
    }
    let dsnum = Number($("#dscount option:selected").text());
    if (dsnum > 0) {
        for (let i = 0; i < dsnum; i++) {
            roleslist.push('ds');
        }
    }
    let wwnum = Number($("#wwcount option:selected").text());
    if (wwnum > 0) {
        for (let i = 0; i < wwnum; i++) {
            roleslist.push('ww');
        }
    } else {
        showdialog("No werewolf.");
    }
    let mmnum = Number($("#mmcount option:selected").text());
    if (mmnum > 0) {
        for (let i = 0; i < mmnum; i++) {
            roleslist.push('mm');
        }
    }
    let sfnum = Number($("#sfcount option:selected").text());
    if (sfnum > 0) {
        for (let i = 0; i < sfnum; i++) {
            roleslist.push('sf');
        }
    }
    if ((roleslist.length != playersdata.length) || (wwnum === 0)) {
        showdialog("Not match.");
    } else {
        showdialog("Randomizing.");
        roleslist = shuffle(roleslist);
        // assign roles
        for (let i = 0; i < playersdata.length; i++) {
            playersdata[i]["role"] = roleslist[i];
        }
        localStorage.setItem('playersdata', JSON.stringify(playersdata));
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
    showdialog("Game Start!");
    localStorage.setItem('gamephase', "1");
    // make everything unseen and disable
    rezero();
    // start role confirmation
    checkrole(rolecon);
}

function checkrole(pos) {
    if (pos >= playersdata.length) {
        rezero();
        checkstop();
    } else {
        let playdata = playersdata[pos];
        let playname = playdata["playname"];
        let playrole = playdata["role"];
        $("#checkarea").prepend(`<h1 class="nametext">${playname} 確認身份</h1>`);
        $("#checkarea").append(`<button class="checkbtn btn btn-success" onclick="showrole(${playrole})">我是${playname}</button>`);
        $("#rolecheck").css("display", "block");
    }
}
// Check done
function checkstop() {
    // move to next phase
    $(".ckstop").prop("disabled", false);
    $(".ckstop").css("display", "block");
}

function showrole(rolename) {
    // ve, ft, ht, ds, ww, mm, sf
    $("#rolecheck").css("display", "none");
    $("#checkarea").empty();
    roletag = rolename;
    let playdata = playersdata[rolecon];
    let playrole = playdata["role"];
    $(roletag).append(`<button class="checkbtn btn btn-success" onclick="roled(${playrole})">確認</button>`);
    $(".checkbtn").attr("disabled", true);
    $(".wwstorynote").css("display", "inline-block");
    $(roletag).css("display", "block");
    // add animation
    $(".animated").css("animation-name", "grow");
    $(".animated").css("animation-duration", "2s");
    $(".animated").css("animation-fill-mode", "forwards");
    setTimeout(() => {
        $(".checkbtn").attr("disabled", false);
    }, 3000);
}

function roled(rolename) {
    $(rolename).css("display", "none");
    $(".animated").css("animation-name", "");
    $(".wwstorynote").css("display", "none");
    $(".checkbtn").detach();
    // next player
    showdialog("已確認");
    rolecon++;
    checkrole(rolecon);
}

function night() {
    // make everything unseen and disable
    rezero();
    showdialog("進入晚上")
    localStorage.setItem('gamephase', "2");
    // night style
    $("#rolecheck").css("background", "black");
    $("#rolecheck").css("color", "yellow");
    $(".description").css("background", "black");
    $(".description").css("color", "aquamarine");
    nightdeathlist = [];
    htpro = [];
    wolfvotelist = [];
    rolecon = 0;
    nightact(rolecon);
}

function nightact(pos) {
    if (pos >= playersdata.length) {
        rezero();
        // pause for reset page
        nightstop();
    } else {
        let playdata = playersdata[pos];
        if (playdata["alive"] === 1) {
            let playname = playdata["playname"];
            let playrole = playdata["role"];
            $("#checkarea").prepend(`<h1 class="nametext">${playname} 現在晚上</h1>`);
            $("#checkarea").append(`<button class="checkbtn btn btn-success" onclick="shownight(${playrole})">我是${playname}</button>`);
            $("#rolecheck").css("display", "block");
        } else {
            rolecon++;
            nightact(rolecon);
        }
    }
}
// pause page for rezero
function nightstop() {
    // the death button
    $(".ntstop").prop("disabled", false);
    $(".ntstop").css("display", "block");
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
    $(roletag).append("<select id='tempft' class='nightinfo ntsec'></select>");
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
    if (nightcount === 0) {
        // first night no guard
        $(roletag).append("<h2 class='nightinfo'>第一晚,無需保護,請隨意選一人</h2>");
        $(roletag).append("<select id='templist' class='nightinfo ntsec'></select>");
        for (let i = 0; i < playersdata.length; i++) {
            if (playersdata[i]["alive"] === 1) {
                let tempname = playersdata[i]["playname"];
                $("#templist").append(`<option class='nightinfo'>${tempname}</option>`);
            }
        }
        $(roletag).append("<button class='nightinfo btn btn-success' onclick='npact()'>確認</button>");
    } else {
        $(roletag).append("<h2 class='nightinfo'>請選一人保護,對方今晚將不會被咬殺</h2>");
        $(roletag).append("<select id='tempht' class='nightinfo ntsec'></select>");
        for (let i = 0; i < playersdata.length; i++) {
            if (playersdata[i]["alive"] === 1) {
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
    $(roletag).append("<h3 class='nightinfo'>以下玩家是狼人:</h3>");
    for (let i = 0; i < wwlist.length; i++) {
        let wwname = wwlist[i]["playname"];
        $(roletag).append(`<h3 class='nightinfo'>${wwname} (狼人)</h3>`);
    }
    if (nightcount != 0) {
        $(roletag).append("<h1 class='nightinfo'>請選擇你想咬殺的人</h1>");
        $(roletag).append("<button class='nightinfo wwrule btn btn-info' onclick='wwrule()'>RULE</button>");
        $(roletag).append("<select id='tempww' class='nightinfo ntsec'></select>");
        let ttlist = playersdata.filter(el => el.role !== "ww");
        ttlist = ttlist.filter(el => el.alive !== 0);
        for (let i = 0; i < ttlist.length; i++) {
            let tempname = ttlist[i]["playname"];
            $("#tempww").append(`<option class='nightinfo'>${tempname}</option>`);
        }
        $(roletag).append("<button class='nightinfo btn btn-danger' onclick='wwact()'>確認</button>");
    } else {
        showno(roletag);
    }
}
function wwrule() {
    showdialog("若存活狼人多於一人,較多狼人選擇的對象為最終目標,票數相同則隨機一人");
}
// no power
function showno(roletag) {
    let playdata = playersdata[rolecon];
    let playname = playdata["playname"];
    $(roletag).append("<h2 class='nightinfo'>請隨意選一人</h2>");
    $(roletag).append("<select id='templist' class='nightinfo ntsec'></select>");
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
    showdialog("請點一下「確認」, 再交給下一位玩家");
    rolecon++;
    nightact(rolecon);
}

// ft action
function ftact() {
    let ttname = $("#tempft option:selected").text();
    for (let i = 0; i < playersdata.length; i++) {
        if (playersdata[i]["playname"] === ttname) {
            if (playersdata[i]["role"] === "ww") {
                showdialog(`占卜結果: ${ttname} 是狼人!`);
            } else if (playersdata[i]["role"] === "sf") {
                nightdeathlist.push(ttname);
                showdialog(`占卜結果: ${ttname} 是無辜的!(不是狼人)`);
            } else {
                showdialog(`占卜結果: ${ttname} 是無辜的!(不是狼人)`);
            }
        }
    }
    nightnext();
}

// ht action
function htact() {
    let ttname = $("#tempht option:selected").text();
    showdialog(`你決定保護 ${ttname}`);
    htpro.push(ttname);
    nightnext();
}

// ww action
function wwact() {
    let ttname = $("#tempww option:selected").text();
    showdialog(`你決定咬 ${ttname}`);
    wolfvotelist.push(ttname);
    nightnext();
}

// no power alert
function npact() {
    showdialog("然後你又睡著了");
    nightnext();
}

// night end
function nightcommit() {
    // count wolf vote
    if (wolfvotelist.length > 0) {
        let possible = playersdata.filter(el => el.role !== "ww");
        possible = possible.filter(el => el.role !== "ww");
        let deadbite = countvoteran(wolfvotelist, possible);
        // check hunter protection and deadbite role
        let bitedata = possible.filter(el => el.playname === deadbite);
        let biterole = bitedata[0]["role"];
        let protection = 0;
        // check ht protection
        for (let i = 0; i < htpro.length; i++) {
            if (deadbite === htpro[i]){
                // protected
                protection = 1;
            }
        }
        if ((protection !== 1) && (biterole !== "sf")) {
            nightdeathlist.push(deadbite);
        }
    }
    // commit dead
    for (let i = 0; i < nightdeathlist.length; i++) {
        let deadname = nightdeathlist[i];
        for (let j = 0; j < playersdata.length; j++) {
            if (deadname === playersdata[j]["playname"]) {
                playersdata[j]["alive"] = 0;
                showdialog(`${deadname} 已被殺死`);
            }
        }
    }
    // no death alert
    if (nightdeathlist.length === 0) {
        showdialog("無人死亡");
    }
    // save the alive list
    localStorage.setItem('playersdata', JSON.stringify(playersdata));
    // win determination
    if (!win()) {
        // nowin
        // move to day
        nightcount++;
        localStorage.setItem('nightcount', nightcount);
        day();
    } else {
        end();
    }
}

// vote count; return most vote name in a possible list
// same vote random kill
function countvoteran(votelist, poslist) {
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
    let ttname = poslist[votepos]["playname"];
    return ttname;
}
// same vote no kill
function countvotenk(votelist, poslist) {
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
    if (mostpos.length === 1) {
        votepos = mostpos[0];
        let ttname = poslist[votepos]["playname"];
        return ttname;
    } else if (mostpos.length > 1) {
        return "";
    } else {
        // sanity check
        alert("Code broken.");
    }
}

// day time; need li of alive
function day() {
    nightdeathlist = [];
    htpro = [];
    wolfvotelist = [];
    // make everything unseen and disable
    rezero();
    // save phase
    localStorage.setItem('gamephase', "3");
    rolecon = 0;
    // print alive
    let alivelist = playersdata.filter(el => el.alive === 1);
    for (let i = 0; i < alivelist.length; i++) {
        let playdata = alivelist[i];
        let playname = playdata["playname"];
        let playrole = playdata["role"];
        $("#dayalive").append(`<div class="dayinfo col-5 col-lg-3">${playname}<button class="dayinfo daybtn gbtn btn btn-info" onclick="dayrole(${playrole})"></button></div>`);
    }
    $(".daybtn").prop("disabled", true);
    // show day
    $("#dayalive").css("visibility", "visible");
    $("#askrolebtn").prop("disabled", false);
    $("#daylayout").css("display", "block");
}

// askrolebtn funtion
function dayask() {
    let daybtn = $(".daybtn");
    if (daybtn.is(':disabled')) {
        $(".daybtn").prop("disabled", false);
    } else {
        $(".daybtn").prop("disabled", true);
    }
}

// check role in day
function dayrole(rolename) {
    // clear everything
    rezero();
    roletag = rolename;
    let wwlist = playersdata.filter(el => el.role === "ww");
    // show list of ww for #ww
    $("#ww").append("<h3 class='dayinfo'>以下玩家是狼人:</h3>");
    for (let i = 0; i < wwlist.length; i++) {
        let wwname = wwlist[i]["playname"];
        $("#ww").append(`<h3 class='dayinfo'>${wwname} (狼人)</h3>`);
    }
    $(roletag).append('<button class="dayinfo gbtn btn btn-success" onclick="day()">確認</button>');
    $(roletag).css("display", "block");
    // back to day button
}

// vote start
function votetime() {
    // clear everything
    rezero();
    // style vote
    $("#rolecheck").css("background", "#07f6ff38");
    $("#rolecheck").css("color", "red");
    rolecon = 0;
    dayvotelist =[];
    checkvote(rolecon);
}
// something like checkrole
function checkvote(pos) {
    if (pos >= playersdata.length) {
        rezero();
        // move to next phase
        rolecon = 0;
        calvote();
    } else {
        let playdata = playersdata[pos];
        if (playdata["alive"] === 1) {
            // alive
            let playname = playdata["playname"];
            $("#checkarea").prepend(`<h1 class="nametext">${playname} 現在投票</h1>`);
            $("#checkarea").append(`<button class="voteinfo btn btn-success" onclick="showvote(${pos})">我是${playname}</button>`);
            $("#rolecheck").css("display", "block");
        } else {
            // dead
            rolecon++;
            checkvote(rolecon);
        }
    }
}
// show playname and list of vote
function showvote(currentpos) {
    // clear everything
    rezero();
    // set style again
    $("#rolecheck").css("background", "#07f6ff38");
    $("#rolecheck").css("color", "red");
    // get alive list
    let votelivlist = playersdata.filter(el => el.alive === 1);
    // get list beside current player
    let cnm = playersdata[currentpos]["playname"];
    votelivlist = votelivlist.filter(el => el.playname !== cnm);
    // create vote div
    $("#votelayout").prepend(`<span class="voteinfo vttnm">你是 ${cnm}</span>`);
    // select creation
    $("#votelayout").append('<select class="voteinfo" id="vttemp"></select>');
    for (let i = 0; i < votelivlist.length; i++) {
        let livname = votelivlist[i]["playname"];
        $("#vttemp").append(`<option class="voteinfo">${livname}</option>`);
    }
    $("#votelayout").append('<button id="votefirst" class="voteinfo btn btn-warning" onclick="vtfirst();">投這人</button>');
    $("#votelayout").css("display", "block");
}
// first press
function vtfirst() {
    let vtstname = $("#vttemp option:selected").text();
    showdialog(`你選擇了${vtstname}`);
    $("#votefirst").prop("disabled", true);
    $("#votelayout").append(`<h1 class="votestname voteinfo">你是否決定投 ${vtstname}</h1>`);
    $("#votelayout").append(`<div class="row vtbtn voteinfo justify-content-center"></div>`);
    $(".vtbtn").append('<button class="votecon voteinfo btn btn-danger" onclick="vtcon();">確認</button>');
    $(".vtbtn").append('<button class="votecan voteinfo btn btn-secondary" onclick="vtcan();">取消</button>');
}
// cancel first
function vtcan() {
    $(".votestname").detach();
    $(".votecon").detach();
    $(".votecan").detach();
    $(".vtbtn").detach();
    $("#votefirst").prop("disabled", false);
}
// confirm vote
function vtcon() {
    let vtconnm = $("#vttemp option:selected").text();
    dayvotelist.push(vtconnm);
    $(".voteinfo").detach();
    $("#votelayout").css("display", "none");
    showdialog("Vote Confirmed.");
    rolecon++;
    checkvote(rolecon);
}
// calculate all vote
function calvote() {
    // clear everything
    rezero();
    // sort dayvotelist
    dayvotelist.sort();
    for (let i = 0; i < dayvotelist.length; i++) {
        let votedname = dayvotelist[i];
        $("#voteplayers").append(`<li class="vtres">${votedname}</li>`);
    }
    let vtalilist = playersdata.filter(el => el.alive === 1);
    let vtedone = countvotenk(dayvotelist, vtalilist);
    if (vtedone === "") {
        $("#voteresult").append(`<p class="vtres">${vtedone}</p>`);
        hanglist.push(vtedone);
        localStorage.setItem('hanglist', JSON.stringify(hanglist));
    } else {
        for (let j = 0; j < playersdata.length; j++) {
            if (vtedone === playersdata[j]["playname"]) {
                // kill
                playersdata[j]["alive"] = 0;
                let vtednm = playersdata[j]["playname"];
                hanglist.push(vtednm);
                localStorage.setItem('hanglist', JSON.stringify(hanglist));
            }
        }
        // save the alive list
        localStorage.setItem('playersdata', JSON.stringify(playersdata));
        $("#voteresult").append(`<p class="vtres">${vtedone}</p>`);
    }
    dellog();
    showdialog("全部玩家均已投票,點算完畢");
    $("#voteresult").append('<button class="vtres btn btn-success" onclick="votewin()">確認</button>');
    $("#voteplayers").css("display", "block");
    $("#voteresult").css("display", "block");
}
// check win for vote
function votewin() {
    if (!win()) {
        // not win
        night();
    } else {
        // win
        end();
    }
}

// win determination
function win() {
    // Get alive list
    let alivelist = playersdata.filter(el => el.alive === 1);
    // Get ww list
    let wwalivelist = alivelist.filter(el => el.role === "ww");
    // Get other list
    let otherlist = alivelist.filter(el => el.role !== "ww");
    otherlist = otherlist.filter(el => el.role !== "sf");
    // Get sf list
    let sflist = alivelist.filter(el => el.role === "sf");
    let wwalive = wwalivelist.length;
    let otheralive = otherlist.length;
    let sfalive = sflist.length;
    // compare
    // Game should end if ww domainate
    if (wwalive >= otheralive) {
        if (sfalive > 0) {
            // sf win
            showdialog("妖狐陣營勝利");
            winside = "3";
            return true;
        } else {
            // ww win
            showdialog("邪惡陣營勝利");
            winside = "2";
            return true;
        }
    } else if (wwalive === 0) { // Game should end if all ww died
        if (sfalive > 0) {
            // sf win
            showdialog("妖狐陣營勝利");
            winside = "3";
            return true;
        } else {
            // good win
            showdialog("善良陣營勝利");
            winside = "1";
            return true;
        }
    } else {
        // no win
        return false;
    }
}

// end state
function end() {
    // clean up
    rezero();
    nightdeathlist = [];
    htpro = [];
    wolfvotelist = [];
    dayvotelist =[];
    rolecon = 0;
    // save result
    localStorage.setItem('gamephase', "4");
    localStorage.setItem('playersdata', JSON.stringify(playersdata));
    localStorage.setItem('winside', winside);
    // TO print everything
    let endgamelist = playersdata;
    for (let j = 0; j < playersdata.length; j++) {
        let playdata = endgamelist[j];
        let playname = playdata["playname"];
        let playrole = playdata["role"];
        let rolestring;
        // give role names to ft, ht, ds, ww, ve, sf, mm
        if (playrole === "ft") {
            rolestring = "占卜師";
        } else if (playrole === "ht") {
            rolestring = "獵人";
        } else if (playrole === "ds") {
            rolestring = "靈視者";
        } else if (playrole === "ww") {
            rolestring = "狼人";
        } else if (playrole === "ve") {
            rolestring = "村民";
        } else if (playrole === "sf") {
            rolestring = "妖狐";
        } else if (playrole === "mm") {
            rolestring = "狂人";
        } else {
            // sanity check
            alert("Can't find name.");
        }
        if (playdata["alive"] === 1) {
            // alive player
            $("#alivegg").append(`<div class="endali endgame col-5 col-lg-3">${playname} (${rolestring})</div>`);
        } else if (playdata["alive"] === 0) {
            // dead player
            $("#deadgg").append(`<div class="enddie endgame col-5 col-lg-3">${playname} (${rolestring})</div>`);
        } else {
            // sanity check
            alert("Code broken. Game invalid.");
        }
    }
    if (winside === "1") {
        $("#geinfo").prepend('<span class="endgame winning" style="color: silver;">善良陣營勝利</span>');
    } else if (winside === "2") {
        $("#geinfo").prepend('<span class="endgame winning" style="color: red;">狼人陣營勝利</span>');
    } else if (winside === "3") {
        $("#geinfo").prepend('<span class="endgame winning" style="color: purple;">妖狐陣營勝利</span>');
    } else {
        // developer mode
        alert("Invalid Game.");
    }
    $("#geinfo").css("display", "block");
    $(".gegrid").css("visibility", "visible");
}

// pause function
function pauseww() {
    let basebtn = $(".backtolist");
    if (basebtn.is(':disabled')) {
        $(".backtolist").prop("disabled", false);
        $(".ckstop").prop("disabled", true);
        $(".ntstop").prop("disabled", true);
        $(".backtolist").css("display", "block");
        $(".backtohome").css("display", "block");
        showdialog("暫停中");
        $("body div").css("visibility", "collapse");
        $("#bootstrapfour").css("display", "inline-block");
    } else {
        $(".backtolist").prop("disabled", true);
        if ($('.ckstop').css('display') === 'block') {
            $(".ckstop").prop("disabled", false);
        }
        if ($('.ntstop').css('display') === 'block') {
            $(".ntstop").prop("disabled", false);
        }
        $(".backtolist").css("display", "none");
        $(".backtohome").css("display", "none");
        $("body div").css("visibility", "visible");
        $("#bootstrapfour").css("display", "none");
    }
}

// introduce dialog
function showdialog(purestring) {
    $("#favDialog").prepend(`<p class="dialogtext">${purestring}</p>`);
    if (!$("#favDialog")[0].open) {
        $("#favDialog")[0].showModal();
    }
}
// detach dialogtext
function dellog() {
    $(".dialogtext").detach();
}