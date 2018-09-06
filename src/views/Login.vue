<template>
  <div class="login">
    <div class="login__item login__qrcode">
      <qrcode :value="qrStr" :options="{ size: 200 }"></qrcode>
      <p>打开微信小程序《剪切板》扫一扫</p>
    </div>
    <div class="login__item login__mini">
      <div><img src="../assets/clipboard.jpeg" width="200" height="200" /></div>
      <p>小程序《剪切板》</p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueQrcode from '@xkeshi/vue-qrcode'
import uuidv4 from 'uuid/v4'
import { login } from '../api'
import { getStr, saveStr } from '../utils'
import { LOGIN_KEY } from '../const'

Vue.component(VueQrcode.name, VueQrcode)

export default {
  name: 'login',
  data() {
    return {
      qrStr: ''
    }
  },
  beforeMount() {
    if (this.isLogin()) {
      this.$router.replace('/home')
    }
  },
  mounted() {
    this.qrStr = uuidv4()
    this.$nextTick(async _ => {
      // register({ userid: '8aff88971e29df074a8b3eab0b7e65a1', nonce: this.qrStr })
      if (!this.isLogin()) {
        const res = await login({ nonce: this.qrStr })
        if (res.success === 1) {
          saveStr(LOGIN_KEY, res.data.userid)
        }
      }
    })
  },
  methods: {
    isLogin() {
      return !!getStr(LOGIN_KEY)
    }
  }
}
</script>

<style scoped>
.login {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.login__item {
  margin-top: 50px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
