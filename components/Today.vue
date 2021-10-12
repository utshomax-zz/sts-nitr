<template>
  <div class="h-auto md:h-full md:pb-4 md:pr-2 md:pl-5 p-2 overflow-auto mb-16">
    <div class="h-full minscrn shadowc flex flex-col">
      <div
        class="overviewtext w-full flex justify-evenly items-center pt-4 text-xs sm:text-sm md:text-base px-4 md:px-3 font-medium"
      >
        <span class="text-2xl text-indigo-800">{{ count[0] }}</span> CLASSES
        <span class="text-2xl text-indigo-800">{{ count[1] }}</span> ASSIGNMENT
        <span class="text-2xl text-indigo-800">{{ count[2] }}</span
        >EXAMS
      </div>
      <div v-if="!loading" class="h-full flex flex-col">
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
            <span v-if="isHoliday">
              <img class="h-10 mx-auto" src="meditation.png" alt="" />RELAX -
              {{ cause }} ! <br />
              <span style="font-size:10px">{{ this.holidayspan }}</span>
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
                :class="{ 'bg-green-100': isHoliday }"
                class="timer h-4 bg-gray-800 ml-5 w-36 font-medium text-xs text-center"
              >
                {{ subject.time }}
              </div>
              <div
                class="bg-indigo-400 h-12 flex items-center justify-center mx-5"
                :class="hasAx(axlist, subject.sub)"
              >
                <div class="font-bold text-sm">{{ subject.sub }}</div>
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
                :class="{ 'bg-green-100': isHoliday }"
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
      day: null,
      today: "",
      cause: "",
      isHoliday: false,
      holidayspan: null,
      selectedDate: "DAY",
      user: null,
      isValid_c: false
    };
  },
  computed: {
    ...mapState(["overview", "count", "axlist", "loading"]),
    count() {
      return this.$store.getters["getCount"];
    }
  },
  mounted() {
    let date = new Date();
    let s_t = date.toLocaleDateString();
    let i_t = s_t + " " + "07:00 PM";
    let comp_time_1 = new Date(i_t);
    var dayName = this.days[date.getDay()].toUpperCase();
    this.day = dayName;
    this.today = dayName;
    if (comp_time_1.getTime() < date.getTime()) {
      date.setDate(date.getDate() + 1);
      this.dayCount = date.getDay();
      this.day = this.days[date.getDay()].toUpperCase();
    }
    this.$store.dispatch("getinitState", this.day)
    //REFRESHING
    setInterval(() => {
      this.setcurrentsub();
    }, 300000);
    setTimeout(() => {
      window.location.reload();
    }, 3600000);
  },
  watch: {
    'selectedDate': function(val) {
      this.isHoliday = false;
      let sd = val.toUpperCase()
      if (sd != this.today) {
        this.currentsub = "Viewing Routine";
      } else {
        this.currentsub = "----";
      }
      if (sd.toUpperCase() == "SUNDAY" || sd == "SATURDAY") {
        this.holidayspan = null;
        this.isHoliday = true;
        this.cause = "It's " + val;
        this.presubjects = []
        this.nextsubjects =[]
      }
      else{
          this.changeDay();
      }
    },
    'overview':function(val){
      console.log('overview called')
       let day =this.selectedDate.toUpperCase()
       if (day != this.today && day != "DAY") {
         console.log(day)
        let date = this.getNextDayOfTheWeek(day).toLocaleDateString()
        console.log(date)
        this.nextsubjects = val.slice(0);
        this.presubjects = []
        this.holidaypass(date,true)
       }
       else{
         this.setcurrentsub()
       }
    }
  },

  methods: {
    setcurrentsub: function() {
      if(this.isHoliday){
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
        this.holidaypass();
    },
    isValid: function(date, t0, t1) {
      let s_t = date.toLocaleDateString();
      let i_t = new Date(s_t + " " + t0);
      let e_t = new Date(s_t + " " + t1);
      return i_t.getTime() <= date.getTime() && date.getTime() <= e_t.getTime();
    },
    holidaypass(date=null,isfromchangeday=false) {
      fetch("https://strapi.app.madvertlabs.com/nitr-holidays")
        .then(res => res.json())
        .then(res => {
          let holidays = res;
          let today = date ? date : new Date().toLocaleDateString();
          holidays.forEach(day => {
            let i_day = new Date(day.s_date).toLocaleDateString();
            if (day.single) {
              if (i_day == today) {
                this.isHoliday = true;
                this.cause = day.NAME;
              }
            } else {
              let dateTo = new Date(day.e_date).toLocaleDateString();
              var d1 = i_day.split("/");
              var d2 = dateTo.split("/");
              var c = today.split("/");

              var from = new Date(d1[2], parseInt(d1[0]) - 1, d1[1]);
              var to = new Date(d2[2], parseInt(d2[0]) - 1, d2[1]);
              var check = new Date(c[2], parseInt(c[0]) - 1, c[1]);
              if (check >= from && check <= to) {
                this.isHoliday = true;
                this.cause = day.NAME;
                this.holidayspan = from.toLocaleDateString('en-GB') + " - " + to.toLocaleDateString('en-GB');
                if(!isfromchangeday){
                    this.nextsubjects = this.overview.slice(0)
                    this.presubjects = []
                }
              }
            }
          });
        });
    },
    hasAx(axlist, sub, main = false) {
      let a = axlist.find(x => x.subject == sub && !x.done);
      if (a && !main) {
        return {
          "border-r-2 border-gray-700": a.type == "Assignment",
          "border-r-2 border-red-400": a.type == "Exam",
          "border-l-2 border-r-0": main,
          "bg-green-100": this.isHoliday
        };
      }
      if (main && this.isHoliday) {
        return {
          "bg-green-300": this.isHoliday
        };
      } else {
        return {
          "bg-green-100": this.isHoliday
        };
      }
    },
    changeDay() {
      let day = this.selectedDate.toUpperCase();
      this.day = day;
      this.$store.dispatch("getinitState", day)
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
