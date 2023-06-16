<template>
  <div class="dialog-graphic">

    <h1>График акций {{getChosenChart.toUpperCase()}}</h1>
    <div class="chart">
      <Line :chart-data="getChartData" :height="200"/>
    </div>
    <button class="close" @click="$emit('closedialog')">&lt;Назад </button>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import {Line} from "vue-chartjs"
import {Chart, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement} from "chart.js";
Chart.register(Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement)

export default {
  name: "DialogGraphic",
  components: {
    Line
  },
  computed: mapGetters(["getChartData", "getChosenChart", "getChartData"]),
}
</script>

<style scoped>

  .chart {
    border: 1px solid black;
    width: 80%;
    height: 80%;
    margin-top: 2%;
    align-self: center;
  }

  h1 {
    margin-bottom: 0;
  }

  .dialog-graphic{
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 80%;
    height: 90%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    background: mintcream;
    position: absolute;
    z-index: 10;
    border: 2px solid black;
    border-radius: 20px;
  }

  .close {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    margin: auto;
    width: 150px;
    font-size: 22px;
    height: 35px;
    align-self: center;
    background: #1cd3a2;
    font-family: Jura;
    border-radius: 15px;
  }

  .close:hover {
    background: #98ff98;
    transition: all 0.3s ease-in-out;
  }

</style>