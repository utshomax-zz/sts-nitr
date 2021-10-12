<template>
  <nav
    class=" h-14 fixed bottom-0 inset-x-0 bg-indigo-400 opacity-90 flex justify-between items-center text-sm text-indigo-800 uppercase"
  >
    <div
      class="w-full block transition duration-300"
      :class="{'text-white': selected==1 }"
      @click="makeActive(1)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-7 h-7 mb-1 mx-auto"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"
        />
      </svg>
    </div>
    <div
      class="w-full block transition duration-300"
      :class="{'text-white': selected==2 }"
      @click="makeActive(2)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-7 h-7 mb-1 mx-auto"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <div
      class="w-full block transition duration-300"
      :class="{'text-white': selected==3 }"
      @click="makeActive(3)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-7 h-7 mb-1 mx-auto"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
        <path
          fill-rule="evenodd"
          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <div
      class="w-full block transition duration-300"
      :class="{'text-white': selected==4 }"
      @click="makeActive(4)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-7 h-7 mb-1 mx-auto"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z"
          clip-rule="evenodd"
        />
        <path
          fill-rule="evenodd"
          d="M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11zm8.921 2.012a1 1 0 01.831 1.145 19.86 19.86 0 01-.545 2.436 1 1 0 11-1.92-.558c.207-.713.371-1.445.49-2.192a1 1 0 011.144-.83z"
          clip-rule="evenodd"
        />
        <path
          fill-rule="evenodd"
          d="M10 10a1 1 0 011 1c0 2.236-.46 4.368-1.29 6.304a1 1 0 01-1.838-.789A13.952 13.952 0 009 11a1 1 0 011-1z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      selected: 1
    };
  },
  methods: {
    makeActive(id) {
      if(id == this.selected) return
      this.selected = id;
      this.$nuxt.$emit('changeNav',id)
    }
  }
};
</script>

<style></style>
