<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>One Day Tommy-Yang.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li
                class="nav-item"
                v-if="user"
              >
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{
                    active: tab === 'your_feed'
                  }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed'
                    }
                  }"
                >Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{
                    active: tab === 'global_feed'
                  }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed'
                    }
                  }"
                >Global Feed</nuxt-link>
              </li>
              <li
                class="nav-item"
                v-if="tag"
              >
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{
                    'active': tab === 'tag'
                  }"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag'
                    }
                  }"
                >#{{tag}}</nuxt-link>
              </li>
            </ul>
          </div>
          <article-item :articles="articles"></article-item>
          <!-- 分页列表 -->
          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                :class="{
                  active: item === page
                }"
                v-for="item in totalPage"
                :key="item"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name: 'home',
                    query: {
                      page: item,
                      tag: tag,
                      tab
                    }
                  }"
                >{{ item }}</nuxt-link>
              </li>
            </ul>
          </nav>
          <!-- /分页列表 -->
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <template v-for="item in tags">
                <nuxt-link
                  href=""
                  class="tag-pill tag-default"
                  :key="item"
                  :to="{
                    name: 'home',
                    query: {
                      tag: item,
                      tab: 'tag'
                    }
                  }"
                >{{item}}</nuxt-link>
              </template>

            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import {
  getAllArticles,
  getUserArticles,
} from "@/api/article";
import { getAllTags } from "@/api/tag";
import { mapState } from "vuex";
import ArticleItem from "../article/components/article-item";
export default {
  name: "HomeIndex",
  components: {
    ArticleItem,
  },
  data() {
    return {};
  },
  async asyncData({ query, store }) {
    const { tag, page: queryPage, tab = "global_feed" } = query;
    let page = Number.parseInt(queryPage || 1);
    let limit = 5;

    let loadArticles =
      store.state.user && tab === "your_feed"
        ? getUserArticles
        : getAllArticles;
    let [articleRes, tagRes] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag,
      }),
      getAllTags(),
    ]);
    const { articles, articlesCount } = articleRes.data;
    articles.forEach((article) => {
      article.favoriteDisabled = false;
    });
    const { tags } = tagRes.data;
    return {
      articles,
      articlesCount,
      page,
      limit,
      tags,
      tag,
      tab,
    };
  },
  watchQuery: ["page", "tag", "tab"],
  computed: {
    ...mapState(["user"]),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },

};
</script>

<style lang='scss' scoped>
</style>
