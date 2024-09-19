<template>
  <div>
    <h1>Connect</h1>
  </div>
  <q-page class="flex flex-center">
    <q-card class="login-card">
      <q-tabs v-model="tab" class="text-center">
        <q-tab name="login" label="Login" />
        <q-tab name="register" label="Register" />
      </q-tabs>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <q-card-section>
            <div class="text-h6">Login</div>
          </q-card-section>
          <q-card-section>
            <q-form @submit="submitLogin" @reset="resetLoginForm" ref="loginFormRef">
              <q-input
                v-model="loginForm.username"
                label="Username"
                :rules="[(val) => !!val || 'Username is required']"
                clearable
                outlined
              />
              <q-input
                v-model="loginForm.email"
                label="Email"
                type="email"
                :rules="[
                  (val) => !!val || 'Email is required',
                  (val) => /.+@.+\..+/.test(val) || 'Please enter a valid email'
                ]"
                clearable
                outlined
                class="q-mt-md"
              />
              <q-input
                v-model="loginForm.password"
                label="Password"
                type="password"
                :rules="[(val) => !!val || 'Password is required']"
                clearable
                outlined
                class="q-mt-md"
              />
              <div class="row q-mt-md">
                <q-btn label="Login" type="submit" color="black" class="col" />
                <q-btn label="Reset" type="reset" color="black" flat class="col q-ml-sm" />
              </div>
            </q-form>
          </q-card-section>
        </q-tab-panel>
        <q-tab-panel name="register">
          <q-card-section>
            <div class="text-h6">Register</div>
          </q-card-section>
          <q-card-section>
            <q-form @submit="submitRegister" @reset="resetRegisterForm" ref="registerFormRef">
              <q-input
                v-model="registerForm.username"
                label="Username"
                :rules="[(val) => !!val || 'Username is required', checkUsername]"
                clearable
                outlined
              />
              <q-input
                v-model="registerForm.email"
                label="Email"
                type="email"
                :rules="[
                  (val) => !!val || 'Email is required',
                  (val) => /.+@.+\..+/.test(val) || 'Please enter a valid email',
                  checkEmail
                ]"
                clearable
                outlined
                class="q-mt-md"
              />
              <q-input
                v-model="registerForm.password"
                label="Password"
                type="password"
                :rules="[(val) => !!val || 'Password is required']"
                clearable
                outlined
                class="q-mt-md"
              />
              <div class="row q-mt-md">
                <q-btn label="Register" type="submit" color="black" class="col" />
                <q-btn label="Reset" type="reset" color="black" flat class="col q-ml-sm" />
              </div>
            </q-form>
          </q-card-section>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// Reactive state management
const tab = ref('login')
const users = ref([{ username: 'test', email: 'test@test.test', password: 'test' }])

const loginForm = reactive({
  username: '',
  email: '',
  password: ''
})

const registerForm = reactive({
  username: '',
  email: '',
  password: ''
})

// Refs for form elements
const loginFormRef = ref()
const registerFormRef = ref()

// Methods
const submitLogin = () => {
  loginFormRef.value.validate().then((valid: boolean) => {
    if (valid) {
      console.log('Login Form is valid')
      const user = users.value.find(
        (user) => user.username === loginForm.username && user.password === loginForm.password
      )
      if (user) {
        console.log('User exists:', user)
        // TODO: Implement login logic
      } else {
        console.log('Invalid username or password')
        // TODO: Show error message
      }
    }
  })
}

const resetLoginForm = () => {
  loginFormRef.value.resetValidation()
  loginForm.username = ''
  loginForm.email = ''
  loginForm.password = ''
}

const submitRegister = () => {
  registerFormRef.value.validate().then((valid: boolean) => {
    if (valid) {
      console.log('Registration Form is valid')
      console.log('Username:', registerForm.username)
      console.log('Email:', registerForm.email)
      console.log('Password:', registerForm.password)
      users.value.push({
        username: registerForm.username,
        email: registerForm.email,
        password: registerForm.password
      })
      resetRegisterForm()
      // TODO: redirect to login tab
    }
  })
}

const resetRegisterForm = () => {
  registerFormRef.value.resetValidation()
  registerForm.username = ''
  registerForm.email = ''
  registerForm.password = ''
}

const checkUsername = (val: string) => {
  if (users.value.some((user) => user.username === val)) {
    return 'Username is already taken'
  }
  return true
}

const checkEmail = (val: string) => {
  if (users.value.some((user) => user.email === val)) {
    return 'Email is already in use'
  }
  return true
}
</script>

<style scoped>
.login-card {
  width: 350px;
}
</style>
