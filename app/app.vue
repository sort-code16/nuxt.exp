<script setup>
const appConfig = useAppConfig();

console.log('appConfig', appConfig);
</script>

<template>
  <div class="app">
    <AppHeader @open-settings="() => console.log('Settings opened')" />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
      
    <AppAlert>
      <span>This is an auto-imported component.</span>
    </AppAlert>
  </div>
</template>

<style scoped>
.app {
  position: relative;
  min-height: 100vh;
}
</style>
