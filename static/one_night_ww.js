// Ready translated locale messages
const messages = {
  en: {
    message: {
        hello: 'Hello, World',
        topic: 'One-Night Werewolf',
    }
  },
  rs:{
    message: {
        hello: '世界你好',
        topic: '一夜狼人',
    }  
  },
  ja: {
    message: {
        hello: 'こんにちは、世界',
    }
  }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'rs', // set locale
  messages, // set locale messages
})


// Create a Vue instance with `i18n` option
new Vue({ i18n }).$mount('#app')

// Now the app has started!