<template>
  <div class="home">
    <div class="home__list">
      <div
        class="task"
        v-for="(task, index) in taskList"
        :key="task"
        :class="{ completed: task.completed }"
      >
        <router-link :to="'/task/' + task.id">{{ task.title }}</router-link>
        <button @click="completeTask(task)">✓</button>
        <button @click="deleteTask(index, task)">x</button>
        <input
          v-if="update === task.id"
          type="text"
          :id="task.id"
          placeholder="change value"
        />
        <button @click="changeTask(task)">change</button>
      </div>
    </div>
    <form>
      <input v-model="title" id="title" type="text" name="title" placeholder="title" />
      <button @click="createTask()">createTask</button>
    </form>
    <div class="status" v-if="loggedIn">
      <p class="loggedin">loggedIn ✓</p>
      <button class="loggedout" @click="logout()">logout</button>
    </div>
  </div>
</template>
<script lang="ts" src="./HomeView.ts"></script>
<style lang="scss" scoped src="./HomeView.scss"></style>