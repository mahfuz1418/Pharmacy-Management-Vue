<template>
  <div>
    <LoginComponent></LoginComponent>
    <div class="toasts">
      <ToastComponent  v-for="(toast, i) in toasts" :key="i" :toastType="toast.type" :message="toast.message"></ToastComponent>
    </div>
  </div>
</template>
<script>
import LoginComponent from './components/LoginComponent.vue';
import ToastComponent from './components/ToastComponent.vue';
export default {
  data() {
    return {
      toasts:[
        // {
        //   type: "Success",
        //   message: "Successfully Done!",
        // },
        // {
        //   type: "Error",
        //   message: "Sorry Failed!",
        // },
      ]
    }
  },
  mounted() {
    this.$eventBus.on('toast', data => {
       this.toasts.push(data);
       this.removeToast();
    } )
  },
  methods:{
    removeToast(){
      setTimeout(() => {
        this.toasts.shift();
      }, 2222);
    }
  },
  components: {
    LoginComponent,
    ToastComponent
  }
}
</script>
<style scoped>
  .toasts {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 9999999;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    overflow-x: hidden;
  }
</style>