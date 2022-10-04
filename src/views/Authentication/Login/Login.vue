<template>
  <div class="login">
    <h1>Login</h1>
    <form class="login__form">
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label" for="email">email</label>
        <div class="col-sm-10">
          <input
            required
            v-model="user.email"
            class="form-control"
            name="email"
            id="email"
            type="email"
            placeholder="email"
          />
        </div>
      </div>
      <br />
      <div class="mb-3 row">
        <label class="col-sm-2 col-form-label" for="password">password</label>
        <div class="col-sm-10">
          <input
            required
            v-model="user.password"
            class="form-control"
            name="password"
            id="password"
            type="password"
            placeholder="password"
          />
        </div>
      </div>
      <br />
      <button id="login" type="button" @click="login()">login</button>
      <button id="reset" type="reset" @click="reset()">reset</button>
      <p class="error" v-if="error">Error! {{ errorMessage }}</p>
    </form>
  </div>
</template>
<script lang="ts" src="./Login.ts"></script>
<style lang="scss" scoped src="./Login.scss"></style>
