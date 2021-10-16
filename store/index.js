export const state = () => ({
  overview: null,
  tasklist: [],
  axlist: [], //Assignment and exam State
  loading: true,
  slotlist: [],
  user: null,
  holidays: []
});

export const mutations = {
  initState(state, payload) {
    state.overview = payload.overview;
    state.tasklist = payload.tasklist.reverse();
    state.slotlist = payload.slotlist;
    state.axlist = payload.axlist;
  },
  //User init
  initUser(state, payload) {
    state.user = payload;
  },
  //loaderMutation
  startloading(state) {
    state.loading = true;
  },
  finishloading(state) {
    state.loading = false;
  },
  updateSlotlist(state, slotlist) {
    state.slotlist = slotlist;
  },
  //Task Mutations
  addtask(state, task) {
    state.tasklist.unshift(task);
  },
  removetask(state, task) {
    state.tasklist.splice(
      state.tasklist.findIndex(x => x.id == task.id),
      1
    );
  },
  toggletask(state, { id, done }) {
    state.tasklist.find((o, i) => {
      if (o.id === id) {
        state.tasklist[i].done = done;
        return true;
      }
    });
  },
  //AX mutations
  addax(state, ax) {
    state.axlist.push(ax);
  },
  removeax(state, ax) {
    state.axlist.splice(
      state.axlist.findIndex(x => x.id == ax.id),
      1
    );
  },
  toggleax(state, { id, done }) {
    state.axlist.find((o, i) => {
      if (o.id === id) {
        state.axlist[i].done = done;
        return true; // stop searching
      }
    });
  },
  //SETING HOLIDAYS
  setHolidays(state, holidays) {
    state.holidays = holidays;
  }
};

export const getters = {
  getUserRoll(state) {
    return state.user.roll;
  },
  getSubList(state) {
    let subjects = [];
    state.slotlist.forEach(slot => {
      subjects.push(slot.subject);
    });
    return subjects;
  },
  getCount(state) {
    let ax_c = state.axlist.filter(x => x.type == "Assignment").length;
    let ex_c = state.axlist.filter(x => x.type == "Exam").length;
    return [ax_c, ex_c];
  },
  getSlots(state) {
    return state.slotlist.slice(0);
  },
  getTodayRoutine: state => day => {
    if (!state.overview || day == 'SUNDAY' || day == 'SATURDAY') return [];
    let wroutine = state.overview[day].slice(0);
    let routine = wroutine.sort((x, y) => {
      let ts = new Date().toLocaleDateString();
      let a = new Date(ts + " " + x.time.split("-")[0]).getTime();
      let b = new Date(ts + " " + y.time.split("-")[0]).getTime();
      return a - b;
    });
    return routine;
  },
  getHoliday: state => (date,wnddate) => {
    if(wnddate == 'SUNDAY' || wnddate == 'SATURDAY') return {
      isHoliday: true, cause: "It's " + wnddate, holidayspan: null
    };
    let cause = "";
    let holidayspan = null;
    let isHoliday = false;
    let today = date.toLocaleDateString();
    state.holidays.forEach(day => {
      let i_day = new Date(day.s_date).toLocaleDateString();
      if (day.single) {
        if (i_day == today) {
          isHoliday = true;
          cause = day.NAME;
          holidayspan = date.toLocaleDateString('en-GB')
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
          isHoliday = true;
          cause = day.NAME;
          holidayspan =
            from.toLocaleDateString("en-GB") +
            " - " +
            to.toLocaleDateString("en-GB");
        }
      }
    });
    return  {isHoliday: isHoliday, cause: cause, holidayspan: holidayspan};
  }
};

export const actions = {
  async getinitState({ commit }) {
    commit("startloading");
    try {
      let res = await this.$axios.get(`/me/init`);
      if (res.status == 200) {
        commit("initState", res.data);
        commit("finishloading");
        return true;
      }
    } catch (err) {
      commit("finishloading");
      console.log(err);
    }
  },

  //Task Actions
  async addtaskAct({ commit, getters }, newtask) {
    this.$axios
      .post(`/extra/task/create`, { task: newtask })
      .then(res => {
        if (res.status == 200) {
          commit("addtask", res.data);
        }
      })
      .catch(err => alert("Sorry..something went wrong!"));
  },
  async toggletaskAct({ commit, getters }, { id, done }) {
    commit("toggletask", { id: id, done: !done });
    this.$axios
      .get(`/extra/task/toggle/${id}/${!done}`)
      .catch(err => commit("toggletask", { id: id, done: !done }));
  },
  async deletetaskAct({ commit, getters }, task) {
    commit("removetask", task);
    this.$axios
      .get(`/extra/task/delete/${task.id}`)
      .catch(err => commit("addtask", task));
  },

  //Assignments and Exam Actions
  async addaxAct({ commit, getters }, newax) {
    this.$axios
      .post(`/extra/ax/create`, { ax: newax })
      .then(res => {
        if (res.status == 200) {
          commit("addax", res.data);
        }
      })
      .catch(err => alert("something went wrong!"));
  },
  async toggleaxAct({ commit, getters }, { id, done }) {
    commit("toggleax", { id: id, done: !done });
    this.$axios
      .get(`/extra/ax/toggle/${id}/${!done}`)
      .catch(err => commit("toggleax", { id: id, done: !done }));
  },
  async deleteaxAct({ commit, getters }, ax) {
    commit("removeax", ax);
    this.$axios
      .get(`/extra/ax/delete/${ax.id}`)
      .catch(err => commit("addax", ax));
  },
  //Holiday Actions
  async setHolidaysAct({ commit }) {
    fetch("https://strapi.app.madvertlabs.com/nitr-holidays")
      .then(res => res.json())
      .then(res => {
        commit("setHolidays", res);
      });
  }
};
