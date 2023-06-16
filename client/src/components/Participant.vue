<template>
  <div class="participant">
    <div class="participant-info">
      <div class="name">
        <fa  icon="fa-solid fa-user"/>  {{userdata.name}}
      </div>
      <div class="balance">
        <fa icon="fa-solid fa-money-check-dollar" size="1x"/> {{userdata.balance}}
      </div>
    </div>
    <div class="share-info-wrap">
      <div class="share-info" v-for="(shareData, share) in userstock">
        <div class="share-name">
          Компания: {{share.toUpperCase()}}
        </div>
        <table>
          <tr><th>Дата покупки</th><th>Количество</th><th v-if="getDate">Доход</th><th v-if="getDate">Суммарный доход</th></tr>
          <tr v-for="(dateData, date) in shareData">
            <td>{{date}}</td>
            <td>{{dateData.amount}}</td>

            <td
                v-if="getDate">{{getCourse.filter(item => item[0] === share)[0]
                ?
                parseFloat((getCourse.filter(item => item[0] === share)[0][1] - dateData.cost).toFixed(4))
                :
                ""}}</td>
            <td v-if="getDate">{{getCourse.filter(item => item[0] === share)[0]
                ?
                parseFloat(((getCourse.filter(item => item[0] === share)[0][1] - dateData.cost) * dateData.amount).toFixed(4))
                :
                ""}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {
  name: "Participant",
  props: ["userdata", "userstock"],
  computed: mapGetters(["getCourse", "getDate"]),

  mounted() {
    //console.log(this.userstock);
  }
}
</script>

<style scoped>

.share-info {
  display: flex;
  width: 620px;
  margin: 20px auto;
  justify-content: space-between;
}

.share-name {
  align-self: center;
  font-size: 18px;
}

.participant {
  background: #1cd3a2;
  width: 700px;
  margin: 35px auto;
  padding: 15px;
  border: 1px solid black;
}

.participant-info {
  text-align: left;
  margin-left: 40px;

}
.name {
  font-size: 27px;
  margin-bottom: 5px;
}

.balance {
  font-size: 19px;
  width: fit-content;
}

table {
  border-collapse: collapse;
}

td, th {
  border: 1px solid black;
  padding: 5px;
  background-color: mintcream;
}
</style>