<template>
  <div v-if="currentCheckout" class="edit-form">
    <h4>{{ $t('checkout') }}</h4>
    <form>
      <div class="form-group">
        <label for="title">{{ $t('title') }}</label>
        <input id="title" v-model="currentCheckout.title" class="form-control"
               type="text"
        />
      </div>
      <div class="form-group">
        <label for="description">{{ $t('description') }}</label>
        <textarea id="description" v-model="currentCheckout.description" class="form-control"
                  type="text"
        />
      </div>

      <div class="form-group">
        <label for="description">{{ $t('worker') }}</label>
        <select id="worker" v-model="currentCheckout.worker"
                class="form-control">
          <option v-for="(worker, index) in this.freeWorkers"
                  :key="index"
                  v-bind:value="worker.id">
            {{ worker.name + ' ' + worker.surname }}
          </option>
        </select>
      </div>

      <!--      <div class="form-group">-->
      <!--        <label><strong>Status:</strong></label>-->
      <!--        {{ currentTutorial.published ? "Published" : "Pending" }}-->
      <!--      </div>-->
    </form>

    <!--    <button class="badge badge-primary mr-2"-->
    <!--            v-if="currentCheckout.published"-->
    <!--            @click="updatePublished(false)"-->
    <!--    >-->
    <!--      UnPublish-->
    <!--    </button>-->
    <!--    <button v-else class="badge badge-primary mr-2"-->
    <!--            @click="updatePublished(true)"-->
    <!--    >-->
    <!--      Publish-->
    <!--    </button>-->

    <button class="btn btn-danger"
            @click="deleteCheckout"
    >
      {{ $t('delete') }}
    </button>

    <button class="btn btn-success" type="submit"
            @click="updateCheckout"
    >
      {{ $t('update') }}
    </button>
    <p>{{ $t('message') }}</p>
  </div>

  <div v-else>
    <br/>
    <p>{{ $t('pleaseClickOnACheckout') }}</p>
  </div>
</template>

<script>

import UserService from "@/services/user.service";

export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  name: "checkout",
  data() {
    return {
      freeWorkers: [],
      currentCheckout: null,
      message: ''
    };
  },
  methods: {
    getCheckout(id) {
      UserService.getCheckout(id)
          .then(response => {
            this.currentCheckout = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    getFreeWorkersAndCurrent(id) {
      UserService.getFreeWorkersAndCurrent(id)
          .then(response => {
            this.freeWorkers = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },

    updateCheckout() {
      UserService.updateCheckout(this.currentCheckout.id, this.currentCheckout)
          .then(response => {
            console.log(response.data);
            this.message = 'The checkout was updated successfully!';
          })
          .catch(e => {
            console.log(e);
          });
    },

    deleteCheckout() {
      UserService.deleteCheckout(this.currentCheckout.id)
          .then(response => {
            console.log(response.data);
            this.$router.push({name: "checkouts"});
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
  mounted() {
    this.message = '';
    this.getCheckout(this.$route.params.id);
    this.getFreeWorkersAndCurrent(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
