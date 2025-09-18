<template>
  <div>
    <table class="min-w-full bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
      <thead class="bg-gray-800">
        <tr>
          <th class="py-2 px-4 text-left font-semibold text-gray-300">Name</th>
          <th class="py-2 px-4 text-left font-semibold text-gray-300">Price</th>
          <th class="py-2 px-4 text-left font-semibold text-gray-300">Category</th>
          <th class="py-2 px-4 text-left font-semibold text-gray-300">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in products" :key="p._id" class="border-t border-gray-800 hover:bg-gray-800">
          <td class="py-2 px-4 text-gray-100">{{ p.name }}</td>
          <td class="py-2 px-4 text-gray-100">{{ p.price }}</td>
          <td class="py-2 px-4 text-gray-100">{{ p.categoryId ? p.categoryId.name : '-' }}</td>
          <td class="py-2 px-4 flex gap-2">
            <button @click="$emit('edit', p)" class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition">Edit</button>
            <button @click="$emit('delete', p)" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">Delete</button>
          </td>
        </tr>
        <tr v-if="products.length===0">
          <td colspan="4" class="py-4 text-center text-gray-400">No products</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['products']
};
</script>
