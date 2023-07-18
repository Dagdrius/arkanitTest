<template>
  <v-sheet
    class="d-flex align-center justify-center flex-wrap text-center mx-auto"
    height="100%"
    rounded
    max-width="90rem"
    width="100%"
  >
    <v-card
      class="d-flex flex-column rounded-lg sx-card"
      width="500px"
      height="570px"
    >
      <div class="alginclass">
        <div class="sx-upperCard">
          <v-sheet class="sx-logo">{{ $t("logo") }} </v-sheet>
          <v-card-title class="sx-title">{{
            veryFirstForm ? $t("firstTitleText") : $t("secondTitleText")
          }}</v-card-title>

          <v-card-subtitle>
            {{
              veryFirstForm ? $t("firstSubTitleText") : $t("secondSubTitleText")
            }}
          </v-card-subtitle>
        </div>
        <div class="sx-formClass">
          <template v-if="veryFirstForm">
            <PhoneFormStep @form-submitted="firstFormSubed" />
          </template>
          <template v-else>
            <CodeFormStep
              :propSessionID="sessionID"
              @backButtonClicked="backButtonClicked"
            />
          </template>
        </div>
      </div>
      <div class="sx_bottomCard">
        <FooterForm />
      </div>
    </v-card>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import PhoneFormStep from "./PhoneFormStep.vue";
import CodeFormStep from "./CodeFormStep.vue";
import FooterForm from "./FooterForm.vue";
let sessionID;

const { t } = useI18n({ useScope: "global" });

const backButtonClicked = (emittedNotify: boolean) => {
  console.log(`back button emitted ${emittedNotify}`);

  veryFirstForm.value = emittedNotify;
};

function firstFormSubed(emittedNum: string, emittedID: string) {
  sessionID = emittedID;
  veryFirstForm.value = !veryFirstForm.value;
  console.log(sessionID);
}

const veryFirstForm = ref(true);
</script>

<style scoped>
.alginclass {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}
.sx-card {
  border-radius: 0.5rem !important;
  border: 1px solid;
  border-color: #dfdfdf;
  padding: 50px 30px 24px 30px;
}

.sx-upperCard {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: stretch;
}

.sx-formClass {
  width: 100%;
}
.sx_bottomCard {
  color: #666 !important;
  padding-top: 50px;
}
.sx-logo {
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
.sx-title {
  font-family: Roboto;
  font-size: 2rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding: 0 !important;
  margin-bottom: 14px;
}
</style>
