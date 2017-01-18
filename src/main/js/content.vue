<template>
    <div class="content">
        <div class="side-pane">
            <ul class="tree-style">
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
        </div>

        <div class="main-pane">
            <div>
                <h3>Host Metrics</h3>

                ...ホストの各種メトリクス...
            </div>
            <div>
                <h3>Container Metrics</h3>

                ...コンテナの各種メトリクス...
            </div>
        </div>
    </div>
</template>

<script>
    export default {
    };
</script>
