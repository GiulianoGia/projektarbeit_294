<template>
    <div class="login">
        <form>
            <label for="email">email</label>
            <input required v-model="user.email" name="email" id="email" type="email" placeholder="email">
            <label for="password"></label>
            <input required v-model="user.password" name="password" id="password" type="password" placeholder="password">
            <button id="login" type="button" @click="login()">login</button>
            <p v-if="error">Error!</p>
        </form>
    </div>
</template>
<script lang="ts" src="./Login.ts"></script>
<style lang="scss" scoped src="./Login.scss"></style>