<template>
  <div class="single-view">
    <div :class="{ completed: task.completed }">
      {{ task.title }}
      <button @click="completeTask(task)">✓</button>
      <button @click="deleteTask(index, task)">x</button>
      <input
        v-if="update === task.id"
        :id="task.id"
        placeholder="change value"
        type="text"
      />
      <button @click="changeTask(task)">change</button>
    </div>
    <router-link to="/home">back</router-link>
  </div>
</template>
<script lang="ts" src="./SingleView.ts"></script>
<style lang="scss" scoped src="./SingleView.scss"></style>
