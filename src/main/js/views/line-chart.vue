<template>
    <div class="metrics-graph">
        <canvas></canvas>
    </div>
</template>

<script>
    import Chart from 'chart.js';

    export default {
        props: ['title', 'data'],

        mounted(){
            this.chart= new Chart(this.$el.querySelector('canvas'), {
                type: 'line',
                fit: true,
                data: this.data,
                options: {
                    title: {
                        display: true,
                        text: this.title,
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                max: 100,
                                min: 0,
                                stepSize: 10,
                            },
                        }],
                    },
                },
            });
            // this.$watch('data', (newVal, oldVal) => {
            //     console.log('update', newVal);
            //     this.chart.update();
            // }, { deep: true });
            window.chart= this.chart;
        },

        beforeDestroy(){
            this.chart && this.chart.destroy();
        },
    };
</script>
