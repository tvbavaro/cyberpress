<template>
    <div class="timeset">
        <div class="timeset__wrapper">
            <div class="timeset__date">
                <span class="timeset__text timeset__diflex">{{ formattedDate }}
                    <baseIcon class="timeset__divider" :name="ICON_TIMESET_DIVIDER" />
                </span>
            </div>
            <div class="timeset__time">
                <span class="timeset__text">
                    {{ time }} min read
                </span>
            </div>
        </div>
    </div>
</template>
<script>
import { formatDate } from '../helpers/helpers';
import { ICON_TIMESET_DIVIDER } from '@icons';
import baseIcon from '@components/base-icon.vue';

export default {
    data() {
        return {
            ICON_TIMESET_DIVIDER
        }
    },
    components: {
        baseIcon
    },
    props: {
        createdAt: {
            type: String,
            requared: true
        },
        time: {
            type: Number,
            requared: true
        }
    },
    computed: {
        formattedDate() {
            return formatDate(this.createdAt);
        }
    }
}
</script>