// Ready translated locale messages
const messages = {
  en: {
    modal: {
      winSF: "Spirit-Fox Faction Win!",
      endSF: "Very impressive, well done Spirit-Fox!",
      resumeGame: "Pause and restart.",
      winWW: "Evil Faction Win!",
      endWW: "Werewolf swallow the whole village",
      winVE: "Good Faction Win!",
      endVE: "Live peacefully and happily for now!",
      notice: "Notification",
      paused: "Game paused.",
      restart: "Game restarted.",
      warning: "WARNING",
      notFive: "At least five player.",
      fiveMore: "Invite more friends to play.",
      dup: "Name already exist.",
      tryNew: "Try another one.",
      done: "Done",
      randNote: "Randomizing.",
      setVote: "Vote setting is empty.",
      selectOne: "Choose one.",
      noWW: "At least one werewolf.",
      addWW: "Add one werewolf.",
      notMatch: "Counts of players and roles are not match.",
      assignRole: "Assign roles again.",
      askYou: "Is this you?",
      notYou: "If no, leave the device.",
      voted: "You voted.",
      votedOne: "Below is who you voted.",
      conf: "Confirmed",
      nextOne: "If stage not end, next player please.",
      allConf: "All players confirmed",
      firstN: "First night arriving...",
      tellDay: "Tell everyone during daytime!",
      tfRes: "Result",
      tfsf: "Target would die if role is Spirit-Fox.",
      guard: "Werewolf can't kill him/her tonight.",
      sleep: "Sleeping",
      wait: "Waiting for next day.",
      endN: "Night End.",
      noDead: "No one died this night.",
      ongo: "Game keep going...",
      voteKill: "If Werewolfs do not choose the same target, only one of the most chosen target(s) would be attacked.",
      wwRule: "Rule for Werewolf attack",
      wwsf: "Spirit-Fox would survive this attack.",
      hangOne: "Time to leave.",
      notEnd: "But game may not be over though...",
      voteRes: "Vote Result",
      noHang: "No one gone this time.",
      glnt: "Good luck next time.",
      startN: "Night Coming",
      readyN: "Everyone be ready.",
      warnN: "Be more careful...",
      uRole: "Your Role",
      memRole: "Don't forget it.",
    },
    pauseDiv: {
      toHome: "HOME",
      theSwitch: "PAUSE",
      toRestart: "RESTART",
    },
  },
  "zh-Hant":{
    modal: {
      winSF: "妖狐陣營勝利",
      endSF: "村子已被妖狐吞噬",
      resumeGame: "請按暫停來重開始",
      winWW: "邪惡陣營勝利",
      endWW: "全村已被狼人吃光",
      winVE: "善良陣營勝利",
      endVE: "一切終於回歸平靜",
      notice: "提醒",
      paused: "暫停中",
      restart: "已重新開始",
      warning: "警告",
      notFive: "至少五名玩家",
      fiveMore: "請邀請更多人",
      dup: "重複名稱",
      tryNew: "試試新一個",
      done: "完成",
      randNote: "隨機分配中",
      setVote: "請選擇投票選項",
      selectOne: "選一個吧",
      noWW: "最少一名狼人",
      addWW: "你懂遊戲怎麼玩嗎",
      notMatch: "人數不符合",
      assignRole: "注意職業數量",
      askYou: "這是你嗎?",
      notYou: "不是的話,請不要繼續操作",
      voted: "你已投票",
      votedOne: "按鈕旁寫的是你所投的對象",
      conf: "已確認",
      nextOne: "請交給還未確認的人",
      allConf: "所有人都已確認",
      firstN: "第一晚來臨...",
      tellDay: "請活到白天再說出來",
      tfRes: "占卜結果",
      tfsf: "若對象是妖狐, 對方將會死亡",
      guard: "這晚狼人將不能殺死你選擇的對象",
      sleep: "發個好夢",
      wait: "靜候明天",
      endN: "夜晚結束",
      noDead: "這晚沒人死亡",
      ongo: "遊戲繼續...",
      voteKill: "狼人若選了不同目標, 最終目標為最多狼人選擇的其中一人",
      wwRule: "狼人襲擊規則",
      wwsf: "無論如何, 妖狐不會被你殺死",
      hangOne: "是時候離開了",
      notEnd: "但不代表就此結束",
      voteRes: "投票結果",
      noHang: "這次無人離開",
      glnt: "下次好運",
      startN: "黑夜將至",
      readyN: "做好準備",
      warnN: "需要更小心了",
      uRole: "你的職業",
      memRole: "請牢記",
    },
    pauseDiv: {
      toHome: "首頁",
      theSwitch: "暫停",
      toRestart: "重新開始",
    },
  },
};

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en',
  messages, // set locale book
  silentFallbackWarn: true,
});

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
    },
};

// control save
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
        console.log("save safe");
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

// register modal component
Vue.component('modal', {
  template: '#modal-template'
});
// modal app with i18n
let popmodal = new Vue ({
  i18n,
  data: {
    header: "",
    body: "",
    footer: "",
    headerColor: "",
    showModal: false,
  },
  methods: {
    showmessage: function(header, body, footer, headcolor) {
      this.header = this.$t("modal." + header );
      this.body = this.$t("modal." + body);
      if (footer !== "") this.footer = this.$t("modal." + footer);
      this.headerColor = headcolor;
      this.showModal = true;
    }
  }
}).$mount('#popwin');;

// lang switch
new Vue ({
  i18n,
  data: {
    langs: [
      {value: 'en', name: 'English'},
      {value: 'zh-Hant', name: '中文'},
    ],
  },
  methods: {
    // on lang change
    onLocaleChange: function() {
      const new_lang = this.$i18n.locale;
      // change html lang
      document.querySelector('html').setAttribute('lang', new_lang);
    }
  }
}).$mount('#lang-changer');

// pause button
// universal button app
new Vue ({
  i18n,
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
        popmodal.showmessage("notice", "paused", "", "Blue");
      }
    },
    restartGame: function() {
      gbv.resetGame();
      this.paused = false;
      popmodal.showmessage("notice", "restart", "", "Blue");
    },
    toggleDebbug: function() {
      gbv.debug = (gbv.debug) ? false : true;
    }
  },
}).$mount('#unipause');