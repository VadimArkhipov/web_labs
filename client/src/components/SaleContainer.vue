<template>
  <div class="sale-container">
    <h1 class="header">Продажа</h1>
    <SelectionTable/>
    <div class="amount-input">
      <input id="numSell" title="От 1 до 100 акций за раз!" type="number" min="1" max="100" value="1"
             @change="saveAmount"
      >
    </div>
    <div class="total-cost">
      <h1>Пополнение</h1>
      <div class="cost">
        {{parseFloat((getAmount * getCost).toFixed(4))}}
      </div>
    </div>
    <div class="sell-button">
      <button v-bind:disabled="!(getAmount > 0 && getAmount <= 100 && getChosen
              && (getChosen ? getAmount <= getDataForTable.filter(item => item[0] === getChosen)[0][1] : 100))"
              class="sell" @click="click">Продать</button>
    </div>
  </div>
</template>

<script>
import SelectionTable from "@/components/SelectionTable";
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "SaleContainer",
  components: {
    SelectionTable
  },
  mounted() {
    document.getElementById("numSell").value = this.getAmount;
  },
  computed: mapGetters(["getAmount", "getCost", "getChosen", "getUser", "getDate", "getStock", "getDataForTable"]),
  methods: {
    ...mapMutations(["setAmount", "refreshAmount", "refreshCost", "refreshChosen", "increaseBalance",
                     "removeShare"]),
    click() {
      this.saleShare();
      document.getElementById("numSell").value = 1;
      this.refreshAmount();
      this.refreshCost();
      this.refreshChosen();
    },
    saveAmount(event){
      this.setAmount(event.target.value)
    },
    saleShare() {
      const data = {
        user: this.getUser,
        share: this.getChosen,
        amount: this.getAmount,
        cost: this.getCost,
        date: this.getDate
      }
      this.increaseBalance(parseFloat((data.cost * data.amount).toFixed(4)))
      this.changeStock(data)
      this.removeShare({share: data.share, amount: data.amount})
    },
    changeStock(data) {
      fetch("http://localhost:4000/user/sale", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
          .then(res => res.json())
          .then(
              (result) => {
                console.log(result.state)
              }
          )
    }
  }
}
</script>

<style scoped>

  .header {
    padding-top: 30px;
    font-size: 40px;
    padding-bottom: 30px;
    margin: 0;
  }

  .sale-container {
    width: 100%;
    padding-top: 20px;
    text-align: center;
  }

  .amount-input {
    text-align: center;
  }

  .total-cost {
    text-align: center;
  }

  h1 {
    margin-top: 65px;
  }

  .cost {
    font-size: 22px;
  }

  input{
    text-align: center;
    font-size: 26px;
    background: #1cd3a2;
    font-family: Jura;
    padding-left: 12px;
  }

  .sell-button {
    text-align: center;
    padding-top: 60px;
  }

  .sell {
    font-size: 22px;
    height: 35px;
    align-self: center;
    background: #1cd3a2;
    font-family: Jura;
    border: 1px solid black;
    border-radius: 10px;
  }

  .sell:hover {
    background: #98ff98;
    transition: all 0.3s ease-in-out;
  }
</style>