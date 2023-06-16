<template>
  <div class="stock">
    <table>
      <caption>Акции</caption>
      <tr>
        <th>Акция</th>
        <th>Количество</th>
      </tr>
      <tr v-for="share of getDataForTable">
        <td>{{share[0].toUpperCase()}}</td>
        <td>{{share[1]}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex"

export default {
  name: "Stock",
  computed: mapGetters(["getStock",  "getPurchases", "getDataForTable"]),
  methods: {
    ...mapMutations(["setPurchases"])
  },
  mounted() {
    // console.log(this.getDataForTable);
  }
}
</script>

<style scoped>

  caption {
    font-size: 32px;
    margin-bottom: 5px;
  }

  .stock {
    margin: 0 15px;
    padding: 0 20px;
  }

  table {
    font-size: 17px;
    border-radius: 15px;
    border-spacing: 0;
    text-align: center;
  }

  th {
    background: #1cd3a2;
    color: white;
    padding: 10px 20px;
    font-size: 18px;
  }

  th, td {
    border-style: solid;
    border-width: 1px 1px 1px 1px;
    border-color: black;
  }

  td {
    padding: 10px 20px;
    background-color: aliceblue;

  }
</style>