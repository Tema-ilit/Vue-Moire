<script setup lang="ts">
import { getProductId } from '@/api/product'
import BaseColorList from '@/components/ColorList.vue'
import SizesList from '@/components/SizesList.vue'
import type { IProductCart } from '@/types/productCart'
import { onMounted, ref } from 'vue'

const props = defineProps<{ id: number }>()
const product = ref<IProductCart>()

const loadProduct = async (id: number) => {
  const response = await getProductId(id)

  product.value = response
}

onMounted(() => {
  loadProduct(props.id)
})
</script>

<template>
  <div class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <RouterLink :to="{ name: 'home' }" class="breadcrumbs__link" href="index.html">
            Каталог
          </RouterLink>
        </li>
        <li class="breadcrumbs__item">
          <RouterLink :to="{ name: 'home' }" class="breadcrumbs__link" href="#"> Носки </RouterLink>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Носки с принтом мороженое </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img
            width="570"
            height="570"
            :src="product?.colors[0]?.gallery[0]?.file.url"
            :alt="product?.title"
          />
        </div>
        <ul class="pics__list">
          <li class="pics__item">
            <a href="" class="pics__link pics__link--current">
              <img width="98" height="98" src="" :alt="product?.title" />
            </a>
          </li>
          <li class="pics__item">
            <a href="" class="pics__link">
              <img width="98" height="98" src="" :alt="product?.title" />
            </a>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product?.slug }}</span>
        <h2 class="item__title">{{ product?.title }}</h2>
        <div class="item__form">
          <form class="form" action="#" method="POST">
            <div class="item__row item__row--center">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" value="1" name="count" />

                <button type="button" aria-label="Добавить один товар">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <b class="item__price"> {{ product?.price }} ₽ </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <BaseColorList :colors="product?.colors" />
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label class="form__label form__label--small form__label--select">
                  <SizesList :sizes="product?.sizes" />
                </label>
              </fieldset>
            </div>

            <button class="item__button button button--primery" type="submit">В корзину</button>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current"> Информация о товаре </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#"> Доставка и возврат </a>
          </li>
        </ul>

        <div class="item__content">
          <h3>Состав:</h3>

          <p>
            60% {{ product?.materials[0].title }}<br />
            30% Шерсть<br />
          </p>

          <h3>Уход:</h3>

          <p>
            Машинная стирка при макс. 30ºC короткий отжим<br />
            Гладить при макс. 110ºC<br />
            Не использовать машинную сушку<br />
            Отбеливать запрещено<br />
            Не подвергать химчистке<br />
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
