<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link class="navbar-brand" to="/">{{ $t('vve') }}</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/home">
            {{ $t('home') }}
          </router-link>
        </li>
      </div>

      <div v-if="showAdminBoard" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/backups">{{ $t('backups') }}</router-link>
        </li>
      </div>

      <!--      <div v-if="showWorkerBoard" class="navbar-nav ml-auto">-->
      <!--        <li class="nav-item">-->
      <!--          <router-link to="/admin" class="nav-link">{{ $t('workerBoard') }}</router-link>-->
      <!--        </li>-->
      <!--      </div>-->

      <!--      <div v-if="showCustomerBoard" class="navbar-nav ml-auto">-->
      <!--        <li class="nav-item">-->
      <!--          <router-link to="/admin" class="nav-link">{{ $t('customerBoard') }}</router-link>-->
      <!--        </li>-->
      <!--      </div>-->

      <div v-if="currentUser" class="navbar-nav ml-auto">

        <li v-if="showAdminBoard" class="nav-item">
          <router-link class="nav-link" to="/checkouts">{{ $t('checkouts') }}</router-link>
        </li>

        <li v-if="showCustomerBoard" class="nav-item">
          <router-link class="nav-link" to="/reservations">{{ $t('reservation') }}</router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/profile">
            {{ currentUser.user.email }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            {{ $t('logOut') }}
          </a>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/registerAdministrator">
            {{ $t('signUpAdministrator') }}
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/loginAdministrator">
            {{ $t('loginAdministrator') }}
          </router-link>
        </li>

        <!--        <li class="nav-item">-->
        <!--          <router-link to="/registerWorker" class="nav-link">-->
        <!--            Sign Up (Worker)-->
        <!--          </router-link>-->
        <!--        </li>-->
        <!--        <li class="nav-item">-->
        <!--          <router-link to="/loginWorker" class="nav-link">-->
        <!--            Login (Worker)-->
        <!--          </router-link>-->
        <!--        </li>-->

        <li class="nav-item">
          <router-link class="nav-link" to="/registerCustomer">
            {{ $t('signUpCustomer') }}
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/loginCustomer">
            {{ $t('loginCustomer') }}
          </router-link>
        </li>
      </div>
      <li class="nav-item">
        <select v-model="lang">
          <option value="en">English</option>
          <option value="uk">Українська</option>
        </select>
      </li>
    </nav>

    <div class="container mt-3">
      <router-view/>
    </div>
  </div>
</template>

<script>


export default {
  components: {},

  computed: {
    lang: {
      get() {
        return this.$store.getters.getLocale;
      },
      set(newValue) {
        this.$store.commit("updateLocale", newValue);
      }
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.role) {
        return this.currentUser.role === "Administrator";
      }

      return false;
    },
    showWorkerBoard() {
      if (this.currentUser && this.currentUser.role) {
        return this.currentUser.role === "Worker";
      }

      return false;
    },
    showCustomerBoard() {
      if (this.currentUser && this.currentUser.role) {
        return this.currentUser.role === "Customer";
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/loginAdministrator');
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
