<template>
    <div class="project">
        <div class="project__grid" v-if="dataIsReady">
            <projectArticle class="project__article-main" :title="articleData.title" :img="articleData.img.desktop"
                :imgSize="articleData.img.desktop_dementions" :slogan="articleData.slogan" :text="articleData.text" />
            <div class="similar project__similar">
                <div class="similar__wrapper">
                    <span class="similar__heading">{{ articlePreviewData.heading_preview }}</span>
                    <previewArticle class="project__article-preview project__horizontal"
                        :imgUrl="articlePreviewData.img.desktop_wide" :header="articlePreviewData.heading_preview"
                        :text="articlePreviewData.text_preview" :page="typePreview" />
                </div>
            </div>
        </div>
        <loadItem v-else />
    </div>
</template>
<script>
import projectArticle from '@components/project-article.vue';
import previewArticle from '@components/preview-article.vue';
import loadItem from '@components/load-item.vue';
import { getProject, getProjectPreview } from '@api/api';
export default {
    data() {
        return {
            articleData: null,
            articlePreviewData: null,
            dataIsReady: false,
        }
    },
    props: {
        typePage: {
            type: String,
            requared: true
        },
        typePreview: {
            type: String
        }
    },
    components: {
        projectArticle,
        previewArticle,
        loadItem
    },
    async created() {
        this.articleData = await getProject(this.typePage);
        this.articlePreviewData = await getProjectPreview(this.typePreview);
        if (this.articleData && this.articlePreviewData) {
            this.dataIsReady = true;
        }
    },
}
</script>