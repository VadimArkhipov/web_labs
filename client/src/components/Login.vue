<template>
  <div class="login">
    <form @submit.prevent="login()">
      <h1>Войти в систему</h1>
      <div class="groups-wrap">
        <div class="group">
          <label for="email">Введите Email:</label>
          <input autocomplete="off" type="email" id="email" v-model="email" required>
        </div>
        <div class="group">
          <label for="password">Введите Пароль:</label>
          <input autocomplete="off" type="password" id="password" v-model="password" required >
        </div>
      </div>
      <div class="submit">
        <button type="submit">Войти</button>
      </div>
    </form>
  </div>
</template>

<script>
import {mapMutations} from "vuex"

export default {
  name: "Login",
  data (){
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    ...mapMutations(["setLoggedIn"]),
    login(){
      fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: this.email, password: this.password})
      })
          .then(res => res.json())
          .then(
              (result) => {
                if (result.status){
                  this.setLoggedIn(result.status)
                  this.$router.push("../user")
                } else {
                  this.email = ""
                  this.password = ""
                  console.log('Неудачная попытка входа в систему')
                }
              }
          )
    }
  }
}
</script>

<style scoped>

  h1 {
    margin-top: 0;
  }

  .login {
    height: 100vh;
    display: flex;
    background-color: mintcream;
  }

  h1 {
    width: 390px;
    margin: 20px 0 0 30px;
    padding-bottom: 5px;
  }

  form {
    border-radius: 15px;
    border: 2px solid black;
    background: #1cd3a2;
    text-align: center;
    align-self: center;
    width: 450px;
    height: 500px;
    margin: 0 auto;
    padding: 20px;
  }

  .group {
    margin: 10px;
    padding: 5px;
  }

  label {
    padding-left: 10px;
  }

  label {
    font-size: 20px;
  }

  .groups-wrap {
    margin-top: 50px;
  }

  input {
    font-size: 19px;
    margin-top: 10px;
    height: 40px;
    padding-left: 12px;
    width: 400px;
    font-family: Jura;
    background-color: mintcream;
    border-radius: 5px;
    border: 2px solid black;
    text-align: center;
  }

  .submit {
    text-align: center;
    margin-top: 40px;
  }

  button {
    width: 130px;
    cursor: pointer;
    padding: 10px 30px;
    margin-top: 30px;
    height: 50px;
    border: 1px solid black;
    background: mintcream;
    font-size: 22px;
    font-family: Jura;
    border-radius: 13px;
  }

  button:hover {
    font-weight: bold;
    background: #98ff98;
  }
</style>