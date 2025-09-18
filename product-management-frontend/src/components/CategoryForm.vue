<template>
  <div class="border border-gray-700 p-4 rounded-lg bg-gray-900">
    <h3 class="text-lg font-semibold mb-3 text-gray-100">{{ editItem ? 'Edit' : 'Add' }} Category</h3>
    <div class="mb-3">
      <label class="block text-gray-300 mb-1">Name</label>
      <input v-model="name" class="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-gray-100" />
    </div>
    <div class="flex gap-2 mt-2">
      <button @click="save" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Save</button>
      <button @click="$emit('close')" class="bg-gray-700 text-gray-200 px-4 py-2 rounded hover:bg-gray-600 transition">Cancel</button>
    </div>
    <div v-if="error" class="text-red-400 mt-2">{{ error }}</div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
export default {
  props: { editItem: Object },
  setup(props, { emit }) {
    const name = ref('');
    const error = ref('');
    watch(()=>props.editItem, (v)=>{ name.value = v ? v.name : '' }, { immediate: true });

    const save = () => {
      error.value = '';
      if (!name.value || !name.value.trim()) return error.value = 'Name is required';
      emit('save', { name: name.value.trim() });
    };
    return { name, error, save };
  }
};
</script>
