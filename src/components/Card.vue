<script setup lang="ts">
// import { onMounted } from "vue";
// import { useTodoStore } from "../stores/todoStore";
import { dataTodo } from "../stores/todoStore";

defineProps<{
  todos: dataTodo;
  updateStatusTodoCompleted: (id: number, status: boolean) => void;
  deleteTodoList: (id: number) => void;
}>();
// const todoStore = useTodoStore();

// onMounted(() => {
//   todoStore.fetchTodoList();
// });
</script>

<template>
  <div
    class="w-full p-3 mb-3 bg-[#3A3A3A] flex items-center justify-between rounded-md shadow-md"
  >
    <div class="flex items-center gap-x-3">
      <input
        @change="updateStatusTodoCompleted(todos.id, todos.status)"
        type="checkbox"
        v-model="todos.status"
      />
      <p
        :class="`text-base leading-relaxed tracking-tight ${
          todos.status ? 'line-through' : ''
        }`"
      >
        {{ todos.title }}
      </p>
    </div>
    <button @click="deleteTodoList(todos.id)" class="text-red-700">
      Delete X
    </button>
  </div>
</template>
<!-- 

<input
id="username"
type="text"
class="border rounded w-96 py-2 px-1 focus:outline-none focus:ring focus:border-blue-300 mt-6 text-black"
placeholder="Enter your username"
v-model="todoStore.inputTodoList"
@keydown.enter="todoStore.pushTodoList"
/> -->
