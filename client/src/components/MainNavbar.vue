<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="navbar-wrap">
        <ul class="navbar-menu">
          <li><router-link to="/user/admin"> <fa icon="fa-solid fa-users"/></router-link></li>
          <li><router-link to="/user/analysis"><fa icon="fa-solid fa-money-bill-trend-up"/></router-link></li>
          <li class="logout"><router-link @click="this.setLoggedIn('')" to="/"><fa icon="fa-solid fa-arrow-right-from-bracket"/></router-link></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import {mapMutations} from "vuex"
import {Fa} from "@fortawesome/vue-fontawesome";

export default {
  name: "MainNavbar",
  components: {Fa},
  methods: {
    ...mapMutations(["setLoggedIn"])
  }
}
</script>

<style scoped>
  .navbar {
    width: 100%;
    height: 75px;
    background: #1cd3a2;
    position: relative;
  }

  .navbar-wrap {
    width: 100vw;
  }

  .navbar .nav-container {
    height: inherit;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .navbar-menu {
    list-style-type: none;
    display: flex;
    justify-content: space-around;
    margin-top: 0;
    padding-left: 0;
    margin-bottom: 0;
  }

  .navbar-menu li {
    display: inline-block;
  }

  .navbar-menu li a {
    display: inline-block;
    color: white;
    text-decoration: none;
    padding: 0 35px;
    line-height: 50px;
    font-size: 28px;
  }

  .navbar-menu li a:hover {
    display: inline-block;
    color: black;
    background: #98ff98;
    text-decoration: none;
    border-radius: 38px;
    font-size: 28px;
    font-weight: 400;
    transition: all 0.15s ease-in-out;
  }

  .logout a:hover {
    display: inline-block !important;
    color: white !important;
    background: crimson !important;
    text-decoration: none !important;
    opacity: 1 !important;
    border-radius: 38px !important;
    font-size: 28px !important;
    font-weight: 400 !important;
    transition: all 0.15s ease-in-out !important;
  }

</style>