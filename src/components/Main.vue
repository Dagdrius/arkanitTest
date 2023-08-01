<template>
  <v-sheet
    class="d-flex align-center justify-center flex-wrap text-center mx-auto"
    height="100%"
    rounded
    max-width="90rem"
    width="100%"
  >
    <v-card
      class="d-flex flex-column rounded-lg sx_card"
      width="500px"
      height="594px"
    >
      <div class="alginclass">
        <template v-if="checker">
          <UserForm @telgram-not-auth="telegramAuth" :propNumber="phoneNumber" :propSessionID="sessionID" />
        </template>
        <template v-else>
          <TelegramChecker @back-button-clicked="telegramBackButton"  :propSessionID="sessionID" />
        </template>
      </div>
    </v-card>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref } from "vue";
import UserForm from "./UserForm.vue";
import TelegramChecker from "./TelegramChecker.vue";


const telegramAuth = (emittedTelegramNotify: boolean, emittedID: string, emittedPhoneNumber) =>{
  sessionID.value = emittedID;
  phoneNumber.value = emittedPhoneNumber;
  console.log("Grandpa is notified!")
  console.log("Grandpa's ID: " + sessionID.value)
  console.log("Grandpa's phonenumber: " + phoneNumber.value)
  checker.value = !checker.value
}
const telegramBackButton = (emittedTelegramNotify: boolean) =>{
  checker.value = !checker.value
}
const sessionID = ref("")
const phoneNumber = ref("")
const checker = ref(true);
console.log("After the start / return: " + phoneNumber.value)


</script>

<style scoped>
.sx_card {
  border-radius: 0.5rem !important;
  border: 1px solid;
  border-color: #dfdfdf;
  padding: 50px 30px 24px 30px;
}
.alginclass {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}
</style>
