<script setup lang="ts">
import type { ICategories } from '@/types/categories'
import type { IMaterials } from '@/types/materials'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import SelectGlobal from './SelectGlobal.vue'

defineEmits(['update:price-filter'])

const minPrice = ref<number>()
const maxPrice = ref<number>()

const filterMaterials = ref<IMaterials>()
const filterSeasons = ref<IMaterials>()
const filterCategories = ref<ICategories>()

const getFilterInfo = async (url: string) => {
  try {
    const { data } = await axios.get(`https://vue-moire.skillbox.cc/api` + url)
    const res = data
    return res
  } catch (error) {
    console.log(error)
    throw new Error()
  }
}

onMounted(async () => {
  const materials = await getFilterInfo('/materials')
  const seasons = await getFilterInfo('/seasons')
  const categories = await getFilterInfo('/productCategories')

  filterMaterials.value = materials
  filterSeasons.value = seasons
  filterCategories.value = categories
})

const reset = () => {
  maxPrice.value = 0
  minPrice.value = 0
}
</script>

<template>
  <aside class="filter">
    <form class="filter__form form" action="#" method="get">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="min-price" v-model="minPrice" />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price" v-model="maxPrice" />
          <span class="form__value">До</span>
        </label>
      </fieldset>
      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <!-- <select class="form__select" type="text" name="category">
            <option value="value1">Все категории</option>
            <option value="value2">Футболки</option>
            <option value="value3">Бюстгалтеры</option>
            <option value="value4">Носки</option>
          </select> -->

          <select class="form__select" type="text" name="category">
            <option value="value1">Все категории</option>
            <option v-for="option in filterCategories?.items" :key="option.id" :value="option.id">
              <SelectGlobal :category="option" />
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <ul class="check-list">
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="material"
                value="лен"
              />
              <span class="check-list__desc">
                лен
                <span>(3)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="material"
                value="хлопок"
              />
              <span class="check-list__desc">
                хлопок
                <span>(46)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="material"
                value="шерсть"
              />
              <span class="check-list__desc">
                шерсть
                <span>(20)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="material"
                value="шелк"
              />
              <span class="check-list__desc">
                шелк
                <span>(30)</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <ul class="check-list">
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="collection"
                value="лето"
                checked="true"
              />
              <span class="check-list__desc">
                лето
                <span>(2)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="collection"
                value="зима"
              />
              <span class="check-list__desc">
                зима
                <span>(53)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="collection"
                value="весна"
              />
              <span class="check-list__desc">
                весна
                <span>(24)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="collection"
                value="осень"
              />
              <span class="check-list__desc">
                осень
                <span>(30)</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button
        class="filter__submit button button--primery"
        type="submit"
        @click.prevent="$emit('update:price-filter', minPrice, maxPrice)"
      >
        Применить
      </button>
      <button
        class="filter__reset button button--second"
        type="button"
        @click.prevent="$emit('update:price-filter', 0, 0), reset()"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>
