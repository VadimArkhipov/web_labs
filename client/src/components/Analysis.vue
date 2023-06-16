<template>
  <div class="analysis">
    <h1>Статистика купленных акций</h1>
    <AnalysisTable/>
    <br>
<!--    <button v-if="showPurchase" class='change-show' @click="changeShow"> Продать акции </button>-->
<!--    <button v-if="showSale" class='change-show' @click="changeShow"> Купить акции </button>-->
    <Purchase v-if="getDate"/>
    <Sale v-if="getDate"/>
  </div>
</template>

<script>
import AnalysisTable from "@/components/AnalysisTable";
import Purchase from "@/components/Purchase";
import Sale from "@/components/Sale";
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "Analysis",
  data(){
    return {
      showPurchase: true,
      showSale: false,
    }

  },
  components: {
    AnalysisTable, Purchase, Sale
  },
  computed: mapGetters(["getDate"]),
  methods: {
    ...mapMutations(["refreshDate"]),
    click(){
      console.log("click")
    },
    changeShow(){
      this.showSale = !this.showSale;
      this.showPurchase = !this.showPurchase;
    }
  }
}
</script>

<style scoped>
  .analysis {
    height: calc(100vh - 75px);
    background: mintcream;
    text-align: center;
    overflow: auto;
  }

  h1 {
    padding-top: 30px;
    font-size: 40px;
    padding-bottom: 30px;
    margin: 0;
  }

  .change-show{
    background-color: #1cd3a2;
    border-radius: 5px;
    font-family: Jura;
    font-size: 20px;
  }
</style>