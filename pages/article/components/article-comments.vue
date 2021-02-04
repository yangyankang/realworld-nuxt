<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          v-model="commentTxt"
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
        ></textarea>
      </div>
      <div class="card-footer">
        <img
          :src="user.image"
          class="comment-author-img"
        />
        <button
          class="btn btn-sm btn-primary"
          @click="postComment"
          :disabled="postBtnDisable"
        >
          Post Comment
        </button>
      </div>
    </form>

    <div
      class="card"
      v-for="comment in comments"
      :key="comment.id"
    >
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link
          :to="{
            name: 'profile',
            params: comment.author.username
          }"
          class="comment-author"
        >
          <img
            :src="comment.author.image"
            class="comment-author-img"
          />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          :to="{
            name: 'profile',
            params: comment.author.username
          }"
          class="comment-author"
        >
          {{comment.author.username}}
        </nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date }}</span>
      </div>
    </div>

  </div>
</template>

<script>
import { getArticleComments, addArticleComments } from "@/api/article";
import { mapState } from "vuex";
export default {
  name: "ArticleComments",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      comments: [],
      commentTxt: "",
      postBtnDisable: false,
    };
  },
  components: {},
  async mounted() {
    this.getComments();
  },
  methods: {
    async getComments() {
      const { data } = await getArticleComments(this.article.slug);
      this.comments = data.comments;
    },
    async postComment() {
      if (!this.commentTxt) {
        alert("请输入");
        return;
      }
      this.postBtnDisable = true;
      let { slug } = this.$route.params;

      await addArticleComments(slug, {
        comment: {
          body: this.commentTxt,
        },
      });
      this.getComments();
      this.postBtnDisable = false;
      this.commentTxt = ''
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
