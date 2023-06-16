<template>
  <div class="analysis-table">
    <table>
      <tr>
        <th>Акция</th>
        <th>Дата</th>
        <th>Количество</th>
        <th>Стоимость</th>
        <th v-if="getDate">Доход</th>
        <th v-if="getDate">Суммарный доход</th>
      </tr>
      <tr v-for="purchase in getPurchases">
        <td>{{purchase.share.toUpperCase()}}</td>
        <td>{{purchase.date}}</td>
        <td>{{purchase.amount}}</td>
        <td>{{purchase.cost}}</td>
        <td
            :id="purchase.share+purchase.date" v-if="getDate">{{getCourse.filter(item => item[0] === purchase.share)[0]
            ?
            parseFloat((getCourse.filter(item => item[0] === purchase.share)[0][1] - purchase.cost).toFixed(4))
            :
            ""}}</td>
        <td
            :id="purchase.share+purchase.date+'full'" v-if="getDate">{{getCourse.filter(item => item[0] === purchase.share)[0]
            ?
            parseFloat(((getCourse.filter(item => item[0] === purchase.share)[0][1] - purchase.cost) * purchase.amount).toFixed(4))
            :
            ""}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex"

export default {
  name: "AnalysisTable",
  components: {
  },
  computed: mapGetters(["getCourse", "getDate", "getUser", "getPurchases"]),
  methods: {
      ...mapMutations(["setPurchases"])
  },
  mounted() {
    fetch("http://localhost:4000/myPurchases", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user: this.getUser})
    })
        .then(res => res.json())
        .then(
            (result) => {
              this.setPurchases(result)
            }
        )
  }
}
</script>

<style scoped>
h1 {
  font-size: 40px;
}

.analysis-table {
  display: flex;
  justify-content: space-around;
}

table {
  font-size: 20px;
  border-radius: 15px;
  border-spacing: 0;
  text-align: center;
}

th {
  background: #1cd3a2;
  color: black;
  padding: 10px 20px;
  font-size: 26px;
}

th, td {
  border-style: solid;
  border-width: 1px 1px 1px 1px;
  border-color: black;
}

td {
  padding: 10px 20px;
  background: aliceblue;
}

</style>