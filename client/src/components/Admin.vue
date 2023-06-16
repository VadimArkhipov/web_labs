<template>
  <div class="admin">
    <h1>Список Брокеров</h1>
    <div class="participants-list">
      <Participant v-for="user of getUsers" v-bind:userdata="user" v-bind:userstock="getUsersStock[user.email]"/>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex"
import Participant from "@/components/Participant";

export default {
  name: "Admin",
  components: {
    Participant
  },
  computed: mapGetters(["getUsers", "getUsersStock"]),
  methods: {
    ...mapMutations(["loadUsers", "loadUsersStock"])
  },
  mounted() {
    // Загрузка с сервера списка брокеров
    fetch("http://localhost:4000/brokers", {
      method: "GET"
    })
        .then(res => res.json())
        .then(
            (result) => {
              this.loadUsers(result)
            }
        )

    // Загрузка с сервера списка купленных акций
    fetch("http://localhost:4000/load/stock", {
      method: "GET"
    })
        .then(res => res.json())
        .then(
            (result) => {
              this.loadUsersStock(result);
            }
        )
  }
}
</script>

<style scoped>
  .admin {
    height: calc(100vh - 75px);
    background: mintcream;
    text-align: center;
    overflow: auto;
  }

  h1 {
    padding-top: 30px;
    font-size: 40px;
    margin: 0;
    background-color: mintcream;
  }
</style>