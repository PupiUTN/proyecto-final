let myApp = Vue.component('my-app', {
    template: `
<span>
    <div id="page-loader"></div>
    <!-- Header Container
    ================================================== -->
    <my-navbar></my-navbar>
        <component :is="currentView" ref="currentView"></component>
</span>
`,
    props: ['currentView']
});