import Vue from "vue"
import Router from "vue-router"
import Home from "./views/home.vue"

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: "/",
			name: "home",
			component: Home
		},
		{
			path: "/example1",
			name: "example1",
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "about" */ "./views/example1/example1.vue"),
		},
	]
})
