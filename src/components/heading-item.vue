<template>
    <div class="heading">
        <h1 class="heading__text">
            {{ title }}
        </h1>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String
        }
    }
}
</script>