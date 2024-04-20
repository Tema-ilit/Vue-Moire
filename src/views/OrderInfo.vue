<script setup lang="ts">
import { useBasketStore } from '@/stores/basketStore'
import type { IOrderInfo } from '@/types/orderInfo'
import { onMounted, ref } from 'vue'

const prop = defineProps<{ id: number }>()
const basketOrderStore = useBasketStore()
const orderInfo = ref<IOrderInfo>()

onMounted(async () => {
  await basketOrderStore.getOrder(prop.id)
  orderInfo.value = basketOrderStore.orderInfo
})
</script>

<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{ name: 'home' }" class="breadcrumbs__link" href="index.html">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link :to="{ name: 'basket' }" class="breadcrumbs__link" href="cart.html">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Оформление заказа </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ orderInfo?.id }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо
            с&nbsp;деталями заказа. Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для
            уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key"> Получатель </span>
              <span class="dictionary__value">{{ orderInfo?.name }}</span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Адрес доставки </span>
              <span class="dictionary__value">{{ orderInfo?.address }} </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Телефон </span>
              <span class="dictionary__value"> {{ orderInfo?.phone }} </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Email </span>
              <span class="dictionary__value"> {{ orderInfo?.email }} </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Способ оплаты </span>
              <span class="dictionary__value"> {{ orderInfo?.deliveryType.title }} </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li v-for="item in orderInfo?.basket.items" :key="item.product.id" class="cart__order">
              <h3>
                {{ item.product.title }}
                <span>{{ '(' + item.quantity + ' ' + 'шт' + ')' }}</span>
              </h3>
              <b>{{ item.price }} ₽ </b>
              <!-- <span>Размер: {{ item.size.title }}</span> -->
              <p style="display: flex; flex-direction: column; margin: 0; gap: inherit">
                <span>Размер: {{ item.size.title }}</span>
                <span>Артикул: {{ item.id }}</span>
              </p>
            </li>
          </ul>

          <div class="cart__total">
            <p>
              Доставка: <b>{{ orderInfo?.deliveryType.title }}</b>
            </p>
            <p>
              Итого: <b>{{ orderInfo?.basket.items.length }}</b> товара на сумму
              <b>{{ orderInfo?.totalPrice }} ₽</b>
            </p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>
