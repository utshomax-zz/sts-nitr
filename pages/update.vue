<template>
<div class="h-screen w-screen flex items-center justify-center bg-gray-300 p-1">
  <div class="shadow w-full md:h-4/5 bg-white md:w-6/12 h-full pt-3 rounded-sm">
    <div class="w-full h-full relative overflow-hidden">
      <form @submit.prevent="finishSetup" class="flex flex-col items-center max-h-full overflow-auto">
      <div class="w-full headers sticky top-0 bg-white z-30 text-center font-medium flex pl-6 pb-3">
        <h1 class="text-xl pr-1">SETUP</h1>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <div class="text-white z-10 bg-indigo-500 md:w-8 md:h-8 w-6 h-6 hover:cursor-pointer absolute top-0 right-2"><svg @click="addsub" class="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg></div>
        <nuxt-link to="/" class="text-white z-10 bg-indigo-500 md:w-8 md:h-8 w-6 h-6 hover:cursor-pointer absolute top-0 right-10 md:right-12"> <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg> </nuxt-link>
      </div>
      <div
        class="
          w-full
          h-full
          flex
          justify-center
          items-center
          px-1
        "
      >
        <div class="w-full relative flex flex-col">
            <div v-for="(elm,index) in slots" :key="elm.id" class="w-full flex items-center justify-around text-center">
              <input
                class="p-2 w-7/12 mb-2 outline-none border-b-2 border-indigo-500"
                required
                type="text"
                placeholder="SUBJECT NAME"
                v-model="elm.subject"
                :id="elm.id"
              />
              <input
                class="p-2 w-3/12 mb-2 outline-none border-b-2 border-indigo-500"
                required
                type="text"
                placeholder="SLOT"
                oninput="this.value = this.value.toUpperCase()"
                maxlength="2"
                onkeypress="return event.charCode != 32"
                v-model="elm.slot"
              />
              <div class=" cursor-pointer" @click="deleteslot(index)"> 
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg></div>
            </div>
        </div>
      </div>
       <button
              type="submit"
              :disabled="$nuxt.isOffline"
              :class="{'bg-gray-500':$nuxt.isOffline}"
              class="
              text-white
                outline-none
                hover:cursor-pointer
                p-2
                mr-1
                mt-4
                bg-indigo-500
                border-none
                w-6/12
                mb-8
                md:w-4/12
              "
            >UPDATE !</button></form>
    </div>
  </div>
</div>
</template>

<script>

export default {
    layout:'login',
  data() {
    return {
        slots:[]
    };
  },
  mounted(){
      var slot = this.$store.state.slotlist
      this.slots = JSON.parse(JSON.stringify(slot))
  },
  computed:{
    current(){
      if(this.slots.length>0){
        return this.slots.slice(-1)[0].id
      }
      else{
        return 1
      }
    }
  },
  methods:{
    addsub: function(){
      this.slots.push({id: this.current+1, subject: null, slot: null})
    },
    finishSetup: function(){
      this.$auth.user && this.slots.length > 0 ? this.backtoserver() : alert('Please Retry!')
    },
    deleteslot(index){
        this.slots.splice(index,1)
    },
    backtoserver:function(){
      let data = {
        slotlist: this.slots
      }
      this.$axios.put('/me/slot',data).then( (res)=> {
      if(res.status == 200 ){
          this.$store.commit('updateSlotlist',res.data.slotlist)
          window.location.href = '/'
      } 
        })
        .catch(function (error) {
            console.log(error);
        });
    }
  }
};
</script>

<style>
::-webkit-scrollbar {
  width: 3px;
}
</style>