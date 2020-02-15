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
    }
  },
  computed: {
    ...mapState(['userProfile', 'currentUser', 'posts'])
  }
}
</script>

<style></style>
