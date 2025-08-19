<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div class="card shadow p-4" style="width: 400px;">
      <h2 class="mb-4 text-center">Login</h2>
      <form @submit.prevent="handleForm">
        <!-- Email Field -->
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" class="form-control" id="email" placeholder="Enter your email" v-model="formData.email" ref="email">
        </div>

        <!-- Name Field -->
        <div class="mb-3">
          <label for="name" class="form-label">Password</label>
          <input type="password" class="form-control" id="name" placeholder="Enter your password" v-model="formData.password" ref="password">
        </div>


        <!-- Submit Button -->
        <button type="submit" class="btn btn-primary w-100">Submit</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            formData: {
                email: "",
                password: "",
            }
        }
    },
    methods: {
        handleForm(){
            if (!this.formData.email) {
                this.$eventBus.emit('toast', {
                   type: 'Error' ,
                   message: 'Email Field Is Required'
                })

                this.$refs.password.focus();
                return;
            }

            if (this.formData.password.length < 6) {
                this.$eventBus.emit('toast', {
                   type: 'Error' ,
                   message: 'Password must be atleast 6 charecter.'
                })

                this.$refs.password.focus();
                return;
            }
        }
    },
}
</script>
<style lang="">
    
</style>