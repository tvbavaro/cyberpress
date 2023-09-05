<template>
    <div class="text">
        <p class="text__content">
            {{ text }}
        </p>
    </div>
</template>
<script>
export default {
    props: {
        text: {
            type: String
        }
    }
}
</script>