export default class Sound {

	private buffer!: AudioBuffer

	constructor(
		private context: AudioContext,
		private name: string
	) {}

	load() {
		return new Promise(async resolve => {
			const resp = await fetch(this.getPath(this.name))
			const file = await resp.arrayBuffer()
			this.context.decodeAudioData(file, buffer => {
				this.buffer = buffer
				resolve()
			})
		})
	}

	play() {
		const source = this.context.createBufferSource()
		source.buffer = this.buffer
		source.connect(this.context.destination)
		source.start()
	}

	private getPath(name: string) {
		return `/sounds/${ name }.wav`
	}
}
