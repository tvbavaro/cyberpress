<template>
    <div class="footer container">
        <nav class="footer__menu footer__grid">
            <listItem class="footer__list-wrapper" :executableFunction="setCategory" title="News"
                :list="['Home', 'Software', 'Business', 'Governmen', 'Entertainment']" />

            <listItem class="footer__list-wrapper" :executableFunction="handleRedirect" title="About CyberPress"
                :list="['Project', 'Team', 'Donate']" />

            <ul class="list__column footer__list-wrapper">
                <li class="list__item list__item-header">
                    <h3 class="list__header">Contacts</h3>
                </li>
                <div class="list__items-wrapper">
                    <li class="list__item footer__list-item">
                        <div class="list__svg-wrapper">
                            <baseIcon class="footer__list-svg" :name="ICON_LOCATION"/>
                        </div>
                        <span class="list__text list__text_not-hovered">870571, Bryansk region, Chekhov, st. Glory, 55</span>
                    </li>
                    <li class="list__item footer__list-item">
                        <div class="list__svg-wrapper">
                            <baseIcon class="footer__list-svg" :name="ICON_PHONE" />
                        </div>
                        <span class="list__text list__text_not-hovered">8(2191)741-34-34</span>
                    </li>
                    <li class="list__item footer__list-item">
                        <div class="list__svg-wrapper">
                            <baseIcon class="footer__list-svg" :name="ICON_MESSAGE" />
                        </div>
                        <span class="list__text list__text_not-hovered">info@cyber.press</span>
                    </li>
                </div>
            </ul>
            <ul class="footer__column footer__list-wrapper">
                <li class="footer__item"><span class="footer__header">Stay Connected</span></li>
                <li class="footer__item">
                    <socialIcons class="footer__social" />
                </li>
            </ul>
            <div class="privacy privacy__wrapper">
                <span class="privacy__copyright">© CyberPress. All rights reserved</span>
                <span class="privacy__copyright">Privacy | Terms of Use</span>
            </div>
        </nav>
    </div>
</template>
<script>
import { mapMutations } from 'vuex';
import { ICON_LOCATION, ICON_PHONE, ICON_MESSAGE } from '@icons';
import listItem from '@components/list-item.vue';
import socialIcons from '@components/social-icons.vue';
import baseIcon from '@components/base-icon.vue';

export default {
    data() {
        return{
            ICON_LOCATION,
            ICON_PHONE,
            ICON_MESSAGE
        }
    },
    components: {
        listItem,
        socialIcons,
        baseIcon
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