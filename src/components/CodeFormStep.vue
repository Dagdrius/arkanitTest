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
import { ref } from "vue";
import { check, send } from "../utils/api";
import WhatsApp from "./icons/WhatsApp.vue";
import Telegram from "./icons/Telegram.vue";
import Viber from "./icons/Viber.vue";
import SMS from "./icons/SMS.vue";
import BackIcon from "./icons/BackIcon.vue";

const props = defineProps({
  propSessionID: String,
});

// eslint-disable-next-line vue/no-setup-props-destructure
const sessionID = ref("");
// eslint-disable-next-line vue/no-setup-props-destructure
sessionID.value = props.propSessionID;
console.log(`second form ${sessionID.value}`);
const phoneCode = ref("");

const authTypes = ref(["WhatsApp", "Telegram", "Viber", "SMS"]);
const rules = [
  async (value: string) => {
    if (value) {
      // Perform your custom validation checks here
      // Example: Check if the response status is 410
      if (checkError.value && checkError.value === "410") {
        return "Your password is invalid :(";
      }

      // Return true if the validation passes
      return true;
    }

    // Return an error message if the validation fails
    return "You must enter a first name.";
  },
];

const checkError = ref("");
const emit = defineEmits<{
  (e: "backButtonClicked", notifier: boolean): void;
}>();

const notify = ref(true);

const backButton = () => {
  console.log(notify.value);

  emit("backButtonClicked", notify.value);
};

const submitCodeForm = async () => {
  console.log(typeof phoneCode.value);
  console.log(sessionID.value);

  try {
    const checkRes = await check(sessionID.value, phoneCode.value);
    console.log(checkRes.data);
  } catch (error) {
    console.log(error.message);
  }
};
const showButton = ref(true);
const countdown = ref(30);

const startCountdown = () => {
  let timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      showButton.value = true;
      clearInterval(timer);
    }
  }, 1000);
};

const sendButtonAPI = async () => {
  console.log(selectedType.value);
  const sendRes = await send(sessionID.value, selectedType.value);
  showButton.value = false;
  countdown.value = 30;
  startCountdown();
};

const selectedType = ref("");
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