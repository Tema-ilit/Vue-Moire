<script setup lang="ts">
import type { ICategories, IMaterials, IColors } from '@/types/filterTypes'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import SelectGlobal from './SelectGlobal.vue'
import CheckInput from './CheckInput.vue'

defineEmits(['update:filter'])

const minPrice = ref<number>(0)
const maxPrice = ref<number>(0)
const category = ref<number>(0)
const materials = ref<Array<string>>([])
const seasons = ref<Array<string>>([])
const colors = ref<Array<string>>([])
const filtered = ref<boolean>(false)

const filterMaterials = ref<IMaterials>()
const filterSeasons = ref<IMaterials>()
const filterCategories = ref<ICategories>()
const filterColors = ref<IColors[]>()

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

const filtertrue = () => {
  filtered.value = true
}

onMounted(async () => {
  const materials = await getFilterInfo('/materials')
  const seasons = await getFilterInfo('/seasons')
  const categories = await getFilterInfo('/productCategories')
  const colors = await getFilterInfo('/colors')

  filterMaterials.value = materials
  filterSeasons.value = seasons
  filterCategories.value = categories
  filterColors.value = colors.items
})

const reset = () => {
  maxPrice.value = 0
  minPrice.value = 0
  category.value = 0
  materials.value = []
  seasons.value = []
  colors.value = []
  filtered.value = false
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
          <select class="form__select" type="text" name="category" v-model="category">
            <option value="0">Все категории</option>
            <option v-for="option in filterCategories?.items" :key="option.id" :value="option.id">
              <SelectGlobal :category="option" />
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет:</legend>
        <ul class="colors colors--black">
          <li v-for="item in filterColors" :key="item.id" class="colors__item">
            <CheckInput :item="item" :color="true" v-model:colorsFilters="colors" />
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <ul class="check-list">
          <li v-for="item in filterMaterials?.items" :key="item.id" class="check-list__item">
            <CheckInput :item="item" v-model:modalFilters="materials" />
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <ul class="check-list">
          <li v-for="item in filterSeasons?.items" :key="item.id" class="check-list__item">
            <CheckInput :item="item" v-model:modalFilters="seasons" />
          </li>
        </ul>
      </fieldset>

      <button
        class="filter__submit button button--primery"
        type="submit"
        @click.prevent="
          $emit('update:filter', category, materials, seasons, colors, minPrice, maxPrice),
            filtertrue()
        "
      >
        Применить
      </button>
      <button
        v-if="filtered"
        class="filter__reset button button--second"
        type="button"
        @click.prevent="$emit('update:filter'), reset()"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>
