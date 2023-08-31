<template>
    <div class="paper">
        <div class="paper__grid">
            <article class="article">
                <div class="article__wrapper">
                    <h1 class="heading">
                        {{ paper?.attributes?.title }}
                    </h1>
                    <span class="paper__time">{{ createdDate }}
                        <img class="paper__time-divider" src="@assets/24x24/divider.svg" alt="">
                        {{ time }} min read
                    </span>
                    <img :src="`http://${domain + imgUrl}`" alt="" class="img">
                    <p class="article__text">
                        {{ paper.attributes.text_article }}
                    </p>
                    <div class="article__footer">
                        <div class="article__foter-wrapper">
                            <div class="tags">
                                <ul class="tags__column" v-for="tag in tags" :key="tag">
                                    <li class="tags__item">{{ tag }}</li>
                                </ul>
                            </div>
                            <div class="share">
                                <span class="share__text">Share on:</span>
                                <div class="social">
                                    <img class="social__twitter-icon" src="@assets/24x24/twitter.svg" alt="">
                                    <img class="social__telegram-icon" src="@assets/24x24/telegram.svg" alt="">
                                    <img class="social__youtube-icon" src="@assets/24x24/youtube.svg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
            <aside class="recommended">
                <div class="recommended__wrapper">
                    <mainArticle v-for="(paper,index) in recommended" 
                        :id="paper.id"
                        :imgUrl="paper.attributes.image_sq.data.attributes.formats.aside.url"
                        :header="paper.attributes.title"
                        :text="paper.attributes.text_preview"
                        :time="paper.attributes.time_to_read"
                        :createdAt="paper.attributes.createdAt"
                        :key="paper.id" />
                </div>
            </aside>
            <div class="similar paper__similar">
                <mainArticle
                        :id="similar.id"
                        class="main-news__horizontal"
                        :imgUrl="similar?.attributes.image_wide.data.attributes.formats.old.url"
                        :header="similar.attributes.title"
                        :text="similar.attributes.text_preview"
                        :time="similar.attributes.time_to_read"
                        :createdAt="similar.attributes.createdAt"
                        :key="similar.id" />
            </div>
        </div>
    </div>
</template>

<script>
import { DEVDOMAIN } from '@constants';
import { getPaper, getRecommended, getSimilar } from '@api/api.js';
import mainArticle from '@components/main-article.vue';
export default {
    data() {
        return {
            paper: {},
            recommended: [],
            similar: {}
        }
    },
    props: {
        id: { //from routes
            type: String,
            required: true
        }
    },
    components: {
        mainArticle
    },
    async created() {
        this.paper = await getPaper(this.id).then(res => res.json()).then(fetchData => fetchData.data);
        this.recommended = await getRecommended().then(res => res.json()).then(fetchData => fetchData.data);
        this.similar = await getSimilar(this.id - 3).then(res => res.json()).then(fetchData => fetchData.data);
        console.log(this.similar)
    },
    computed: {
        domain() {
            return DEVDOMAIN;
        },
        imgUrl() {
            return this.paper.attributes.image_ultrawide.data.attributes.url;
        },
        tags() {
            return this.paper.attributes.tags.value.split(/\s/);
        }
    }
}
</script>