/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import Vue from 'vue'
import CountryFlag from 'vue-country-flag-next'

import { languages } from '@/i18n'
import { defaultLocale } from '@/i18n'
import { createI18n, useI18n } from 'vue-i18n'

const messages = Object.assign(languages)

const i18n = createI18n({
  locale: defaultLocale, 
  fallbackLocale: 'ru', 
  messages,
  legacy: false,
  
});


// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App,{
    setup() {
        const { t } = useI18n() 
        return { t } 
      }
}).use(i18n)
app.component('country-flag', CountryFlag)


registerPlugins(app)

app.mount('#app')
