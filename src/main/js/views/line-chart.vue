<template>
    <div class="metrics-graph">
        <canvas ref="canvas"></canvas>
    </div>
</template>

<script>
    import Chart from 'chart.js';
    import moment from 'moment';

    export default {
        props: ['title', 'data'],

        mounted(){
            this._chart= new Chart(this.$refs.canvas, {
                type: 'line',
                data: JSON.parse(JSON.stringify(this.$data)),
                options: {
                    title: {
                        display: true,
                        text: JSON.parse(JSON.stringify(this.title)),
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            type: 'time',
                            time: {
                                unit: 'minute',
                                parser(timestamp){
                                    return moment(timestamp, 'X');
                                },
                            },
                        }],
                        // yAxes: [{
                        //     ticks: {
                        //         max: 100,
                        //         min: 0,
                        //         stepSize: 10,
                        //     },
                        // }],
                    },
                },
            });
            this.$watch('data', (newVal, oldVal) => {
                // datasetsをいじらないと、vuejs側で無限ループが発生して、以降の処理が止まってしまう
                const datasets= JSON.parse(JSON.stringify(newVal)).datasets;

                // 最新時刻からの差分に変換
                this._chart.data.datasets= datasets;
                // this._chart.data.datasets= datasets.map(dataset => {
                //     const points= [];
                //     const basePoint= dataset.data.shift();
                //     if(!!basePoint)
                //     {
                //         points.push({
                //             x: 0,
                //             y: basePoint.y,
                //         });
                //         while(points.length < 100)
                //         {
                //             const point= dataset.data.shift();
                //             if(!point)
                //             {
                //                 break;
                //             }
                //             // point.x= basePoint.x - point.x;
                //             point.x= new Date();
                //             points.push(point);
                //         }
                //     }
                //     console.log(dataset.label, points);
                //     dataset.data= points;
                //     return dataset;
                // });
                this._chart.update();
            }, { deep: true });
        },

        beforeDestroy(){
            this._chart && this._chart.destroy();
        },
    };
</script>
