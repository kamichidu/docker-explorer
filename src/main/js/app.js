import headerView from './header.vue';
import contentView from './content.vue';
import footerView from './footer.vue';
import Vue from 'vue';

console.log(contentView);

document.addEventListener('DOMContentLoaded', () => {
    new Vue({
        el: '#app',
        components: {
            'x-header': headerView,
            'x-content': contentView,
            'x-footer': footerView,
        },
    });
});
