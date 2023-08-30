import { defineStore } from "pinia";
import axios from "axios";

export type dataTodo = {
  id: number;
  title: string;
  status: boolean;
};

export const useTodoStore = defineStore("todo", {
  state: (): {
    todos: dataTodo[];
    filterTodoList: dataTodo[];
    inputTodoList: string;
    filterMode: string;
  } => ({
    todos: [],
    filterTodoList: [],
    inputTodoList: "",
    filterMode: "all",
  }),
  getters: {
    statusTodos: (state) => state.todos.filter((todo) => todo.status),
    activeTodos: (state) => state.todos.filter((todo) => !todo.status),
    activeCountTodos: (state) =>
      state.todos.filter((todo) => !todo.status).length,
    clearTodos: (state) => state.todos.filter((todo) => todo.id),
  },
  actions: {
    async fetchTodoList() {
      try {
        const response = await axios.get(
          "https://64e8c85699cf45b15fe021dd.mockapi.io/todoList"
        );
        this.todos = response.data;
        this.filterTodoList = response.data;
      } catch (error) {
        console.log("Error fetcing data", error);
      }
    },
    async pushTodoList() {
      try {
        if (this.inputTodoList !== "") {
          this;
          const response = await axios.post(
            "https://64e8c85699cf45b15fe021dd.mockapi.io/todoList",
            {
              title: this.inputTodoList,
              status: false,
            }
          );
          this.todos.unshift(response.data);
          this.filterTodoList = this.todos;
          this.inputTodoList = "";
        } else {
          window.alert("Please fill title!");
        }
      } catch (error) {
        console.log("Push todo error error:", error);
      }
    },
    async updateStatusTodoCompleted(id: number, completed: boolean) {
      try {
        await axios.put(
          `https://64e8c85699cf45b15fe021dd.mockapi.io/todoList/${id}`,
          {
            status: completed,
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
    async deleteTodoList(id: number) {
      try {
        await axios.delete(
          `https://64e8c85699cf45b15fe021dd.mockapi.io/todoList/${id}`
        );
        this.todos = this.todos.filter((todo) => todo.id !== id);
        this.filterTodoList = this.todos;
      } catch (error) {
        console.log("error delete todo :", error);
      }
    },

    filterActiveTodos() {
      this.filterTodoList = this.activeTodos;
      this.filterMode = "active";
    },
    filterAll() {
      this.filterTodoList = this.todos;
      this.filterMode = "all";
    },
    filterTodosCompleted() {
      this.filterTodoList = this.statusTodos;
      this.filterMode = "completed";
    },
    clearCompletedTodos() {
      this.todos = this.todos.filter((todo) => !todo.status);
      this.filterTodoList = this.todos;
    },
  },
});
