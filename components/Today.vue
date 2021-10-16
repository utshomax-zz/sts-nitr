<template>
  <div class="h-auto md:h-full md:pb-4 md:pr-2 md:pl-5 p-2 overflow-auto mb-16">
    <div class="h-full minscrn shadowc flex flex-col">
      <div
        class="overviewtext w-full flex justify-evenly items-center pt-4 text-xs sm:text-sm md:text-base px-4 md:px-3 font-medium"
      >
        <span class="text-2xl text-indigo-800">{{ overview.length }}</span> CLASSES
        <span class="text-2xl text-indigo-800">{{ count[0] }}</span> ASSIGNMENT
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
            v-model="selectedDate"
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
      selectedDate: "",
      isValid_c: false,
      holidayCheckDate: new Date(),
    };
  },
  computed: {
    //get todays routine
    ...mapState([ "count", "axlist", "loading"]),
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
      return this.$store.getters["getHoliday"](this.holidayCheckDate,this.day)
    }
  },
  mounted() {
    //check if it's 7 pm
    this.checkfor7pm();
    //REFRESHING
    this.setcurrentsub();
    setInterval(() => {
      this.setcurrentsub();
    }, 300000);
  },
  watch: {
    'selectedDate': function(val) {
       console.log(val)
      let sd = val.toUpperCase()
      if (sd != this.today) {
        this.currentsub = "Viewing Routine";
        this.holidayCheckDate = this.getNextDayOfTheWeek(sd)
      } else {
        this.currentsub = "----";
        this.holidayCheckDate = new Date();
      }
      this.dayCount = this.days.indexOf(val)
    },
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
      if(this.holiday.isHoliday){
        return
      }
      this.presubjects = [];
      this.nextsubjects = [];
      var c_data = this.overview.slice(0);
      c_data.forEach((t, i) => {
        let time = t.time.split("-");
        if (this.isValid(new Date(), time[0], time[1])) {
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
      let s_t = date.toLocaleDateString();
      let i_t = new Date(s_t + " " + t0);
      let e_t = new Date(s_t + " " + t1);
      return i_t.getTime() <= date.getTime() && date.getTime() <= e_t.getTime();
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
      let time = date.toLocaleTimeString();
      let time_split = time.split(":");
      let hour = parseInt(time_split[0]);
      let min = parseInt(time_split[1]);
      if (hour >= 7 && min >= 0) {
        let c = this.dayCount > 6 ? 0 : this.dayCount + 1;
        this.selectedDate = this.days[c];
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
