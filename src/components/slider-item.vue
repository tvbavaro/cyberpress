<template >
    <div class="slider" v-if="papers.length">
        <div class="slider__divider"></div>
        <div class="slider__wrapper">
            <div class="slider__list" :class="{ 'slider__list_old': !showImg }" :ref="refName"
                @scroll="setSliderArrowsStyle(refName)">
                <previewArticle v-for="(paper, index) in papers" :id="paper.id"
                    :imgUrl="showImg ? paper.img[this.deviceTypeVuex].category_small.url : null"
                    :imgSize="imgSize(paper.img, index)" :header="paper.title" :text="paper.text_preview"
                    :time="paper.time_to_read" :createdAt="paper.createdAt" :key="paper.id" />
            </div>
        </div>
        <div class="slider__nav-wrapper">
            <button class="slider__arrow" :class="{ 'slider__arrow_unactive': isStartPosition }"
                @click="scrollSlideTo(refName, -1)"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M7.53752 17.2125C7.60781 17.1428 7.66361 17.0598 7.70169 16.9684C7.73976 16.877 7.75937 16.779 7.75937 16.68C7.75937 16.581 7.73976 16.483 7.70169 16.3916C7.66361 16.3002 7.60781 16.2172 7.53752 16.1475L4.08752 12.6975L21.75 12.6975C21.9489 12.6975 22.1397 12.6185 22.2803 12.4778C22.421 12.3372 22.5 12.1464 22.5 11.9475C22.5 11.7486 22.421 11.5578 22.2803 11.4172C22.1397 11.2765 21.9489 11.1975 21.75 11.1975L4.11002 11.1975L7.53752 7.77001C7.66039 7.62653 7.72459 7.44198 7.7173 7.25322C7.71001 7.06446 7.63176 6.88541 7.49819 6.75184C7.36462 6.61827 7.18556 6.54002 6.99681 6.53273C6.80805 6.52543 6.62349 6.58964 6.48002 6.71251L1.70252 11.4825C1.57657 11.609 1.50586 11.7803 1.50586 11.9588C1.50586 12.1373 1.57657 12.3085 1.70252 12.435L6.48002 17.2125C6.62054 17.3522 6.81063 17.4306 7.00877 17.4306C7.20691 17.4306 7.397 17.3522 7.53752 17.2125Z"
                        fill="#2A2A34" />
                </svg>
            </button>
            <button class="slider__arrow" :class="{ 'slider__arrow_unactive': isEndPosition || notEnoughtDataForSlider }"
                @click="scrollSlideTo(refName, 1)"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M16.4625 6.78749C16.3922 6.85721 16.3364 6.94016 16.2983 7.03156C16.2602 7.12295 16.2406 7.22098 16.2406 7.31999C16.2406 7.419 16.2602 7.51703 16.2983 7.60842C16.3364 7.69982 16.3922 7.78277 16.4625 7.85249L19.9125 11.3025L2.24998 11.3025C2.05107 11.3025 1.8603 11.3815 1.71965 11.5222C1.579 11.6628 1.49998 11.8536 1.49998 12.0525C1.49998 12.2514 1.579 12.4422 1.71965 12.5828C1.8603 12.7235 2.05107 12.8025 2.24998 12.8025L19.89 12.8025L16.4625 16.23C16.3396 16.3735 16.2754 16.558 16.2827 16.7468C16.29 16.9355 16.3682 17.1146 16.5018 17.2482C16.6354 17.3817 16.8144 17.46 17.0032 17.4673C17.1919 17.4746 17.3765 17.4104 17.52 17.2875L22.2975 12.5175C22.4234 12.391 22.4941 12.2197 22.4941 12.0412C22.4941 11.8627 22.4234 11.6915 22.2975 11.565L17.52 6.78749C17.3795 6.6478 17.1894 6.5694 16.9912 6.5694C16.7931 6.5694 16.603 6.6478 16.4625 6.78749Z"
                        fill="#2A2A34" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
import previewArticle from '@components/preview-article.vue';
import { mapState } from 'vuex';

export default {
    data() {
        return {
            isStartPosition: true,
            isEndPosition: false,
        }
    },
    props: {
        papers: {
            type: Array
        },
        refName: {
            type: String
        },
        showImg: {
            type: Boolean
        }
    },
    components: {
        previewArticle
    },
    computed: {
        ...mapState({
            deviceTypeVuex: 'deviceType'
        }),
        notEnoughtDataForSlider() {
            if (this.papers.length < 3) {
                return true;
            } else false;
        }
    },
    methods: {
        scrollSlideTo(currenRef, type) {
            const articleWidth = Number(this.$refs[currenRef].children[0].getBoundingClientRect().width.toFixed());
            this.$refs[currenRef].scrollBy({
                top: 0,
                left: articleWidth * type,
                behavior: 'smooth'
            });
        },
        imgSize(imgs, index) {
            return {
                width: imgs[this.deviceTypeVuex].category_small.width,
                height: imgs[this.deviceTypeVuex].category_small.height
            }
        },
        setSliderArrowsStyle(currenRef) {
            const refElement = this.$refs[currenRef],
                scrollArea = refElement.scrollWidth,
                scrolledAlready = Number(refElement.scrollLeft.toFixed()),
                zoneVisible = refElement.offsetWidth;

            if (scrolledAlready === 0) {
                this.isStartPosition = true;
            } else if (scrolledAlready > 0 && this.isStartPosition) {
                this.isStartPosition = false;
            }

            if (zoneVisible + scrolledAlready === scrollArea) {
                this.isEndPosition = true;
            } else if (zoneVisible + scrolledAlready < scrollArea && this.isEndPosition) {
                this.isEndPosition = false;
            }
        }
    },
}
</script>