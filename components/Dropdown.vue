<template>
<div class="w-full font-montserrat text-md font-medium" :class="{'w-auto':hideborder}">
      <button
        :class="{'border-0 border-b-0':hideborder}"
        class="flex items-center justify-between px-3 py-2 border-b-2 bg-white border-black w-full outline-none"
        @click.prevent="isOptionsExpanded = !isOptionsExpanded"
        @blur.prevent="isOptionsExpanded = false"
      >
        <span class="h-6 text-base overflow-y-auto" :class="{'font-medium uppercase':hideborder}">{{ selectedOption }}</span>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="h-4 w-4 transform transition-transform duration-200 ease-in-out"
          :class="[isOptionsExpanded ? 'rotate-180' : 'rotate-0']"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <transition
        enter-active-class="transform transition duration-500 ease-custom"
        enter-class="-translate-y-1/2 scale-y-0 opacity-0"
        enter-to-class="translate-y-0 scale-y-100 opacity-100"
        leave-active-class="transform transition duration-300 ease-custom"
        leave-class="translate-y-0 scale-y-100 opacity-100"
        leave-to-class="-translate-y-1/2 scale-y-0 opacity-0"
      >
        <ul
          v-show="isOptionsExpanded"
          class="absolute left-3 right-3 mb-4 bg-white divide-y shadow-lg overflow-hidden z-30"
        >
          <li
            v-for="(option, index) in options"
            :key="index"
            class="px-3 py-2 transition-colors duration-300 hover:bg-gray-200"
            @mousedown.prevent="setOption(option)"
          >
            {{ option }}
          </li>
        </ul>
      </transition></div>
</template>

<script>
export default {
  data() {
    return {
      isOptionsExpanded: false,
      selectedOption:this.selected
    };
  },
  props:{
    options:{
      type:Array,
      default:()=> {return ['No Options!']}
    },
    selected:{
      type:String,
      default:'select'
    },
    hideborder:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    setOption(option) {
      this.selectedOption = option;
      this.$emit('input',this.selectedOption)
      this.isOptionsExpanded = false;
    }
  }
};
</script>

<style>
.ease-custom {
  transition-timing-function: cubic-bezier(.61,-0.53,.43,1.43);
}
</style>
