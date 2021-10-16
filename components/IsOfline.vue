<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="flex items-center justify-center text-white text-xs py-1"
      :class="[isOffline ? 'bg-yellow-300' : 'bg-green-400']"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 mr-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
        /></svg
      ><span>{{ text }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      text: "Things may not work correctly"
    };
  },
  computed: {
    isOffline() {
      return this.$nuxt.isOffline;
    }
  },
  watch: {
    isOffline: function(val) {
      this.visible = true;
      if (val) {
        this.text = "Things may not work correctly";
      } else {
        this.text = "Back Online !";
        this.$store.dispatch("getinitState")
        setTimeout(() => {
          this.visible = false;
        }, 1000);
      }
    }
  },
  mounted() {
    this.visible = this.$nuxt.isOffline;
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
