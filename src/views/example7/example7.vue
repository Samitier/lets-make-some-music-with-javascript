<template>
	<SoundViewer ref="soundViewer" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import MidiPianoController, { MidiKey, MidiEventType } from "./midi-piano-controller"
import Sound from "./sound"
import SoundViewer from "./sound-viewer.vue"

@Component({
	components: { SoundViewer }
})
export default class Example extends Vue {

	context = new AudioContext()
	midiController = new MidiPianoController(this.onMidiPress, this.onMidiRelease)
	sounds: Sound[] = []

	private get soundViewer() { return this.$refs.soundViewer as SoundViewer }

	private readonly soundNames = [
		"bass", "bongo1", "bongo2", "clap", "crash", "hihat1",
		"hihat2", "ride1", "ride2", "snare", "tom"
	]

	async mounted() {
		this.midiController.requestAccess()
		for (const name of this.soundNames) {
			this.sounds.push(new Sound(this.context, name))
		}
		await Promise.all(this.sounds.map(s => s.load()))
	}

	onMidiPress(key: MidiKey) {
		const soundIdx = key.number % this.sounds.length
		this.sounds[soundIdx].play()
		this.soundViewer.show()
	}

	onMidiRelease(key: MidiKey) {
		//
	}
}
</script>

<style scoped lang="stylus">

</style>