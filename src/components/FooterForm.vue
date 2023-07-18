<template>
  <div class="sx_footerFlex">
    <v-select
      flat
      class="sx_bottomText"
      v-model="selectedLanguage"
      hide-details
      :items="languages"
      variant="solo"
    >
      <template #selection="{ item }">
        <span class="sx_bottomText select">{{ item.value }}</span>
      </template>
      <template #item="{ item, props }">
        <v-list-item v-bind="props" :title="undefined">
          <span class="sx_bottomText">{{ item.value }}</span>
        </v-list-item>
      </template>
    </v-select>
    <div class="sx_links sx_bottomText">
      <a class="text-body">{{ $t("termsText") }}</a>
      <a class="text-body">{{ $t("confidentialityText") }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import { useI18n } from "vue-i18n";
const { t, locale } = useI18n({ useScope: "global" });
console.log(locale.value);

const selectedLanguage = ref("Русский");

watch(
  selectedLanguage,
  () => (locale.value = selectedLanguage.value === "Русский" ? "ru" : "en")
);

const languages = ["Русский", "English"];
</script>

<style scoped>
.sx_footerFlex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  gap: 159px;
  margin-top: -16px;
}
.sx_links {
  display: flex;
  gap: 24px;
}
.sx_bottomText {
  padding-inline-start: 0px !important;
  color: #666 !important;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
}
</style>
