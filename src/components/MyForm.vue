<script setup>
import { ref, computed } from 'vue'
import { sendFormData } from '../fakeApi'
import ConfirmButton from './ConfirmButton.vue'

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const loggedIn = ref(false)

const isFormValid = computed(
  () => username.value.length && password.value.length
)

const buttonText = computed(() => (loading.value ? 'Loading...' : 'Submit'))

async function submitForm() {
  loading.value = true
  error.value = ''
  try {
    await sendFormData(username.value, password.value)
    loggedIn.value = true
  } catch (e) {
    error.value = e
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section>
    <div v-if="error" class="error" data-testid="error">{{ error }}</div>
    <form v-if="!loggedIn" data-testid="form">
      <label for="username">
        Login
        <input
          v-model="username"
          type="text"
          id="username"
          data-testid="username"
        />
      </label>
      <label for="password">
        Password
        <input
          v-model="password"
          type="password"
          id="password"
          data-testid="password"
        />
      </label>
      <ConfirmButton
        :disabled="!isFormValid || loading"
        :buttonText="buttonText"
        @confirm="submitForm"
      />
    </form>
    <div v-else data-testid="welcome-message">Welcome, {{ username }}!</div>
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
