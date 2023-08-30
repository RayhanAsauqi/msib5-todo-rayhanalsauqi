<script setup lang="ts">
import ButtonAll from "../components/Button/ButtonAll.vue";
import ButtonActive from "../components/Button/ButtonActive.vue";
import ButtonCompleted from "../components/Button/ButtonCompleted.vue";
import Card from "../components/Card.vue";
import ButtonClearCompleted from "../components/Button/ButtonClearCompleted.vue";
import Input from "../components/Input.vue";
import { onMounted } from "vue";
import { useTodoStore } from "../stores/todoStore";

const todoStore = useTodoStore();

onMounted(() => {
  todoStore.fetchTodoList();
});
</script>

<template>
  <h1 class="flex justify-center mb-7 mt-5 text-5xl">Todo</h1>
  <Input
    @keyup.enter="todoStore.pushTodoList"
    v-model="todoStore.inputTodoList"
  />
  <div class="flex mb-3">
    <div class="flex justify-between gap-5 mt-5">
      <div class="mt-3 mr-2">
        <p class="font-bold">{{ todoStore.activeCountTodos }} items length</p>
      </div>
      <div>
        <ButtonAll
          @click="todoStore.filterAll"
          :classButtonAll="todoStore.filterMode === 'all'"
          label="All"
        />
      </div>
      <div>
        <ButtonActive
          @click="todoStore.filterActiveTodos"
          :classButtonActive="todoStore.filterMode === 'active'"
          label="Active"
        />
      </div>
      <div>
        <ButtonCompleted
          @click="todoStore.filterTodosCompleted"
          :classButtonCompleted="todoStore.filterMode === 'completed'"
          label="Completed"
        />
      </div>
    </div>
    <div class="mt-5 ml-3">
      <ButtonClearCompleted @click="todoStore.clearCompletedTodos" />
    </div>
  </div>
  <div v-for="todos in todoStore.filterTodoList" :key="todos.id">
    <Card
      :todos="todos"
      :updateStatusTodoCompleted="todoStore.updateStatusTodoCompleted"
      :deleteTodoList="todoStore.deleteTodoList"
    />
  </div>


</template>
