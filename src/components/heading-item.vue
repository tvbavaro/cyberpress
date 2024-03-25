<template>
    <div class="heading">
        <h1 class="heading__text">
            {{ title }}
        </h1>
    </div>
</template>
<script>
import { isString } from '@helpers/validators';

export default {
    props: {
        title: {
            type: String,
            validator: isString
        }
    }
}
</script>