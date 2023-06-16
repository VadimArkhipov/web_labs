<template>
  <div class="shares-cost">
    <div class="costs">
      <table>
        <tr>
          <th>Акция</th>
          <th>Стоимость</th>
        </tr>
        <tr v-for="share of getCourse">
          <td class="open"
              @click="onClick(share[0])"
              title="Открыть график акции"
          >{{share[0].toUpperCase()}}</td>
          <td :id="share[0] + 'cost'">{{share[1]}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"


export default {
  name: "SharesCost",
  methods: {
    ...mapMutations(["chooseChart"]),
    onClick(share){
      this.chooseChart(share)
      this.$emit('opendialog')
    }
  },
  computed: mapGetters(["getCourse"]),
}
</script>

<style scoped>

  .open {
    cursor: pointer;
  }

  .open:hover {
    background: #98ff98;
  }

  .shares-cost {
    margin: 0 10px;
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
    color: black;
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
    background: aliceblue;
  }
</style>