<template>
  <div class="flex h-screen bg-indigo-600">
    <div class="w-full max-w-xs m-auto bg-indigo-100 rounded p-5 md:max-w-sm">
      <header class="text-center mb-3">
        <img class="w-16 mx-auto md:w-20" src="icon3.svg" />

        <span class="text-medium font-medium mt-2">STS - NITR</span>
      </header>
      <form @submit.prevent="userLogin">
        <div>
          <label class="block mb-2 text-indigo-500" for="username"
            >Roll No.</label
          >
          <input
            required
            class="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
            type="text"
            oninput="this.value = this.value.toUpperCase()"
            v-model="login.roll"
            name="username"
          />
        </div>
        <div>
          <label class="block mb-2 text-indigo-500" for="password">PIN</label>
          <input
            required
            class="text-center w-full p-2 mb-6 text-indigo-500 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
            type="number"
            v-model="login.pin"
            name="pin"
            style="-webkit-text-security: square;"
          />
        </div>
        <div>
          <button
            class="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-2 px-4 mb-6 rounded"
            type="submit"
          >
            LOGIN
          </button>
        </div>
      </form>
      <footer>
        <a
          class="text-indigo-500 hover:text-indigo-400 text-sm float-left"
          @click="showAlert"
          >Forgot PIN ?</a
        >
        <nuxt-link
          to="/reg"
          class="text-indigo-500 hover:text-indigo-400 text-sm float-right"
          >Setup A Profile</nuxt-link
        >
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  layout: "login",
  data() {
    return {
      login: {
        roll: "",
        pin: ""
      }
    };
  },
  methods: {
    async userLogin() {
      try {
        await this.$auth.loginWith("local", {
          data: this.login
        });
        this.$router.push("/")
      } catch (err) {
        console.log(err);
      }
    },
    showAlert(){
      alert('Well ! it was a 5 degit pin. Try to remember...else ask help on descord(sts-nitr)!')
    }
  }
};
</script>
