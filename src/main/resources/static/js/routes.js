// 0. If using a module system (e.g. via vue-cli), import Vue and VueRouter
// and then call `Vue.use(VueRouter)`.

// 1. Define route components.
// These can be imported from other files
const Foo = {template: '<div>foo</div>'};
const Bar = {template: '<div>bar</div>'};

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
    {
        path: '/',
        component: myApp,
        props: {currentView: myIndex}
    },
    {
        path: '/placeName=Córdoba,%20Cordoba,%20Argentina&placeID=ChIJaVuPR1-YMpQRkrBmU5pPorA&lat=-31.42008329999999&lng=-64.18877609999998',
        component: myApp,
        props: {currentView: myListaCuidadores},
        name: 'buscar'
    }
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
    routes // short for `routes: routes`
});

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
    router
}).$mount('#wrapper');

// Now the app has started!