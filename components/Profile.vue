<template>
  <div
    class="h-full flex flex-col text-gray-700 md:m-10 md:shadow-md xs:text-sm text-xs overflow-auto"
  >
    <div
      class="text-base m-2 p-3 font-medium uppercase flex items-center justify-between bg-gray-100 shadow"
    >
      <span
        >{{ user.roll }} <br />
        {{ user.name }}
      </span>
      <span class="flex">
        <nuxt-link to="/update" class="mr-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            /></svg
        ></nuxt-link>
        <nuxt-link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mr-3 hidden md:block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </nuxt-link>
        <span @click="logout" class=" cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            /></svg
        ></span>
      </span>
    </div>
    <div
      class="mx-2 h-auto flex-1 flex flex-col bg-gray-600 text-gray-200 p-2 overflow-hidden mb-16"
    >
      <span class="w-full text-center pt-8 h-1/12">ABOUT</span>
      <div class="about p-3 h-6/12 overflow-auto text-sm">
        STS-NITR is a web app for the students of NIT Rourkela to track their
        personal and academic progress. It features tasks, assignments, and exam
        trackers. Also, It provides a personalized real-time routine based on
        NITR Central timetable and Holidays to make their life easier.
      </div>
      <div
        class="md:relative flex-1 flex px-3 leading-none mt-2 xs:text-sm text-xs"
      >
        <span class="self-end">
          Version : Beta <br />
          Time zone: IST - India Standard Time <br />
          Time zone offset: UTC/GMT +5:30 hours
          <br />
          <br />
          Design and Developed by - <br />
          <!-- <a
            href="https://github.com/utshomax"
            class="font-medium text-sm text-purple-400"
            target="_blank"
            >UTSHOMAX</a
          > -->
           <a
            href=""
            class="font-medium text-sm text-purple-400"
            >UTSHOMAX</a
          >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$auth.user;
    }
  },
  methods: {
    logout() {
      this.$auth.logout();
      this.$router.push("/login");
    }
  }
};
</script>

<style></style>
