<template>
    <header>
        <h1>{{appName}}</h1>
        <h2>{{appVersion}}</h2>

        <form>
            <div class="form-group">
                <label for="docker-host">Docker Host</label>
                <input id="docker-host" type="url" v-bind:value="dockerHost">
                <button v-on:click.prevent="onDockerHostChanged">Apply</button>
            </div>
        </form>
    </header>
</template>

<script>
    export default {
        data(){
            return {
                appName: 'Docker Explorer',
                appVersion: 'v0.0.0-alpha',
                dockerHost: 'localhost:2375',
            };
        },

        methods: {
            onDockerHostChanged(){
                window.hd= this;
                // console.log(this.get('dockerHost'));
            },
        },
    };
</script>
