import { Plugin } from '@nuxt/types'
import AudioApp from '../src/AudioApp'

declare module 'vue/types/vue' {
  interface Vue {
    $audioApp: AudioApp
  }
}
declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $audioApp: AudioApp
  }
  interface Context {
    $audioApp: AudioApp
  }
}

declare module 'vuex/types/index' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  interface Store<S> {
    $audioApp: AudioApp
  }
}

const myPlugin: Plugin = (_, inject) => {
  inject('audioApp', new AudioApp())
}
export default myPlugin
