<script setup>
const props = defineProps({
  disabled: {
    type: Boolean,
    required: true,
  },
  buttonText: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['confirm'])
</script>

<template>
  <button :disabled="disabled" @click="$emit('confirm')">
    {{ buttonText }}
  </button>
</template>
