import { Plugin } from '@nuxt/types'
import AudioApp from '../src/AudioApp'

const myPlugin: Plugin = (_, inject) => {
  inject('audioApp', new AudioApp())
}
export default myPlugin
