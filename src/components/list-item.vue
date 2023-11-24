<template>
    <ul class="list__column" v-if="isDropDown">
        <li class="list__item list__item-header" @click.stop="isOpen = !isOpen">
            <h3 class="list__header">{{ title }}</h3>
            <svg class="list__arrow" :class="{ 'list__arrow_close': !isOpen }" width="24" height="24" viewBox="0 0 24 24"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 15L12 9L18 15" stroke="#2A2A34" stroke-width="2" stroke-linecap="round" />
            </svg>
        </li>
        <div class="list__items-wrapper" v-show="isOpen">
            <li class="list__item" v-for="item in list" :key="item">
                <template v-if="hasCheckbox">
                    <input class="list__checkbox" @click.stop @change="executableFunction($event.target.checked, item)"
                    @keydown.enter="$event.target.checked = !$event.target.checked; executableFunction($event.target.checked, item)"
                        type="checkbox" :id="item" :name="item" :ref="item" :checked="isChecked(item)"/>
                    <label :for="item"><span class="list__text">{{ item }}</span></label>
                </template>
                <template v-else>
                    <span class="list__text" @click="executableFunction(item)" @keydown.enter="executableFunction(item)" tabindex="0">{{ item }}</span>
                </template>
            </li>
        </div>
    </ul>
    <ul class="list__column" v-else>
        <li class="list__item list__item-header">
            <h3 class="list__header">{{ title }}</h3>
        </li>
        <div class="list__items-wrapper">
            <li class="list__item" v-for="item in list" :key="item">
                <template v-if="hasCheckbox">
                    <input class="list__checkbox" @click.stop @change="executableFunction($event.target.checked, item)"
                    @keydown.enter="$event.target.checked = !$event.target.checked; executableFunction($event.target.checked, item)"
                        type="checkbox" :id="item" :name="item" :ref="item" :checked="isChecked(item)"/>
                    <label class="list__label" :for="item"><span class="list__text list__text_checkbox">{{ item }}</span></label>
                </template>
                <template v-else>
                    <span class="list__text"
                        @click="executableFunction(item)" @keydown.enter="executableFunction(item)" tabindex="0">{{ item }}</span>
                </template>
            </li>
        </div>
    </ul>
</template>
<script>
export default {
    data() {
        return {
            isOpen: false
        }
    },
    props: {
        title: {
            type: String
        },
        list: {
            type: Array
        },
        checkedList: {
            type: Array,
            default: []
        },
        isDropDown: {
            type: Boolean
        },
        hasCheckbox: {
            type: Boolean,
            default: false
        },
        executableFunction: {
            type: Function
        }
    },
    created() {
        if (this.title === 'News' || this.title === 'By categories') {
            this.isOpen = true;
        }
    },
    methods: {
        isChecked(item) {
            if (this.checkedList.includes(item.replace(/\#/, ''))) {
                return true
            } else return false;
        }
    }
}
</script>