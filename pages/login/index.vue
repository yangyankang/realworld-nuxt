<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{isLogin ? 'Sign In' : 'Sign up' }}</h1>
          <p class="text-xs-center">
            <a href=""></a>
            <nuxt-link
              to="/register"
              v-if="isLogin"
            >Need an account?</nuxt-link>
            <nuxt-link
              to="/login"
              v-else
            >Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(meassges, filed) in errors">
              <li
                v-for="(item,index) in meassges "
                :key="index"
              >
                {{filed}} {{item}}
              </li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset
              class="form-group"
              v-if="!isLogin"
            >
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="user.username"
                placeholder="Your Name"
                required
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                v-model="user.email"
                placeholder="Email"
                required
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                v-model="user.password"
                placeholder="Password"
                required
                minlength="8"
              >
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{isLogin ? 'Sign In' : 'Sign up' }}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/user";
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  middleware: "notAuthenticated",
  name: "LoginIndx",
  data() {
    return {
      user: {
        email: "",
        password: "",
        username: "",
      },
      errors: {}, // 错误信息
    };
  },
  computed: {
    isLogin() {
      return this.$route.name === "login";
    },
  },
  methods: {
    async onSubmit() {
      try {
        let params = {
          user: this.user,
        };
        let { data } = this.isLogin
          ? await login(params)
          : await register(params);
        this.$store.commit("setUser", data.user);
        Cookie.set("user", data.user);
        this.$router.push("/");
      } catch (err) {
        this.errors = err.response.data.errors;
        console.dir(err);
      }
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
