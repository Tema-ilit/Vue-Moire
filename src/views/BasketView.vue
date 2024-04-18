<script setup lang="ts">
import BasketItem from '@/components/BasketItem.vue'
import InfoBlock from '@/components/InfoBlock.vue'
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
        <span class="content__info">
          {{ basketStore.productLength().count + ' ' + basketStore.productLength().words }}
        </span>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div v-if="basketStore.basketProducts.length" class="cart__field">
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
        <div v-else>
          <InfoBlock
            title="Корзина пустая"
            description="Добавьте хотя бы один товар, чтобы сделать заказ."
            image-url="../../../src/assets/img/package-icon.png"
          />
        </div>

        <div class="cart__block">
          <p class="cart__desc">Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе</p>
          <p class="cart__price">
            Итого: <span>{{ basketStore.totalPrice }} ₽</span>
          </p>
          <router-link :to="{ name: 'order' }" custom v-slot="{ navigate }">
            <Button
              @click="navigate"
              v-if="basketStore.basketProducts.length"
              class="cart__button button button--primery"
              >Оформить заказ</Button
            >
          </router-link>
        </div>
      </form>
    </section>
  </div>
</template>
