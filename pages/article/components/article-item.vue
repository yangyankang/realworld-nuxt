<template>
  <div>
    <div
      class="article-preview"
      v-for="article in articles"
      :key="article.slug"
    >
      <div class="article-meta">
        <nuxt-link :to="{
              name: 'profile',
              params: {
                username: article.author.username
              }
            }"><img :src="article.author.image" /></nuxt-link>
        <div class="info">
          <nuxt-link
            :to="{
              name: 'profile',
              params: {
                username: article.author.username
              }
            }"
            class="author"
          >{{article.author.username}}</nuxt-link>
          <span class="date">{{ article.createdAt | date}}</span>
        </div>
        <button
          class="btn btn-outline-primary btn-sm pull-xs-right"
          :class="{active: article.favorited}"
          :disabled="article.favoriteDisabled"
          @click="onFavorite(article)"
        >
          <i class="ion-heart"></i> {{article.favoritesCount}}
        </button>
      </div>
      <nuxt-link
        :to="{
                name: 'article',
                params: {
                  slug: article.slug
                }
              }"
        class="preview-link"
      >
        <h1>{{ article.title }}</h1>
        <p>{{ article.body }}</p>
        <span>Read more...</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import {
  favoriteArticle,
  unfavoriteArticle,
} from "@/api/article";
export default {
  name: "ArticleItem",
  props: {
    articles: {
      type: Array,
      required: true,
      default: [],
    },
  },
  data() {
    return {};
  },
  methods: {
    async onFavorite(article) {
      article.favoriteDisabled = true;
      let { slug } = article;
      if (article.favorited) {
        await unfavoriteArticle(slug);
        article.favorited = false;
        article.favoritesCount--;
      } else {
        await favoriteArticle(slug);
        article.favorited = true;
        article.favoritesCount++;
      }
      article.favoriteDisabled = false;
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
