<script setup>
import { ref, computed } from 'vue'
import { sendFormData } from '../fakeApi'

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const isFormValid = computed(
  () => username.value.length && password.value.length
)

const buttonText = computed(() => (loading.value ? 'Loading...' : 'Submit'))

async function submitForm() {
  loading.value = true
  error.value = ''
  try {
    await sendFormData(username.value, password.value)
  } catch (e) {
    error.value = e
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section>
    <div class="error">{{ error }}</div>
    <form @submit.prevent="submitForm">
      <label for="username">
        Login
        <input v-model="username" type="text" id="username" />
      </label>
      <label for="password">
        Password
        <input v-model="password" type="password" id="password" />
      </label>
      <button :disabled="!isFormValid || loading" type="submit">
        {{ buttonText }}
      </button>
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
  width: 450px;
  margin-bottom: 15px;
  font-size: 18px;
}

.error {
  width: 450px;
  color: red;
  margin-bottom: 15px;
  font-size: 18px;
}
</style>
