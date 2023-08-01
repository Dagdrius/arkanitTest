<template>
  <div class="container">
    <!-- The button will be taken out of the normal flow and aligned to the left -->
    <v-btn
      :icon="GreyBackIcon"
      variant="plain"
      @click="backButton"
      class="out-of-flow"
    ></v-btn>
  </div>
  <div class="upperCard">
    <v-img
      :width="120"
      class="telegramIcon"
      aspect-ratio="1/1"
      src="https://api.dev.kod.mobi/storage/icons/telegram.png"
    ></v-img>

    <v-card-title class="sx_title">
 
      <div class="text-wrap">{{ $t("telegramTitleText") }}</div>
    </v-card-title>

    <v-card-text>
      <div class="card-text text-wrap" :class="{ notAuthText: notAuthorized }">
        {{
          notAuthorized
            ? $t("telegramNotAuthSubtitleText")
            : $t("telegramSubtitleText")
        }}
      </div>
    </v-card-text>

    <v-card-actions class="sx_formAction p-0 justify-center">
      <div class="sx_secondFormAction">
        <v-btn
          type="submit"
          height="55px"
          class="p-0 sx_formButton sx_nextButton"
          @click="openTelegramLink"
        >
          {{ $t("telegramAuthButton") }}
        </v-btn>
        <v-btn
          type="button"
          variant="text"
          height="55px"
          class="p-0 sx_formButton sx_backButton"
          @click="checkStatusButton"
        >
          {{ $t("telegrammCheckButton") }}
        </v-btn>
        
      </div>
    </v-card-actions>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import GreyBackIcon from "./icons/GreyBackIcon.vue";
import { send } from "@/utils/api";

const props = defineProps({
  propSessionID: String,
});
const emit = defineEmits<{
  (e: "backButtonClicked", notifier: boolean): void;
}>();

 const sessionID = ref("");
 // eslint-disable-next-line vue/no-setup-props-destructure
 sessionID.value = props.propSessionID

const backButton = () => {
  emit("backButtonClicked", notAuthorized.value )
  console.log("back button clicked");
};


const checkStatusButton = async () => {
  
  
  console.log("Telegram ID: " + sessionID.value)
  try {
    const sendRes = await send(
      sessionID.value,
      'telegram'
    );

    // Use the API response data
    console.log("API response data:", sendRes);
  
  } catch (error) {
    const notRegistered = "Error: The user is not registered on the channel";
    if (error == notRegistered) {
      console.log("Get fucked, lmao");
      console.log(error)
      
      notAuthorized.value = !notAuthorized.value ? !notAuthorized.value : notAuthorized.value;
    }
  }
};

const openTelegramLink = () => {
  const telegramBotURL = "https://t.me/kodmobi_bot";
  window.open(telegramBotURL, "_blank");
};

const notAuthorized = ref(false);
</script>

<style scoped>
.text-wrap {
  word-wrap: break-word;
  max-width: 100%;
}
.card-text {
  margin-bottom: 70px;
  color: #808080
}
.notAuthText {
  color: #eb4036;
}

.sx_formButton {
  text-align: center;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 36px; /* 225% */
  text-transform: none;
  min-height: 55px;
}
.sx_formAction {
  padding: 0 !important;

  text-align: center;

  height: 55px !important;

  border-radius: 4px;
}
.sx_secondFormAction {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}
.sx_nextButton {
  color: #fff !important;
  flex: 1;

  background-color: #007aff;
  margin-bottom: 10px;
}
.sx_backButton {
  color: #007aff;
  flex: 1;
}
.sx_title {
  font-family: Roboto;
  font-size: 2rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding: 0 !important;
  margin: 30px 0;
}
.telegramIcon {
  margin: auto;
}
.mt-n {
  margin-top: -50px;
}
.container {
  position: relative;
}
.out-of-flow {
  position: absolute;
  top: -45px;
  left: -210px;
}
</style>
