<template>
  <div class="list row">
    <div class="col-md-8">
    </div>
    <div class="col-md-6">
      <h4>{{ $t('checkoutsList') }}</h4>
      <ul class="list-group">
        <li v-for="(checkout, index) in checkouts"
            :key="index"
            :class="{ active: index == currentIndex }"
            class="list-group-item"
            @click="setActiveCheckout(checkout, index)"
        >
          {{ checkout.title }}
        </li>
      </ul>
      <a v-if="currentUser.role === 'Administrator'"
         :href="'/checkouts/add'"
         class="btn btn-success"
      >
        {{ $t('add2') }}
      </a>
    </div>
    <div class="col-md-6">
      <div v-if="currentCheckout">
        <h4>{{ $t('checkout') }}</h4>
        <div>
          <label><strong>{{ $t('title2') }}</strong></label> {{ currentCheckout.title }}
        </div>
        <div>
          <label><strong>{{ $t('description2') }}</strong></label> {{ currentCheckout.description }}
        </div>
        <div>
          <label><strong>{{ $t('worker2') }}</strong></label>
          {{
            this.workers.find(x => x.id === currentCheckout.worker).name + " " + this.workers.find(x => x.id === currentCheckout.worker).surname
          }}
        </div>

        <a v-if="currentUser.role === 'Administrator'"
           :href="'/checkouts/' + currentCheckout.id"
           class="btn btn-secondary"
        >
          {{ $t('edit') }}
        </a>
      </div>
      <div v-else>
        <br/>
        <p>{{ $t('chooseTheCheckout') }}</p>
      </div>
    </div>
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
  name: "checkouts-list",
  data() {
    return {
      checkouts: [],
      workers: [],
      currentCheckout: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveCheckouts() {
      UserService.getAllCheckouts()
          .then(response => {
            this.checkouts = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      UserService.getAllWorkers()
          .then(response => {
            this.workers = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },

    setActiveCheckout(checkout, index) {
      this.currentCheckout = checkout;
      this.currentIndex = index;
    },
  },
  mounted() {
    this.retrieveCheckouts();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
