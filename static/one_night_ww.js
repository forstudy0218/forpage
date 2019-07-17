// Ready translated locale messages
const messages = {
  en: {
    frontPage: {
      header: '~ Objective ~',
      topic: 'One-Night Werewolf',
      villagers: 'For Good side <br> Execute werewolf if any. No execution if no werewolf',
      werewolve: 'For Werewolf side <br> No werewolf executed',
      vote: 'No execution if all players get one vote',
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
    errorType: {
      noName: 'Name(s) Missing',
      dupName: 'Name Duplicated',
      noTarget: 'Plase select valid option',
      winDataMissing: 'Triumph not found',
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
      startBtn: 'Start',
    },
    console: {
      night: 'Night Time. Confirm your role. Use ability if any.',
      day: 'Day Time. Discuss. And then vote.',
      askForPlayer: 'Press the above button with your name to progress.',
      askIfPlayer: 'Are You ',
      IAm: 'I am ',
      showMyRole: 'Show My Role',
      stageEnd: 'All players finished their action. Press @:console.nextStage to continue.',
      nextStage: 'Next',
      YouAre: 'You are ',
      st_ww: "You can see the name(s) of all Werewolf player(s).",
      nd_ww: "Choose any player. Nothing will happen.",
      rd_ww: "Press @:frontPage.startBtn to see who's Werewolf!",
      st_ft: "You can see the role of one player, or all the role(s) that not in the game.",
      nd_ft: "Choose one of players to see, or choose 'Roles Not In Game'.",
      rd_ft: "Press @:frontPage.startBtn to see the role(s)!",
      st_tf: "You may exchange role with one player. You will know what role you become.",
      nd_tf: "Choose your own name if don't want to exchange. Else, choose your target's name.",
      rd_tf: "Press @:frontPage.startBtn to exchange. Your target won't know if the role is exchanged!",
      st_ve: "You do nothing at night.",
      nd_ve: "Choose any player. Nothing will happen.",
      rd_ve: "Press @:frontPage.startBtn to continue.",
      defaultSelect: "Please Choose",
      notInGame: "Roles Not In Game",
      yourTargetIs: "Your target is ",
      ftRole: "Target's role:",
      memoryCaution: "Please memorize carefully. It will be shown only once.",
      tfSelfChoice: "You had chosen yourself. NO exchange performed.",
      tfNow: "Your role NOW:",
      wwName: "all Werewolf's name(s) shown below:",
      noAction: "You have no ability.",
      resultViewed: "Press @:frontPage.startBtn to continue",
      lonewolf: "You are the only Werewolf",
      tfwwSwap: "You are NOW new Werewolf and your target WON'T know it has changed!",
      wantToVote: "I want to vote",
      voteToOne: "Choose the one you vote for",
      voteChoosing: "Vote for: {name}",
      ruleBtn: "Voting Rule",
      backFromRuleBtn: "Back",
    },
    vote: {
      sameVote: "The player(s) with most votes is executed.",
      wwMost: "Werewolf executed:<br>Good Side Win",
      otherMost: "No Werewolf executed:<br>Werewolf Side Win",
      manyMost: "More than one player executed:<br>At least one Werewolf executed, Good Side Win<br>Else, Werewolf Side Win",
      allVoteOne: "Each player get one vote:<br>At least one player is Werewolf, Werewolf Side Win",
      result: "Vote result:",
      execution: "Player(s) Executed:",
      noExecution: "No player executed",
    },
    sidePage: {
      banner_ww: " Werewolf Side Win ",
      banner_ve: " Good Side Win ",
      showList: "See who win",
      showSide: "See which side win",
      winner: "Winner  "
    }
  },
  "zh-Hant":{
    frontPage: {
      header: '~ 遊戲目標 ~',
      topic: '一夜狼人',
      villagers: '村民陣營 <br> 處決任一狼人，如有。　如村中無狼，不要處決任何人。',
      werewolve: '狼人陣營 <br> 沒有狼人被處決。',
      vote: '如每位玩家各得一票，則不會處決。',
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
    errorType: {
      noName: '玩家必須擁有名字',
      dupName: '玩家名稱不能重覆',
      noTarget: '請選擇有效的選項',
      winDataMissing: '不能判定勝利',
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
      startBtn: '開始遊戲',
    },
    console: {
      night: '現在是晚上<br>確認玩家身份<br>發動應有的能力',
      day: '現在是早上<br>討論占卜和怪盜的結果<br>思考哪些意見可信',
      askForPlayer: '請按上方的玩家名字繼續遊戲',
      askIfPlayer: '你是否 ',
      IAm: '我是 ',
      showMyRole: '決定我的角色',
      stageEnd: '所有玩家均已行動，請按下「 @:console.nextStage 」',
      nextStage: '繼續',
      YouAre: '你是 ',
      st_ww: "你一會可以看到所有狼人的名字.",
      nd_ww: "但你什麼都做不了，請隨便選一位玩家名字",
      rd_ww: "請按下「 @:frontPage.startBtn 」，你將會看到狼人的名字",
      st_ft: "你查看一名玩家的身份，或查看所有未被分配的身份",
      nd_ft: "選擇目標的名字，或，選擇「未分配身份」",
      rd_ft: "請按下「 @:frontPage.startBtn 」，你將會看到目標的身份",
      st_tf: "你可與一名玩家交換身份，而對方是不會知道身份已被交換",
      nd_tf: "選擇目標的名字。如果不想交換，請選擇自己的名字",
      rd_tf: "請按下「 @:frontPage.startBtn 」，將會顯示你交換後的角色",
      st_ve: "你沒有特殊能力",
      nd_ve: "所以你什麼都不能做，請隨便選一位玩家名字",
      rd_ve: "請按下「 @:frontPage.startBtn 」繼續",
      defaultSelect: "請選擇",
      notInGame: "未分配身份",
      yourTargetIs: "你的目標是 ",
      ftRole: "目標身份:",
      memoryCaution: "請牢記頁面上的資料，只會顯示一次",
      tfSelfChoice: "你選擇了自己，因此你繼續是怪盜",
      tfNow: "你已變成:",
      wwName: "以下是所有狼人:",
      noAction: "你沒有特殊能力",
      resultViewed: "請按「 @:frontPage.startBtn 」繼續",
      lonewolf: "只有你一個狼人",
      tfwwSwap: "你和目標的勝利條件亦隨之改變，但你的目標 不會 知道已被交換",
      wantToVote: "我要投票",
      voteToOne: "選擇你想處決的人",
      voteChoosing: "你想處決的是: {name}",
      ruleBtn: "投票規則",
      backFromRuleBtn: "返回",
    },
    vote: {
      sameVote: "得票最高的所有玩家將會被處決",
      wwMost: "得票最高的是 狼人：<br>村民陣營勝利",
      otherMost: "得票最高的不是 狼人：<br>狼人陣營勝利",
      manyMost: "得票最高者多於一人：<br>若其中至少一位是狼人，村民陣營勝利<br>若其中沒有狼人, 狼人陣營勝利",
      allVoteOne: "若所有玩家都得一票：<br>不會處決；若玩家當中有狼人，狼人陣營勝利",
      result: "投票結果",
      execution: "被處決的的玩家：",
      noExecution: "沒有任何人被處決",
    },
    sidePage: {
      banner_ww: " 狼人把所有人都吃光了 ",
      banner_ve: " 村莊成功驅逐狼人 ",
      showList: "查看身份",
      showSide: "查看結果",
      winner: "勝利  "
    }
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
    errorType: {
      noName: '名前がいない',
      dupName: '名前の重複を避ける',
      noTarget: '選択肢は無効',
      winDataMissing: 'データがない',
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
      startBtn: 'スタート',
    },
    sidePage: {
      banner_ww: " 狼人、全ての人間を食べました ",
      banner_ve: " 村、平和になりました ",
      showList: "役職を見ろ",
      showSide: "結果を見ろ",
      winner: "勝者  "
    }
  }
};


// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en',
  messages, // set locale book
  silentFallbackWarn: true,
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
// use testshiffle.py to check probi
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

// check unique primitive array
// https://stackoverflow.com/questions/9229645/
function isUnique(array) {
  return array.every((item, index, self) => self.indexOf(item) === index);
}

// cache image
const images = [
  'ssr_layer',
  'n_ve',
  'r_ww',
  'sr_tf',
  'sr_ft',
  'ssr_tf',
  'ssr_ft',
];
for (let i = 0; i < images.length; i++) {
  const image = document.createElement('div');
  image.className = images[i];
  document.body.appendChild(image);
}

// Create a Vue instance with `i18n` option
new Vue({
  i18n,
  data: {
    // debug mode
    debug: false,
    // for lang change
    langs: [
      {value: 'en', name: 'English'},
      {value: 'zh-Hant', name: '中文'},
      {value: 'ja', name: '日本語'}
    ],
    // game persisted data
    presisted : {
      stage: 0,
      players: [],
      remain: [],
    },
    // game logic data
    // player count
    players_amount: 3,
    // role list
    roles: ["ww", "ww", "ft", "tf", "ve", "ve", "ve", "ve"],
    playerNames: [],
    // use for render name button
    is_checking: false,
    // use for render console
    player_toggle: false,
    stage_end: false,
    show_role: false,
    night_result: false,
    ballot_toggle: false,
    showUserRole: false,
    user_name: "",
    user_role: "",
    // handle night action
    actTarget: "",
    targetList: [],
    ftList: [],
    tfRole: "",
    // toggle vote rule
    toggleRule: false,
    // handle vote action
    toVoteList: [],
    // handle win data toggle
    toggleList: false,
    // use for pause
    temp_stage: 0,
    // use for error handle
    toggle_error: false,
    err_type: "",
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
      if (this.debug) console.log('stage changed to', newStage);
      this.presisted.stage = newStage;
      localStorage.setItem("onwdata", JSON.stringify(this.presisted));
    },
    saveRemain: function(newList) {
      if (this.debug) console.log('remain changed to', newList);
      this.presisted.remain = newList;
      localStorage.setItem("onwdata", JSON.stringify(this.presisted));
    },
    // to naming page from front page
    goToName: function() {
      const amount_selected = this.players_amount;
      // check playerNames
      while (this.playerNames.length !== amount_selected) {
        // this.playerNames.length ( < )||( > ) amount_selected
        if (this.playerNames.length > amount_selected) {
          this.playerNames.splice(amount_selected);
        } else {
          this.playerNames.push("");
        }
      }
      this.roles.splice(amount_selected + 2);
      const temp_arr = [...this.roles];
      shuffle(temp_arr);
      let i;
      for (i = 0; i < amount_selected; i++) {
        const primary_data = {name: "", origin: temp_arr[i], role: temp_arr[i], vote: 0, night: false, voted: false};
        this.presisted.players.push(primary_data);
      }
      for (i; i < temp_arr.length; i++) {
        this.presisted.remain.push(temp_arr[i]);
      }
      this.presisted.stage = 1;
      // for check
      if (this.debug) console.log(this.playerNames);
    },
    // start the game
    gameStart: function() {
      if (this.debug) console.log(this.playerNames);
      // Check if name exist
      if (this.playerNames.includes("")) {
        this.err_type = "noName";
        this.toggle_error = true;
        return;
      }
      // check if item unique
      if (!isUnique(this.playerNames)) {
        this.err_type = "dupName";
        this.toggle_error = true;
        return;
      }
      // copy presisted.players
      const obj_to_save = JSON.parse(JSON.stringify(this.presisted.players));
      for (let nm = 0; nm < this.playerNames.length; nm++) {
        obj_to_save[nm].name = this.playerNames[nm];
      }
      // saving
      this.savePlayers(obj_to_save);
      this.saveRemain(this.presisted.remain);
      this.saveStage(2);
      this.toggle_error = false;
    },
    // valid name button
    toggleNameButton: function(namestr) {
      let thisdata = this.presisted.players.filter(el => el.name === namestr)[0];
      let stage = this.presisted.stage;
      return ((thisdata.night && stage === 2) || (this.is_checking) || (thisdata.voted && stage === 3));
    },
    // change name button color
    getCls: function(namestr) {
      let thisdata = this.presisted.players.filter(el => el.name === namestr)[0];
      if ( (this.presisted.stage === 2 && thisdata.night) || (thisdata.voted && this.presisted.stage === 3) ) {
          return "btn btn-success name_btn";
      } else {
      return "btn btn-warning name_btn";
      }
    },
    // handle player selected
    toggleInfo: function(namestr) {
      let playerdata = this.presisted.players.filter(el => el.name === namestr)[0];
      this.user_name = playerdata.name;
      this.user_role = playerdata.origin;
      this.player_toggle = true;
    },
    // handle player confirm self
    playerConfirmeSelf: function() {
      this.is_checking = true;
    },
    // Gacha
    roleGacha: function() {
      this.showUserRole = true;
    },
    // handle player want to see
    roleShow: function() {
      // print target list
      let new_list = [];
      let role = this.user_role;
      // "ww", "ft", "tf", "ve"
      if (role !== "tf") {
        // normal list without self
        let temp_array = this.presisted.players.filter(el => el.name !== this.user_name);
        temp_array.forEach(el => { new_list.push(el.name) });
      } else {
        this.presisted.players.forEach(el => { new_list.push(el.name) });
      }
      this.targetList = new_list;
      this.showUserRole = false;
      this.show_role = true;
    },
    // handle role ability
    // big function incoming
    useAbility: function() {
      let target = this.actTarget;
      if (target) {
        let role = this.user_role;
        // "ww", "ft", "tf", "ve"
        if (role === "ft") {
          // fortune acction
          this.ftList = [];
          if (target === 'ft_see_two') {
            this.ftList = this.presisted.remain;
          } else {
            const target_data = this.presisted.players.filter(el => el.name === target)[0];
            this.ftList.push(target_data.origin);
          }
        } else if (role === "tf") {
          const target_data = this.presisted.players.filter(el => el.name === target)[0];
          this.tfRole = target_data.origin;
        }
        this.night_result = true;
        this.toggle_error = false;
        this.show_role = false;
      } else {
        this.err_type = "noTarget";
        this.toggle_error = true;
        return;
      }
    },
    // handle player night result
    endPlayerConsole: function() {
      let namestr = this.user_name;
      // check stage
      let stageStr;
      if (this.presisted.stage === 2) stageStr = "night";
      if (this.presisted.stage === 3) stageStr = "voted";
      // copy presisted.players
      const obj_to_save = JSON.parse(JSON.stringify(this.presisted.players));
      const user_data = obj_to_save.filter(el => el.name === namestr)[0];
      user_data[stageStr] = true;
      // handle tf result
      if (this.presisted.stage === 2 && this.user_role === "tf" && this.tfRole !== "tf") {
        // save tf result
        // get target data
        const target_data = obj_to_save.filter(el => el.name === this.actTarget)[0];
        // exchage
        user_data.role = target_data.origin;
        target_data.role = user_data.origin;
        if (this.debug) console.log('Thief exchange performed');
      }
      this.savePlayers(obj_to_save);
      this.checkStageEnd(this.presisted.stage);
      this.actTarget = "";
      this.night_result = false;
      this.is_checking = false;
      this.player_toggle = false;
    },
    // check if all checked
    checkStageEnd: function(stageNum) {
      if (this.debug) console.log("Checking if stage end", stageNum);
      let stageStr;
      if (stageNum !== 2 && stageNum !== 3) return;
      if (stageNum === 2 ) stageStr = "night";
      if (stageNum === 3 ) stageStr = "voted";
      if ( this.presisted.players.every(el => el[stageStr]) ) {
        if (this.debug) console.log("should end");
        this.stage_end = true;
      }
    },
    // next stage button pressed
    ToNextStage: function() {
      this.stage_end = false;
      this.saveStage(this.presisted.stage + 1);
    },
    // toggle vote rule
    toggleVotingRule: function() {
      this.toggleRule = !this.toggleRule;
    },
    // player to vote
    ballotQuery: function() {
      let new_list = [];
      let temp_array = this.presisted.players.filter(el => el.name !== this.user_name);
      temp_array.forEach(el => { new_list.push(el.name) });
      this.toVoteList = new_list;
      this.ballot_toggle = true;
    },
    // confirm vote
    voteAction: function() {
      let target = this.actTarget;
      if (target) {
        // copy presisted.players
        const obj_to_save = JSON.parse(JSON.stringify(this.presisted.players));
        const target_data = obj_to_save.filter(el => el.name === target)[0];
        const user_data = obj_to_save.filter(el => el.name === this.user_name)[0];
        target_data.vote += 1;
        user_data.voted = true;
        this.ballot_toggle = false;
        this.is_checking = false;
        this.player_toggle = false;
        this.toggleRule = false;
        this.toggle_error = false;
        this.actTarget = "";
        this.savePlayers(obj_to_save);
        this.checkStageEnd(this.presisted.stage);
      } else {
        this.err_type = "noTarget";
        this.toggle_error = true;
        return;
      }
    },
    // checked vote
    voteChecked: function() {
      this.toggleList = false;
      this.saveStage(this.presisted.stage + 1);
    },
    // toggle data shown
    toggleWin: function() {
      this.toggleList = !this.toggleList;
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
      this.is_checking = false;
      this.player_toggle = false;
      this.stage_end = false;
      this.show_role = false;
      this.night_result = false;
      this.ballot_toggle = false;
      this.toggleRule = false;
      this.showUserRole = false;
      this.user_name = "";
      this.user_role = "";
      this.actTarget = "";
      this.targetList = [];
      this.ftList = [];
      this.tfRole = "";
      this.toVoteList = [];
      this.toggle_error = false;
      // delete save
      localStorage.removeItem('onwdata');
    },
    // toggle debug
    debugMode: function() {
      console.log(this.debug? "debug off" : "debug on");
      this.debug = !this.debug;
    }
  },
  computed: {
    // app background color
    appBgColor: function() {
      return (this.presisted.stage === 3)? "day_background" : "dark_background";
    },
    // img for roles
    rarityGacha: function() {
      // return componet id
      if (this.debug) console.log("Gacha!");
      switch (this.user_role) {
        case "ww":
          return "r_ww";
        case "ve":
          return "n_ve";
        case "tf":
          return (Math.floor(Math.random() * 100) >= 90)? "ssr_tf" : "sr_tf";
        case "ft":
          return (Math.floor(Math.random() * 100) >= 90)? "ssr_ft" : "sr_ft";
        default:
          return "ssr_layer";
      }
    },
    // for Werewolf night
    wwNameList: function() {
      const ww_data = this.presisted.players.filter(el => el.origin === "ww");
      const ww_names = [];
      ww_data.forEach(data => { ww_names.push(data.name) });
      return ww_names;
    },
    // handle vote result
    // consider to make it computed
    voteResult: function() {
      // default
      const list_needed = [];
      if (this.debug) console.log("calculting vote");
      const players_data = this.presisted.players;
      let vote_list = [];
      players_data.forEach(data => { vote_list.push(data.vote) });
      let most_vote = vote_list.reduce( (a, b) => Math.max(a, b), 0 );
      if (this.debug) console.log("max vote is", most_vote);
      // don't change if no execution
      if (most_vote > 1) {
        vote_list.forEach( (count, index) => {
          if (count === most_vote) {
            list_needed.push(players_data[index].name);
          }
        });
      }
      return list_needed;
    },
    // win decide
    winControl: function() {
      try {
        if (this.debug) console.log("looking for win side");
        let win_side;
        if (this.voteResult.length === 0) {
          // no execution
          // check if ww in game
          let ww_data = this.presisted.players.filter(el => el.role === "ww");
          win_side = (ww_data.length === 0)? "ve" : "ww";
        } else {
          let executed_role = [];
          // check executed role
          this.voteResult.forEach(name => {
            let executed_data = this.presisted.players.filter(el => el.name === name)[0];
            executed_role.push(executed_data.role);
          });
          win_side = (executed_role.includes("ww"))? "ve" : "ww";
        }
        return win_side;
      } catch(e) {
        this.err_type = "winDataMissing";
        this.toggle_error = true;
        return "";
      }
    },
  },
  mounted() {
    // should load if any
    const payload = load_save();
    // check if save existed
    if (payload) {
      if (this.debug) console.log("Save found.");
      // adapt
      try {
        this.presisted = payload;
      } catch(e) {
        // can't map save to data
        localStorage.removeItem('onwdata');
        load_save();
      }
      // check stage
      this.checkStageEnd(this.presisted.stage);
    }
    if (this.debug) console.log("Successfully Mounted.");
  },
}).$mount('#app');

// Now the app has started!