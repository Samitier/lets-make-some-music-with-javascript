<template>
	<NoteViewer :note="pressedKey ? pressedKey.name : '-'" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import Oscillator from "./oscillator"
import MidiPianoController, { MidiEventType, MidiKey } from "./midi-piano-controller"
import NoteViewer from "./note-viewer.vue"

@Component({
	components: { NoteViewer }
})
export default class Example extends Vue {

	context = new AudioContext()
	oscillator = new Oscillator(this.context)
	midiController = new MidiPianoController(this.onMidiPress, this.onMidiRelease)

	pressedKey: MidiKey | null = null

	mounted() {
		this.midiController.requestAccess()
	}

	onMidiPress(key: MidiKey) {
		this.pressedKey = key
		this.oscillator.setFrequency(this.pressedKey.frequency)
		this.oscillator.start()
	}

	onMidiRelease(event: MidiKey) {
		this.pressedKey = null
		this.oscillator.stop()
	}
}
</script>

<style scoped lang="stylus">

</style>