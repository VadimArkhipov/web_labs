<template>
  <div class="purchase">
    <DialogGraphic
        @closedialog="closeDialog"
        v-if="dialogOpened"/>
    <div class="user-date">
      <div class="current-date" v-if="getDate">
        <div class="date-title">
          <fa icon="fa-solid fa-calendar-days" />
        </div>
        <div class="date">
          {{getDate}}
        </div>
      </div>
      <SharesCost v-if="getDate" @opendialog="openDialog"/>
    </div>
    <PurchaseContainer v-if="getDate"/>
    <div class="user-stock" v-if="getDate">
      <Balance/>
      <Stock/>
    </div>
  </div>
</template>

<script>
import SharesCost from "@/components/SharesCost";
import Balance from "@/components/Balance";
import PurchaseContainer from "@/components/PurchaseContainer";
import DialogGraphic from "@/components/DialogGraphic";
import {mapGetters, mapMutations} from "vuex";
import Stock from "@/components/Stock";
import {Fa} from "@fortawesome/vue-fontawesome";

export default {
  name: "Purchase",
  components: {
    SharesCost, Balance, PurchaseContainer, DialogGraphic, Stock, Fa
  },
  data() {
    return {
      dialogOpened: false
    }
  },
  computed: mapGetters(["getDate"]),
  methods: {
    openDialog(){
      this.dialogOpened = true
    },
    closeDialog(){
      this.dialogOpened = false
    }
  }
}
</script>

<style scoped>

  .purchase {
    height: calc(100vh - 75px);
    display: flex;
    background: white;
    overflow: hidden;
  }
  .user-date{
    height: 100%;
    width: 450px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background: mintcream;
    z-index: 1;
  }

  .user-stock{
    height: 100%;
    width: 450px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background: mintcream;
    z-index: 1;
  }

  .current-date{
    background: #1cd3a2;
    border: 1px solid black;
    margin: 0 40px;
    padding: 20px;
  }

  .date-title {
    font-size: 24px;
    margin-bottom: 5px;
    font-weight: inherit;
  }

  .date {
    font-size: 36px;
    text-align: center;
  }
</style>