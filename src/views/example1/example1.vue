<template>
<div class="row">
	<a @click="onToggleOscillator">
		{{ oscillator.isPlaying ? 'Stop' : 'Start' }}
	</a>
	<input 
		v-if="oscillator.isPlaying"
		type="range"
		min="40"
		max="700"
		step="0.1"
		v-model="frequency"
	>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import Oscillator from "./oscillator"

@Component
export default class Example extends Vue {

	context = new AudioContext()
	oscillator = new Oscillator(this.context, "triangle")

	get frequency() { return this.oscillator.getFrequency() }
	set frequency(f) { this.oscillator.setFrequency(f) }

	onToggleOscillator() {
		if (this.oscillator.isPlaying) this.oscillator.stop()
		else this.oscillator.start()
	}
}
</script>

<style scoped lang="stylus">

</style>