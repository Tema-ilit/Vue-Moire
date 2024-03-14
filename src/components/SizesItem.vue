<script setup lang="ts">
import type { ISizes } from '@/types/sizes'

const props = defineProps<{ size: ISizes }>()
</script>

<template>
  <option :value="size.id">{{ size.title }}</option>
</template>
