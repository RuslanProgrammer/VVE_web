<template>
  <div v-if="currentReservation" class="edit-form">
    <h4>{{ $t('checkout') }}</h4>
    <form>
      <div class="form-group">
        <label for="title">{{ $t('title') }}</label>
        <input id="title" v-model="currentReservation.title" class="form-control"
               type="text"
        />
      </div>
      <div class="form-group">
        <label for="description">{{ $t('description') }}</label>
        <textarea id="description" v-model="currentReservation.description" class="form-control"
                  type="text"
        />
      </div>

      <div class="form-group">
        <label for="description">{{ $t('worker') }}</label>
        <select id="worker" v-model="currentReservation.shop"
                class="form-control">
          <option v-for="(shop, index) in this.shops"
                  :key="index"
                  v-bind:value="shop.id">
            {{ shop.name }}
          </option>
        </select>
      </div>
    </form>

    <button class="btn btn-danger"
            @click="deleteReservation"
    >
      {{ $t('delete') }}
    </button>

    <button class="btn btn-success" type="submit"
            @click="updateReservation"
    >
      {{ $t('update') }}
    </button>
    <p>{{ $t('message') }}</p>
  </div>

  <div v-else>
    <br/>
    <p>{{ $t('pleaseClickOnAReservation') }}</p>
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
  name: "reservation",
  data() {
    return {
      shops: [],
      currentReservation: null,
      message: ''
    };
  },
  methods: {
    getReservation(id) {
      UserService.getReservation(id)
          .then(response => {
            this.currentReservation = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    getShops() {
      UserService.getShops()
          .then(response => {
            this.shops = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },

    updateReservation() {
      UserService.updateReservation(this.currentReservation.id, this.currentReservation)
          .then(response => {
            console.log(response.data);
            this.message = 'The reservation was updated successfully!';
          })
          .catch(e => {
            console.log(e);
          });
    },

    deleteReservation() {
      UserService.deleteReservation(this.currentReservation.id)
          .then(response => {
            console.log(response.data);
            this.$router.push({name: "reservations"});
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
  mounted() {
    this.message = '';
    this.getReservation(this.$route.params.id);
    this.getShops();
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
