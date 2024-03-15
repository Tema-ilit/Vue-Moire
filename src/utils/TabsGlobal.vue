<script setup lang="ts">
defineProps<{ names: Array<{ name: string; label: string }>; selectedTab: string }>()
defineEmits(['changeTab'])
</script>

<template>
  <div class="tabs-div">
    <a
      v-for="tab in names"
      :key="tab.name"
      :class="['tabs__link', { 'tabs__link--current': tab.name === selectedTab }]"
      @click="$emit('changeTab', tab.name)"
    >
      {{ tab.label }}
    </a>
  </div>
  <div>
    <slot />
  </div>
</template>

<style scoped>
.tabs-div {
  display: flex;
  cursor: pointer;
}
</style>
