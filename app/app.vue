<template>
  <div>
    <AppHeader @open-settings="() => console.log('Settings opened')" />
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>
