<template>
  <div class="container">
    <header>
      <h3>
        <strong>{{ $t('profile') }}</strong>
      </h3>
    </header>
    <p>
      <strong>{{ $t('name') }}</strong>
      {{ currentUser.user.name }}
    </p>
    <p>
      <strong>{{ $t('surname') }}</strong>
      {{ currentUser.user.surname }}
    </p>
    <p>
      <strong>{{ $t('email3') }}</strong>
      {{ currentUser.user.email }}
    </p>

    <p v-if="currentUser.user.shop">
      <strong>{{ $t('shop2') }}</strong>
      {{ this.shop.name }}
    </p>
    <p>
      <strong>{{ $t('authorities') }}</strong>
      {{ currentUser.role }}
    </p>
  </div>

</template>

<script>
import UserService from "@/services/user.service";

export default {
  name: 'Profile',
  data() {
    return {
      shop: null,
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    getShop(id) {
      UserService.getShop(id)
          .then(response => {
            this.shop = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/loginAdministrator');
    }
    console.log(this.currentUser.user)
    if (this.currentUser.user.shop != null) {
      this.getShop(this.currentUser.user.shop)
    }
  }
};
</script>
