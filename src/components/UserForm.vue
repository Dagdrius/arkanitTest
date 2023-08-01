<template>
  <div class="alginclass">
    <div class="sx_upperCard">
      <v-sheet class="sx_logo">{{ $t("logo") }} </v-sheet>
      <v-card-title class="sx_title">{{
        veryFirstForm ? $t("firstTitleText") : $t("secondTitleText")
      }}</v-card-title>

      <v-card-subtitle>
        {{
          veryFirstForm
            ? $t("firstSubTitleText")
            : $t("secondSubTitleText", { phoneNum: i18nformtest })
        }}
      </v-card-subtitle>
    </div>
    <div class="sx_formClass">
      <template v-if="veryFirstForm">
        <PhoneFormStep @form-submitted="firstFormSubed" />
      </template>
      <template v-else>
        <CodeFormStep
          :propSessionID="sessionID"
          @backButtonClicked="backButtonClicked"
          @telgram-not-auth="onTelgramNotAuth"
        />
      </template>
    </div>

    <div class="sx_bottomCard">
      <FooterForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import PhoneFormStep from "./PhoneFormStep.vue";
import CodeFormStep from "./CodeFormStep.vue";
import FooterForm from "./FooterForm.vue";
let sessionID;

const { t } = useI18n({ useScope: "global" });

const emit = defineEmits<{
  (e: "telgramNotAuth", telegramNotify: boolean, emitSessionID, emitPhoneNumber):void;
}>();
const props = defineProps({
  propSessionID: String,
  propNumber: String,
});
console.log("Back again?: " + props.propNumber, props.propSessionID)



const backButtonClicked = (emittedNotify: boolean) => {
  veryFirstForm.value = emittedNotify;
};



// Changing formNumber to the user input
const formNumber = ref("");
let i18nformtest = formNumber.value;


function firstFormSubed(emittedNum: string, emittedID: string) {
  console.log(emittedNum);
  formNumber.value = emittedNum;

  sessionID = emittedID;
  veryFirstForm.value = !veryFirstForm.value;
}

const telegramAuth = ref(false);
// Notify about telegram not authorized

const onTelgramNotAuth = (emittedTelegramNotify: boolean) =>{
  telegramAuth.value = emittedTelegramNotify;
  console.log("im notified about it, don't worry")
  emit("telgramNotAuth", telegramAuth.value, sessionID, formNumber.value)
}


const veryFirstForm = ref(true);

// eslint-disable-next-line vue/no-setup-props-destructure
if (props.propNumber){
  // eslint-disable-next-line vue/no-setup-props-destructure
  sessionID = props.propSessionID;
  // eslint-disable-next-line vue/no-setup-props-destructure
  i18nformtest = props.propNumber
  veryFirstForm.value = !veryFirstForm.value
  console.log('if statement good' + formNumber.value)
}
else(console.log("not yet Else"))
watch(formNumber, () => (i18nformtest = formNumber.value));
</script>

<style scoped>
.alginclass {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}
.sx_card {
  border-radius: 0.5rem !important;
  border: 1px solid;
  border-color: #dfdfdf;
  padding: 50px 30px 24px 30px;
}

.sx_upperCard {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: stretch;
}

.sx_formClass {
  width: 100%;
}
.sx_bottomCard {
  color: #666 !important;
  padding-top: 50px;
}
.sx_logo {
  background: #f8f8f8;
  height: 40px;
  max-width: 300px;
  margin-bottom: 30px;
  font-family: Roboto;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #989898;
  padding: 12px 20px;
}
.sx_title {
  font-family: Roboto;
  font-size: 2rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding: 0 !important;
  margin-bottom: 14px;
}
</style>
