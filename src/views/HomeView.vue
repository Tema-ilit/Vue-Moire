<script setup lang="ts">
import { getProducts } from '@/api/product'
import BasePagination from '@/components/BasePagination.vue'
import ProductFilter from '@/components/ProductFilter.vue'
import ProductItem from '@/components/ProductItem.vue'
import type { IPagination } from '@/types/global'
import type { IProduct } from '@/types/products'
import LoadSpinner from '@/utils/LoadSpinner.vue'
import { num_word, word } from '@/utils/numWord'
import { computed, onMounted, ref } from 'vue'

const loading = ref<boolean>(false)

const products = ref<IProduct[]>([])
const pagination = ref<IPagination>({
  page: 1,
  pages: 0,
  total: 0
})

const wordProduct = computed(() => {
  return num_word(pagination.value.total, word)
})

//Фильтр
const categoryId = ref<number>(0)
const materialIds = ref<Array<string>>([])
const seasonIds = ref<Array<string>>([])
const colorIds = ref<Array<string>>([])
const minPrice = ref<number>(0)
const maxPrice = ref<number>(0)

const updateFilter = async (
  category: number,
  material: Array<string>,
  season: Array<string>,
  color: Array<string>,
  minPric: number,
  maxPric: number
) => {
  categoryId.value = category
  materialIds.value = material
  seasonIds.value = season
  colorIds.value = color
  minPrice.value = minPric
  maxPrice.value = maxPric

  await loadProducts(
    pagination.value.page,
    categoryId.value,
    materialIds.value,
    seasonIds.value,
    colorIds.value,
    minPrice.value,
    maxPrice.value
  )
}
// конец фильтра

//Загрузка товара
const loadProducts = async (
  page: number,
  category: number,
  material: Array<string>,
  season: Array<string>,
  color: Array<string>,
  minPric: number,
  maxPric: number
) => {
  loading.value = true
  const response = await getProducts(page, category, material, season, color, minPric, maxPric)

  products.value = response.items
  pagination.value = response.pagination
  loading.value = false
}
// end

const changePage = async (page: number) => {
  if (page !== pagination.value.page) {
    await loadProducts(
      page,
      categoryId.value,
      materialIds.value,
      seasonIds.value,
      colorIds.value,
      minPrice.value,
      maxPrice.value
    )
  }
}

onMounted(async () => {
  await loadProducts(
    pagination.value.page,
    categoryId.value,
    materialIds.value,
    seasonIds.value,
    colorIds.value,
    minPrice.value,
    maxPrice.value
  )
})
</script>

<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">Каталог</h1>
        <span class="content__info"> {{ pagination.total + ' ' + wordProduct }} </span>
      </div>
    </div>

    <div class="content__catalog">
      <ProductFilter @update:filter="updateFilter" />
      <section class="catalog">
        <LoadSpinner v-if="loading" />
        <div v-else>
          <ul class="catalog__list">
            <li
              v-for="product in products"
              :key="product.id"
              class="bg-gray-200 border border-slate-100 rounded-3xl transition hover:-translate-y-2 hover:shadow-xl"
            >
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
