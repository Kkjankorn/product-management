<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 font-sans text-gray-100">
    <div class="max-w-3xl mx-auto">
      <h2 class="text-2xl font-bold mb-4 text-blue-300">Product Management (Vue + Vite)</h2>
      <nav class="mb-6 flex gap-4">
        <router-link to="/products" class="text-blue-400 hover:underline">Products</router-link>
        <span class="text-gray-600">|</span>
        <router-link to="/categories" class="text-blue-400 hover:underline">Categories</router-link>
      </nav>
      <router-view />
    </div>
  </div>
</template>
