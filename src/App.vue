<template>
  <v-app>
    <v-main>
      <Main />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Main from "@/components/Main.vue";
</script>

<style>
.sx_bottomText > div > div > div > div {
  padding: 0;
}
.sx-formClass form .v-input .v-input__control {
  height: 55px;
}
.v-messages__message {
  text-align: left;
  color: #eb4036;
}

.sx_searchText .v-field {
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: none;
}
</style>
