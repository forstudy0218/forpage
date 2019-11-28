// global variables
let gbv = {
    debug: true,
    state: {},
    setPlayers (newList) {
        if (this.debug) console.log('players changed to', newList);
        this.state.players = newList;
        localStorage.setItem("nextwwdata", JSON.stringify(this.state));
    },
    // assign roles
    assignRoles (roleslist) {
        if (this.debug) console.log('Renew role data.');
        for (let i = 0; i < this.state.players.length; i++) {
            this.state.players[i]["role"] = roleslist[i];
        }
        localStorage.setItem("nextwwdata", JSON.stringify(this.state));
    },
    setGameState (keyname, newValue) {
        if (this.debug) console.log(keyname, 'in gameState changed to', newValue);
        this.state.gameState[keyname] = newValue;
        localStorage.setItem("nextwwdata", JSON.stringify(this.state));
    },
    resetGame () {
        if (this.debug) console.log("Game data had been reset.");
        let playerslist = this.state.players;
        for (let i = 0; i < playerslist.length; i++) {
            playerslist[i]["role"] = "";
            playerslist[i]["alive"] = 1;
        }
        this.state.gameState = {
            phase: 0,
            voteset: 1,
            winside: 0,
            playstage: 0,
            nightcount: 0,
            lasthang: "",
            checkedList: [],
            isStageEnd: false,
            protectlist: [],
            nightdead: [],
            nightww: [],
            dayvotelist: [],
            voteresultdict: {},
            vtexile: "",
            exilecolor: "",
        };
        localStorage.setItem("nextwwdata", JSON.stringify(this.state));
        changebody();
        controlcentre.resetData();
    },
    setLang (boolzh) {
        if (this.debug) console.log("Chinese", boolzh);
        this.state.langset = (boolzh) ? "zh" : "en";
        localStorage.setItem("nextwwdata", JSON.stringify(this.state));
    }
};
// inital setting (load save)
// merge "enwwdata", "enwwstate", "enwwlang", 'enwwsave' to "nextwwdata"
if (!localStorage.getItem("nextwwdata")) {
    createNewSave();
} else {
    gbv.state = JSON.parse(localStorage.getItem("nextwwdata"));
    let dataKeys = Object.keys(gbv.state.gameState);
    let gameStateKeys = [
        "phase",
        "voteset",
        "winside",
        "playstage",
        "nightcount",
        "lasthang",
        "checkedList",
        "isStageEnd",
        "protectlist",
        "nightdead",
        "nightww",
        "dayvotelist",
        "voteresultdict",
        "vtexile",
        "exilecolor",
    ];
    if ( arrayCompare(dataKeys, gameStateKeys) ) {
        changebody();
    } else {
        createNewSave();
    }
}

function createNewSave() {
    let nulldata = {
        // orgin "enwwdata"
        players: [],
        // orgin "enwwstate"
        gameState: {
            phase: 0,
            voteset: 1,
            winside: 0,
            playstage: 0,
            nightcount: 0,
            lasthang: "",
            checkedList: [],
            isStageEnd: false,
            protectlist: [],
            nightdead: [],
            nightww: [],
            dayvotelist: [],
            voteresultdict: {},
            vtexile: "",
            exilecolor: "",
        },
        langset: "en",
    };
    localStorage.setItem("nextwwdata", JSON.stringify(nulldata));
    gbv.state = nulldata;
}

//https://stackoverflow.com/questions/34941179
function arrayCompare(array1, array2){
  array1.sort();
  array2.sort();
  for (var i = 0; i < array1.length; i++){
    if (array1[i] !== array2[i]) return false;
  }
  return true;
}

// body color
// https://stackoverflow.com/questions/44541872
function changebody() {
    let bodystage = gbv.state.gameState.playstage;
    if (bodystage === 1) {
        document.body.className = 'night';
    } else if (bodystage === 2) {
        document.body.className = 'day';
    } else if (gbv.state.gameState.phase === 3) {
        document.body.className = 'win';
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

// vote count; return most vote name
// dict ver.
function countdict(votedict, randomExe) {
    const keys = Object.keys(votedict); // get all name
    let countlist = []; // list for max
    let curMax = 0;
    for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		if (votedict[key] > curMax) {
		    curMax = votedict[key];
		    countlist = [key];
		} else if (votedict[key] === curMax) {
		    countlist.push(key);
		}
    }
    if (countlist.length === 1) {
        return countlist[0];
    } else if (countlist.length > 1) { // most vote more than one
        if (randomExe === 0) { // no exe
            return "";
        } else if (randomExe === 1) { // random exe
            countlist = shuffle(countlist);
            return countlist[0];
        } else {
            // sanity check
            alert("Code broken.");
        }
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
            gbv.setGameState ("winside", 3);
            return true;
        } else {
            // ww win
            popmodal.showmessage("Evil Faction Win!", "Appreciate!", "Pause and restart.", "Red");
            gbv.setGameState ("winside", 2);
            return true;
        }
    } else if (wwalive === 0) { // Game should end if all ww died
        if (sfalive > 0) {
            // sf win
            popmodal.showmessage("Spirit-Fox Faction Win!", "Good Job!", "Pause and restart.", "Purple");
            gbv.setGameState ("winside", 3);
            return true;
        } else {
            // good win
            popmodal.showmessage("Good Faction Win!", "Congratulations!", "Pause and restart.", "Gold");
            gbv.setGameState ("winside", 1);
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
            if (gbv.state.langset === "zh") {
                this.header = (dictionary.modalmess[this.header] || header);
                this.body = (dictionary.modalmess[this.body] || body);
                this.footer = (dictionary.modalmess[this.footer] || footer);
            }
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
                gbv.state.gameState.phase = Number(this.savedphase);
                this.savedphase = 100;
            } else {
                this.paused = true;
                this.savedphase = Number(gbv.state.gameState.phase);
                gbv.state.gameState.phase = -1;
                popmodal.showmessage("Notification", "Game paused.", "", "Blue");
            }
        },
        restartGame: function() {
            gbv.resetGame();
            this.paused = false;
            popmodal.showmessage("Notification", "Game restarted.", "", "Blue");
        },
        toggleDebbug: function() {
            gbv.debug = (gbv.debug) ? false : true;
        }
    },
});

// phase 0
var playercreation = new Vue ({
    el: '#player-creation',
    data: {
        shared: gbv,
        addquery: "",
        delquery: "",
        langzh: false,
    },
    methods: {
        addPlayer: function() {
            let newname = this.addquery;
            for (let i = 0; i < gbv.state.players.length; i++) {
                if (newname === gbv.state.players[i]["playname"]) {
                    this.addquery = "";
                    popmodal.showmessage("WARNING", "Name already exist.", "Try another one.", "Red");
                    return;
                }
            }
            let playerdata = {"playname": newname, "role": "", "alive": 1};
            gbv.state.players.push(playerdata);
            localStorage.setItem("nextwwdata", JSON.stringify(gbv.state));
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
                gbv.setGameState ("phase", 1);
                this.shared.setLang (this.langzh);
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
            {name: "Villager", selid: 0, short: "ve", faction: "Good", zhnm:"村民"},
            {name: "Fortuneteller", selid: 0, short: "ft", faction: "Good", zhnm:"占卜師"},
            {name: "Hunter", selid: 0, short: "ht", faction: "Good", zhnm:"獵人"},
            {name: "Medium", selid: 0, short: "md", faction: "Good", zhnm:"靈媒"},
            {name: "Werewolf", selid: 0, short: "ww", faction: "Evil", zhnm:"狼人"},
            {name: "Madman", selid: 0, short: "mm", faction: "Evil", zhnm:"狂人"},
            {name: "Spirit-Fox", selid: 0, short: "sf", faction: "Spirit-Fox", zhnm:"妖狐"}
        ],
        styleSetNum: {},
        voteset: "",
        skipCheck: false,
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
                    this.shared.setGameState ("voteset", Number(this.voteset));
                    this.shared.setGameState ("phase", 2);
                    let skipchoose = (this.skipCheck) ? 1 : 0;
                    this.shared.setGameState ("playstage", skipchoose);
                    changebody();
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
                let too_many = (this.askLang) ? "...過多身分" : "...Too Many Role";
                return too_many;
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
        },
        askLang: function() {
            return (this.shared.state.langset === "zh");
        }
    }
});

// phase 2
// vue component for role info.
// ft, ht, md, ww, ve, sf, mm
// use props for v-if in component templates
let shortlist = ['ft', 'ht', 'md', 'ww', 've', 'sf', 'mm'];
for (let i = 0; i < shortlist.length; i++) {
    let component_id = 'info-' + shortlist[i];
    let template_id = '#' + shortlist[i] + 'info';
    let props_dict = {
        stage0: {
            type: Boolean,
            default: false,
        }
    };
    Vue.component(component_id, {
        template: template_id,
        props: props_dict,
    });
}

var controlcentre = new Vue({
    el: '#maincontrol',
    data: () => ({
        shared: gbv,
        toggled: false,
        playername: "",
        idConfirmed: false,
        playrole: "",
        isChecking: false,
        firstnotice: "",
        rolenotice: "",
        actTarget: "",
        targetList: [],
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
            if (this.playstageCheck === 1) {
                this.nightInfo(this.playrole);
            } else if (this.playstageCheck === 2) {
                this.voteInfo(this.playername);
            }
        },
        confirmRole: function() {
            if (this.playstageCheck === 0) {
                popmodal.showmessage(this.playername, "Confirmed", "If stage not end, next player please.", "Green");
            } else if (this.playstageCheck === 1) {
                this.nightAct(this.playrole);
            } else if (this.playstageCheck === 2) {
                this.pushSave("dayvotelist", this.actTarget);
                popmodal.showmessage("You voted.", "Below is who you voted.", this.actTarget, "Green");
                this.actTarget = "";
                this.targetList = [];
            }
            this.isChecking = false;
            this.idConfirmed = false;
            if (!this.shared.state.gameState.checkedList.includes(this.playername)) {
                this.pushSave("checkedList", this.playername);
                let alivelist = this.shared.state.players.filter(el => el.alive === 1);
                if (this.shared.state.gameState.checkedList.length === alivelist.length) {
                    this.shared.setGameState("isStageEnd", true);
                    if (this.playstageCheck === 2) {
                        this.calVote();
                    }
                }
            }
        },
        endButton: function() {
            this.shared.setGameState("isStageEnd", false);
            if (this.playstageCheck === 0) {
                this.checkEnd();
            } else if (this.playstageCheck === 1) {
                this.nightEnd();
            } else if (this.playstageCheck === 2) {
                this.dayEnd();
            }
            this.resetData();
            this.resetStageInfo();
            changebody();
        },
        checkEnd: function() {
            popmodal.showmessage("Notification", "All players confirmed", "First night arriving...", "Blue");
            this.shared.setGameState ("playstage", 1);
            this.shared.setGameState ("nightcount", 0);
        },
        nightInfo: function(rolestr) {
            let ttlist = this.shared.state.players.filter(el => el.alive === 1);
            // ft, ht, md, ww have action, sf, mm, ve have none
            if (rolestr === "ft") {
                if (this.askLang) {
                    this.firstnotice = "占卜師每晚能查看一名玩家";
                    this.rolenotice = "請選一名對象,查看對方是否狼人; 如對象為妖狐,對象將會死亡";
                } else {
                    this.firstnotice = "Check one player each night.";
                    this.rolenotice = "Choose one to see whether he/she is Werewolf. Spirit-Fox would die if chosen.";
                }
                ttlist = ttlist.filter(el => el.playname !== this.playername);
            } else if (rolestr === "ht") {
                let firststr;
                let otherstr;
                if (this.askLang) {
                    this.firstnotice = "獵人每晚能保護一名玩家,免被狼人殺死";
                    firststr = "狼人第一晚不會攻擊, 請隨意選一人:";
                    otherstr = "請選擇你想要保護的人:";
                } else {
                    this.firstnotice = "Protect one from Werewolf attack";
                    firststr = "Werewolf won't attack this night. Choose anyone.";
                    otherstr = "Choose one to protect.";
                }
                if (this.shared.state.gameState.nightcount === 0) {
                    this.rolenotice = firststr;
                } else {
                    this.rolenotice = otherstr;
                }
            } else if (rolestr === "md") {
                let hangname = this.shared.state.gameState.lasthang;
                if (this.shared.state.gameState.nightcount !== 0) {
                    if (hangname !== "") {
                        let hangedone = this.shared.state.players.filter(el => el.playname === hangname);
                        let hangedrole = hangedone[0]["role"];
                        let pre_sen = (this.askLang) ? "白天被驅逐的" : "Last exile ";
                        if (hangedrole === "ww") {
                            let suf_yes = (this.askLang) ? "是狼人!" : " was Werewolf!";
                            this.firstnotice = pre_sen + hangname + suf_yes;
                        } else {
                            let suf_no = (this.askLang) ? "是無辜的 (不是狼人)" : " was NOT Werewolf";
                            this.firstnotice = pre_sen + hangname + suf_no;
                        }
                    } else {
                        this.firstnotice = (this.askLang) ? "白天沒有人被驅逐" : "No exile today.";
                    }
                } else {
                    this.firstnotice = (this.askLang) ? "第一天不會有人被驅逐" : "No exile on the first night";
                }
                this.rolenotice = (this.askLang) ? "請隨意選一人:" : "Choose anyone.";
            } else if (rolestr === "ww") {
                this.firstnotice = (this.askLang) ? "以下玩家是狼人:" : "Werewolf player(s): ";
                if (this.shared.state.gameState.nightcount === 0) {
                    let first_nt;
                    if (this.askLang) {
                        first_nt ="第一晚不能攻擊, 請隨意選一人:";
                    } else {
                        first_nt = "Can't attack on the first night. Choose anyone.";
                    }
                    this.rolenotice = first_nt;
                } else {
                    this.rolenotice = (this.askLang) ? "請選一人作為襲擊對象:" : "Choose the one you want to attack.";
                    ttlist = ttlist.filter(el => el.role !== "ww");
                }
            } else {
                this.firstnotice = (this.askLang) ? "晚上你沒有能力" : "You do nothing at night.";
                this.rolenotice =  (this.askLang) ? "請隨意選一人:" : "Choose anyone.";
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
                let ft_no = (this.askLang) ? "是無辜的 (不是狼人)" : " is NOT Werewolf!";
                if (ttrole === "ww") {
                    let ft_yes = (this.askLang) ? "是狼人!" : " is Werewolf!";
                    bodymessage = ttnm + ft_yes;
                    popmodal.showmessage("Result", bodymessage, "Tell everyone during daytime!", "Red");
                } else if (ttrole === "sf") {
                    this.pushSave("nightdead", ttnm);
                    bodymessage = ttnm + ft_no;
                    popmodal.showmessage("Result", bodymessage, "Target would die if role is Spirit-Fox.", "Green");
                } else {
                    bodymessage = ttnm + ft_no;
                    popmodal.showmessage("Result", bodymessage, "Target would die if role is Spirit-Fox.", "Green");
                }
            } else if (rolestr === "ht") {
                if (this.shared.state.gameState.nightcount === 0) {
                    popmodal.showmessage("Sleeping", "Waiting for next day.", "ZzZzzZ...", "Green");
                } else {
                    this.pushSave("protectlist", ttnm);
                    let this_pro = (this.askLang) ? "將會被保護" : " would be protected.";
                    bodymessage = ttnm + this_pro;
                    popmodal.showmessage("Done", bodymessage, "Werewolf can't kill him/her tonight.", "Green");
                }
            } else if (rolestr === "ww") {
                if (this.shared.state.gameState.nightcount === 0) {
                    popmodal.showmessage("Sleeping", "Waiting for next day.", "ZzZzzZ...", "Green");
                } else {
                    this.pushSave("nightww", ttnm);
                    let wwtitle;
                    wwtitle = (this.askLang) ? "你的目標是" + ttnm : "Your target is " + ttnm + ".";
                    let footermessage;
                    let bodymessage;
                    if (this.askLang) {
                        footermessage = "如對象為妖狐; 或被獵人保護的玩家 ,襲擊會失敗";
                        bodymessage = "若其他生存的狼人選了其他目標, 你的目標或許不會被襲擊";
                    } else {
                        footermessage = "Wish the target is not protected by Hunter or Spirit-Fox.";
                        bodymessage = "If other Werewolf alive choose another target, your target might not be attacked tonight.";
                    }
                    popmodal.showmessage(wwtitle, bodymessage, footermessage, "Green");
                }
            } else {
                popmodal.showmessage("Sleeping", "Waiting for next day.", "ZzZzzZ...", "Green");
            }
            this.actTarget = "";
        },
        nightEnd: function() {
            if (this.shared.state.gameState.nightww.length > 0) {
                let possible = this.shared.state.players.filter(el => el.role !== "ww");
                possible = possible.filter(el => el.alive === 1);
                let wwdict = this.shared.state.gameState.nightww.reduce(function(allName, name) {
                    allName[name] = (allName[name] || 0) + 1;
                    return allName;
                }, {});
                let deadbite = countdict(wwdict, 1);
                // check hunter protection and deadbite role
                let bitedata = possible.filter(el => el.playname === deadbite);
                let biterole = bitedata[0]["role"];
                if ((!this.shared.state.gameState.protectlist.includes(deadbite)) && (biterole !== "sf")) {
                    this.pushSave("nightdead", deadbite);
                }
            }
            // commit dead
            let bodymessage = "";
            let allplayers = this.shared.state.players;
            for (let i = 0; i < this.shared.state.gameState.nightdead.length; i++) {
                let deadname = this.shared.state.gameState.nightdead[i];
                for (let j = 0; j < allplayers.length; j++) {
                    if (deadname === allplayers[j]["playname"]) {
                        allplayers[j]["alive"] = 0;
                        bodymessage += deadname + ", ";
                    }
                }
            }
            bodymessage = bodymessage.slice(0, -2);
            bodymessage += (this.askLang) ? "已經死亡" : " became dead.";
            if (this.shared.state.gameState.nightdead.length === 0) {
                // no death alert
                popmodal.showmessage("Night End.", "No one died this night.", "Game keep going...", "Green");
            } else {
                gbv.setPlayers (allplayers);
                // win determination
                if (!win()) {
                    popmodal.showmessage("Night End.", bodymessage, "Game keep going...", "Red");
                } else {
                    this.shared.setGameState ("phase", 3);
                    this.shared.setGameState ("playstage", 0);
                    return;
                }
            }
            this.shared.setGameState ("nightcount", this.shared.state.gameState.nightcount + 1);
            this.shared.setGameState ("playstage", 2);
        },
        wwRule: function() {
            let rule = "If Werewolfs do not choose the same target, only one of the most chosen target(s) would be attacked.";
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
            this.shared.state.gameState.dayvotelist.sort();
            this.dictSave(this.shared.state.gameState.dayvotelist);
            let targetnm = countdict(this.shared.state.gameState.voteresultdict, this.shared.state.gameState.voteset);
            this.shared.setGameState("vtexile", targetnm);
            let newhang = "";
            this.shared.setGameState("exilecolor", "Red");
            if (this.shared.state.gameState.vtexile === "") {
                if (this.askLang) {
                    this.shared.setGameState("vtexile", "無");
                } else {
                    this.shared.setGameState("vtexile", "NO EXILE");
                }
                this.shared.setGameState("exilecolor", "black");
                popmodal.showmessage("Vote Result", "No one gone this time.", "Good luck next time.", "Green");
            } else {
                for (let j = 0; j < this.shared.state.players.length; j++) {
                    if (this.shared.state.gameState.vtexile === this.shared.state.players[j]["playname"]) {
                        // kill
                        this.shared.state.players[j]["alive"] = 0;
                        break;
                    }
                }
                // save the alive list
                gbv.setPlayers(this.shared.state.players);
                newhang = this.shared.state.gameState.vtexile;
                popmodal.showmessage(newhang, "Time to leave.", "But game may not be over though...", "Red");
            }
            this.shared.setGameState ("lasthang", newhang);
        },
        dayEnd: function() {
            // check win
            if (!win()) {
                popmodal.showmessage("Night Coming", "Everyone be ready.", "Be more careful...", "Red");
                this.shared.setGameState ("playstage", 1);
            } else {
                this.shared.setGameState ("phase", 3);
                this.shared.setGameState ("playstage", 0);
                return;
            }
        },
        Val: function(namestr) {
            let thisdata = this.shared.state.players.filter(el => el.playname === namestr)[0];
            let longcon = ((this.playstageCheck !== 0) && (this.shared.state.gameState.checkedList.includes(thisdata.playname)));
            return ((thisdata.alive === 0) || (this.isChecking) || (this.shared.state.gameState.isStageEnd) || longcon);
        },
        getCls: function(namestr) {
            if ((this.playstageCheck === 0) && (this.shared.state.gameState.checkedList.includes(namestr))) {
                return "btn btn-success";
            } else {
            return "btn btn-warning";
            }
        },
        popThisRole: function() {
            let rolenm;
            let rolelist = gamesetting.roleset;
            for (let j = 0; j < rolelist.length; j++) {
                if (rolelist[j]["short"] === this.playrole) {
                    rolenm = (this.askLang) ? rolelist[j]["zhnm"] : rolelist[j]["name"];
                    break;
                }
            }
            popmodal.showmessage("Your Role", rolenm, "Don't forget it.", "Green");
        },
        pushSave: function(listname, newValue) {
            if (this.shared.debug) console.log(listname, "pushed", newValue);
            this.shared.state.gameState[listname].push(newValue);
            localStorage.setItem("nextwwdata", JSON.stringify(this.shared.state));
        },
        dictSave: function(listname) {
            // using .reduce() 15/2/2019
            if (this.shared.debug) console.log("Counting ", listname);
            let voteresultdict = listname.reduce(function(allName, name) {
                allName[name] = (allName[name] || 0) + 1;
                return allName;
            }, {});
            // save voteresultdict
            this.shared.setGameState ("voteresultdict", voteresultdict);
        },
        resetStageInfo: function() {
            let resetedStage = {
                checkedList: [],
                isStageEnd: false,
                protectlist: [],
                nightdead: [],
                nightww: [],
                dayvotelist: [],
                voteresultdict: {},
                vtexile: "",
                exilecolor: "",
            };
            let newGameStage = Object.assign(this.shared.state.gameState, resetedStage);
            localStorage.setItem("nextwwdata", JSON.stringify(this.shared.state));
        },
    },
    computed: {
        findRoleTab: function() {
            return 'info-' + this.playrole;
        },
        getBackColor: function() {
            // background color
            let backcolorstr;
            let fontcolorstr;
            if (gbv.state.gameState.playstage === 0) {
                backcolorstr = "white";
                fontcolorstr = "black";
            } else if (gbv.state.gameState.playstage === 1) {
                backcolorstr = "black";
                fontcolorstr = "yellow";
            } else if (gbv.state.gameState.playstage === 3) {
                backcolorstr = "silver";
                fontcolorstr = "black";
            }
            return {
                "background-color": backcolorstr,
                "color": fontcolorstr,
            };
        },
        getWWList: function() {
            // list of ww player(s)
            let res = this.shared.state.players.filter(el => el.role === "ww");
            return res;
        },
        wwAlive: function() {
            let wwalive = this.shared.state.players.filter(el => ((el.role === "ww") && (el.alive === 1)));
            return ((wwalive.length > 1) && (this.shared.state.gameState.nightcount !== 0));
        },
        validConfirm: function() {
            return ((this.playstageCheck !== 0) && (this.actTarget === ''));
        },
        playstageCheck: function() {
            return this.shared.state.gameState.playstage;
        },
        askLang: function() {
            return (this.shared.state.langset === "zh");
        }
    },
});

// phase 3 win
var gamresult = new Vue ({
    el: '#winresult',
    data: {
        shared: gbv,
    },
    methods: {
        calList: function(listForCal) {
            // tempdict: {playname: {rolename: namestr, faction: factionstr}, }
            let tempdict = {};
            let rolelist = gamesetting.roleset;
            for (let i = 0; i < listForCal.length; i++) {
                let playnm = listForCal[i]["playname"];
                let roleshort = listForCal[i]["role"];
                let rolenm;
                let factionstr = "_end";
                for (let j = 0; j < rolelist.length; j++) {
                    if (rolelist[j]["short"] === roleshort) {
                        factionstr = rolelist[j]["faction"] + factionstr;
                        rolenm = (this.askLang) ? rolelist[j]["zhnm"] : rolelist[j]["name"];
                        break;
                    }
                }
                let eachdict = {"long": rolenm, "class": factionstr};
                tempdict[playnm] = eachdict;
            }
            return tempdict;
        },
    },
    computed: {
        getTitle: function () {
            let win_text;
            if (this.shared.state.gameState.winside === 1) {
                win_text = (this.askLang) ? "善良陣營勝利" : "Good Faction Win";
                return {
                    text: win_text,
                    color: "green",
                };
            } else if (this.shared.state.gameState.winside === 2) {
                win_text = (this.askLang) ? "邪惡陣營勝利" : "Evil Faction Win";
                return {
                    text: win_text,
                    color: "red",
                };
            } else if (this.shared.state.gameState.winside === 3) {
                win_text = (this.askLang) ? "妖狐陣營勝利" : "Spirit-Fox Faction Win";
                return {
                    text: win_text,
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
            let alives = this.shared.state.players.filter(el => el.alive === 1);
            return this.calList(alives);
        },
        getDie: function() {
            let dies = this.shared.state.players.filter(el => el.alive === 0);
            return this.calList(dies);
        },
        askLang: function() {
            return (this.shared.state.langset === "zh");
        }
    },
});

// translate
const dictionary = {
    modalmess: {
        "Spirit-Fox Faction Win!": "妖狐陣營勝利",
        "Good Job!": "村子已被妖狐吞噬",
        "Pause and restart.": "請按暫停來重開始",
        "Evil Faction Win!": "邪惡陣營勝利",
        "Appreciate!": "全村已被狼人吃光",
        "Good Faction Win!": "善良陣營勝利",
        "Congratulations!": "一切終於回歸平靜",
        "Notification": "提醒",
        "Game paused.": "暫停中",
        "Game restarted.": "已重新開始",
        "WARNING": "警告",
        "At least five player.": "至少五名玩家",
        "Invite more friends to play.": "請邀請更多人",
        "Name already exist.": "重複名稱",
        "Try another one.": "試試新一個",
        "Done": "完成",
        "Randomizing.": "隨機分配中",
        "Vote setting is empty.": "請選擇投票選項",
        "Choose one.": "選一個吧",
        "At least one werewolf.": "最少一名狼人",
        "Add one werewolf.": "你懂遊戲怎麼玩嗎",
        "Counts of players and roles are not match.": "人數不符合",
        "Assign roles again.": "注意職業數量",
        "Is this you?": "這是你嗎?",
        "If no, leave the device.": "不是的話,請不要繼續操作",
        "You voted.": "你已投票",
        "Below is who you voted.": "按鈕旁寫的是你所投的對象",
        "Confirmed": "已確認",
        "If stage not end, next player please.": "請交給還未確認的人",
        "All players confirmed": "所有人都已確認",
        "First night arriving...": "第一晚來臨...",
        "Tell everyone during daytime!": "請活到白天再說出來",
        "Result": "占卜結果",
        "Target would die if role is Spirit-Fox.": "若對象是妖狐, 對方將會死亡",
        "Werewolf can't kill him/her tonight.": "這晚狼人將不能殺死你選擇的對象",
        "Sleeping": "發個好夢",
        "Waiting for next day.": "靜候明天",
        "Night End.": "夜晚結束",
        "No one died this night.": "這晚沒人死亡",
        "Game keep going...": "遊戲繼續...",
        "If Werewolfs do not choose the same target, only one of the most chosen target(s) would be attacked.":
        "狼人若選了不同目標, 最終目標為最多狼人選擇的其中一人",
        "Rule for Werewolf attack": "狼人襲擊規則",
        "Spirit-Fox would survive this attack.": "無論如何, 妖狐不會被你殺死",
        "Time to leave.": "是時候離開了",
        "But game may not be over though...": "但不代表就此結束",
        "Vote Result": "投票結果",
        "No one gone this time.": "這次無人離開",
        "Good luck next time.": "下次好運",
        "Night Coming": "黑夜將至",
        "Everyone be ready.": "做好準備",
        "Be more careful...": "需要更小心了",
        "Your Role": "你的職業",
        "Don't forget it.": "請牢記",
    },
};