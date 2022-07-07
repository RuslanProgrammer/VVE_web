<template>
  <div class="submit-form">
    <div v-if="!submitted">

      <div class="form-group">
        <label for="start_time">{{ $t('time') }}</label>
        <input
            id="start_time"
            v-model="reservation.start_time"
            class="form-control"
            name="start_time"
            required
            type="datetime-local"
        />
      </div>

      <div class="form-group">
        <label for="shop">{{ $t('shop') }}</label>
        <select id="shop" v-model="reservation.shop"
                class="form-control">
          <option v-for="(shop, index) in this.shops"
                  :key="index"
                  v-bind:value="shop.id">
            {{ shop.name }}
          </option>
        </select>
      </div>

      <button class="btn btn-success" @click="saveReservation">{{ $t('submit') }}</button>
    </div>

    <div v-else>
      <h4>{{ $t('youSubmittedSuccessfully') }}</h4>
      <button class="btn btn-success" @click="newReservation">{{ $t('add') }}</button>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/user.service";
import moment from "moment-timezone";

export default {
  name: "add-reservation",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  data() {
    return {
      shops: [],
      reservation: {
        id: null,
        start_time: null,
        shop: this.$route.params.id,
        customer: this.$store.state.auth.user.id,
      },
      submitted: false
    };
  },
  methods: {
    saveReservation() {
      var data = {
        start_time: moment(this.reservation.start_time).tz('en').format(),
        shop: this.reservation.shop,
        customer: this.$store.state.auth.user.user.id,
      };
      console.log(data)
      UserService.createReservation(data)
          .then(response => {
            this.reservation.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
            alert("Check your data")
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

    newReservation() {
      this.submitted = false;
      this.reservation = {};
    },
  },
  mounted() {
    this.getShops();
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
