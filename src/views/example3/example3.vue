<template>
<div class="row">
	{{ lastPressedKey ? lastPressedKey.noteName : "" }}
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import Oscillator from "./oscillator"
import MidiPianoController, { MidiEvent, MidiEventType } from "./midi-piano-controller"

@Component
export default class Example1 extends Vue {

	context = new AudioContext()
	oscillator = new Oscillator(this.context, "triangle")
	midiController = new MidiPianoController(this.onMidiEvent)

	pressedKeys: MidiEvent[] = []

	get lastPressedKey() { return this.pressedKeys[this.pressedKeys.length - 1] }

	mounted() {
		this.midiController.requestAccess()
	}

	onMidiEvent(event: MidiEvent) {
		if (event.type === MidiEventType.press) {
			this.pressedKeys.push(event)
		} else if (event.type === MidiEventType.release) {
			const i = this.pressedKeys.findIndex(e => e.key === event.key)
			if (i >= 0) this.pressedKeys.splice(i, 1)
		}
		if (this.pressedKeys.length) {
			this.oscillator.setFrequency(this.lastPressedKey.frequency)
			if (!this.oscillator.isPlaying) {
				this.oscillator.start()
			}
		} else if (this.oscillator.isPlaying) {
			this.oscillator.stop()
		}
	}
}
</script>

<style scoped lang="stylus">

</style>