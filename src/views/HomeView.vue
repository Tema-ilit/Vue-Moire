<script setup lang="ts">
import { getProducts } from '@/api/product'
import BasePagination from '@/components/BasePagination.vue'
import ProductFilter from '@/components/ProductFilter.vue'
import ProductItem from '@/components/ProductItem.vue'
import type { IPagination } from '@/types/global'
import type { IProduct } from '@/types/products'
import { computed, onMounted, ref } from 'vue'

const products = ref<IProduct[]>([])
const pagination = ref<IPagination>({
  page: 1,
  pages: 0,
  total: 0
})

const minPrice = ref<number>()
const maxPrice = ref<number>()

const updatePrice = (a: number, b: number) => {
  minPrice.value = a
  maxPrice.value = b
}

const filteredComputed = computed(() => {
  return products.value.filter((product) => {
    if (
      (minPrice.value && product.price < minPrice.value) ||
      (maxPrice.value && product.price > maxPrice.value)
    )
      return false
    return true
  })
})

let normalProduct = []

const loadProducts = async (page: number) => {
  const response = await getProducts(page)

  products.value = response.products
  pagination.value = response.pagination

  normalProduct = [...products.value]
  console.log(normalProduct)
}

const changePage = async (page: number) => {
  if (page !== pagination.value.page) {
    await loadProducts(page)
  }
}

onMounted(async () => {
  await loadProducts(pagination.value.page)
})
</script>

<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">Каталог</h1>
        <span class="content__info"> {{ pagination.total }} товара </span>
      </div>
    </div>

    <div class="content__catalog">
      <ProductFilter @update:price-filter="updatePrice" />

      <section class="catalog">
        <div>
          <ul class="catalog__list">
            <li v-for="product in filteredComputed" :key="product.id" class="catalog__item">
              <ProductItem :product="product" />
            </li>
          </ul>
        </div>

        <BasePagination
          :current-page="pagination.page"
          :total-pages="pagination.pages"
          @update:current-page="changePage"
        />
      </section>
    </div>
  </main>
</template>
