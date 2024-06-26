<template>
    <div class="drop-down-filter">
        <div class="drop-down-filter__wrapper">
            <h3 class="drop-down-filter__heading">By all tags</h3>
            <div class="drop-down-filter__select" :class="{ 'drop-down-filter__select_active': isOpen }"
                @click="toggleMenu">
                <div class="drop-down-filter__tags-wrapper" ref="tagContainer">
                    <span class="drop-down-filter__selected" v-show="!checkedListLength">Choose the tag</span>
                    <span class="drop-down-filter__selected drop-down-filter__selected_active" v-show="checkedListLength"
                        v-for="tag in checkedList.slice(0, maxValue)" :key="tag">#{{ tag }}</span>
                </div>
                <div class="drop-down-filter__nav-wrapper">
                    <span class="drop-down-filter__counter" v-show="(checkedListLength - maxValue) > 0">+{{
                        checkedListLength - maxValue }}</span>
                    <div class="drop-down-filter__arrow" :class="{ 'drop-down-filter__arrow_active': isOpen }"></div>
                </div>

            </div>
            <ul class="drop-down-filter__list" :class="{ 'drop-down-filter__list_active': isOpen }">
                <li class="drop-down-filter__item" v-for="(item, index) in tags" :key="item + index">
                    <input class="drop-down-filter__checkbox" @click.stop
                        @change="executableFunction($event.target.checked, item)" type="checkbox" :id="`${item}dd`"
                        :name="`${item}dd`" :checked="isChecked(item)" />
                    <label :for="`${item}dd`">
                        <span class="drop-down-filter__text">{{ item }}</span>
                    </label>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { isArray, isFunction } from '@helpers/validators';
export default {
    data() {
        return {
            isOpen: false,
            maxValue: 3
        }
    },
    props: {
        list: {
            type: Array,
            default: [],
            validator: isArray
        },
        checkedList: {
            type: Array,
            default: [],
            validator: isArray
        },
        executableFunction: {
            type: Function,
            validator: isFunction
        }
    },
    computed: {
        checkedTags() {
            if (this.checkedList.length) {
                return `#${this.checkedList[0]}`
            } else return 'Choose the tag';
        },
        checkedListLength() {
            return this.checkedList.length;
        },
        tags() {
            //default sort to avoid changing the sorting in the parent component
            return [...this.list].sort();
        }
    },
    methods: {
        toggleMenu() {
            this.isOpen = !this.isOpen;
        },
        isChecked(item) {
            if (this.checkedList.includes(item.replace(/\#/, ''))) {
                return true
            } else return false;
        }
    },
    watch: {
        checkedList: {
            async handler() {
                this.maxValue = 3;
                await this.$nextTick();

                const tagsContainerWidth = this.$refs.tagContainer.getBoundingClientRect().width;
                const tags = Array.from(this.$refs.tagContainer.children).slice(1);
                let tagsWidth = 0;
                let counter = 0;

                for (const tag of tags) {
                    tagsWidth += tag.getBoundingClientRect().width;
                    if (tagsWidth > tagsContainerWidth) {
                        this.maxValue = counter;
                        break;
                    } else {
                        counter++;
                    }
                }
            },
            deep: true
        },
    }
}
</script>