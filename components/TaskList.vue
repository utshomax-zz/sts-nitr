<template>
      <div class="h-auto md:h-full md:pb-4 md:pr-3 md:pl-2 p-2 overflow-auto mb-16">
        <div class="h-full minscrn shadowc flex flex-col relative">
          <div class="overviewtext w-full flex justify-evenly items-center pt-2 text-md font-medium">What To Do</div>
          <div class="shedules md:mt-8 mt-5">
            <div class="inp mb-3">
              <form class="flex" :class="{'text-gray-500':$nuxt.isOffline}" @submit.prevent="addtask">
                <input type="text" v-model="taskinp.text" required class="ml-5 focus:outline-none border-b-2 w-9/12 border-indigo-900" />
                <div class="flex justify-evenly w-3/12 items-center">
                <svg @click="taskinp.imp = !taskinp.imp" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 cursor-pointer" :fill="[taskinp.imp ? 'orange': 'none']" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg><button :disabled="$nuxt.isOffline" type="submit" class=" cursor-pointer">
                  <svg class="w-5 h-6" fill="none" stroke="currentColor" viewBox="-24 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" transform="rotate(90)"></path></svg>
                </button>
                  </div>
                </form>
              </div>
            </div>
            <transition-group class="overflow-x-auto" name="list" tag="div">
            <div class="tasks" v-for="task in tasklist" :key="task.id">
              <div class="onesub mb-3">
                <div class="rounded min-h-12 h-auto flex items-center justify-between mx-5 border-2 border-indigo-400" :class="[task.imp ? ' border-yellow-500':'']">
                  <div class="font-bold h-auto break-words text-sm ml-3" :class="[task.done ? 'line-through text-gray-400': '']">{{task.text}}</div>
                  <button v-if="!task.done" :disabled="$nuxt.isOffline" @click="toggletask(task.id,task.done)" class="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="black">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  </button>
                  <button v-else :disabled="$nuxt.isOffline" class=" cursor-pointer" @click="deletetask(task)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            </transition-group>
          </div>
        </div>
</template>

<script>
import {mapState} from 'vuex'
export default 
{
  data(){
    return{
      taskinp:{
        text:null,
        done:false,
        imp:false
      },
      currentid: null
    }
  },
  computed:{
    ...mapState(['tasklist']),
  },
  methods:{
    addtask:function(){
      let task = {...this.taskinp}
      this.$store.dispatch('addtaskAct',task)
      this.taskinp.text = ''
      this.taskinp.imp = false
    },
    toggletask:function(id,done){
        this.$store.dispatch('toggletaskAct',{id:id,done:done})
    },
    deletetask:function(task){
       this.$store.dispatch('deletetaskAct',task)
    }
  }
}
</script>

<style>
</style>