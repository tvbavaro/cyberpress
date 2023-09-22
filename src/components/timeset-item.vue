<template>
    <div class="timeset">
        <div class="timeset__wrapper">
            <div class="timeset__date">
                <span class="timeset__text timeset__diflex">{{ createdDate }}
                    <img class="timeset__divider" src="@assets/24x24/divider.svg" alt="">
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