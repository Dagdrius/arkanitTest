<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue/dist/vue.js";

interface IStateItem {
  name: string;
  shorthand: string;
}
const selected: Ref<IStateItem | undefined> = ref();
const states: IStateItem[] = [
  { name: "California", shorthand: "CA" },
  { name: "Colorado", shorthand: "CO" },
];
</script>

<template>
  <div>
    <p>You selected: {{ selected?.name }}</p>
    <v-autocomplete
      label="Vuetify Select"
      :items="states"
      v-model="selected"
      item-title="name"
      item-value="name"
      return-object
      single-line
    >
      <template v-slot:selection="{ item }">
        <p>
          {{ item.value.name }}
          <span>{{ item.value.shorthand }}</span>
        </p>
      </template>
      <template v-slot:item="{ item, props }">
        <v-list-item v-bind="props" :title="undefined">
          <p>
            {{ item.value.name }}
            <span>{{ item.value.shorthand }}</span>
          </p>
        </v-list-item>
      </template>
    </v-autocomplete>
  </div>
</template>
