<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div class="card shadow p-4" style="width: 400px;">

      <!-- <div class="box" :class="{'box-right' : boxRight}"></div>
      <div class="d-flex mt-4">
        <button class="btn btn-sm btn-danger me-2" @click="boxRight = true">Move Right</button>
        <button class="btn btn-sm btn-danger"  @click="boxRight = false">Move Left</button>
      </div>
      <br>
      <hr>
      <Transition name="showhide">
        <div class="box1"  v-if="showBox"></div>
      </Transition>
      <button class="btn btn-sm btn-success mt-3" @click="showBox = !showBox">Show / Hide</button> -->

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
        <!-- <p v-if="login == true">Logging...</p>
        <button type="submit" class="btn btn-sm btn-danger w-100" v-if="login == false">Submit</button> -->
        <TheButton :block="true" :loading="login">Button</TheButton>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import TheButton from "../components/TheButton.vue";

export default {
    data() {
        return {
            formData: {
                email: "",
                password: "",
              },
            boxRight: false,
            showBox: false,
            login: false
        }
    },
    components:{
      TheButton
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

            this.login = true

            axios.post("http://127.0.0.1:8000/api/login", this.formData)
              .then((response) => {     
                console.log(response.data);
                           
                this.$eventBus.emit('toast', {
                   type: 'Success' ,
                   message: response.data.message
                })

                localStorage.setItem("accesstoken", response.data.token);
                this.$router.push("/dashboard");

              })
              .catch((error) => {
                  let errorMessage = "Something went wrong!";
                  if (error.response) {
                    errorMessage =  error.response.data.error
                  }
                  
                  this.$eventBus.emit('toast', {
                    type: 'Error' ,
                    message: errorMessage
                  })
              })
              .finally(() => {
                this.login = false
              });

            
        }
    },
}
</script>
<style scoped>
    .box{
      width: 60px;
      height: 60px;
      background-color: greenyellow;
      transition: all 1s;
    }

    .box-right{
      margin-left: 222px;
    }

    .box1{
      width: 60px;
      height: 60px;
      background-color: greenyellow;
      transition: all 1s;
      /* animation: showhide 1s ease-in; */
    }

    @keyframes showhide {
      0%{
        opacity: 0;
        transform: scale(0.5);
      }

      50%{
        opacity: 0.5;
        transform: scale(1.2);
      }

      100%{
        opacity: 1;
        transform: scale(1);
      }
    }

    .showhide-enter-active{
      /* transition: all .5; */
      animation: showhide 1s ease-in;
    }

    .showhide-enter-from{
      /* opacity: 0;
      transform: scale(0.5); */
    }

    .showhide-enter-to{
      /* opacity: 1;
      transform: scale(1); */

    }

    .showhide-leave-active{
      animation: showhide 1s ease-in reverse;
      /* transition: all 0.5; */
    }

    .showhide-leave-from{
      /* opacity: 1;
      transform: scale(1); */
    }

    .showhide-leave-to{
      /* opacity: 0;
      transform: scale(0.5); */

    }
</style>