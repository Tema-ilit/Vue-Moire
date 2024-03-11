<script setup lang="ts">
const props = defineProps<{
  totalPages: number
  currentPage: number
}>()

const emit = defineEmits(['update:current-page'])

const pervPage = () => {
  if (props.currentPage > 1) {
    goToPage(props.currentPage - 1)
  }
}

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    goToPage(props.currentPage + 1)
  }
}

const goToPage = (page: number) => {
  emit('update:current-page', page)
}
</script>

<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': currentPage === 1 }"
        aria-label="Предыдущая страница"
        @click.prevent="pervPage"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" style="display: flex">
      <a
        :style="{ cursor: 'pointer' }"
        class="pagination__link"
        v-for="page in totalPages"
        :key="page"
        @click.prevent="goToPage(page)"
        :class="{ 'pagination__link--current': currentPage === page }"
        >{{ page }}</a
      >
    </li>
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        href="#"
        aria-label="Следующая страница"
        @click.prevent="nextPage"
        :class="{ 'pagination__link--disabled': currentPage === totalPages }"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>
