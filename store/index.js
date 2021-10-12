export const state = () => ({
    overview:[],
    tasklist:[],
    axlist:[], //Assignment and exam State
    loading:true,
    slotlist:[],
    user:null,
  })
  
export const mutations = {
    initState(state,payload){
        state.overview = payload.overview.sort((x,y)=> {
          let ts = new Date().toLocaleDateString()
          let a = new Date(ts + ' '+ x.time.split('-')[0]).getTime()
          let b = new Date(ts + ' '+ y.time.split('-')[0]).getTime()
          return a - b
        })
        state.tasklist = payload.tasklist
        state.slotlist = payload.slotlist
        state.axlist = payload.axlist
    },
    //User init
    initUser(state,payload){
        state.user = payload
    },
    //loaderMutation
    startloading(state){
      state.loading = true
    },
    finishloading(state){
        state.loading = false
    },
    updateSlotlist(state, slotlist){
      state.slotlist = slotlist
    },
    //Task Mutations
    addtask(state, task) {
      state.tasklist.unshift(task)
    },
    removetask(state, task) {
      state.tasklist.splice(state.tasklist.findIndex(x=>x.id == task.id), 1)
    },
    toggletask(state, {id,done}) {
      state.tasklist.find((o, i) => {
        if (o.id === id) {
            state.tasklist[i].done = done
            return true; 
        }
    });
    },
    //AX mutations
    addax(state, ax) {
      state.axlist.push(ax)
    },
    removeax(state, ax) {
      state.axlist.splice(state.axlist.findIndex(x=>x.id == ax.id), 1)
    },
    toggleax(state, {id,done}) {
      state.axlist.find((o, i) => {
        if (o.id === id) {
            state.axlist[i].done = done
            return true; // stop searching
        }
    });
    }
  }
  
export const getters = {
  getUserRoll(state){
    return state.user.roll
  },
  getSubList(state){
    let subjects = []
    state.slotlist.forEach(slot => {
      subjects.push(slot.subject)
    });
    return subjects
  },
  getCount(state){
    let ax_c = state.axlist.filter(x=>x.type == 'Assignment').length
    let ex_c = state.axlist.filter(x=>x.type == 'Exam').length
    let cls_c = state.overview.length
    return [cls_c,ax_c,ex_c]
  },
  getSlots(state){
    return state.slotlist.slice(0)
  }
  
}

export const actions= {
    async getinitState({ commit },day) {
    commit('startloading')
    try{
      let res = await this.$axios.get(`/me/${day}`)
      if(res.status==200){
        commit('initState', res.data)
        commit('finishloading')
        return true
      }
    }
    catch(err){
      commit('finishloading')
      console.log(err)
      alert("Error ! Try Reloading this page.")
    }
  },

  //Task Actions
  async addtaskAct({ commit,getters },newtask){
    this.$axios.post(`/extra/task/create`,{task:newtask})
    .then((res)=>{
      if(res.status==200){
        commit('addtask',res.data)
      }
    })
    .catch((err) => 
    alert('Sorry..something went wrong!'))
  },
  async toggletaskAct({ commit,getters },{id,done}){
    commit('toggletask',{id:id,done:!done})
    this.$axios.get(`/extra/task/toggle/${id}/${!done}`)
    .catch((err) => 
    commit('toggletask',{id:id,done:!done}))
  },
  async deletetaskAct({ commit,getters },task){
    commit('removetask',task)
    this.$axios.get(`/extra/task/delete/${task.id}`)
    .catch((err) => 
    commit('addtask',task))
  },

  //Assignments and Exam Actions
  async addaxAct({ commit,getters },newax){
    this.$axios.post(`/extra/ax/create`,{ax:newax})
    .then((res)=>{
      if(res.status==200){
        commit('addax',res.data)
      }
    })
    .catch((err) => 
    alert('something went wrong!'))
  },
  async toggleaxAct({ commit,getters },{id,done}){
    commit('toggleax',{id:id,done:!done})
    this.$axios.get(`/extra/ax/toggle/${id}/${!done}`)
    .catch((err) => 
    commit('toggleax',{id:id,done:!done}))
  },
  async deleteaxAct({ commit,getters },ax){
    commit('removeax',ax)
    this.$axios.get(`/extra/ax/delete/${ax.id}`)
    .catch((err) => 
    commit('addax',ax))
  }
}