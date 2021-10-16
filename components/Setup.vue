<template>
  <div class="flex h-screen bg-indigo-400">
    <div
      class="w-full mx-4 m-auto md:mx-auto bg-white rounded p-5 md:max-w-md"
    >
      <header class="text-center mb-3">
        <img class="w-16 mx-auto md:w-20" src="icon3.svg" />

        <span class="text-medium font-medium mt-2">STS - NITR</span>
      </header>
      <form @submit.prevent="nextsetup" class="my-3">
        <div>

          <input
            required
            placeholder="Your Name"
            class="w-full p-2 mb-4 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
            type="text"
            v-model="user.name"
            name="username"
          />
        </div>
        <div>
          <input
            required
            placeholder="Your Roll No."
            class="w-full p-2 mb-4 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
            type="text"
            v-model="user.roll"
            name="username"
          />
        </div>
        <div>
          <input
            required
            placeholder="New 5 digit PIN"
            class="w-full p-2 mb-4 text-indigo-500 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
            v-model="user.pin"
            type="number"
            name="pin"
            onInput="this.value = this.value.slice(0,5)"
          />
        </div>
        <div class="relative">
          <dropdown hideborder selected="SEQUENCE" class="mb-5 border-b-2 border-indigo-500 outline-none" :options="['TP','PT']" v-model="user.seq"/>
        </div>
        <div>
          <button
            class="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-2 px-4 mb-6 mt-2 rounded"
            type="submit"
          >
            NEXT
          </button>
        </div>
      </form>
      <footer>
        <nuxt-link
          class="text-indigo-500 hover:text-indigo-400 text-sm"
          to="login"
          >Already Have a profile ? Login !</nuxt-link
        >
      </footer>
    </div>
  </div>
</template>

<script>
import Dropdown from './Dropdown.vue';
export default {
  components: { Dropdown },
  data() {
    return {
      user: {
        name: '',
        roll: '',
        pin: null,
        seq:'',
      }
    };
  },
  methods: {
    nextsetup: function() {
      if (this.user.pin && this.user.seq !='SEQUENCE') {
        this.$emit("init_setup_done",this.user);
      } else {
        alert(
          "Invalid Input !"
        );
      }
    }
  }
};
</script>

<style></style>
