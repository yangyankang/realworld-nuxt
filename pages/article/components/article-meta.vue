<template>
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
      <span class="date">{{article.createdAt | date}}</span>
    </div>
    <button
      class="btn btn-sm btn-outline-secondary"
      :class="{
        active: article.favorited
      }"
    >
      <i class="ion-plus-round"></i>
      &nbsp;
      Follow {{article.author.username}} <span class="counter">(10)</span>
    </button>
    &nbsp;&nbsp;
    <button
      class="btn btn-sm btn-outline-primary"
      :class="{
        active: article.favorited
      }"
    >
      <i class="ion-heart"></i>
      &nbsp;
      Favorite Post <span class="counter">({{article.favoritesCount}})</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
