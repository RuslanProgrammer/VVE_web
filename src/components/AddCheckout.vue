<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">{{ $t('title') }}</label>
        <input
            id="title"
            v-model="checkout.title"
            class="form-control"
            name="title"
            required
            type="text"
        />
      </div>

      <div class="form-group">
        <label for="description">{{ $t('description') }}</label>
        <input
            id="description"
            v-model="checkout.description"
            class="form-control"
            name="description"
            required
        />
      </div>

      <div class="form-group">
        <label for="description">{{ $t('worker') }}</label>
        <select id="worker" v-model="checkout.worker"
                class="form-control">
          <option v-for="(worker, index) in this.freeWorkers"
                  :key="index"
                  v-bind:value="worker.id">
            {{ worker.name + ' ' + worker.surname }}
          </option>
        </select>
      </div>

      <button class="btn btn-success" @click="saveCheckout">{{ $t('submit') }}</button>
    </div>

    <div v-else>
      <h4>{{ $t('youSubmittedSuccessfully') }}</h4>
      <button class="btn btn-success" @click="newCheckout">{{ $t('add') }}</button>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/user.service";

export default {
  name: "add-checkout",
  data() {
    return {
      freeWorkers: [],
      checkout: {
        id: null,
        title: "",
        shop: -1,
        worker: -1,
        description: "",
      },
      submitted: false
    };
  },
  methods: {
    saveCheckout() {
      var data = {
        title: this.checkout.title,
        shop: this.$store.state.auth.user.user.id,
        worker: this.checkout.worker,
        description: this.checkout.description,
      };

      UserService.createCheckout(data)
          .then(response => {
            this.checkout.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
            alert("Check your data")
          });
    },
    getFreeWorkersByShopId() {
      UserService.getFreeWorkersByShopId(this.$store.state.auth.user.user.id)
          .then(response => {
            this.freeWorkers = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },

    newCheckout() {
      this.submitted = false;
      this.checkout = {};
    },
  },
  mounted() {
    this.getFreeWorkersByShopId();
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
