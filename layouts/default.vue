<template>
  <div>
     <Nuxt/>
     <BottomNav class="md:hidden"> </BottomNav>
  </div>
</template>

<script>
import BottomNav from "~/components/BottomNav";
export default {
  components: { BottomNav },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,500,700&display=swap');
html {
  overflow: hidden;
  font-family: 'Montserrat', sans-serif;
}
</style>
