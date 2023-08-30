<script setup lang="ts">
defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event: any) => {
  emit("update:modelValue", event.target.value);
};
</script>

<template>
  <input
    type="text"
    :value="modelValue"
    @input="updateValue"
    class="w-full h-11 rounded-lg shadow-md bg-slate-950"
  />
</template>
