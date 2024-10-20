import { click_outside } from '@/library/components/directives/click-outside.directive'
import { tooltip } from '@/library/components/directives/tooltip.directive'
import { App } from 'vue'

class CustomDirectiveService {
  public static init(app: App): void {
    app.directive('click-outside', click_outside)
    app.directive('tooltip', tooltip)
  }
}

export { CustomDirectiveService }
