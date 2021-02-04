<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
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
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="newUser.image"
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                >
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="newUser.username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                >
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="newUser.bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="newUser.email"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                >
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="newUser.password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                >
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                @click.stop="onSubmit"
                :disabled="updateBtnDisabled"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { updateUser, fetchCurrentUser } from "@/api/user";
export default {
  middleware: "authenticated",
  name: "SettingsIndex",
  data() {
    return {
      updateBtnDisabled: false,
      newUser: {
        image: "",
        username: "",
        email: "",
        bio: "",
        password: "",
      },
      errors: {}, // 错误信息
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    this.getCurrentUser()
  },
  methods: {
    async onSubmit() {
      try {
        this.updateBtnDisabled = true;
        let { email, username, password, image, bio } = this.newUser;
        await updateUser({
          user: {
            email,
            username,
            password,
            image,
            bio,
          },
        });
        this.getCurrentUser();
      } catch (err) {
        this.errors = err.response.data.errors;
        console.dir(err);
      }
      this.updateBtnDisabled = false;
    },
    async getCurrentUser() {
      let { data } = await fetchCurrentUser();
      this.newUser = { ...this.newUser, ...data.user };
      this.errors = {}
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
