<template>
  <div class="list row">
    <div class="col-md-8">
    </div>
    <div class="col-md-6">
      <h4>{{ $t('reservationList') }}</h4>
      <ul class="list-group">
        <li v-for="(reservation, index) in reservations"
            :key="index"
            :class="{ active: index == currentIndex }"
            class="list-group-item"
            @click="setActiveReservation(reservation, index)"
        >
          {{ shops.find(x => x.id === reservation.shop).name + "\t(" + format_date(reservation.start_time) + ")" }}
        </li>
      </ul>
      <!--      <a v-if="currentUser.role === 'Customer'"-->
      <!--         class="btn btn-success"-->
      <!--         :href="'/reservations/add'"-->
      <!--      >-->
      <!--        {{ $t('add2') }}-->
      <!--      </a>-->
    </div>
    <div class="col-md-6">
      <div v-if="currentReservation">
        <h4>{{ $t('reservation') }}</h4>
        <div>
          <label><strong>{{ $t('shop2') }}</strong></label> {{ shops.find(x => x.id === currentReservation.shop).name }}
        </div>
        <div>
          <label><strong>{{ $t('time2') }}</strong></label> {{ format_full_date(currentReservation.start_time) }}
        </div>
        <div>
          <label><strong>{{ $t('status') }}</strong></label>
          {{ is_done(currentReservation.start_time) ? $t('coming') : $t('past') }}
        </div>

        <a v-if="currentUser.role === 'Administrator'"
           :href="'/checkouts/' + currentReservation.id"
           class="btn btn-secondary"
        >
          {{ $t('edit') }}
        </a>
      </div>
      <div v-else>
        <br/>
        <p>{{ $t('chooseTheReservation') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/user.service";
import moment from 'moment-timezone';

export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  name: "reservation-list",
  data() {
    return {
      shops: [],
      reservations: [],
      currentReservation: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    is_done(value) {
      if (value) {
        let timeZone
        if (localStorage.getItem('locale') === 'uk') {
          timeZone = 'Europe/Kiev'
        } else {
          timeZone = 'UTC'
        }
        return moment(String(value)).tz(timeZone) > moment().tz(timeZone)
      }
    },
    format_date(value) {
      if (value) {
        let timeZone
        if (localStorage.getItem('locale') === 'uk') {
          timeZone = 'Europe/Kiev'
        } else {
          timeZone = 'UTC'
        }
        return moment(String(value)).tz(timeZone).locale(localStorage.getItem('locale')).format('dddd')
      }
    },
    format_full_date(value) {
      if (value) {
        let timeZone
        if (localStorage.getItem('locale') === 'uk') {
          timeZone = 'Europe/Kiev'
        } else {
          timeZone = 'UTC'
        }
        return moment(String(value)).tz(timeZone).locale(localStorage.getItem('locale')).format('HH:mm\tDD-MM-YYYY')
      }
    },
    retrieveReservation() {
      UserService.getReservationByCustomer(this.$store.state.auth.user.user.id)
          .then(response => {
            this.reservations = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      UserService.getShops()
          .then(response => {
            this.shops = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },

    setActiveReservation(reservation, index) {
      this.currentReservation = reservation;
      this.currentIndex = index;
    },
  },
  mounted() {
    this.retrieveReservation();
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
