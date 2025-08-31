<template>
  <div>
    <!-- <LoginComponent></LoginComponent> -->
    <RouterView></RouterView>
    <TransitionGroup name="list" tag="div" class="toasts">
      <ToastComponent
        v-for="(toast, i) in toasts"
        :key="i"
        :toastType="toast.type"
        :message="toast.message"
      ></ToastComponent>
    </TransitionGroup>
  </div>
</template>
<script>
import LoginComponent from "./views/LoginComponent.vue";
import ToastComponent from "./components/ToastComponent.vue";
import { eventBus } from "./utils/eventBus";
export default {
  data() {
    return {
      toasts: [],
    };
  },
  mounted() {
    eventBus.on("toast", (data) => {
      this.toasts.push(data);
      this.removeToast();
    });
  },
  methods: {
    removeToast() {
      setTimeout(() => {
        this.toasts.shift();
      }, 2222);
    },
  },
  components: {
    // LoginComponent,
    ToastComponent,
  },
};
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

.list-enter-active,
.list-leave-active {
  transition: all 0.25s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>
