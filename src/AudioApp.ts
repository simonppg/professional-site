type OscillatorType = 'custom' | 'sawtooth' | 'sine' | 'square' | 'triangle'

export default class AudioApp {
  private context: AudioContext | undefined
  private gainNode: GainNode | undefined
  private oscilatorNode: OscillatorNode | undefined
  private oscilatorTypes: OscillatorType[] = ['sine', 'square', 'triangle', 'sawtooth']
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
    if (!this.oscilatorNode) { return }

    const randomIndex = this.randomIndex(this.oscilatorTypes)
    this.oscilatorNode.type = this.oscilatorTypes[randomIndex]
  }

  private randomIndex (arr: any[]) {
    return Math.floor(Math.random() * arr.length)
  }

  setFrequency (frequency: number) {
    if (!this.oscilatorNode) { return }

    this.oscilatorNode.frequency.value = frequency
  }

  randomPitch () {
    if (!this.oscilatorNode) { return }

    const randomIndex = this.randomIndex(this.pitches)
    this.oscilatorNode.frequency.value = this.pitches[randomIndex]
  }

  private stopOcilator () {
    if (!this.oscilatorNode) { return }

    this.oscilatorNode.stop()
  }

  stop () {
    this.stopOcilator()
  }
}
