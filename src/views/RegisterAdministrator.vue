<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
          id="profile-img"
          class="profile-img-card"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
      />
      <form name="form" @submit.prevent="handleRegister">
        <div v-if="!successful">
          <div class="form-group">
            <label>{{ $t('name2') }}</label>
            <input
                v-model="user.name"
                v-validate="'required|min:3|max:20'"
                class="form-control"
                name="name"
                type="text"
            />
            <div
                v-if="submitted && errors.has('name')"
                class="alert-danger"
            >{{ errors.first('name') }}
            </div>
          </div>

          <div class="form-group">
            <label>{{ $t('surname2') }}</label>
            <input
                v-model="user.surname"
                v-validate="'required|min:3|max:20'"
                class="form-control"
                name="surname"
                type="text"
            />
            <div
                v-if="submitted && errors.has('surname')"
                class="alert-danger"
            >{{ errors.first('surname') }}
            </div>
          </div>

          <div class="form-group">
            <label>{{ $t('email2') }}</label>
            <input
                v-model="user.email"
                v-validate="'required|email|max:50'"
                class="form-control"
                name="email"
                type="email"
            />
            <div
                v-if="submitted && errors.has('email')"
                class="alert-danger"
            >{{ errors.first('email') }}
            </div>
          </div>

          <div class="form-group">
            <label>{{ $t('shop') }}</label>
            <select id="worker" v-model="user.shop" v-validate="'required'"
                    class="form-control"
                    name="shop">
              <option v-for="(shop, index) in this.shops"
                      :key="index"
                      v-bind:value="shop.id">
                {{ shop.name }}
              </option>
            </select>
            <div
                v-if="submitted && errors.has('shop')"
                class="alert-danger"
            >{{ errors.first('shop') }}
            </div>
          </div>

          <div class="form-group">
            <label>{{ $t('password') }}</label>
            <input
                v-model="user.password"
                v-validate="'required|min:6|max:40'"
                class="form-control"
                name="password"
                type="password"
            />
            <div
                v-if="submitted && errors.has('password')"
                class="alert-danger"
            >{{ errors.first('password') }}
            </div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block">{{ $t('signUp') }}</button>
          </div>
        </div>
      </form>

      <div
          v-if="message"
          :class="successful ? 'alert-success' : 'alert-danger'"
          class="alert"
      >{{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import User from '../models/User';
import UserService from "@/services/user.service";

export default {
  name: 'RegisterAdministrator',
  data() {
    return {
      shops: [],
      user: new User('', '', ''),
      submitted: false,
      successful: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    this.getShops();
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {

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
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/registerAdministrator', this.user).then(
              data => {
                this.message = data.message;
                this.successful = true;
              },
              error => {
                this.message =
                    (error.response && error.response.data["detail"]) ||
                    error.message ||
                    error.toString();
                this.successful = false;
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
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>
