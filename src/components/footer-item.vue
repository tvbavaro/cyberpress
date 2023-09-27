<template>
    <div class="footer container">
        <nav class="footer__menu footer__grid">
            <listItem class="footer__list-wrapper" 
                @redirect-to="handleRedirect"
                @set-category="setCategoryVuex" 
                @reset-filters="resetFiltersVuex" 
                actionType="category" title="News"
                :list="['Home', 'Software', 'Business', 'Governmen', 'Entertainment']" />

            <listItem class="footer__list-wrapper" 
                @redirect-to="handleRedirect" 
                title="About InfoDefence" actionType="redirect"
                :list="['Project', 'Team', 'Donate']" />
                
            <listItem class="footer__list-wrapper" title="Contacts"
                :list="['870571, Bryansk region, Chekhov, st. Glory, 55', '8(2191)741-34-34', 'inf0@infodefense.press']" />
            <ul class="footer__column">
                <li class="footer__item"><span class="footer__header">Stay Connected</span></li>
                <li class="footer__item">
                    <socialIcons class="footer__social" />
                </li>
            </ul>
            <div class="privacy privacy__wrapper">
                <span class="privacy__copyright">© InfoDefence. All rights reserved</span>
                <span class="privacy__copyright">Privacy | Terms of Use</span>
            </div>
        </nav>
    </div>
</template>
<script>
import listItem from '@components/list-item.vue';
import socialIcons from '@components/social-icons.vue';
import { mapMutations } from 'vuex';
export default {
    components: {
        listItem,
        socialIcons
    },
    methods: {
        ...mapMutations({
            setCategoryVuex: 'setCategory',
            resetFiltersVuex: 'resetFilters'
        }),
        handleRedirect(pageName) {
            this.$router.push({ name: pageName });
        },
    }
}
</script>