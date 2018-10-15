<template>
	<div class="sound-viewer row" :style="cssStyle">
		<img 
			v-for="banana in bananas" 
			:key="banana.key"
			:style="banana" 
			src="/img/banana.gif"
		>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
import randomcolor from "randomcolor"

@Component
export default class SoundViewer extends Vue {

	bananas: Banana[] = []

	get cssStyle() { return { backgroundColor: this.color } }

	private color = randomcolor()
	private i = 0

	show() {
		this.color = randomcolor()
		const banana = {
			key: this.i++,
			top: `${ Math.random() * (window.innerHeight - 250) }px`,
			left: `${ Math.random() * (window.innerWidth - 250) }px`,
			transform: `rotateZ(${ 360 * Math.random() }deg) scale(${ .8 + .5 * Math.random() })`
		}
		this.bananas.push(banana)
		setTimeout(() => {
			const i = this.bananas.indexOf(banana)
			this.bananas.splice(i, 1)
		}, 1000)
	}
}

interface Banana {
	key: number
	top: string
	left: string
	transform: string
}
</script>

<style scoped lang="stylus">
@keyframes fade
	0%
		opacity 0
	10% 
		opacity 1
	60% 
		opacity 1
	100%
		opacity 0

.sound-viewer
	top 0
	bottom 0
	left 0
	right 0
	position fixed

img
	position absolute
	animation fade 1000ms forwards
</style>