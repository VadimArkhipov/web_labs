<template>
  <div class="purchase-container">
    <h1 class="header">Покупка</h1>
    <SelectionTable/>
    <div class="amount-input">
      <input id="num" title="От 1 до 100 акций за раз!" type="number" min="1" max="100" value="1"
             @change="saveAmount">
    </div>
    <div class="total-cost">
      <h1>Стоимость</h1>
      <div class="cost">
        {{parseFloat((getAmount * getCost).toFixed(4))}}
      </div>
    </div>
    <div class="purchase-button">
      <button v-bind:disabled="!(getAmount > 0 && getAmount <= 100 && getChosen && getCost*getAmount < getBalance)"
              class="buy" @click="click">Купить</button>
    </div>
  </div>
</template>

<script>
import SelectionTable from "@/components/SelectionTable";
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "PurchaseContainer",
  components: {
    SelectionTable
  },
  mounted() {
    document.getElementById("num").value = this.getAmount
  },
  computed: mapGetters(["getAmount", "getCost", "getChosen", "getDate", "getBalance", "getUser"]),
  methods: {
    ...mapMutations(["setAmount", "refreshAmount", "refreshCost", "refreshChosen",
                     "decreaseBalance", "addShare"]),
    click() {
      this.purchaseShare()
      document.getElementById("num").value = 1
      this.refreshAmount()
      this.refreshCost()
      this.refreshChosen()
    },
    saveAmount(event){
      this.setAmount(event.target.value)
    },
    purchaseShare(){
      const data = {
        user: this.getUser,
        share: this.getChosen,
        amount: this.getAmount,
        cost: this.getCost,
        date: this.getDate
      }
      this.decreaseBalance(parseFloat((data.cost * data.amount).toFixed(4)))
      this.changeStock(data)
      this.addShare({share: data.share, amount: data.amount, date: data.date, cost: data.cost})
    },
    changeStock(data) {
      fetch("http://localhost:4000/user/purchase", {
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

  .purchase-container {
    width: 100%;
    padding-top: 20px;
    text-align: center;
    background: mintcream;
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
    padding-left: 12px;
    font-family: Jura;
  }

  .purchase-button {
    text-align: center;
    padding-top: 60px;
  }

  .buy {
    font-size: 22px;
    height: 35px;
    align-self: center;
    background:#1cd3a2;
    font-family: Jura;
    border-radius: 10px;
  }

  .buy:hover {
    background: #98ff98;
    transition: all 0.3s ease-in-out;
  }
</style>