<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <section>
    <form @submit.prevent>
      <label for="username">
        Login
        <input type="text" id="username" />
      </label>
      <label for="password">
        Password
        <input type="password" id="password" />
      </label>
      <button type="submit">Submit</button>
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
