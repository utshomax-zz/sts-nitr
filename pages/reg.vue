<template>
  <!-- <div class="h-screen w-screen flex items-center justify-center bg-gray-300"> -->
   <setup v-if="!done" @init_setup_done="setUser($event)"/>
   <slot-setup  :user="user" v-else/>
</template>

<script>
import Setup from '~/components/Setup.vue'
import SlotSetup from '~/components/SlotSetup.vue'
export default {
  layout:'login',
  auth:false,
  components: { Setup, SlotSetup },
  data(){
    return{
      done:false,
      user: null,
    }
  },
  methods:{
    setUser(user){
      this.user = user
      this.done = true
    }
  }
  }
</script>
<style>

</style>
