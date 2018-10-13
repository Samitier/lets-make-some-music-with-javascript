export default class Filter {

	filter!: BiquadFilterNode

	constructor(context: AudioContext, type: BiquadFilterType = "highpass") {
		this.filter = context.createBiquadFilter()
		this.filter.type = type
		this.filter.frequency.value = 0
		this.filter.Q.value = 0
		this.filter.connect(context.destination)
	}

	setFrequency(frequency: number) {
		this.filter.frequency.value = frequency
	}

	setQ(q: number) {
		this.filter.Q.value = q
	}

	setType(type: BiquadFilterType) {
		this.filter.type = type
	}
}
