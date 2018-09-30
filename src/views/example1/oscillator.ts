export default class Oscillator {

	oscillator!: OscillatorNode
	isPlaying = false

	constructor(
		private context: AudioContext,
		private type: OscillatorType = "sine"
	) {
		this.init()
	}

	start() {
		this.isPlaying = true
		this.oscillator.start()
	}

	stop() {
		this.isPlaying = false
		this.oscillator.stop()
		this.init()
	}

	setFrequency(frequency: number) {
		this.oscillator.frequency.value = frequency
	}

	getFrequency() {
		return this.oscillator.frequency.value
	}

	private init() {
		this.oscillator = this.context.createOscillator()
		this.oscillator.type = this.type
		this.oscillator.connect(this.context.destination)
	}
}
