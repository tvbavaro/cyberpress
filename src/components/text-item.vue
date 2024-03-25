<template>
    <div class="text">
        <p class="text__content">
            {{ text }}
        </p>
    </div>
</template>
<script>
import { isString } from '@helpers/validators';

export default {
    props: {
        text: {
            type: String,
            validator: isString
        }
    }
}
</script>