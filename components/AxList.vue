<template>
  <div class="h-auto md:h-full md:pb-4 md:pr-2 md:pl-0 p-2 overflow-auto mb-16">
    <div class="h-full minscrn shadowc flex flex-col relative">
      <div
        @click="isopen = !isopen"
        class="z-10 w-6 h-6 hover:cursor-pointer absolute top-2 right-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="black"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            :d="isopen ? 'M18 12H6' : 'M12 4v16m8-8H4'"
          />
        </svg>
      </div>
      <div class="w-full text-center pt-2 text-md font-medium">
        Assignments & Exams
      </div>
      <form v-show="isopen" class=" inp p-3 inline" @submit.prevent="addax">
        <input
          v-model="axinp.topic"
          class="focus:outline-none border-b-2 w-full border-indigo-900"
          type="text"
          name="topic"
          placeholder="Assignment or Exam Topic.."
          required
        />
        <div class="flex flex-col md:flex-row pt-2 md:pt-1">
          <div class="w-full md:mr-2 border-0 border-b-2 border-gray-700 p-0 m-0">
            <input
            type="datetime-local"
            v-model="axinp.date"
            placeholder="Due datetime"
            name="date"
            class="outline-none w-full md:mt-2 inpw"
            width="100"
            required
          />
          </div>
          <dropdown
            v-model="axinp.type"
            class="w-full flex-1"
            :options="type_options"
            selected="Type"
          />
          <dropdown
            v-model="axinp.subject"
            :options="subjects"
            selected="Select Subject"
          />
        </div>
        <div class="block text-center mt-3 text-white">
          <button type="submit" class=" text-sm  font-medium bg-indigo-500 p-2 m-1">
            WELL..SHIT !
          </button>
        </div>
      </form>
      <transition-group name="list" tag="div"  class="shedules overflow-x-auto grid xl:grid-cols-2 grid-cols-1 gap-1 mt-4 p-1">
        <div
          v-for="item in axlist"
          :key="item.id"
          class="assignments flex flex-col p-1 font-medium text-sm relative"
        >
            
          <div
            :class="[
              item.done ? 'line-through text-gray-400 border-indigo-100' : item.type == 'Exam'? 'border-red-500':'border-indigo-500'
            ]"
            class="w-full shadow-md flex flex-col border-l-2"
          >
            <div
              class="lastdatesection w-full h-auto flex justify-between bg-gray-100 pt-1"
            >
              <span class="ml-3">{{ finedate(item.date) }}</span>
              <svg
              xmlns="http://www.w3.org/2000/svg"
              class="cursor-pointer h-6 w-6 p-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              @click="deleteax(item)"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 12H6"
              />
            </svg>
            </div>
            <div class="w-full p-2 flex flex-col">
              <div class=" p-1 mb-1 ">{{item.subject}}</div>
              <div
                @click="toggleax(item.id, item.done)"
                class="cursor-pointer bg-gray-300 p-2 shadow-sm rounded-sm"
              >
                {{item.topic}}
              </div>
            </div>
          </div>
        </div>
      </transition-group >
    </div>
  </div>
</template>

<script>
import Dropdown from "./Dropdown.vue";
export default {
  components: { Dropdown },
  data() {
    return {
      axinp: {
        topic: "",
        subject: null,
        date: null,
        type: null,
        done: false,
      },
      sub_options: [],
      type_options: ["Exam", "Assignment"],
      isopen: false
    };
  },
  computed: {
    axlist(){
      return this.$store.state.axlist
    },
    subjects() {
      return this.$store.getters.getSubList;
    }
  },
  methods: {
    finedate(date) {
      let temp = new Date(date);
      return temp.toDateString() + ' '+temp.toLocaleTimeString();
    },
    addax: function() {
      if(this.axinp.subject && this.axinp.type){
      let ax = { ...this.axinp };
      this.$store.dispatch("addaxAct", ax);
      this.axinp.topic = "";
      this.isopen = false
    }
        },
    toggleax: function(id, done) {
      this.$store.dispatch("toggleaxAct", { id: id, done: done });
    },
    deleteax: function(ax) {
      this.$store.dispatch("deleteaxAct", ax);
    }

  }
};
</script>

<style>
.inpw{
  width: 100% !important;
}
</style>
