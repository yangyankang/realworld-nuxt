<template>

  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">

            <img
              class="user-img"
              :src="profile.image"
            >
            <h4>{{profile.username}}</h4>
            <p>{{profile.bio}}</p>
            <button class="btn btn-sm action-btn  btn-outline-secondary">
              <i class="ion-plus-round"></i>
              &nbsp;
              Follow {{user.username}}
            </button>

            <nuxt-link
              class="btn btn-sm btn-outline-secondary action-btn"
              to="/settings"
              v-if="profile.username === user.username"
            >
              <i class="ion-gear-a"></i> Edit Profile Settings
            </nuxt-link>

          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'my'
                  }"
                  exact
                  :to="{
                    path: `/profile/${username}`,
                    query: {
                      tab: 'my'
                    }
                  }"
                >My Articles</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :class="{
                    active: tab === 'favorited'
                  }"
                  exact
                  :to="{
                   path: `/profile/${username}`,
                    query: {
                      tab: 'favorited'
                    }
                  }"
                >Favorited Articles</nuxt-link>
              </li>
            </ul>
          </div>

          <article-item :articles="articles"></article-item>

        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { getProfile } from "@/api/profile";
import { getAllArticles } from "@/api/article";
import ArticleItem from "../article/components/article-item";
export default {
  middleware: "authenticated",
  name: "ProfileIndex",
  components: {
    ArticleItem,
  },
  data() {
    return {};
  },
  async asyncData({ params, store, query }) {
    const { username } = params;
    const { tab = "my" } = query;
    const paramsData =
      tab === "my"
        ? {
            author: username,
            limit: 5,
            offset: 0,
          }
        : {
            favorited: username,
            limit: 5,
            offset: 0,
          };
    let [profileData, myArticleData] = await Promise.all([
      getProfile(username),
      getAllArticles(paramsData),
    ]);
    return {
      profile: profileData.data.profile,
      user: store.state.user,
      articles: myArticleData.data.articles,
      username,
      tab,
    };
  },
  watchQuery: ["tab"],
  mounted() {},
  methods: {},
};
</script>

<style lang='scss' scoped>
</style>
