import headerView from './views/header.vue';
import contentView from './views/content.vue';
import footerView from './views/footer.vue';
import Vue from 'vue';
import Rx from 'rx';
import moment from 'moment';

class Docker
{
    constructor(host)
    {
        this.host= host;
    }

    containers()
    {
        return this.request('GET', `${this.host}/containers/json`);
    }

    stats(id)
    {
        return this.request('GET', `${this.host}/containers/${id}/stats`, {
            stream: false,
        });
    }

    request(type, url, data)
    {
        return new Promise((resolve, reject) => {
            const xhr= new XMLHttpRequest();
            xhr.addEventListener('readystatechange', () => {
                switch(xhr.readyState)
                {
                    case 0: // UNSENT
                    case 1: // OPENED
                    case 2: // HEADERS_RECEIVED
                    case 3: // LOADING
                        return;
                    case 4: // DONE
                        if(xhr.status >= 200 && xhr.status < 300)
                        {
                            return resolve(JSON.parse(xhr.responseText));
                        }
                        else
                        {
                            return reject(JSON.parse(xhr.responseText));
                        }
                }
            });
            if(type === 'GET' && !!data)
            {
                const params= Object.keys(data).map((name) => {
                    const k= encodeURIComponent(name);
                    const v= encodeURIComponent(data[name]);
                    return `${k}=${v}`
                });
                url+= '?' + params.join('&');
            }
            xhr.open(type, url);
            switch(type.toUpperCase())
            {
                case 'POST':
                    xhr.send(JSON.stringify(data));
                    break;
                default:
                    xhr.send();
                    break;
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.App= {};
    App.view= new Vue({
        el: '#app',
        data: {
            hosts: [],
            containers: [],
        },
        components: {
            'x-header': headerView,
            'x-content': contentView,
            'x-footer': footerView,
        },
    });

    const datasets= [];
    App.view.containers.push({
        title: 'CPU Utilization',
        data: {
            datasets: datasets,
        },
    });
    // App.view.$watch('containers', (newVal, oldVal) => chart.update(), { deep: true });

    const createStatStream= () => {
        const docker= new Docker('http://localhost:8080');
        return Rx.Observable.interval(10000)
            .merge(Rx.Observable.just())
            // コンテナ一覧の取得
            .flatMap(() => Rx.Observable.fromPromise(docker.containers()))
            // コンテナ一覧を、コンテナごとにストリームに流す
            .flatMap(containers => Rx.Observable.fromArray(containers))
            // コンテナごとに、統計情報の取得
            .flatMap(container => Rx.Observable.fromPromise(docker.stats(container.Id)))
    };

    const createCpuStream= (statStream) => {
        let memo= {
            cpu: 0,
            system: 0,
        };
        const subject= new Rx.Subject();
        statStream.subscribe(stat => {
            // https://github.com/docker/docker/blob/master/api/client/container/stats_helpers.go#L203-L216
            const cpu= stat.cpu_stats.cpu_usage.total_usage;
            const system= stat.cpu_stats.system_cpu_usage;
            const cpuDelta= cpu - memo.cpu;
            const systemDelta= system - memo.system;

            if(cpuDelta > 0.0 && systemDelta > 0.0)
            {
                const cpuPercent= ((1.0 * cpuDelta) / systemDelta) * stat.cpu_stats.cpu_usage.percpu_usage.length * 100.0;
                subject.onNext({
                    id: stat.id,
                    // unix timestamp
                    timestamp: moment(stat.read).unix(),
                    cpuPercent: cpuPercent,
                });
            }

            memo.cpu= cpu;
            memo.system= system;
        });
        return subject.asObservable();
    };

    const statStream= createStatStream();
    const cpuStream= createCpuStream(statStream);
    cpuStream.subscribe(usage => {
        let dataset= datasets.find((dataset) => dataset.label === usage.id);
        if(!dataset)
        {
            dataset= {
                label: usage.id,
                data: [],
            };
            datasets.push(dataset);
        }

        dataset.data.push({
            x: usage.timestamp,
            y: usage.cpuPercent,
        });
    });
});
