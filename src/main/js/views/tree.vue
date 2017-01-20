<template>
    <ul class="tree-style">
        <template v-for="value, label in items">
            <li v-bind:class="{ 'tree-item-expandable': !value.expanded && value.expandable, 'tree-item-expanded': value.expanded, 'tree-item-terminal': !value.expandable }">
                <span class="tree-item" v-on:click.prevent="onClick(label, value)">{{label}}</span>
                <x-recursive v-bind:items="value.items" v-if="value.expanded"></x-recursive>
            </li>
        </template>
    </ul>
</template>

<script>
    const tree= {
        props: ['items'],

        data(){
            return {
            };
        },

        components: {},

        methods: {
            onClick(label, value){
                value.expanded= !value.expanded;
                this.$forceUpdate();

                console.log(label, value);
            },
        },
    };
    tree.components['x-recursive']= tree;
    export default tree;
</script>
