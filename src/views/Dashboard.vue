<template>
  <div id="dashboard">
    <section>
      <div class="col1">
        <div class="profile">
          <h5>{{ userProfile.name }}</h5>
          <h5>{{ userProfile.title }}</h5>
          <div class="create-post">
            <p>Create a post</p>
            <form @submit.prevent>
              <textarea v-model="post.content"></textarea>
              <button
                @click="createPost"
                :disabled="post.content === ''"
                class="button"
              >
                post
              </button>
            </form>
          </div>
        </div>
      </div>

      <div class="col2">
        <transition name="fade">
          <div
            v-if="hiddenPosts.length"
            @click="showNewPosts"
            class="hidden-posts"
          >
            <p>
              Click to show
              <span class="new-posts">{{ hiddenPosts.length }}</span> new
              <span v-if="hiddenPosts.length > 1">posts</span>
              <span v-else>post</span>
            </p>
          </div>
        </transition>
        <div v-if="posts.length">
          <div v-for="post in posts" :key="post.id" class="post">
            <h5>{{ post.userName }}</h5>
            <span>{{ post.createdOn | formatDate }}</span>
            <p>{{ post.content | trimLength }}</p>
            <ul>
              <li>
                <a>comments {{ post.comments }}</a>
              </li>
              <li>
                <a>likes {{ post.likes }}</a>
              </li>
              <li><a>view full post</a></li>
            </ul>
          </div>
        </div>
        <div v-else>
          <p class="no-results">There are currently no posts</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import * as fb from '@/firebaseConfig.js'
import moment from 'moment'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      post: {
        content: ''
      }
    }
  },
  methods: {
    createPost() {
      fb.postsCollection
        .add({
          createdOn: new Date(),
          content: this.post.content,
          userId: this.currentUser.uid,
          userName: this.userProfile.name,
          comments: 0,
          likes: 0
        })
        .then(() => {
          this.post.content = ''
        })
        .catch(err => {
          console.log(err)
        })
    },
    showNewPosts() {
      let updatedPostsArray = this.hiddenPosts.concat(this.posts)
      this.$store.commit('SET_HIDDEN_POSTS', null)
      this.$store.commit('SET_POSTS', updatedPostsArray)
    }
  },
  filters: {
    formatDate(postDate) {
      if (!postDate) {
        return '-'
      }
      let date = postDate.toDate()
      return moment(date).fromNow()
    },
    trimLength(postContent) {
      if (postContent.length < 200) {
        return postContent
      }
      return `${postContent.substring(0, 200)}`
    }
  },
  computed: {
    ...mapState(['userProfile', 'currentUser', 'posts', 'hiddenPosts'])
  }
}
</script>

<style></style>
