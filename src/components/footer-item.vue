<template>
    <!-- <div class="footer container">
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
    </div> -->
    <div class="footer container">
        <nav class="footer__menu footer__grid">
            <listItem class="footer__list-wrapper" :executableFunction="setCategory" title="News"
                :list="['Home', 'Software', 'Business', 'Governmen', 'Entertainment']" />

            <listItem class="footer__list-wrapper" :executableFunction="handleRedirect" title="About InfoDefence"
                actionType="redirect" :list="['Project', 'Team', 'Donate']" />

            <!-- <listItem class="footer__list-wrapper" title="Contacts"
                :list="['870571, Bryansk region, Chekhov, st. Glory, 55', '8(2191)741-34-34', 'inf0@infodefense.press']" /> -->
            <ul class="list__column footer__list-wrapper">
                <li class="list__item list__item-header">
                    <h3 class="list__header">Contacts</h3>
                </li>
                <div class="list__items-wrapper">
                    <li class="list__item footer__list-item">
                        <div class="list__svg-wrapper">
                            <svg class="footer__list-svg" width="24" height="25" viewBox="0 0 24 25" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.001 23.5C12.001 23.5 20 13.875 20 9.75C20 5.625 17.333 1.5 12.001 1.5C6.667 1.5 4 5.625 4 9.75C4 13.875 12.001 23.5 12.001 23.5"
                                    stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M12 12.5C10.343 12.5 9 11.156 9 9.5C9 7.844 10.343 6.5 12 6.5C13.656 6.5 15 7.844 15 9.5C15 11.156 13.656 12.5 12 12.5Z"
                                    stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <span class="list__text">870571, Bryansk region, Chekhov, st. Glory, 55</span>
                    </li>
                    <li class="list__item footer__list-item">
                        <div class="list__svg-wrapper">
                            <svg class="footer__list-svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M22.4088 16.992L19.4968 14.08C18.7098 13.292 17.4318 13.292 16.6448 14.08L14.2298 16.495C11.1998 15.228 8.77179 12.8 7.50479 9.77L9.91979 7.355C10.7068 6.567 10.7068 5.29 9.91979 4.503L7.00779 1.591C6.21979 0.803 4.94279 0.803 4.15479 1.591L2.77079 2.975C1.33179 4.413 0.725787 6.476 1.11579 8.472C2.53279 15.732 8.26679 21.467 15.5278 22.885C17.5238 23.274 19.5868 22.667 21.0248 21.229L22.4088 19.845C23.1968 19.057 23.1968 17.78 22.4088 16.992Z"
                                    stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <span class="list__text">8(2191)741-34-34</span>
                    </li>
                    <li class="list__item footer__list-item">
                        <div class="list__svg-wrapper">
                            <svg class="footer__list-svg" width="25" height="24" viewBox="0 0 25 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1.5 7.92285L10.824 12.2269C11.888 12.7169 13.112 12.7169 14.176 12.2269L23.5 7.92285"
                                    stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M21.5 21H3.5C2.396 21 1.5 20.104 1.5 19V5C1.5 3.896 2.396 3 3.5 3H21.5C22.604 3 23.5 3.896 23.5 5V19C23.5 20.104 22.604 21 21.5 21Z"
                                    stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <span class="list__text">inf0@infodefense.press</span>
                    </li>
                </div>
            </ul>
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
            this.$router.push({ name: pageName.toLowerCase() });
        },
        setCategory(categoryName) {
            if (categoryName === 'Home') {
                this.resetFiltersVuex();
                this.handleRedirect('main');
            } else {
                this.setCategoryVuex(categoryName);
                this.handleRedirect('main');
            }
        },
    }
}
</script>