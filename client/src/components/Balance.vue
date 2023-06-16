<template>
  <div class="balance">
    <div class="balance-title">
      <fa icon="fa-solid fa-sack-dollar" />
    </div>
    <div class="acct">
      {{getBalance}}
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex"

export default {
  name: "Balance",
  computed: mapGetters(["getUser", "getBalance"]),
  methods: mapMutations(["setBalance"]),
  mounted() {
    fetch("http://localhost:4000/user/balance", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: this.getUser})
    })
        .then(res => res.json())
        .then(
            (result) => {
              this.setBalance(result.balance)
            }
        )
  }
}
</script>

<style scoped>
  .balance{
    background: #1cd3a2;
    margin: 0 40px;
    padding: 20px;
    border: 1px solid black;
  }

  .balance-title {
    font-size: 24px;
    margin-bottom: 5px;
    font-weight: inherit;
  }

  .acct {
    font-size: 36px;
    text-align: center;
  }
</style>