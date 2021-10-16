<template>
  <div class="flex h-screen bg-indigo-400">
    <div class="w-full max-w-xs m-auto rounded bg-white shadow p-6 md:max-w-sm">
      <header class="text-center mb-3">
        <img class="w-16 mx-auto md:w-20" src="icon3.svg" />

        <span class="text-medium font-medium mt-2">STS - NITR</span>
      </header>
      <form @submit.prevent="userLogin" class="my-3">
        <div v-if="iserror" class="text-center text-red-500 mb-2">
          {{error}}
        </div>
        <div>

          <input
          placeholder="Your Roll No."
            required
            class="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none "
            type="text"
            oninput="this.value = this.value.toUpperCase()"
            v-model="login.roll"
            name="username"
          />
        </div>
        <div>
          <input
            required
            placeholder="Your PIN"
            class=" w-full p-2 mb-8 text-indigo-500 border-b-2 border-indigo-500 outline-none "
            type="number"
            v-model="login.pin"
            name="pin"
            style="-webkit-text-security: square;"
          />
        </div>
        <div>
          <button
            class="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-2 px-4 mb-8 rounded"
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
      },
      iserror:false
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
        if(err.response.status==403){
          this.iserror = true
          this.error = "Incorrect Roll or PIN !"
          setTimeout(() => {
            this.iserror =false
          }, 5000);
        }
        console.log(err);
      }
    },
    showAlert(){
      alert('Well ! It was a 5 degit pin. Try to remember 😑...else ask help on descord(sts-nitr)!')
    }
  }
};
</script>
