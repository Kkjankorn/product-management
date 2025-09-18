<template>
  <div class="border border-gray-700 p-4 rounded-lg bg-gray-900">
    <h3 class="text-lg font-semibold mb-3 text-gray-100">{{ editItem ? 'Edit' : 'Add' }} Product</h3>
    <div class="mb-3">
      <label class="block text-gray-300 mb-1">Name</label>
      <input v-model="form.name" class="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-gray-100" />
    </div>
    <div class="mb-3">
      <label class="block text-gray-300 mb-1">Price</label>
      <input type="number" v-model.number="form.price" class="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-gray-100" />
    </div>
    <div class="mb-3">
      <label class="block text-gray-300 mb-1">Category</label>
      <select v-model="form.categoryId" class="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-800 text-gray-100">
        <option value="">-- select --</option>
        <option v-for="c in categories" :key="c._id" :value="c._id">{{ c.name }}</option>
      </select>
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
  props: { categories: Array, editItem: Object },
  setup(props, { emit }) {
    const form = ref({ name: '', price: 0, categoryId: '' });
    const error = ref('');
    watch(()=>props.editItem, (v)=>{
      if (v) form.value = { name: v.name, price: v.price, categoryId: v.categoryId? v.categoryId._id || v.categoryId : '' };
      else form.value = { name: '', price: 0, categoryId: '' };
    }, { immediate: true });

    const save = () => {
      error.value = '';
      if (!form.value.name || !form.value.name.trim()) return error.value = 'Name is required';
      if (!form.value.categoryId) return error.value = 'Category is required';
      emit('save', { ...form.value });
    };

    return { form, error, save };
  }
};
</script>
