// diff choice
let dchoice;
// numlist
let numlist = [1, 2, 3, 4, 5, 6, 7, 8, 9];
numlist = shuffle(numlist);
// ansgrid
let ansgrid;
let rawmatrix;
// solved count
let solvedct = 0;
let zeroed = 0;
// list of solved dict
let soldict = [];
// stop timer
let timestop = 1;
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

// https://stackoverflow.com/questions/18420489
// recursive algo
function solveSudoku(grid, row, col) {
    var cell = findUnassignedLocation(grid, row, col);
    row = cell[0];
    col = cell[1];
    // base case: if no empty cell
    if (row == -1) {
        return true;
    }
    numlist = shuffle(numlist);
    for (var numtry = 0; numtry <= 8; numtry++) {
        let num = numlist[numtry];
        if ( noConflicts(grid, row, col, num) ) {
            grid[row][col] = num;

            if ( solveSudoku(grid, row, col) ) {
                return true;
            }
            // mark cell as empty (with 0)
            grid[row][col] = 0;
        }
    }
    // trigger back tracking
    return false;
}
function findUnassignedLocation(grid, row, col) {
    for (; row < 9 ; col = 0, row++)
        for (; col < 9 ; col++)
            if (grid[row][col] == 0)
                return [row, col];
    return [-1, -1];
}
function noConflicts(grid, row, col, num) {
    return isRowOk(grid, row, num) && isColOk(grid, col, num) && isBoxOk(grid, row, col, num);
}

function isRowOk(grid, row, num) {
    for (var col = 0; col < 9; col++)
        if (grid[row][col] == num)
            return false;

    return true;
}
function isColOk(grid, col, num) {
    for (var row = 0; row < 9; row++)
    if (grid[row][col] == num)
        return false;

    return true;
}
function isBoxOk(grid, row, col, num) {
    row = Math.floor(row / 3) * 3;
    col = Math.floor(col / 3) * 3;

    for (var r = 0; r < 3; r++)
        for (var c = 0; c < 3; c++)
            if (grid[row + r][col + c] == num)
                return false;

    return true;
}
// count for solution
// https://stackoverflow.com/questions/24343214
function solcount(grid, row, col, count) {
    var cell = findUnassignedLocation(grid, row, col);
    row = cell[0];
    col = cell[1];
    // base case: if no empty cell
    if (row == -1) {
        return 1 + count;
    }
    for (var num = 1; num <= 9 && count < 2; num++) {
        if ( noConflicts(grid, row, col, num) ) {
            grid[row][col] = num;
            count = solcount(grid, row, col, count);
        }
    }
    // mark cell as empty (with 0)
    grid[row][col] = 0;
    // trigger back tracking
    return count;
}

// create maxtrix
function createrawsu() {
    rawmatrix = [];
    for (let count = 0; count < 9; count++) {
        let zerolist = [];
        for (let altcount = 0; altcount < 9; altcount++) {
            zerolist.push(0);
        }
        rawmatrix.push(zerolist);
    }
    solveSudoku(rawmatrix, 0, 0);
    // Have seed now. save for checking
    ansgrid = rawmatrix;
    localStorage.setItem('seedsudoku', JSON.stringify(ansgrid));
    // list of all 81 position
    let poslist = [];
    for (let rows = 0; rows < 9 ;rows++) {
            for (let cols = 0; cols < 9 ; cols++) {
                let posi = [rows, cols];
                poslist.push(posi);
            }
    }
    poslist = shuffle(poslist);
    for (let i = 0; i < poslist.length; i++) {
        let zeropos = poslist[i];
        let xnum = zeropos[0];
        let ynum = zeropos[1];
        let savednum = rawmatrix[xnum][ynum];
        rawmatrix[xnum][ynum] = 0;
        let testmatrix = rawmatrix;
        if (solcount(testmatrix, 0, 0, 0) > 1) {
            rawmatrix[xnum][ynum] = savednum;
        } else if (solcount(testmatrix, 0, 0, 0) < 1) {
            console.log("error.");
        } else {
            zeroed += 1;
        }
        if ((dchoice !== 0) && (zeroed === dchoice)) {
            break;
        }
    }
    ready(rawmatrix);
}
function ready(rawmatrix) {
    const rawtable = document.querySelector("#sudokuraw");
    for (let tbr = 0; tbr < 9; tbr++) {
        const rawrow = document.createElement('tr');
        rawrow.id = 'tr' + tbr;
        for (let tbc = 0; tbc < 9; tbc++) {
            let numvalue = rawmatrix[tbr][tbc];
            const rawcell = document.createElement('td');
            rawcell.className = "tds";
            rawcell.id = tbr + "_" + tbc;
            if (numvalue !== 0) {
                rawcell.className += " rawnum";
                rawcell.innerHTML = numvalue;
                rawrow.append(rawcell);
            } else {
                rawcell.className += " tosolve";
                rawcell.innerHTML = "&numsp;";
                rawrow.append(rawcell);
            }
        }
        rawtable.append(rawrow);
    }
    let btnsec = document.querySelector(".btnsec");
    btnsec.style.visibility = "visible";
    ansgrid = localStorage.getItem('seedsudoku');
    ansgrid = JSON.parse(ansgrid);
    // trigger save
    savesudoku();
    addcellclick();
    let stimer;
    timestop = 0;
    if (localStorage.getItem('stimer') !== null) {
        stimer = Number(localStorage.getItem('stimer'));
    } else {
        stimer = 0;
    }
    starttimer(stimer);
    for (let r = 1; r <= 9; r++) {
        checkisnine(r);
    }
}
// pop difficulty
function diffmenu() {
    let diffmenu = document.querySelector("#askdiff");
    diffmenu.showModal();
}
// choose difficulty
function diffask(numstring) {
    let diffmenu = document.querySelector("#askdiff");
    diffmenu.close();
    let diffcho = Number(numstring);
    dchoice = diffcho;
    createrawsu();
    loadrec(diffcho);
}
// onclick for each cell
// https://stackoverflow.com/questions/21033368
function addcellclick() {
    let rawpgtable = document.querySelector("#sudokuraw");
    if (rawpgtable != null) {
        for (var i = 0; i < rawpgtable.rows.length; i++) {
            for (var j = 0; j < rawpgtable.rows[i].cells.length; j++)
            rawpgtable.rows[i].cells[j].onclick = function () {
                checknum(this);
            };
        }
    } else {
        console.log("abandon ship!");
    }
}
// onclick function
function checknum(tablecell) {
    let rawcells = tablecell;
    let lastse = $(".cellselected"); // still need jquery zzzzz
    if (lastse != null) {
        lastse.removeClass("cellselected");
    }
    rawcells.className += " cellselected";
    findsamenum();
}
// find same number
function findsamenum() {
    $(".samenum").removeClass("samenum");
    let lastse = document.querySelector(".cellselected");
    let numfound = Number(lastse.innerHTML);
    if (numfound === 0) {
        return false;
    }
    let rawpgtable = document.querySelector("#sudokuraw");
    if (rawpgtable != null) {
        for (var i = 0; i < rawpgtable.rows.length; i++) {
            for (var j = 0; j < rawpgtable.rows[i].cells.length; j++) {
                let curcell = rawpgtable.rows[i].cells[j];
                let inputed = Number(curcell.innerHTML);
                if (inputed === numfound) {
                    if (!curcell.classList.contains("cellselected")) {
                        curcell.className += " samenum";
                    }
                }
            }
        }
    }
}

// timer
// https://stackoverflow.com/questions/29971898
function starttimer(countnum) {
    // save start time
    let timerct = countnum;
    localStorage.setItem('stimer', timerct);
    let interval = 1000; // ms
    let expected = Date.now() + interval;
    setTimeout(step, interval);
    function step() {
        let dt = Date.now() - expected; // the drift (positive for overshooting)
        if (dt > interval) {
            // something really bad happened. Maybe the browser (tab) was inactive?
            // possibly special handling to avoid futile "catch up" run
            starttimer(timerct);
            return false;
        }
        if (timestop !== 0) {
            return false;
        }
        // do what is to be done
        timerct += 1;
        let min = Math.floor(timerct / 60);
        let sec = timerct % 60;
        let timer = min + ":" + sec;
        $("#sudotime").html(timer);
        // save new time
        localStorage.setItem('stimer', timerct);
        expected += interval;
        setTimeout(step, Math.max(0, interval - dt)); // take into account drift
    }
}

// button use. Get position in table
// https://stackoverflow.com/questions/22554219
function sudosolnum(digitstr) {
    let lastse = $(".cellselected");
    // work with select
    if (lastse != null) {
        if (lastse.hasClass("tosolve")) {
            if (!lastse.hasClass("solvednum")) {
                let numinput = Number(digitstr);
                let mytrpos = (lastse.parent().prevAll().length);
                let mytdpos = (lastse.prevAll().length);
                let ansnum = ansgrid[mytrpos][mytdpos];
                if (numinput === ansnum) {
                    // right
                    lastse[0].innerHTML = numinput;
                    lastse.addClass("solvednum");
                    solvedct += 1;
                    let dictinfo = {"sx": mytrpos, "sy": mytdpos, "numinput": numinput};
                    soldict.push(dictinfo);
                    localStorage.setItem('solvedct', solvedct);
                    localStorage.setItem('soldict', JSON.stringify(soldict));
                    if (solvedct === zeroed) {
                        win();
                    } else {
                        checkisnine(numinput);
                    }
                } else {
                    // wrong
                    lastse.css("background-color", "Red");
                    setTimeout(() => {
                        lastse.css("background-color", "");
                    }, 500);
                }
            }
        }
    }
}

// hide button if all nine of each digit found
function checkisnine(num) {
    let ninecount = 0;
    let rawpgtable = document.querySelector("#sudokuraw");
    if (rawpgtable != null) {
        for (var i = 0; i < rawpgtable.rows.length; i++) {
            for (var j = 0; j < rawpgtable.rows[i].cells.length; j++) {
                let inputed = Number(rawpgtable.rows[i].cells[j].innerHTML);
                if (inputed === num) {
                    ninecount += 1;
                    if (ninecount === 9) {
                        let ibtnid = "sudo" + num;
                        let ibtndone = $(`#${ibtnid}`);
                        ibtndone[0].style.visibility = "collapse";
                        ibtndone.attr("disabled", true);
                        break;
                    }
                }
            }
        }
    }
}
// win
function win() {
    // stop timer
    timestop = 1;
    $("#sudotime").html("");
    let timerec = Number(localStorage.getItem('stimer'));
    let min = Math.floor(timerec / 60);
    let sec = timerec % 60;
    let timer = min + ":" + sec;
    // find difficulty
    let difflv = zeroed;
    // cal rec
    calrec(difflv, min);
    removesaved();
    let winpop = $("#sudopop");
    winpop.prepend('<h1 class="popinfo">WIN</h1>');
    winpop.prepend(`<h3 class="popinfo">${timer}</h3>`);
    let winbtn = document.querySelector("#closepop");
    winbtn.onclick = () => {
        winpop[0].close();
        resetgame();
    };
    winpop[0].showModal();
}
// save record
function calrec(difficulty, minute) {
    if (difficulty === 20) {
        // easy
        for (let i = 0; i < 8; i++) {
            if (minute === i) {
                let recstorage = "easyrec" + i;
                localStorage.setItem(recstorage, "1");
            }
        }
    } else if (difficulty === 40) {
        // norm
        for (let i = 0; i < 8; i++) {
            if (minute === i) {
                let recstorage = "normrec" + i;
                localStorage.setItem(recstorage, "1");
            }
        }
    } else if (difficulty === 50) {
        // hard
        for (let i = 0; i < 8; i++) {
            if (minute === i) {
                let recstorage = "hardrec" + i;
                localStorage.setItem(recstorage, "1");
            }
        }
    } else if (difficulty === 0) {
        // ex
        for (let i = 0; i < 8; i++) {
            if (minute === i) {
                let recstorage = "exrec" + i;
                localStorage.setItem(recstorage, "1");
            }
        }
    }
}
// load record
function loadrec(difficulty) {
    if (difficulty === 20) {
        // easy
        $("#sudodiff").html("EASY");
        for (let i = 0; i < 8; i++) {
            let recstorage = "easyrec" + i;
            if (localStorage.getItem(recstorage) !== null) {
                $("#sudorec").append(`<img src="/static/img/${i}.png" title="${i} minutes trophy" alt="${i}"></img>`);
            }
        }
    } else if (difficulty === 40) {
        $("#sudodiff").html("NORMAL");
        // norm
        for (let i = 0; i < 8; i++) {
            let recstorage = "normrec" + i;
            if (localStorage.getItem(recstorage) !== null) {
                $("#sudorec").append(`<img src="/static/img/${i}.png" title="${i} minutes trophy" alt="${i}"></img>`);
            }
        }
    } else if (difficulty === 50) {
        $("#sudodiff").html("HARD");
        // hard
        for (let i = 0; i < 8; i++) {
            let recstorage = "hardrec" + i;
            if (localStorage.getItem(recstorage) !== null) {
                $("#sudorec").append(`<img src="/static/img/${i}.png" title="${i} minutes trophy" alt="${i}"></img>`);
            }
        }
    } else if (difficulty === 0) {
        $("#sudodiff").html("EXTREME");
        // ex
        for (let i = 0; i < 8; i++) {
            let recstorage = "exrec" + i;
            if (localStorage.getItem(recstorage) !== null) {
                $("#sudorec").append(`<img src="/static/img/${i}.png" title="${i} minutes trophy" alt="${i}"></img>`);
            }
        }
    }
}

// New game btn
function end() {
    // stop timer
    timestop = 1;
    $("#sudotime").html("");
    removesaved();
    resetgame();
}
// reset game
function resetgame(){
    let winbtn = document.querySelector("#closepop");
    winbtn.onclick = "";
    let btnsec = document.querySelector(".btnsec");
    btnsec.style.visibility = "collapse";
    $(".snumpad").attr("disabled", false);
    $(".snumpad").css("visibility", "");
    $(".popinfo").detach();
    $("#sudokuraw").empty();
    $("#sudorec").empty();
    $("#sudodiff").html("");
    $(".samenum").removeClass("samenum");
    zeroed = 0;
    solvedct = 0;
    soldict = [];
    setTimeout(diffmenu(), 300);
}
// save game
function savesudoku() {
    localStorage.setItem('savedsudoku', "1");
    localStorage.setItem('solvedct', solvedct);
    localStorage.setItem('zeroed', zeroed);
    localStorage.setItem('rawmatrix', JSON.stringify(rawmatrix));
}
// remove all save
function removesaved() {
    localStorage.removeItem('savedsudoku');
    localStorage.removeItem('solvedct');
    localStorage.removeItem('zeroed');
    localStorage.removeItem('rawmatrix');
    localStorage.removeItem('seedsudoku');
    localStorage.removeItem('soldict');
    localStorage.removeItem('stimer');
}
$(document).ready(function() {
    // ready, trigger shown
    startsudoku();

});
// start checking save
function startsudoku() {
    if (!localStorage.getItem('savedsudoku')) {
        diffmenu();
    } else {
        loadsudoku();
    }
}
// load game
function loadsudoku() {
    solvedct = Number(localStorage.getItem('solvedct'));
    zeroed = Number(localStorage.getItem('zeroed'));
    loadrec(zeroed);
    let tempmx = localStorage.getItem('rawmatrix');
    rawmatrix = JSON.parse(tempmx);
    ready(rawmatrix);
    if (localStorage.getItem('soldict') !== null) {
        let tempdt = localStorage.getItem('soldict');
        soldict = JSON.parse(tempdt);
        loadsoldict(soldict);
    }
}
// load soldict
function loadsoldict(soldict) {
    let templist = soldict;
    for (let i = 0; i < templist.length; i++) {
        let tbr = templist[i]["sx"];
        let tbc = templist[i]["sy"];
        let numint = templist[i]["numinput"];
        rawcellid = tbr + "_" + tbc;
        let shouldput = $(`#${rawcellid}`);
        shouldput[0].innerHTML = numint;
        shouldput.addClass("solvednum");
        checkisnine(numint);
    }
}