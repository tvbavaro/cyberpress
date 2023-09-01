<template>
    <div class="timeset">
        <span class="timeset__text timeset__diflex">{{ createdDate }}
            <img class="timeset__divider" src="@assets/24x24/divider.svg" alt="">
            {{ time }} min read
        </span>
    </div>
</template>
<script>
export default {
    props: {
        createdDate: {
            type: String,
            requared: true
        },
        time: {
            type: Number,
            requared: true
        }
    }
}
</script>