<template>
  <div class="container">
    <header>
      <h3>
        <strong
            v-if="currentUser.role === 'Customer'"
        >{{ $t('ourMembers') }}</strong>
        <strong
            v-if="currentUser.role === 'Administrator'"
        >{{ $t('shop') }}</strong>
      </h3>
    </header>
    <ul class="list-group">
      <li v-for="(shop, index) in shops"
          :key="index"
          class="list-group-item"
      >
        <img :alt="$t('shopPhoto')" :src="shop.image" width="50">
        <p><a :href="shop.url"><strong>{{ shop.name }}</strong></a></p>
        <p>{{ $t('email', {email: shop.email}) }}</p>
        <p v-if="shop.commonWaitingTime">
          {{ $t('approximateTimeInCheckouts', {commonWaitingTime: shop.commonWaitingTime}) }}</p>
        <p v-if="currentUser.role === 'Customer'">
          {{ $t('timeToVisit', {getCurrentWaitingTime: getCurrentWaitingTime(shop.id)}) }}</p>
        <p v-if="currentUser.role === 'Administrator' && situations.length > 0">
          {{ $t('Situation', {getSituation: situations}) }}</p>
        <p v-if="currentUser.role === 'Administrator' && situations.length === 0">{{ $t('everythingOk') }}</p>

        <a v-if="currentUser.role === 'Customer'"
           :href="'/reservations/add/' + shop.id"
           class="btn btn-info"
        >
          {{ $t('getAReservation') }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
  name: 'Home',
  data() {
    return {
      shops: [],
      situations: '',
      waitingTime: [],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    getCurrentWaitingTime(id) {
      return this.waitingTime[id]
    },
  },
  mounted() {
    UserService.getShops().then(
        response => {
          this.shops = response.data;
          if (this.$store.state.auth.user.role === 'Administrator') {
            this.shops = [this.shops.find(x => x.id === this.$store.state.auth.user.user.shop)];
          }
        },
        error => {
          this.shops =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
        }
    );
    UserService.getShopsTime().then(
        response => {
          this.waitingTime = response.data;
        },
        error => {
          console.log(
              (error.response && error.response.data) ||
              error.message ||
              error.toString());
        }
    );

    UserService.getAllCheckouts().then(
        response => {
          let checkouts = response.data.filter(x => x.shop === this.$store.state.auth.user.user.shop);
          UserService.getSituation(this.$store.state.auth.user.user.shop).then(
              response => {
                let obj = response.data
                for (let key of Object.keys(obj)) {
                  this.situations += `Problems in ${checkouts.find(x => x.id == key).title} with ${obj[key]} people\n`

                }
              },
              error => {
                console.log(
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString());
              }
          );
        },
        error => {
          console.log(
              (error.response && error.response.data) ||
              error.message ||
              error.toString());
        }
    );
  }
};
</script>
