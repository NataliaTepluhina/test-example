<script setup>
import { ref, computed } from "vue";

const username = ref("");
const password = ref("");

const isFormValid = computed(
  () => username.value.length && password.value.length
);
</script>

<template>
  <section>
    <form @submit.prevent>
      <label for="username">
        Login
        <input v-model="username" type="text" id="username" />
      </label>
      <label for="password">
        Password
        <input v-model="password" type="password" id="password" />
      </label>
      <button :disabled="!isFormValid" type="submit">Submit</button>
    </form>
  </section>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

label {
  display: flex;
  justify-content: space-between;
  width: 250px;
  margin-bottom: 15px;
  font-size: 18px;
}
</style>
