<template>
  <div class="page-login-wrap d-flex align-items-center">
    <b-container class="home-test-wrap mt-4">
      <b-form @submit="onSubmit">
        <b-form-group>
          <label for="form-email">Email</label>
          <b-form-input
            v-model="form.email"
            type="email"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder=""
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <label for="form-password">Password</label>
          <b-form-input
            type="password"
            v-model="form.password"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Login</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import { login } from "@/api/user";
export default {
  name: "login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  created() {
    window.vue = this;
  },
   watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      console.log(event);
      let params = {
        ...this.form,
      };
      this.$store.dispatch("user/login", params).then((response) => {
        console.log("login", response);
        this.$router.push({ path: this.redirect || '/' })
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>