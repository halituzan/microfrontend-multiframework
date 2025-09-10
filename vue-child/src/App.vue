<script setup lang="ts">
import { onMounted, onUnmounted, reactive } from 'vue';

interface User {
  name: string;
  role: string;
}

const user = reactive<User>({
  name: '',
  role: '',
});

let globalStore: any = null;
let unsubscribe: (() => void) | null = null;

onMounted(async () => {
  const mod = await import("host/GlobalStore");
  globalStore = mod.default;

  const currentUser = globalStore.getState().user;
  if (currentUser) {
    user.name = currentUser.name;
    user.role = currentUser.role;
  }

  unsubscribe = globalStore.subscribe((newState: any) => {
    if (newState.user) {
      user.name = newState.user.name;
      user.role = newState.user.role;
    }
  });
});

onUnmounted(() => {
  if (unsubscribe) unsubscribe();
});

function updateUserFromVue() {
  if (globalStore) {
    globalStore.setState({
      user: {
        name: 'Vue',
        role: 'moderator',
      },
    });
  }
}
</script>

<template>
  <div class="vue-app-container">
    <div class="vue-user-panel" v-if="user.name">
      <div class="vue-user-box">
        <div class="vue-user-icon">👤</div>
        <div class="vue-user-info">
          <div class="vue-user-name">{{ user.name }}</div>
          <div class="vue-user-role">{{ user.role }}</div>
        </div>
      </div>
    </div>

    <svg class="vue-logo" width="120" height="120" viewBox="0 0 261.76 226.69" xmlns="http://www.w3.org/2000/svg">
      <g fill="none">
        <path d="M0 0h58.5L130.9 113.4 203.3 0h58.5L130.9 226.7 0 0z" fill="#41B883"/>
        <path d="M58.5 0h43.3L130.9 56.7 159.9 0h43.4L130.9 113.4 58.5 0z" fill="#35495E"/>
      </g>
    </svg>

    <h2 class="vue-title">Vue App</h2>

    <button class="vue-button"  @click="updateUserFromVue">
      Login from Vue
    </button>
  </div>
</template>


<style scoped>
.vue-app-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 2rem;
  background-color: #f4f6f8;
  font-family: 'Poppins', sans-serif;
  text-align: center;
}

.vue-logo {
  margin-bottom: 1.5rem;
}

.vue-title {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #333;
}

.vue-user {
  background: #ffffff;
  padding: 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  width: 400px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  margin-bottom: 1.2rem;
}

.vue-button {
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  background-color: #41b883;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.vue-button:hover {
  background-color: #33a87c;
}

.vue-user-panel {
  position: absolute;
  top: 20px;
  right: 20px;
}

.vue-user-box {
  display: flex;
  align-items: center;
  background: white;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  min-width: 220px;
  gap: 1rem;
}

.vue-user-icon {
  font-size: 2.5rem;
}

.vue-user-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.vue-user-name {
  font-weight: 600;
  font-size: 1rem;
  color: #333;
  text-align: left;
}

.vue-user-role {
  font-size: 0.85rem;
  color: #888;
  margin-top: 2px;
  text-align: left;
}

</style>
