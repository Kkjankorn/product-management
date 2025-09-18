<template>
  <div>
    <table class="min-w-full bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
      <thead class="bg-gray-800">
        <tr>
          <th class="py-2 px-4 text-left font-semibold text-gray-300">Name</th>
          <th class="py-2 px-4 text-left font-semibold text-gray-300">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in categories" :key="c._id" class="border-t border-gray-800 hover:bg-gray-800">
          <td class="py-2 px-4 text-gray-100">{{ c.name }}</td>
          <td class="py-2 px-4 flex gap-2">
            <button @click="$emit('edit', c)" class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition">Edit</button>
            <button @click="$emit('delete', c)" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">Delete</button>
          </td>
        </tr>
        <tr v-if="categories.length===0">
          <td colspan="2" class="py-4 text-center text-gray-400">No categories</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default { props: ['categories'] };
</script>
