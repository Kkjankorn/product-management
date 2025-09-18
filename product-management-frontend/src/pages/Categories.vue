<template>
  <div>
    <h3 class="text-xl font-semibold mb-4 text-gray-100">Categories</h3>
    <div class="flex flex-col sm:flex-row gap-2 mb-4 items-center">
      <button @click="openAdd" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">+ Add Category</button>
      <input v-model="search" placeholder="search..." class="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-gray-900 text-gray-100" />
      <button @click="load" class="bg-gray-700 text-gray-100 px-4 py-2 rounded hover:bg-gray-600 transition">Search</button>
    </div>

    <div class="flex flex-col min-h-[400px]"> <!-- เพิ่ม min-h เพื่อความสูงคงที่ -->
      <CategoryTable :categories="categories" @edit="onEdit" @delete="onDelete" />

      <!-- Pagination Controls -->
      <div class="flex justify-center items-center gap-4 mt-auto mb-4">
        <button @click="prevPage" :disabled="page === 1" class="px-4 py-2 rounded bg-gray-700 text-gray-100 disabled:opacity-50">ย้อนกลับ</button>
        <span class="text-gray-200">หน้า {{ page }}</span>
        <button @click="nextPage" :disabled="categories.length < limit" class="px-4 py-2 rounded bg-gray-700 text-gray-100 disabled:opacity-50">ถัดไป</button>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md relative animate-fadeIn">
        <button @click="closeForm" class="absolute top-2 right-2 text-gray-400 hover:text-gray-200 text-xl">&times;</button>
        <CategoryForm :editItem="editing" @save="onSave" @close="closeForm" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import CategoryTable from '../components/CategoryTable.vue';
import CategoryForm from '../components/CategoryForm.vue';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../services/categoryService';

export default {
  components: { CategoryTable, CategoryForm },
  setup() {
    const categories = ref([]);
    const showForm = ref(false);
    const editing = ref(null);
    const search = ref('');
    const page = ref(1);
    const limit = 5;

    const load = async () => {
      const res = await getCategories(page.value, limit, search.value);
      categories.value = res.data || [];
    };

    const openAdd = () => { editing.value = null; showForm.value = true; };
    const closeForm = () => { showForm.value = false; editing.value = null; };
    const onEdit = (c) => { editing.value = c; showForm.value = true; };
    const onDelete = async (c) => {
      if (!confirm('Delete category?')) return;
      await deleteCategory(c._id);
      await load();
    };
    const onSave = async (payload) => {
      if (editing.value) {
        await updateCategory(editing.value._id, payload);
      } else {
        await createCategory(payload);
      }
      await load();
      closeForm();
    };

    const nextPage = async () => {
      if (categories.value.length === limit) {
        page.value++;
        await load();
      }
    };
    const prevPage = async () => {
      if (page.value > 1) {
        page.value--;
        await load();
      }
    };

    onMounted(async ()=>{ await load(); });

    return { categories, showForm, editing, openAdd, closeForm, onEdit, onDelete, onSave, search, load, page, nextPage, prevPage, limit };
  }
};
</script>

<style>
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fadeIn {
  animation: fadeIn 0.2s ease;
}
</style>
