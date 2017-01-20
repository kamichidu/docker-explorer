<template>
    <div class="content">
        <x-side-pane></x-side-pane>

        <div class="main-pane">
            <div class="scroller">
                <!-- <div class="container"> -->
                <!--     <h3>Host Metrics</h3> -->
                <!--  -->
                <!--     TBD -->
                <!-- </div> -->
                <div class="container">
                    <h3>Container Metrics</h3>

                    <template v-for="metric in containers">
                        <x-chart v-bind:title="metric.title" v-bind:data="metric.data"></x-line-chart>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import sidePaneView from './side-pane.vue';
    import chartView from './line-chart.vue';

    export default {
        props: {
            hosts: Array,
            containers: Array,
        },

        data(){
            return {
                // hosts: [],
                // containers: [{
                //     title: 'CPU Utilization',
                //     data: {
                //         datasets: [{
                //             label: 'container1',
                //             data: [{x: -3, y: 0}, {x: -2, y: 1}, {x: -1, y: 2}, {x: 0, y: 1}],
                //         }, {
                //             label: 'container2',
                //             data: [{x: -3, y: 0}, {x: -2, y: 1}, {x: -1, y: 2}, {x: 0, y: 1}],
                //         }],
                //     },
                // }, {
                //     title: 'Memory Used',
                //     data: {
                //         datasets: [{
                //             label: 'container1',
                //             data: [{x: -3, y: 0}, {x: -2, y: 1}, {x: -1, y: 2}, {x: 0, y: 1}],
                //         }],
                //     },
                // }, {
                // }],
            };
        },

        components: {
            'x-side-pane': sidePaneView,
            'x-chart': chartView,
        },
    };
</script>
