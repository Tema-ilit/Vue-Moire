<script setup lang="ts">
import { getProducts } from '@/api/product'
import ProductFilter from '@/components/ProductFilter.vue'
import ProductItem from '@/components/ProductItem.vue'
import type { IProduct } from '@/types/products'
import { onMounted, ref } from 'vue'

const products = ref<IProduct[]>([])

const loadProducts = async () => {
  const response = await getProducts()

  products.value = response
}

onMounted(async () => {
  await loadProducts()
})
</script>

<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">Каталог</h1>
        <span class="content__info"> 152 товара </span>
      </div>
    </div>

    <div class="content__catalog">
      <ProductFilter />

      <section class="catalog">
        <ul class="catalog__list">
          <ProductItem v-for="product in products" :key="product.id" :product="product" />
        </ul>
        <!-- <ProductList :products="products" /> -->

        <ul class="catalog__pagination pagination">
          <li class="pagination__item">
            <a
              class="pagination__link pagination__link--arrow pagination__link--disabled"
              aria-label="Предыдущая страница"
            >
              <svg width="8" height="14" fill="currentColor">
                <use xlink:href="#icon-arrow-left"></use>
              </svg>
            </a>
          </li>
          <li class="pagination__item">
            <a class="pagination__link pagination__link--current"> 1 </a>
          </li>
          <li class="pagination__item">
            <a class="pagination__link" href="#"> 2 </a>
          </li>
          <li class="pagination__item">
            <a class="pagination__link" href="#"> 3 </a>
          </li>
          <li class="pagination__item">
            <a class="pagination__link" href="#"> 4 </a>
          </li>
          <li class="pagination__item">
            <a class="pagination__link" href="#"> ... </a>
          </li>
          <li class="pagination__item">
            <a class="pagination__link" href="#"> 10 </a>
          </li>
          <li class="pagination__item">
            <a
              class="pagination__link pagination__link--arrow"
              href="#"
              aria-label="Следующая страница"
            >
              <svg width="8" height="14" fill="currentColor">
                <use xlink:href="#icon-arrow-right"></use>
              </svg>
            </a>
          </li>
        </ul>
      </section>
    </div>
  </main>
</template>
