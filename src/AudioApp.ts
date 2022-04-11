export default class AudioApp {
  private context: AudioContext | undefined
  private gainNode: GainNode | undefined
  private oscilatorNode: OscillatorNode | undefined
  private oscilatortypes = ['sine', 'square', 'triangle', 'sawtooth']
  private pitches = [830, 174]

  play () {
    this.context = new AudioContext()
    this.gainNode = this.context.createGain()
    this.gainNode.connect(this.context.destination)
    this.oscilatorNode = this.context.createOscillator()
    this.oscilatorNode.type = 'triangle'
    this.oscilatorNode.connect(this.gainNode)
    this.oscilatorNode.start(0)
  }

  randomOscilator () {
    const randomIndex = this.randomIndex(this.oscilatortypes)
    this.oscilatorNode.type = this.oscilatortypes[randomIndex]
  }

  private randomIndex (arr: any[]) {
    return Math.floor(Math.random() * arr.length)
  }

  setFrequency (frequency: number) {
    this.oscilatorNode?.frequency.value = frequency
  }

  randomPitch () {
    const randomIndex = this.randomIndex(this.pitches)
    this.oscilatorNode?.frequency.value = this.pitches[randomIndex]
  }

  private stopOcilator () {
    this.oscilatorNode?.stop()
  }

  stop (x: number) {
    const currentTime = this.context?.currentTime || 0
    const delay = +currentTime.toFixed(2) + x

    if (!isFinite(delay)) {
      this.stopOcilator()
    }

    console.log({
      delay
    })

    this.gainNode?.gain.exponentialRampToValueAtTime(
      0.00001, delay
    )
  }
}
