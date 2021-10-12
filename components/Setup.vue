<template>
  <div class="flex h-screen bg-indigo-600">
    <div
      class="w-full mx-3 m-auto md:mx-auto bg-indigo-100 rounded p-5 md:max-w-md"
    >
      <header class="text-center mb-3">
        <img class="w-16 mx-auto md:w-20" src="icon3.svg" />

        <span class="text-medium font-medium mt-2">STS - NITR</span>
      </header>
      <form @submit.prevent="nextsetup">
        <div>
          <label class="block mb-2 text-indigo-500" for="username"
            >Name</label
          >
          <input
            required
            class="w-full p-2 mb-2 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
            type="text"
            v-model="user.name"
            name="username"
          />
        </div>
        <div>
          <label class="block mb-2 text-indigo-500" for="username"
            >Roll No.</label
          >
          <input
            required
            class="w-full p-2 mb-2 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
            type="text"
            v-model="user.roll"
            name="username"
          />
        </div>
        <div>
          <label class="block mb-2 text-indigo-500" for="password">New PIN</label>
          <input
            required
            class="text-center w-full p-2 mb-2 text-indigo-500 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"
            v-model="user.pin"
            type="number"
            name="pin"
            onInput="this.value = this.value.slice(0,5)"
          />
        </div>
        <div class="relative">
          <label class="block mb-2 text-indigo-500" for="password"
            >Sequence</label
          >
          <dropdown hideborder selected="" class="mb-2 text-indigo-500 border-b-2 border-indigo-500 outline-none" :options="['TP','PT']" v-model="user.seq"/>
        </div>
        <div>
          <button
            class="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-2 px-4 mb-6 rounded"
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
      if (this.user.pin && this.user.seq !='') {
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
