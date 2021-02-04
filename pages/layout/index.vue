<template>
  <div>
    <!-- 头部 -->
    <nav class="navbar navbar-light">
      <div class="container">
        <nuxt-link
          class="navbar-brand"
          to="/"
        >conduit</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <template v-if="user">
            <li class="nav-item">
              <!-- Add "active" class when you're on that page" -->
              <nuxt-link
                class="nav-link"
                to="/"
                exact
              >Home</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link
                class="nav-link"
                to="/editor"
              >
                <i class="ion-compose"></i>&nbsp;New Post
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link
                class="nav-link"
                to="/settings"
              >
                <i class="ion-gear-a"></i>&nbsp;Settings
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link
                class="nav-link"
                :to="`/profile/${user.username}`"
              >
                <img
                  class="user-pic"
                  :src="user.image"
                >
                {{ user.username }}
              </nuxt-link>
            </li>
            <li class="nav-item">
              <button
                @click="logout"
                class="logout-btn"
              >退出登录</button>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <nuxt-link
                class="nav-link"
                to="/login"
              >Sign in</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link
                class="nav-link"
                to="/register"
              >Sign up</nuxt-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>
    <!-- 子路由 -->
    <nuxt-child />
    <!-- 底部 -->
    <footer>
      <div class="container">
        <a
          href="/"
          class="logo-font"
        >conduit</a>
        <span class="attribution">
          An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from "vuex";
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    logout() {
      this.$store.commit("setUser", null);
      Cookie.remove("user");
      this.$router.push("/");
    },
  },
};
</script>

<style lang='scss' scoped>
.logout-btn {
  border: none;
  border: none;
  margin-top: 6px;
  border-radius: 5px;
  font-size: 16px;
  color: lightcoral;
}
</style>
