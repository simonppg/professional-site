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

const myPlugin = defineNuxtPlugin((nuxtApp) => {
  let audioApp

  try {
    const audioContext = new AudioContext()
    audioApp = new AudioApp(audioContext)
  } catch (e: NotSupporterError) {
    alert("Audio features are not supported :'(")
  }

  return {
    provide: {
      audioApp
    }
  }
})

export default myPlugin
