<script setup lang="ts">
defineProps({
  color: Object
})
</script>

<template>
  <li class="colors__item">
    <label class="colors__label">
      <input class="colors__radio sr-only" type="radio" name="" value="" checked="true" />
      <span class="colors__value" style="background-color: #73b6ea"> </span>
    </label>
  </li>
</template>
