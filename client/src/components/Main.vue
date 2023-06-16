<template>
  <div class="main">
    <MainNavbar/>
    <router-view/>
  </div>
</template>

<script>
import MainNavbar from "@/components/MainNavbar";
import {mapMutations} from "vuex";


export default {
  name: "Main",
  components: {
    MainNavbar
  },
  methods: {
    ...mapMutations(["setLoggedIn"])
  },

  // mounted() {
  //   document.addEventListener('keydown', (event)=> {
  //     if (event.code === 'Escape') {
  //       this.setLoggedIn('');
  //       window.location.href ='/';
  //     }
  //   });
  //
  // }

}
</script>

<style scoped>

</style>