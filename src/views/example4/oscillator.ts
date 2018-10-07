export default class Oscillator {

	oscillator!: OscillatorNode
	gainNode!: GainNode

	constructor(
		private context: AudioContext,
		frequency: number,
		private gainAmount: number = 1,
		type: OscillatorType = "sine",
	) {
		this.oscillator = context.createOscillator()
		this.oscillator.type = type
		this.gainNode = context.createGain()
		this.oscillator.connect(this.gainNode)
		this.gainNode.connect(context.destination)
		this.oscillator.frequency.value = frequency
	}

	start() {
		this.gainNode.gain.value = this.gainAmount
		this.oscillator.start()
	}

	stop() {
		this.oscillator.stop()
	}
}
