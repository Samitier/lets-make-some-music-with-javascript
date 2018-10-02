import Vue from "vue"
import Router from "vue-router"
import Home from "./views/home.vue"

Vue.use(Router)

export default new Router({
	mode: "history",
	routes: [
		{
			path: "/",
			name: "home",
			component: Home
		},
		{
			path: "/example1",
			name: "example1",
			component: () => import(/* webpackChunkName: "about" */ "./views/example1/example1.vue"),
		},
		{
			path: "/example2",
			name: "example2",
			component: () => import(/* webpackChunkName: "about" */ "./views/example2/example2.vue"),
		},
		{
			path: "/example3",
			name: "example3",
			component: () => import(/* webpackChunkName: "about" */ "./views/example3/example3.vue"),
		},
	]
})
