<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="title"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                >
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="description"
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                >
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="tag"
                  @keyup.enter="onEnter"
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                >
                <div class="tag-list"><span
                    class="tag-default tag-pill"
                    v-for="(tag, index) in tagList"
                    :key="index"
                  >
                    <i
                      class="ion-close-round"
                      @click="removeTag(tag, index)"
                    ></i>
                    {{tag}}
                  </span></div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                :disabled="pulishBtnDiable"
                @click.stop="onSubmit"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { createArticle } from "@/api/article";
export default {
  middleware: "authenticated",
  name: "EditorIndex",
  data() {
    return {
      title: "",
      description: "",
      body: "",
      tagList: [],
      tag: "",
      pulishBtnDiable: false,
    };
  },
  methods: {
    initData() {
      this.title = ""
      this.description = ""
      this.body = ""
      this.tagList = []
      this.tag = ""
      this.pulishBtnDiable = false
    },
    async onSubmit() {
      this.pulishBtnDiable = true;
      console.log('onSubmit')
      await createArticle({
        article: {
          title: this.title,
          description: this.description,
          body: this.body,
          tagList: this.tagList,
        },
      });

      this.pulishBtnDiable = false
      this.initData()
    },
    onEnter() {
      if (!this.tag) return;
      if (this.tagList.includes(this.tag)) return;
      this.tagList.push(this.tag);
      this.tag = "";
    },
    removeTag(tag, index) {
      this.tagList.splice(index, 1);
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
