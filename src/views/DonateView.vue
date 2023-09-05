<template>
    <div class="project">
        <div class="project__grid" v-if="dataIsReady">
            <projectArticle class="project__article-main" :title="articleData.title" :img="articleData.img.desktop"
                :slogan="articleData.slogan" :text="articleData.text" />
            <div class="similar paper__similar">
                <div class="similar__wrapper">
                    <span class="similar__heading">{{ articlePreviewData.heading_preview }}</span>
                    <previewArticle class="project__article-preview paper__horizontal"
                        :imgUrl="articlePreviewData.img.desktop_wide" :header="articlePreviewData.heading_preview"
                        :text="articlePreviewData.text_preview" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import projectArticle from '@components/project-article.vue';
import previewArticle from '@components/preview-article.vue';
import { getProject, getProjectPreview } from '@api/api';
export default {
    data() {
        return {
            articleData: null,
            articlePreviewData: null,
            dataIsReady: false,
            type: 'donate',
            type_preview: 'team'
        }
    },
    components: {
        projectArticle,
        previewArticle
    },
    async created() {
        this.articleData = await getProject(this.type);
        this.articlePreviewData = await getProjectPreview(this.type_preview);
        console.log(this.articlePreviewData)
        if (this.articleData && this.articlePreviewData) {
            this.dataIsReady = true;
        }
    },
}
</script>