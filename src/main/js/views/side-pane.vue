<template>
    <div class="side-pane">
        <x-tree v-bind:items="items"></x-tree>
        <!--
        <ul class="tree-style">
            <li v-for="value, label in items">
                <span class="tree-item">{{label}}</span>
                <ul v-if="value">
                    <li v-for="value, label in value">
                        <span class="tree-item">{{label}}</span>
                        <ul v-if="value">
                            <li v-for="value, label in value">
                                {{label}}
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>

            <hr>

            <li class="tree-item-expandable">
                <span class="tree-item">Swarm</span>
                <ul>
                    <li class="tree-item-expandable">
                        <span class="tree-item">Managers</span>
                        <ul>
                            <li class="tree-item-expandable">
                                <span class="tree-item">Host1</span>
                                <ul>
                                    <li class="tree-item-terminal">
                                        <span class="tree-item">Container1</span>
                                    </li>
                                    <li class="tree-item-terminal">
                                        <span class="tree-item">Container2</span>
                                    </li>
                                </ul>
                            </li>
                            <li class="tree-item-expandable">
                                <span class="tree-item">Host2</span>
                                <ul>
                                    <li class="tree-item-terminal">
                                        <span class="tree-item">Container1</span>
                                    </li>
                                    <li class="tree-item-terminal">
                                        <span class="tree-item">Container2</span>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="tree-item-expanded">
                        <span class="tree-item">Workers</span>
                        <ul>
                            <li class="tree-item-expandable">
                                <span class="tree-item">Host1</span>
                                <ul>
                                    <li class="tree-item-terminal">
                                        <span class="tree-item">Container1</span>
                                    </li>
                                    <li class="tree-item-terminal">
                                        <span class="tree-item">Container2</span>
                                    </li>
                                </ul>
                            </li>
                            <li class="tree-item-expandable">
                                <span class="tree-item">Host2</span>
                                <ul>
                                    <li class="tree-item-expandable">
                                        <span class="tree-item">Container1</span>
                                    </li>
                                    <li class="tree-item-expandable">
                                        <span class="tree-item">Container2</span>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
        -->
    </div>
</template>

<script>
    import treeView from './tree.vue';

    export default {
        data(){
            return {
                items: {
                    'Swarm': {
                        expandable: true,
                        items: {
                            'Managers': {
                                expandable: true,
                                items: {
                                    'Host1': {
                                        expandable: true,
                                        items: {
                                            'Container1': {},
                                            'Container2': {},
                                        },
                                    },
                                    'Host2': {
                                        expandable: true,
                                        items: {
                                            'Container1': {},
                                            'Container2': {},
                                        },
                                    },
                                },
                            },
                            'Workers': {
                                expandable: true,
                                items: {
                                    'Host1': {
                                        expandable: true,
                                        items: {
                                            'Container1': {},
                                            'Container2': {},
                                        },
                                    },
                                    'Host2': {
                                        expandable: true,
                                        items: {
                                            'Container1': {},
                                            'Container2': {},
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                state: {
                },
            };
        },

        components: {
            'x-tree': treeView,
        },
    };
</script>
