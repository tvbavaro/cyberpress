<template>
    <div class="footer container">
        <nav class="footer__menu footer__grid">
            <listItem class="footer__list-wrapper" title="News" actionType="category"
                :list="['Home', 'Today', 'This week/Last week', 'Nov/Oct/Sept/Aug/Jun/Jul', '2021/2022']" />
            <listItem class="footer__list-wrapper" title="About InfoDefence" actionType="redirect"
                :list="['Project', 'Team', 'Donate']" />
            <listItem class="footer__list-wrapper" id="contacts" title="Contacts" actionType="redirect"
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
export default {
    components: {
        listItem,
        socialIcons
    }
}
</script>