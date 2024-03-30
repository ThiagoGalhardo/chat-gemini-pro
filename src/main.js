import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'

import App from './App.vue'
import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/pt-BR'
import '@quasar/extras/roboto-font/roboto-font.css'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
// import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
// import '@quasar/extras/material-icons-round/material-icons-round.css'
// import '@quasar/extras/mdi-v7/mdi-v7.css'
// import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'

// A few examples for animations from Animate.css:
// import @quasar/extras/animate/fadeIn.css
// import @quasar/extras/animate/fadeOut.css

// Import Quasar css
import 'quasar/src/css/index.sass'

// Assumes your root component is App.vue
// and placed in same folder as main.js

const app = createApp(App)

app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
  lang: quasarLang,
})

app.use(createPinia())
app.use(router)

app.mount('#app')