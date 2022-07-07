<template>
  <div class="list row">
    <div class="col-md-8">
    </div>
    <div class="col-md-6">
      <h4>{{ $t('backupsList') }}</h4>
      <ul class="list-group">
        <li v-for="(backup, index) in backups"
            :key="index"
            :class="{ active: index == currentIndex }"
            class="list-group-item"
            @click="setActiveBackup(backup, index)"
        >
          {{ format_full_date(backup) }}
        </li>
      </ul>
      <a v-if="currentUser.role === 'Administrator'"
         class="btn btn-success"
         @click="CreateBackup()"
      >
        {{ $t('add2') }}
      </a>
    </div>
    <div class="col-md-6">
      <div v-if="currentBackup">
        <h4>{{ $t('backup') }}</h4>
        <div>
          <label><strong>{{ $t('date') }}</strong></label> {{ format_full_date(currentBackup) }}
        </div>

        <a
            class="btn btn-secondary"
            @click="restoreBackups(currentIndex)"
        >
          {{ $t('restore') }}
        </a>
      </div>
      <div v-else>
        <br/>
        <p>{{ $t('chooseThBackup') }}</p>
      </div>
    </div>
  </div>
</template>

<script>

import UserService from "@/services/user.service";
import moment from "moment-timezone";

export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  name: "backups",
  data() {
    return {
      backups: [],
      currentBackup: null,
      currentIndex: -1,
      message: ''
    };
  },
  methods: {
    format_full_date(value) {
      if (value) {
        let timeZone
        if (localStorage.getItem('locale') === 'uk') {
          timeZone = 'Europe/Kiev'
        } else {
          timeZone = 'UTC'
        }
        console.log(String(value.replaceAll('_', ':').replace('T', ' ')))
        return moment(String(value.replaceAll('_', ':').replace('T', ' '))).tz(timeZone).locale(localStorage.getItem('locale')).format('HH:mm:ss\tDD-MM-YYYY')
      }
    },
    CreateBackup() {
      UserService.createBackup()
          .then(response => {
            this.getBackups()
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    getBackups() {
      UserService.getBackups()
          .then(response => {
            this.backups = response.data.reverse();
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    setActiveBackup(backup, index) {
      this.currentBackup = backup;
      this.currentIndex = index;
    },
    restoreBackups(index) {
      UserService.restoreBackups(this.backups.length - index - 1)
          .then(response => {
            console.log(response.data);
            alert('Success')
          })
          .catch(e => {
            console.log(e);
          });
    },
  },
  mounted() {
    this.message = '';
    this.getBackups();
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
