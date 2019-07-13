// Ready translated locale messages
const messages = {
  en: {
    frontPage: {
      header: '~ Objective ~',
      topic: 'One-Night Werewolf',
      villagers: 'For Good side <br> Execute werewolf if any. No execution if no werewolf',
      werewolve: 'For Werewolf side <br> No werewolf executed',
      vote: 'No execution if there is a tie',
      amount: 'Select numbers of players: (3 to 7)',
      startBtn: 'Confirm',
      exitBtn: 'To Home',
    },
    pauseControl: {
      toPause: 'Pause',
      returnGame: 'Resume',
      title: 'Paused',
      removal: 'New Game',
    },
    roles: {
      // "ww", "ft", "tf", "ve"
      ww: "Werewolf",
      ft: "Fortune Teller",
      tf: "Phantom Thief",
      ve: "Village",
    },
    naming: {
      rolesAre: "Roles in this game: ",
      placeholder: "Your Name",
    },
  },
  "zh-Hant":{
    frontPage: {
      header: '~ 遊戲目標 ~',
      topic: '一夜狼人',
      villagers: '村民陣營 <br> 處決狼人，如有。　如村中無狼，不要處決任何人。',
      werewolve: '狼人陣營 <br> 沒有狼人被處決。',
      vote: '如最高票者多於一人，不會處決。',
      amount: '請選擇玩家人數: (3 至 7)',
      startBtn: '確認',
      exitBtn: '回首頁',
    },
    pauseControl: {
      toPause: '暫停',
      returnGame: '返回遊戲',
      title: '暫停中',
      removal: '結束遊戲',
    },
    roles: {
      // "ww", "ft", "tf", "ve"
      ww: "狼人",
      ft: "占卜師",
      tf: "怪盜",
      ve: "村民",
    },
    naming: {
      rolesAre: "這次的角色： ",
      placeholder: "輸入名字",
    },
  },
  ja: {
    frontPage: {
      header: '~ ルール ~',
      topic: 'ワンナイト狼人',
      amount: 'プレイヤー人数を決めよう:（3 から 7 まで）',
      startBtn: '確認',
      exitBtn: 'ホームページヘ',
    },
    pauseControl: {
      toPause: '一時停止',
      returnGame: '再開',
      title: '一時停止中',
      removal: 'ゲームをやめる',
    },
    roles: {
      // "ww", "ft", "tf", "ve"
      ww: "狼人",
      ft: "占い師",
      tf: "怪盗",
      ve: "村人",
    },
    naming: {
      rolesAre: "役職： ",
      placeholder: "名前",
    },
  }
};


// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en',
  messages, // set locale book
});

// control save
function load_save() {
  if (!localStorage.getItem("onwdata")) {
    // default data
    let nullstate = {
      stage: 0,
      players: [],
      remain: [],
    };
    localStorage.setItem("onwdata", JSON.stringify(nullstate));
    return false;
  } else {
    return JSON.parse(localStorage.getItem("onwdata"));
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

// Create a Vue instance with `i18n` option
new Vue({
  i18n,
  data: {
    // debug mode
    debug: true,
    // for lang change
    langs: ['en', 'zh-Hant', 'ja'],
    // game persisted data
    presisted : {
      stage: 0,
      players: [],
      remain: [],
    },
    // game logic data
    // player count
    players_amount: 0,
    // role list
    roles: ["ww", "ww", "ft", "tf", "ve", "ve", "ve", "ve"],
    playerNames: [],
    // use for pause
    temp_stage: 0,
  },
  methods: {
    // on lang change
    onLocaleChange: function() {
      const new_lang = this.$i18n.locale;
      // change html lang
      document.querySelector('html').setAttribute('lang', new_lang);
    },
    // save players data
    savePlayers: function(newList) {
      if (this.debug) console.log('players changed to', newList);
      this.presisted.players = newList;
      localStorage.setItem("onwdata", JSON.stringify(this.presisted));
    },
    // save stage value
    saveStage: function(newStage) {
      if (this.debug) console.log('players changed to', newStage);
      this.presisted.stage = newStage;
      localStorage.setItem("onwdata", JSON.stringify(this.presisted));
    },
    saveRemain: function(newList) {
      if (this.debug) console.log('players changed to', newList);
      this.presisted.remain = newList;
      localStorage.setItem("onwdata", JSON.stringify(this.presisted));
    },
    // start from front page
    start: function() {
      const amount_selected = this.players_amount;
      this.roles.splice(amount_selected + 2);
      const temp_arr = [...this.roles];
      shuffle(temp_arr);
      let i;
      for (i = 0; i < amount_selected; i++) {
        const primary_data = {name: "", origin: temp_arr[i], current: temp_arr[i], vote: 0, night: false, voted: false};
        this.presisted.players.push(primary_data);
      }
      for (i; i < temp_arr.length; i++) {
        this.presisted.remain.push(temp_arr[i]);
      }
      this.presisted.stage = 1;
      // for check
      if (this.debug) console.log(this.presisted);
    },
    // pause fuction
    togglePause: function() {
      if (this.presisted.stage !== 99) {
        if (this.debug) console.log("Paused");
        this.temp_stage = this.presisted.stage;
        this.presisted.stage = 99;
      }
      else {
        if (this.debug) console.log("Resumed");
        this.presisted.stage = this.temp_stage;
      }
    },
    // removal
    removeGame: function() {
      if (this.debug) console.log("Game removed");
      // make data to default
      // actually can set data to function
      this.presisted = {
        stage: 0,
        players: [],
        remain: [],
      };
      this.role = ["ww", "ww", "ft", "tf", "ve", "ve", "ve", "ve"];
      localStorage.removeItem('onwdata');
    },
    // toggle debug
    debugMode: function(){
      console.log(this.debug? "debug off" : "debug on");
      this.debug = !this.debug;
    }
  },
  computed: {

  },
  mounted() {
    // should load if any
    const payload = load_save();
    // check if save existed
    if (payload) {
      if (this.debug) console.log("Save found.");
      // adapt
      try {
        this.presisted = payload
      } catch(e) {
        // can't map save to data
        localStorage.removeItem('onwdata');
        load_save();
      }
    };
    if (this.debug) console.log("Successfully Mounted.");
  },
}).$mount('#app');

// Now the app has started!