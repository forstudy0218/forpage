// global variables
let gbv = {
    debug: true,
    state: {
        players: [], // players
        // game state
        gamestate: {
            phase: 0,
            voteset: 1,
            winside: 0,
            playstage: 0,
            nightcount: 0,
            lasthang: "",
        },
    },
    setPlayers (newList) {
        if (this.debug) console.log('players changed to', newList);
        this.state.players = newList;
        localStorage.setItem("enwwdata", JSON.stringify(this.state.players));
    },
    // assign roles
    assignRoles (roleslist) {
        if (this.debug) console.log('Renew role data.');
        for (let i = 0; i < this.state.players.length; i++) {
            this.state.players[i]["role"] = roleslist[i];
        }
        localStorage.setItem("enwwdata", JSON.stringify(this.state.players));
    },
    setGamestate (keyname, newValue) {
        if (this.debug) console.log(keyname, 'in gamestate changed to', newValue);
        this.state.gamestate[keyname] = newValue;
        localStorage.setItem("enwwstate", JSON.stringify(this.state.gamestate));
    },
    resetGame () {
        if (this.debug) console.log("Game data had been reset.");
        let playerslist = this.state.players;
        for (let i = 0; i < playerslist.length; i++) {
            playerslist[i]["role"] = "";
            playerslist[i]["alive"] = 1;
        }
        localStorage.setItem("enwwdata", JSON.stringify(playerslist));
        this.state.gamestate = {
            phase: 0,
            voteset: 1,
            winside: 0,
            playstage: 0,
            nightcount: 0,
            lasthang: "",
        };
        localStorage.setItem("enwwstate", JSON.stringify(this.state.gamestate));
        changebody();
        controlcentre.resetData();
    }
};
// inital setting (load save)
if (!localStorage.getItem("enwwdata")) {
    let nulldata = [];
    localStorage.setItem("enwwdata", JSON.stringify(nulldata));
} else {
    gbv.state.players = JSON.parse(localStorage.getItem("enwwdata"));
}
if (!localStorage.getItem("enwwstate")) {
    let nullstate = {
            phase: 0,
            voteset: 1,
            winside: 0,
            playstage: 0,
            nightcount: 0,
            lasthang: "",
        };
    localStorage.setItem("enwwstate", JSON.stringify(nullstate));
} else {
    gbv.state.gamestate = JSON.parse(localStorage.getItem("enwwstate"));
    changebody();
}

// body color
// https://stackoverflow.com/questions/44541872
function changebody() {
    let bodystage = gbv.state.gamestate.playstage;
    if (bodystage === 1) {
        document.body.className = 'night';
    } else if (bodystage === 2) {
        document.body.className = 'day';
    } else {
        document.body.className = 'home';
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

// win determination
function win() {
    // Get alive list
    let alivelist = gbv.state.players.filter(el => el.alive === 1);
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
            popmodal.showmessage("Spirit-Fox Faction Win!", "Good Job!", "Pause and restart.", "Purple");
            gbv.setGamestate ("winside", 3);
            return true;
        } else {
            // ww win
            popmodal.showmessage("Evil Faction Win!", "Appreciate!", "Pause and restart.", "Red");
            gbv.setGamestate ("winside", 2);
            return true;
        }
    } else if (wwalive === 0) { // Game should end if all ww died
        if (sfalive > 0) {
            // sf win
            popmodal.showmessage("Spirit-Fox Faction Win!", "Good Job!", "Pause and restart.", "Purple");
            gbv.setGamestate ("winside", 3);
            return true;
        } else {
            // good win
            popmodal.showmessage("Good Faction Win!", "Congratulations!", "Pause and restart.", "Gold");
            gbv.setGamestate ("winside", 1);
            return true;
        }
    } else {
        // no win
        return false;
    }
}

// register modal component
Vue.component('modal', {
  template: '#modal-template'
});
// modal app
var popmodal = new Vue ({
    el: '#popwin',
    data: {
        header: "",
        body: "",
        footer: "",
        headerColor: "",
        showModal: false,
    },
    methods: {
        showmessage: function(header, body, footer, headcolor) {
            this.header = header;
            this.body = body;
            this.footer = footer;
            this.headerColor = headcolor;
            this.showModal = true;
        }
    }
});

// universal button app
var pausebtns = new Vue ({
    el: '#unipause',
    data: {
        paused: false,
        savedphase: 100,
    },
    methods: {
        togglePause: function() {
            if (this.paused) {
                this.paused = false;
                gbv.state.gamestate.phase = Number(this.savedphase);
                this.savedphase = 100;
            } else {
                this.paused = true;
                this.savedphase = Number(gbv.state.gamestate.phase);
                gbv.state.gamestate.phase = -1;
                popmodal.showmessage("Notification", "Game paused.", "", "Blue");
            }
        },
        restartGame: function() {
            gbv.resetGame();
            this.paused = false;
            popmodal.showmessage("Notification", "Game restarted.", "", "Blue");
        },
    },
});

// phase 0
var playercreation = new Vue ({
    el: '#player-creation',
    data: {
        shared: gbv,
        addquery: "",
        delquery: ""
    },
    methods: {
        addPlayer: function() {
            let newname = this.addquery;
            for (let i = 0; i < gbv.state.players.length; i++) {
                if (newname === gbv.state.players[i]["playname"]) {
                    this.addquery = "";
                    popmodal.showmessage("Warning", "Name already exist.", "Try another one.", "Red");
                    return;
                }
            }
            let playerdata = {"playname": newname, "role": "", "alive": 1};
            gbv.state.players.push(playerdata);
            localStorage.setItem("enwwdata", JSON.stringify(gbv.state.players));
            let message = newname + " added.";
            popmodal.showmessage("Done", message, "", "Green");
            this.addquery = "";
        },
        delPlayer: function() {
            let delname = this.delquery;
            let newlist = gbv.state.players.filter(el => el.playname !== delname);
            gbv.setPlayers (newlist);
            let message = delname + " deleted.";
            popmodal.showmessage("Done", message, "", "Green");
            this.delquery = "";
        },
        playersSet: function() {
            if (gbv.state.players.length < 5) {
                popmodal.showmessage("WARNING", "At least five player.", "Invite more friends to play.", "Red");
                return;
            } else {
                gbv.setGamestate ("phase", 1);
            }
        }
    }
});

// phase 1
var gamesetting = new Vue({
    el: '#gamesetting',
    data: {
        shared: gbv,
        roleset: [
            {name: "Villager", selid: 0, short: "ve"},
            {name: "Fortuneteller", selid: 0, short: "ft"},
            {name: "Hunter", selid: 0, short: "ht"},
            {name: "Medium", selid: 0, short: "md"},
            {name: "Werewolf", selid: 0, short: "ww"},
            {name: "Madman", selid: 0, short: "mm"},
            {name: "Spirit-Fox", selid: 0, short: "sf"}
        ],
        styleSetNum: {},
        voteset: "",
    },
    methods: {
        startGame: function() {
            if (this.rolesToSet !== 0) {
                popmodal.showmessage("WARNING", "Counts of players and roles are not match.", "Assign roles again.", "Red");
                return;
            } else if (Number(this.roleset[4]["selid"]) === 0) {
                popmodal.showmessage("WARNING", "At least one werewolf.", "Add one werewolf.", "Red");
                return;
            } else if (this.voteset === "") {
                popmodal.showmessage("WARNING", "Vote setting is empty.", "Choose one.", "Red");
                return;
            } else {
                let rolelist = [];
                for (let i = 0; i < this.roleset.length; i++) {
                    let rolecount = this.roleset[i].selid;
                    let roleshort = this.roleset[i].short;
                    for (let j = 0; j < rolecount; j++) {
                        rolelist.push(roleshort);
                    }
                }
                popmodal.showmessage("Done", "Randomizing.", "", "Green");
                rolelist = shuffle(rolelist);
                this.shared.assignRoles (rolelist);
                // need to check if win here
                if (win()) {
                    gbv.resetGame();
                } else {
                    this.shared.setGamestate ("voteset", Number(this.voteset));
                    this.shared.setGamestate ("phase", 2);
                    this.shared.setGamestate ("playstage", 0);
                }
            }
        },
    },
    computed: {
        rolesToSet: function() {
            let playerscount = this.shared.state.players.length;
            let selectedcount = 0;
            for (let i = 0; i < this.roleset.length; i++) {
                selectedcount += Number(this.roleset[i].selid);
            }
            if (selectedcount > playerscount) {
                this.styleSetNum = {
                    border: "thick solid Red",
                    background: "yellow",
                    color: "black"
                };
                return "Too Many Role";
            } else if (selectedcount < playerscount) {
                this.styleSetNum = {
                    border: "thick solid yellow",
                    background: "silver",
                    color: "Blue"
                };
                return playerscount - selectedcount;
            } else {
                this.styleSetNum = {
                    border: "thick solid Blue",
                    background: "skyblue",
                    color: "Green"
                };
                return 0;
            }
        }
    }
});

// phase 2
// vue component for role info.
// ft, ht, md, ww, ve, sf, mm
// use props for v-if in component templates
Vue.component('info-ft', {
    template: '#ftinfo',
    props: {
        stage0: {
            type: Boolean,
            default: false,
        }
    },
});
Vue.component('info-ht', {
    template: '#htinfo',
    props: {
        stage0: {
            type: Boolean,
            default: false,
        }
    },
});
Vue.component('info-md', {
    template: '#mdinfo',
    props: {
        stage0: {
            type: Boolean,
            default: false,
        }
    },
});
Vue.component('info-ww', {
    template: '#wwinfo',
    props: {
        stage0: {
            type: Boolean,
            default: false,
        }
    },
});
Vue.component('info-ve', {
    template: '#veinfo',
    props: {
        stage0: {
            type: Boolean,
            default: false,
        }
    },
});
Vue.component('info-sf', {
    template: '#sfinfo',
    props: {
        stage0: {
            type: Boolean,
            default: false,
        }
    },
});
Vue.component('info-mm', {
    template: '#mminfo',
    props: {
        stage0: {
            type: Boolean,
            default: false,
        }
    },
});

// background color
// this function should define first
function getBackColor() {
    let backcolorstr;
    let fontcolorstr;
    if (gbv.state.gamestate.playstage === 0) {
        backcolorstr = "white";
        fontcolorstr = "black";
    } else if (gbv.state.gamestate.playstage === 1) {
        backcolorstr = "black";
        fontcolorstr = "yellow";
    } else if (gbv.state.gamestate.playstage === 3) {
        backcolorstr = "silver";
        fontcolorstr = "black";
    }
    return {
        "background-color": backcolorstr,
        "color": fontcolorstr,
    };
}

var controlcentre = new Vue({
    el: '#maincontrol',
    data: () => ({
        shared: gbv,
        pageBack: getBackColor(), // cannot use getBackColor until whole vue render, and it will let vue not render.
        toggled: false,
        playername: "",
        idConfirmed: false,
        playrole: "",
        isChecking: false,
        checkedList: [],
        isStageEnd: false,
        firstnotice: "",
        rolenotice: "",
        actTarget: "",
        targetList: [],
        protectlist: [],
        nightdead: [],
        nightww: [],
        dayvotelist: [],
        voteresultdict: {},
        vtexile: "",
        exilecolor: "",
    }),
    methods: {
        resetData: function() { // https://jsfiddle.net/bf1631pu/
            Object.assign(this.$data, this.$options.data());
        },
        toggleInfo: function(playername) {
            let playerdata = this.shared.state.players.filter(el => el.playname === playername);
            this.toggled = true;
            this.playername = playerdata[0]["playname"];
            this.playrole = playerdata[0]["role"];
            popmodal.showmessage(this.playername, "Is this you?", "If no, leave the device.", "Green");
        },
        confirmId: function() {
            this.toggled = false;
            this.idConfirmed = true;
            this.isChecking = true;
            if (this.shared.state.gamestate.playstage === 1) {
                this.nightInfo(this.playrole);
            } else if (this.shared.state.gamestate.playstage === 2) {
                this.voteInfo(this.playername);
            }
        },
        confirmRole: function() {
            if (this.shared.state.gamestate.playstage === 0) {
                popmodal.showmessage(this.playername, "Confirmed", "If stage not end, next player please.", "Green");
            } else if (this.shared.state.gamestate.playstage === 1) {
                this.nightAct(this.playrole);
            } else if (this.shared.state.gamestate.playstage === 2) {
                this.dayvotelist.push(this.actTarget);
                popmodal.showmessage("You voted.", "Below is who you voted.", this.actTarget, "Green");
                this.actTarget = "";
                this.targetList = [];
            }
            this.isChecking = false;
            this.idConfirmed = false;
            if (!this.checkedList.includes(this.playername)) {
                this.checkedList.push(this.playername);
                let alivelist = this.shared.state.players.filter(el => el.alive === 1);
                if (this.checkedList.length === alivelist.length) {
                    this.isStageEnd = true;
                    if (this.shared.state.gamestate.playstage === 2) {
                        this.calVote();
                        this.dayvotelist = [];
                    }
                }
            }
        },
        endButton: function() {
            this.isStageEnd = false;
            if (this.shared.state.gamestate.playstage === 0) {
                this.checkEnd();
            } else if (this.shared.state.gamestate.playstage === 1) {
                this.nightEnd();
            } else if (this.shared.state.gamestate.playstage === 2) {
                this.dayEnd();
            }
            this.resetData();
            changebody();
        },
        checkEnd: function() {
            popmodal.showmessage("Notification", "All players confirmed", "First night arriving...", "Blue");
            this.shared.setGamestate ("playstage", 1);
            this.shared.setGamestate ("nightcount", 0);
        },
        nightInfo: function(rolestr) {
            let ttlist = this.shared.state.players.filter(el => el.alive === 1);
            // ft, ht, md, ww have action, sf, mm, ve have none
            if (rolestr === "ft") {
                this.firstnotice = "Check one player each night.";
                this.rolenotice = "Choose one to see whether he/she is Werewolf.";
                ttlist = ttlist.filter(el => el.playname !== this.playername);
            } else if (rolestr === "ht") {
                this.firstnotice = "Protect one from Werewolf attack";
                if (this.shared.state.gamestate.nightcount === 0) {
                    this.rolenotice = "Werewolf won't attack this night. Choose anyone.";
                } else {
                    this.rolenotice =  "Choose one to protect.";
                }

            } else if (rolestr === "md") {
                let hangname = this.shared.state.gamestate.lasthang;
                if (this.shared.state.gamestate.nightcount !== 0) {
                    if (hangname !== "") {
                        let hangedone = this.shared.state.players.filter(el => el.playname === hangname);
                        let hangedrole = hangedone[0]["role"];
                        if (hangedrole === "ww") {
                            this.firstnotice = "Last exile " + hangname + " was Werewolf!";
                        } else {
                            this.firstnotice = "Last exile " + hangname + "was not Werewolf";
                        }
                    } else {
                        this.firstnotice = "No exile today.";
                    }
                } else {
                    this.firstnotice = "No exile on the first night";
                }
                this.rolenotice = "Choose anyone.";
            } else if (rolestr === "ww") {
                let wwlist = this.shared.state.players.filter(el => el.role === "ww");
                let wwnotice = "Werewolf player(s): ";
                for (let i = 0; i < wwlist.length; i++) {
                    wwnotice += wwlist[i]["playname"] + "/";
                }
                this.firstnotice = wwnotice.slice(0, -1);
                if (this.shared.state.gamestate.nightcount === 0) {
                    this.rolenotice = "Can't attack on the first night. Choose anyone.";
                } else {
                    this.rolenotice = "Choose the one you want to attack.";
                    ttlist = ttlist.filter(el => el.role !== "ww");
                }
            } else {
                this.firstnotice = "You do nothing at night.";
                this.rolenotice =  "Choose anyone.";
            }
            for (let i = 0; i < ttlist.length; i++) {
                this.targetList.push(ttlist[i]["playname"]);
            }
        },
        nightAct: function(rolestr) {
            // ft, ht, ww have action
            let ttnm = this.actTarget;
            this.targetList = [];
            let bodymessage;
            if (rolestr === "ft") {
                let ttlist = this.shared.state.players.filter(el => el.playname === ttnm);
                let ttrole = ttlist[0]["role"];
                if (ttrole === "ww") {
                    bodymessage = ttnm + " is Werewolf!";
                    popmodal.showmessage("Result", bodymessage, "Tell everyone!", "Red");
                } else if (ttrole === "sf") {
                    this.nightdead.push(ttnm);
                    bodymessage = ttnm + " is NOT Werewolf.";
                    popmodal.showmessage("Result", bodymessage, "Good luck next time.", "Green");
                } else {
                    bodymessage = ttnm + " is NOT Werewolf.";
                    popmodal.showmessage("Result", bodymessage, "Good luck next time.", "Green");
                }
            } else if (rolestr === "ht") {
                if (this.shared.state.gamestate.nightcount === 0) {
                    popmodal.showmessage("Sleeping", "Waiting for next day.", "ZzZzzZ...", "Green");
                } else {
                    this.protectlist.push(ttnm);
                    bodymessage = ttnm + " would be protected.";
                    popmodal.showmessage("Done", bodymessage, "Werewolf can't kill him/her now.", "Green");
                }
            } else if (rolestr === "ww") {
                if (this.shared.state.gamestate.nightcount === 0) {
                    popmodal.showmessage("Sleeping", "Waiting for next day.", "ZzZzzZ...", "Green");
                } else {
                    this.nightww.push(ttnm);
                    bodymessage = ttnm + " would be your target.";
                    let footmessage = "If other Werewolf choose another target, your target might not be attacked this night.";
                    popmodal.showmessage("Done", bodymessage, footmessage, "Green");
                }
            } else {
                popmodal.showmessage("Sleeping", "Waiting for next day.", "ZzZzzZ...", "Green");
            }
            this.actTarget = "";
        },
        nightEnd: function() {
            if (this.nightww.length > 0) {
                let possible = this.shared.state.players.filter(el => el.role !== "ww");
                possible = possible.filter(el => el.alive === 1);
                let deadbite = countvoteran(this.nightww, possible);
                // check hunter protection and deadbite role
                let bitedata = possible.filter(el => el.playname === deadbite);
                let biterole = bitedata[0]["role"];
                if ((!this.protectlist.includes(deadbite)) && (biterole !== "sf")) {
                    this.nightdead.push(deadbite);
                }
            }
            // commit dead
            let bodymessage = "";
            let allplayers = this.shared.state.players;
            for (let i = 0; i < this.nightdead.length; i++) {
                let deadname = this.nightdead[i];
                for (let j = 0; j < allplayers.length; j++) {
                    if (deadname === allplayers[j]["playname"]) {
                        allplayers[j]["alive"] = 0;
                        bodymessage += deadname + ", ";
                    }
                }
            }
            bodymessage = bodymessage.slice(0, -2);
            bodymessage += " became dead.";
            if (this.nightdead.length === 0) {
                // no death alert
                popmodal.showmessage("Night End.", "No one died this night.", "Game keep going...", "Green");
            } else {
                gbv.setPlayers (allplayers);
                // win determination
                if (!win()) {
                    popmodal.showmessage("Night End.", bodymessage, "Game keep going...", "Red");
                } else {
                    this.shared.setGamestate ("phase", 3);
                    this.shared.setGamestate ("playstage", 0);
                    return;
                }
            }
            this.shared.setGamestate ("nightcount", this.shared.state.gamestate.nightcount + 1);
            this.shared.setGamestate ("playstage", 2);
        },
        wwRule: function() {
            let rule = "If more than one Werewolf alive, the most chosen one would be attacked.";
            popmodal.showmessage("Rule for Werewolf attack", rule, "Spirit-Fox would survive this attack.", "Green");
        },
        voteInfo: function(namestr) {
            // generate list of vote target for this.targetList
            let ttlist = this.shared.state.players.filter(el => el.playname !== this.playername);
            ttlist = ttlist.filter(el => el.alive === 1);
            for (let i = 0; i < ttlist.length; i++) {
                this.targetList.push(ttlist[i]["playname"]);
            }
        },
        calVote: function() {
            // calcute vote and execcute
            // https://stackoverflow.com/questions/5667888
            for (let i = 0; i < this.dayvotelist.length; i++) {
                let vtname = this.dayvotelist[i];
                this.voteresultdict[vtname] = (this.voteresultdict[vtname] || 0) + 1;
            }
            let alivelist = this.shared.state.players.filter(el => el.alive === 1);
            if ( this.shared.state.gamestate.voteset === 0) {
                this.vtexile = countvotenk(this.dayvotelist, alivelist);
            } else if (this.shared.state.gamestate.voteset === 1) {
                this.vtexile = countvoteran(this.dayvotelist, alivelist);
            } else {
                alert("Game error. Restart now.");
                gbv.resetGame ();
                return;
            }
            let newhang = "";
            this.exilecolor = "Red";
            if (this.vtexile === "") {
                this.vtexile = "NO EXILE";
                this.exilecolor = "black";
                popmodal.showmessage("Result", "No one gone this time.", "Good luck next time.", "Green");
            } else {
                for (let j = 0; j < this.shared.state.players.length; j++) {
                    if (this.vtexile === this.shared.state.players[j]["playname"]) {
                        // kill
                        this.shared.state.players[j]["alive"] = 0;
                        break;
                    }
                }
                // save the alive list
                gbv.setPlayers(this.shared.state.players);
                newhang = this.vtexile;
                popmodal.showmessage(newhang, "Time to leave.", "But game may not be over though...", "Red");
            }
            this.shared.setGamestate ("lasthang", newhang);
        },
        dayEnd: function() {
            // check win
            if (!win()) {
                popmodal.showmessage("Night Coming", "Everyone be ready.", "Be more careful...", "Red");
                this.shared.setGamestate ("playstage", 1);
            } else {
                this.shared.setGamestate ("phase", 3);
                this.shared.setGamestate ("playstage", 0);
                return;
            }
        },
    },
    computed: {
        findRoleTab: function() {
            return 'info-' + this.playrole;
        },
    }
});

// phase 3 win
var gamresult = new Vue ({
    el: '#winresult',
    data: {
        shared: gbv,
    },
    computed: {
        getTitle: function () {
            if (this.shared.state.gamestate.winside === 1) {
                return {
                    text: "Good Faction Win",
                    color: "silver",
                };
            } else if (this.shared.state.gamestate.winside === 2) {
                return {
                    text: "Evil Faction Win",
                    color: "red",
                };
            } else if (this.shared.state.gamestate.winside === 3) {
                return {
                    text: "Spirit-Fox Faction Win",
                    color: "purple",
                };
            } else {
                // developer mode
                alert("Invalid Game.");
                return {
                    text: "No one Win",
                    color: "white",
                };
            }
        },
        getAlive: function() {
            let tempdict = {};
            let alives = this.shared.state.players.filter(el => el.alive === 1);
            let rolelist = gamesetting.roleset;
            for (let i = 0; i < alives.length; i++) {
                let playnm = alives[i]["playname"];
                let roleshort = alives[i]["role"];
                let rolenm;
                for (let j = 0; j < rolelist.length; j++) {
                    if (rolelist[j]["short"] === roleshort) {
                        rolenm = rolelist[j]["name"];
                        break;
                    }
                }
                tempdict[playnm] = rolenm
            }
            return tempdict;
        },
        getDie: function() {
            let tempdict = {};
            let dies = this.shared.state.players.filter(el => el.alive === 0);
            let rolelist = gamesetting.roleset;
            for (let i = 0; i < dies.length; i++) {
                let playnm = dies[i]["playname"];
                let roleshort = dies[i]["role"];
                let rolenm;
                for (let j = 0; j < rolelist.length; j++) {
                    if (rolelist[j]["short"] === roleshort) {
                        rolenm = rolelist[j]["name"];
                        break;
                    }
                }
                tempdict[playnm] = rolenm
            }
            return tempdict;
        },
    },
});