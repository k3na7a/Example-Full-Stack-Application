import { createApp } from 'vue'

import '@/assets/sass/style.scss'

import App from '@/views/app.view.vue'

import { FontAwesomeService as FontAwesome } from '@/plugins/fontawesome.plugin'
import { PiniaService as Pinia } from '@/plugins/pinia.plugin'
import { I18nService as I18n } from '@/plugins/vuei18n.plugin'
import { VueRouterService as Router } from '@/plugins/vuerouter.plugin'

import { routes } from '@/router/routes'

function bootstrap(): void {
  const app = createApp(App)

  Pinia.init(app)
  Router.init(app, routes)
  I18n.init(app)
  FontAwesome.init(app)

  app.mount('#app')
}

bootstrap()
