<template>
  <v-form @submit.prevent>
    <v-select
      :no-data-text="$t('noDataText')"
      v-model="selected"
      density="comfortable"
      class="mb-10"
      hide-details
      icon
      return-object
      single-line
      item-title="name"
      item-text="name"
      item-value="name"
      :label="$t('countryLabel')"
      :items="phoneCodes"
      variant="outlined"
      :menu-icon="SelectIcon"
    >
      <template #prepend-item>
        <v-list-item>
          <v-list-item-content>
            <v-text-field
              clearable
              class="sx_searchText"
              variant="solo"
              :placeholder="$t('searchPlaceholder')"
              @input="searchCountry"
              v-model="searchTerm"
              :prepend-inner-icon="SearchIcon"
              :clear-icon="ClearIcon"
              hide-details
            ></v-text-field>
          </v-list-item-content>
        </v-list-item>
      </template>
      <template #no-data>
        <p
          style="color: #9e9e9e; text-align: center; padding: 16px 0"
          class="sx_searchResults"
        >
          {{ $t("noDataText") }}
        </p>
      </template>
      <template #selection="{ item }">
        <p>
          {{ item.value.name }}
        </p>
      </template>
      <template #item="{ item, props }">
        <v-list-item v-bind="props" :title="undefined">
          <template #prepend>
            <div style="padding-right: 10px">
              <country-flag :country="item.value.code" size="small" /></div
          ></template>
          <div
            class="sx_searchResults"
            style="display: flex; justify-content: space-between"
          >
            <p>
              {{ item.value.name }}
            </p>
            <p style="font-weight: 700">
              {{ item.value.dial_code }}
            </p>
          </div>
        </v-list-item>
      </template>
    </v-select>
    <v-text-field
      density="comfortable"
      v-model="phoneNum"
      :rules="rules"
      :label="$t('phoneLabel')"
      variant="outlined"
      class="sx_customMargin"
    ></v-text-field>

    <v-card-actions class="sx_formAction p-0">
      <v-btn
        type="submit"
        block
        class="p-0 sx_formButton"
        @click="submitNumForm"
        >{{ $t("buttonText") }}</v-btn
      >
    </v-card-actions>
  </v-form>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { Ref } from "vue/dist/vue.js";
import { useI18n } from "vue-i18n";
import { arrayPhoneCodes } from "./phoneCodes";
import { create } from "../utils/api";
import { phone } from "phone";
import SelectIcon from "./icons/SelectIcon.vue";
import SearchIcon from "./icons/SearchIcon.vue";
import ClearIcon from "./icons/ClearIcon.vue";
import CountryFlag from "vue-country-flag-next";

interface IPhoneCode {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
}
const selected: Ref<IPhoneCode | undefined> = ref();
const searchTerm = ref("");
const phoneCodes: Ref<IPhoneCode[]> = ref(arrayPhoneCodes);
const phoneCodesCopy: IPhoneCode[] = arrayPhoneCodes;

const { t: $t } = useI18n({ useScope: "global" });

const phoneError = $t("phoneError");
const rules = [
  (value: string) => {
    if (phone(value).isValid) return true;
    return $t("phoneError");
  },
];

const emit = defineEmits<{
  (e: "formSubmitted", num: string, sesID: string): void;
}>();

const phoneNum = ref();
watch(selected, () => (phoneNum.value = selected.value.dial_code));

const selectedCountry = ref("");
const sessionID = ref("");
const submitNumForm = async () => {
  console.log(
    "Должен переходить на следующий этап формы, но апи не работает. Чтобы перейти вручную закоментируй 138-139 строку в PhoneFormStep.vue"
  );

  const createRes = await create(phoneNum.value);
  sessionID.value = createRes.data.session_id;

  emit("formSubmitted", phoneNum.value, sessionID.value);
};

const searchCountry = () => {
  if (!searchTerm.value) {
    phoneCodes.value = phoneCodesCopy;
  }

  phoneCodes.value = phoneCodesCopy.filter((item) => {
    return item.name.toLowerCase().indexOf(searchTerm.value.toLowerCase()) > -1;
  });
};
</script>

<style scoped>
.sx_formButton {
  color: #fff;
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
  background-color: #007aff;
  height: 55px !important;

  border-radius: 4px;
}

.sx_customMargin {
  margin-bottom: 30px;
}
.sx_searchText {
  font-family: SF Pro Display;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 16.8px */
  letter-spacing: 0.07px;
}
.sx_searchResults {
  font-family: SF Pro Display;
  font-size: 16px !important;

  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 1.2rem */
  letter-spacing: -0.02563rem;
}
</style>
