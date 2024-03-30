<script setup lang="ts">
import BasketItem from '@/components/BasketItem.vue'
import { useBasketStore } from '@/stores/basketStore'
const basketStore = useBasketStore()
</script>

<template>
  <div class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{ name: 'home' }" class="breadcrumbs__link">Каталог</router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Корзина </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">Корзина</h1>
        <span class="content__info"> {{ basketStore.basketProducts.length }} товара </span>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <li
              v-for="product in basketStore.basketProducts"
              :key="product.id"
              class="cart__item product"
            >
              <BasketItem :product="product" />
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе</p>
          <p class="cart__price">Итого: <span>4 070 ₽</span></p>

          <button class="cart__button button button--primery" type="submit">Оформить заказ</button>
        </div>
      </form>
    </section>
  </div>
</template>
