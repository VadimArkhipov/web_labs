<template>
  <div class="selection-table">
    <h1>Параметры</h1>
    <div class="table">
      <div class="row">
        <div class="cell" v-for="share of availableShares">
          <button v-bind:class="{chosen: getChosen === share}"
                  @click="chooseShare(share)" :id="share">{{share.toUpperCase()}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex"

export default {
  name: "SelectionTable",
  computed: mapGetters(["availableShares", "getChosen", "getCourse", "getBalance"]),
  methods: {
    ...mapMutations(["setChosen", "setCost"]),
    chooseShare(share) {
      this.setChosen(share);
      this.setCost(this.getCourse.filter(course => course[0] === share)[0][1]);
    }
  }
}
</script>

<style scoped>

  h1 {
    margin-top: 70px;
    text-align: center;
    margin-bottom: 35px;
  }

  .table {
    display: table;
    margin: 0 auto 30px auto;
    text-align: center;
  }

  .row {
    display: table-row;
  }

  .cell {
    display: table-cell;
    height: 40px;
    text-align: center;
    border: 1px solid black;
    border-radius: 40px;
  }

  button {
    width: 80px;
    height: 40px;
    font-size: 22px;
    background: #1cd3a2;
    border: none;
    border-radius: 40px;
    cursor: pointer;
  }

  button:hover{
    background: #98ff98;
  }

  .chosen, .chosen:hover {
    background: aliceblue;
    color: black;
    font-weight: bold;
  }
</style>