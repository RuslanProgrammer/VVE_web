<template>
  <div class="col-md-12">
    <div class="card card-container">
      <form name="form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label>{{ $t('email2') }}</label>
          <input
              v-model="user.email"
              v-validate="'required'"
              class="form-control"
              name="email"
              type="text"
          />
          <div
              v-if="errors.has('email')"
              class="alert alert-danger"
              role="alert"
          >{{ $t('emailIsRequired') }}
          </div>
        </div>
        <div class="form-group">
          <label>{{ $t('password') }}</label>
          <input
              v-model="user.password"
              v-validate="'required'"
              class="form-control"
              name="password"
              type="password"
          />
          <div
              v-if="errors.has('password')"
              class="alert alert-danger"
              role="alert"
          >{{ $t('passwordIsRequired') }}
          </div>
        </div>
        <div class="form-group">
          <button :disabled="loading" class="btn btn-primary btn-block">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>{{ $t('login') }}</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">{{ message }}</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import User from '../models/User';

export default {
  name: 'Login',
  data() {
    return {
      user: new User('', ''),
      loading: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.email && this.user.password) {
          this.$store.dispatch('auth/loginWorker', this.user).then(
              () => {
                this.$router.push('/home');
              },
              error => {
                this.loading = false;
                this.message =
                    (error.response && error.response.data["detail"]) ||
                    error.message ||
                    error.toString();
              }
          );
        }
      });
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 50px auto 25px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
</style>
