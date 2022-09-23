<template>
  <div class="login">
    <div class="loginTop">欢迎登录</div>
    <div class="loginContent">
      <input
        type="email"
        name="email"
        class="email"
        v-model="email"
        placeholder="请输入邮箱"
      />

      <input
        type="password"
        name="password"
        class="password"
        v-model="password"
        placeholder="请输入密码"
      />
    </div>
    <button class="btn" @click="Login">登录</button>
  </div>
</template>
<script>
import { getLoginUser } from "../request/api/home";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  mounted() {
    console.log(localStorage.getItem("token"));
  },
  methods: {
    Login: async function () {
      let res = await this.$store.dispatch("getLogin", {
        email: this.email,
        password: this.password,
      });

      if (res.data.code === 200) {
        //返回code等于200，登录成功，跳转个人中心
        this.$store.commit("updateIsLogin", true);
        this.$store.commit("updateToken", res.data.token);
        let result = await getLoginUser(res.data.account.id);
        this.$store.commit("updateUser", result);
        this.$router.push("/infoUser");
      } else {
        alert("邮箱或者密码错误");
        this.password = "";
      }
    },
  },
};
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 13.34rem;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(248, 97, 97);
  .loginTop {
    margin-top: 10%;
    font-size: 50px;
    color: aliceblue;
  }
  .loginContent {
    width: 100%;
    height: 40%;
    text-align: center;

    .email,
    .password {
      margin-top: 20%;
      width: 70%;
      height: 20%;
      border-radius: 20px;
      border: none;
    }
  }
  .btn {
    border: none;
    border-radius: 20px;
    margin-top: 25%;
    width: 30%;
    height: 30px;
  }
}
</style>