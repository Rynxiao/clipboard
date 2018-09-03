<template>
  <div class="login">
    <div class="login__qrcode">
      <qrcode value="Hello, World!" :options="{ size: 200 }"></qrcode>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueQrcode from '@xkeshi/vue-qrcode'

Vue.component(VueQrcode.name, VueQrcode)

export default {
  name: 'login'
}
</script>

<style scoped>
.login__qrcode {
  margin-top: 100px;
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
