<template>
  <div class="h-screen w-screen flex">
  <div class="h-full w-16 bg-indigo-800 md:flex md:flex-col items-center hidden">
    <nuxt-link to="/me"> <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 mr-1 mt-3" fill="none" viewBox="0 0 24 24" stroke="white">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    </nuxt-link>
  </div>
  <div class="flex flex-col w-full h-full">
    <div class="header w-full h-14 flex items-center justify-between">
      <div class="pl-5 text-left font-bold">
        <img class="h-6 mb-1 mr-1 inline md:hidden" src="logo2.png" alt="" srcset="">STS-NITR
      </div>
      <div class="pr-5 xs:text-sm text-xs tracking-tight font-extralight">{{topdatetime}}</div>
    </div>
        <pull-down :onRefresh="onRefresh" :key="rendKey">
         <div
        v-if="!$device.isMobile"
        class="h-full grid md:grid-cols-3 overflow-auto"
      >
        <today />
        <task-list />
        <ax-list />
      </div>
      <div v-else class="h-full overflow-auto">
         <transition name="slide-fade">
          <today v-show="active == 1" />
          </transition>
          <transition name="slide-fade">
          <task-list v-show="active == 2" />
          </transition>
          <transition name="slide-fade">
          <ax-list v-show="active == 3" />
          </transition>
          <transition name="slide-fade">
          <profile v-show="active == 4" />
          </transition>
      </div>
        </pull-down>
     </div>
</div>
</template>

<script>
let options = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true
};
import AxList from "~/components/AxList.vue";
import Profile from '~/components/Profile.vue';
import PullDown from '~/components/PullDown.vue';
import TaskList from "~/components/TaskList.vue";
import Today from "~/components/Today.vue";
export default {
  components: { Today, TaskList, AxList, Profile, PullDown, Profile },
  data() {
    return {
      active: 0,
      topdatetime: new Date().toLocaleString("en-US", options),
      rendKey:0
    };
  },
   mounted() {
     this.$store.dispatch("getinitState")
     this.$store.dispatch("setHolidaysAct")
     this.active = 1
    setInterval(() => {
      this.topdatetime = new Date().toLocaleString("en-US", options);
    }, 60000);

  },
  created() {
    this.$nuxt.$on("changeNav", id => {
      this.active = id;
    });
  },
   methods: {
      onRefresh: function(){
      this.rendKey  = !this.rendKey
    },
    to12format: function(time24) {
      const [sHours, minutes] = time24
        .match(/([0-9]{1,2}):([0-9]{2})/)
        .slice(1);
      const period = +sHours < 12 ? "AM" : "PM";
      const hours = +sHours % 12 || 12;
      return `${hours}:${minutes} ${period}`;
    }
  }
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.slide-fade-leave-active, .slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
