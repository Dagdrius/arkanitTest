<template>
  <v-form @submit.prevent>
    <v-select
      active
      open-on-clear
      return-object
      density="comfortable"
      v-model="selectedType"
      hide-details
      class="mb-10"
      icon
      item-text="name"
      item-value="name"
      :label="$t('codeLabel')"
      :items="authTypes"
      variant="outlined"
      menu-icon="mdi-chevron-down"
      :disabled="disableSelect"
    >
      <template #item="{ item, props }">
        <v-list-item v-bind="props" :title="undefined">
          <template #prepend>
            <div
              class="sx_appendTypes"
              style="padding-right: 10px; margin-top: 5px"
            >
              <component :is="icons[item.value]"></component>
            </div>
          </template>
          <div
            class="sx_searchResults"
            style="display: flex; justify-content: space-between"
          >
            <p>
              {{ item.value }}
            </p>
          </div>
        </v-list-item>
      </template>
      ></v-select
    >

    <v-text-field
      density="comfortable"
      v-model="phoneCode"
      :rules="rules"
      :label="$t('codeInputLabel')"
      variant="outlined"
      class="sx_customMargin"
      ><template #append-inner
        ><template v-if="showButton">
          <div class="innerTextFieldButton">
            <v-btn variant="text" @click="sendButtonAPI">
              {{ $t("sendButtonAPIText") }}
            </v-btn>
          </div></template
        ><template v-else
          ><div class="sx_countdownText">{{ countdown }}</div></template
        ></template
      ></v-text-field
    >

    <v-card-actions class="sx_formAction p-0 justify-center">
      <div class="sx_secondFormAction">
        <v-btn
          type="button"
          variant="text"
          height="55px"
          class="p-0 sx_formButton sx_backButton"
          @click="backButton"
          :prepend-icon="BackIcon"
        >
          {{ $t("backButtonText") }}
        </v-btn>
        <v-btn
          type="submit"
          height="55px"
          class="p-0 sx_formButton sx_nextButton"
          @click="submitCodeForm"
        >
          {{ $t("buttonText") }}
        </v-btn>
      </div>
    </v-card-actions>
  </v-form>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { check, send } from "../utils/api";
import WhatsApp from "./icons/WhatsApp.vue";
import Telegram from "./icons/Telegram.vue";
import Viber from "./icons/Viber.vue";
import SMS from "./icons/SMS.vue";
import BackIcon from "./icons/BackIcon.vue";

const props = defineProps({
  propSessionID: String,
  propNumber: String,
});
const emit = defineEmits<{
  (e: "backButtonClicked", notifier: boolean): void;
  (e: "telgramNotAuth", telegramNotify: boolean): void;
}>();
const disableSelect = ref(false);

// eslint-disable-next-line vue/no-setup-props-destructure
const sessionID = ref("");
// eslint-disable-next-line vue/no-setup-props-destructure
sessionID.value = props.propSessionID;

const phoneCode = ref("");

const authTypes = ref(["WhatsApp", "Telegram", "Viber", "SMS"]);
const rules = [
  async (value: string) => {
    if (value) {
      if (checkError.value && checkError.value === "410") {
        return "Your password is invalid :(";
      }
      return true;
    }
    return "Код неверен";
  },
];

const checkError = ref("");

const notify = ref(true);

const backButton = () => {
  emit("backButtonClicked", notify.value);
};

const submitCodeForm = async () => {
  try {
    const checkRes = await check(sessionID.value, phoneCode.value);
    console.log(checkRes.data);
  } catch (error) {
    console.log(error.message);
  }
};
const showButton = ref(true);
const countdown = ref(10);

const startCountdown = () => {
  disableSelect.value = !disableSelect.value;
  let timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      showButton.value = true;
      clearInterval(timer);
      disableSelect.value = !disableSelect.value;
    }
  }, 1000);
};

const sendButtonAPI = async () => {
  try {
    const sendRes = await send(
      sessionID.value,
      selectedType.value.toLowerCase()
    );

    // Use the API response data
    console.log("API response data:", sendRes);

    // Continue with the rest of the logic
    showButton.value = false;
    countdown.value = 10;
    startCountdown();
  } catch (error) {
    const notRegistered = "Error: The user is not registered on the channel";
    if (error == notRegistered) {
      console.log("Kys");
      emit("telgramNotAuth", notify.value);
    }
  }
};

const selectedType = ref("WhatsApp");

watch(selectedType, () => {
  showButton.value = true;
});
const icons = { WhatsApp, Telegram, Viber, SMS };
</script>

<style scoped>
.sx_formButton {
  font-family: Roboto;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 36px;
  text-transform: none;
}
.sx_formAction {
  padding: 0 !important;

  text-align: center;

  height: 55px !important;

  border-radius: 4px;
}
.sx_secondFormAction {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.sx_nextButton {
  color: #fff !important;
  flex: 1;

  background-color: #007aff;
}
.sx_backButton {
  color: #007aff;
  flex: 1;
}
.innerTextFieldButton .v-btn {
  color: #007aff;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 171.429% */
  letter-spacing: 0.15px;
  text-transform: none;
}
.sx_customMargin {
  margin-bottom: 50px;
}

.sx_customMargin {
  margin-bottom: 30px;
}
.sx_appendTypes {
  font-family: SF Pro Display;
  font-size: 16px !important;

  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 1.2rem */
  letter-spacing: -0.02563rem;
}
.sx_countdownText {
  color: #9e9e9e;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 171.429% */
  letter-spacing: 0.15px;
}
</style>
