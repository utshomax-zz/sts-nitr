<template>
  <div class="h-auto md:h-full md:pb-4 md:pr-2 md:pl-5 p-2 overflow-auto mb-16">
    <div class="h-full minscrn shadowc flex flex-col">
      <div
        class="overviewtext w-full flex justify-evenly items-center pt-4 text-xs sm:text-sm md:text-base px-4 md:px-3 font-medium"
      >
        <span class="text-2xl text-indigo-800">{{ overview.length }}</span> CLASSES
        <span class="text-2xl text-indigo-800">{{ count[0] }}</span> ASSIGNMENTS
        <span class="text-2xl text-indigo-800">{{ count[1] }}</span
        >EXAMS
      </div>
      <div v-if="!loading" class="h-full flex flex-col text-xs xs:text-sm">
        <div
          :class="hasAx(axlist, currentsub, true)"
          class="onesub bg-indigo-400 h-20 flex items-center justify-center m-5 relative overflow-hidden"
        >
          <div
            class=" absolute h-4 w-12 bg-gray-800 top-0 right-0 font-medium text-white text-xs text-center"
          >
            NOW
          </div>
          <div class="font-bold text-white text-xs xs:text-sm text-center leading-tight">
            <span v-if="holiday.isHoliday">
              <img class="h-10 mx-auto" src="meditation.png" alt="" />RELAX -
              {{ holiday.cause }} ! <br />
              <span style="font-size:10px">{{ holiday.holidayspan }}</span>
            </span>
            <span v-else>{{ currentsub }}</span>
          </div>
        </div>
        <div class="flex text-base font-medium pl-5 mb-2 items-center relative">
          <span>NEXT | </span>
          <dropdown
            hideborder
            :selected="day"
            :options="days"
            class="max-w-xs"
            v-model="selectedDatename"
          />
        </div>
        <div class="shedules overflow-x-auto text-white">
          <div
            class="nextsubs"
            v-for="subject in nextsubjects"
            :key="subject.id"
          >
            <div class="onesub mb-3">
              <div
                :class="{ 'bg-green-100': holiday.isHoliday }"
                class="timer h-4 bg-gray-800 ml-5 w-36 font-medium text-xs text-center"
              >
                {{ subject.time }}
              </div>
              <div
                class="bg-indigo-400 h-12 flex items-center justify-center mx-5"
                :class="hasAx(axlist, subject.sub)"
              >
                <div class="font-bold">{{ subject.sub }}</div>
              </div>
            </div>
          </div>
          <div
            class="presubs"
            v-for="subject in presubjects"
            :key="subject.sub"
          >
            <div class="onesub mb-3">
              <div
                :class="{ 'bg-green-100': holiday.isHoliday }"
                class="timer h-4 bg-gray-800 ml-5 w-36 font-medium text-xs text-center"
              >
                {{ subject.time }}
              </div>
              <div
                class="bg-gray-400 h-12 flex items-center justify-center mx-5"
                :class="hasAx(axlist, subject.sub)"
              >
                <div class="font-boldtext-sm">{{ subject.sub }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <loader />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Dropdown from "./Dropdown.vue";
import loader from "./loader.vue";
let date = new Date();
export default {
  components: { loader, Dropdown },
  data() {
    return {
      currentsub: "----",
      nextsubjects: [],
      presubjects: [],
      dayCount: new Date().getDay(),
      days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      isValid_c: false,
      holidayCheckDate: new Date(),
    };
  },
  computed: {
    //get todays routine
    ...mapState([ "count", "axlist", "loading"]),
    selectedDatename: {
      get() {
        return this.days[this.dayCount];
      },
      set(val){
        this.dayCount = this.days.indexOf(val);
      }
    },
    day(){
        return this.days[this.dayCount].toUpperCase();
    },
    today(){
      return this.days[date.getDay()].toUpperCase();
    },
    overview(){
      return this.$store.getters["getTodayRoutine"](this.day)
    },
    count() {
      return this.$store.getters["getCount"]
    },
    holiday(){
      return this.$store.getters["getHoliday"](this.holidayCheckDate||new Date(),this.day)
    }
  },
  mounted() {
    this.selectedDate = this.days[date.getDay()]
    //check if it's 7 pm
    this.checkfor7pm();
    this.setcurrentsub()
    //REFRESHING
    setInterval(() => {
      this.setcurrentsub();
    }, 300000);
  },
  watch: {
    'overview':function(){
      this.setcurrentsub();
    },
    'holiday':function(val){
      if(val.isHoliday){
        this.nextsubjects = this.overview;
        this.presubjects = [];
      }
    }
  },

  methods: {
    setcurrentsub: function() {
      console.log("SETING CURRENT SUBJECT..")
      let sd = this.selectedDatename.toUpperCase()
      if (sd != this.today) {
        this.presubjects = []
        this.nextsubjects = this.overview.slice(0)
        this.currentsub = "Viewing Routine";
        this.holidayCheckDate = this.getNextDayOfTheWeek(sd)
        return
      } else {
        this.currentsub = "----";
        this.holidayCheckDate = new Date();
      }
      if(this.holiday.isHoliday){
        return
      }
      this.presubjects = [];
      this.nextsubjects = [];
      var c_data = this.overview.slice(0);
      let dt = new Date();
      c_data.forEach((t, i) => {
        let time = t.time.split("-");
        if (this.isValid(dt, time[0].split(':'), time[1].split(':'))) {
          this.isValid_c = true;
          this.currentsub = t.sub;
          this.nextsubjects = c_data.slice(i + 1);
          this.presubjects = c_data.slice(0, i);
          return;
        }
      });
      if (
        (!this.isValid_c && this.nextsubjects.length <= 0) ||
        this.day != this.today
      )
        this.nextsubjects = c_data;
    },
    isValid: function(date, t0, t1) {
      let s_t = date.toLocaleTimeString([],{hour12:true});
      let time_split = s_t.split(":");
      let h0 =parseInt(t0[0]);
      let h1 =parseInt(t1[0]);
      let m0 =parseInt(t0[1].split(' ')[0]);
      let m1 =parseInt(t1[1].split(' ')[0]);
      let apm0 =t0[1].split(' ')[1];
      let apm1 =t1[1].split(' ')[1];
      let hour = parseInt(time_split[0]);
      let min = parseInt(time_split[1]);
      let apm = time_split[2].split(' ')[1].toUpperCase()
      if(
        (apm == apm0 && hour == h0 && min >= m0) ||
        (apm == apm1 && hour == h1 && min <= m1)
      ){
        return true
      }
      return false
    },
    hasAx(axlist, sub, main = false) {
      let a = axlist.find(x => x.subject == sub && !x.done);
      if (a && !main) {
        return {
          "border-r-2 border-gray-700": a.type == "Assignment",
          "border-r-2 border-red-400": a.type == "Exam",
          "border-l-2 border-r-0": main,
          "bg-green-100": this.holiday.isHoliday
        };
      }
      if (main && this.holiday.isHoliday) {
        return {
          "bg-green-300": this.holiday.isHoliday
        };
      } else {
        return {
          "bg-green-100": this.holiday.isHoliday
        };
      }
    },
    checkfor7pm() {
      let date = new Date();
      let time = date.toLocaleTimeString([],{hour12:true});
      let time_split = time.split(":");
      let hour = parseInt(time_split[0]);
      let min = parseInt(time_split[1]);
      let apm = time_split[2].split(' ')[1].toUpperCase()
      if (hour >= 7 && min >= 0 && apm == 'PM') {
        let c = this.dayCount >= 6 ? 0 : this.dayCount + 1;
        this.dayCount = c;
      }
    },
    getNextDayOfTheWeek(dayName, excludeToday = true, refDate = new Date()) {
    const dayOfWeek = ["sun","mon","tue","wed","thu","fri","sat"]
                      .indexOf(dayName.slice(0,3).toLowerCase());
    if (dayOfWeek < 0) return;
    refDate.setHours(0,0,0,0);
    refDate.setDate(refDate.getDate() + +!!excludeToday + 
                    (dayOfWeek + 7 - refDate.getDay() - +!!excludeToday) % 7);
    return refDate;
    }
  }
};
</script>

<style></style>
