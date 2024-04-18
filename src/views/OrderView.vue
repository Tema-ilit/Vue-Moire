<script setup lang="ts">
import { getDelivery, getPlayment } from '@/api/order'
import { useBasketStore } from '@/stores/basketStore'
import { ref, onMounted, computed } from 'vue'

const choiceOfDelivery = ref<Array<{ id: number; title: string; price: number }>>([])
const deliveryValue = ref<number>(1)
const choiceOfPayment = ref<Array<{ id: number; title: string }>>([])
const playmentValue = ref<number>(1)

const basketSrore = useBasketStore()
const formErrorMessage = ref<string>('')

onMounted(async () => {
  choiceOfDelivery.value = await getDelivery()
  choiceOfPayment.value = await getPlayment(deliveryValue.value)
})

const playmentRefresh = async (id: number) => {
  choiceOfPayment.value = await getPlayment(id)

  if (choiceOfPayment.value.length < 2) {
    playmentValue.value = 2
  } else {
    playmentValue.value = 1
  }
}
</script>

<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{ name: 'home' }" class="breadcrumbs__link">Каталог</router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link :to="{ name: 'basket' }" class="breadcrumbs__link"> Корзина </router-link>
        </li>
        <li class="breadcrumbs__item">
          <p class="breadcrumbs__link">Оформление заказа</p>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">Оформление заказа</h1>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <div class="cart__data">
            <label class="form__label">
              <input
                class="form__input"
                type="text"
                name="name"
                placeholder="Введите ваше полное имя"
              />
              <span class="form__value">ФИО</span>
            </label>

            <label class="form__label">
              <input
                class="form__input"
                type="text"
                name="address"
                placeholder="Введите ваш адрес"
              />
              <span class="form__value">Адрес доставки</span>
            </label>

            <label class="form__label">
              <input
                class="form__input"
                type="tel"
                name="phone"
                placeholder="Введите ваш телефон"
              />
              <span class="form__value">Телефон</span>
              <span class="form__error">Неверный формат телефона</span>
            </label>

            <label class="form__label">
              <input class="form__input" type="email" name="email" placeholder="Введи ваш Email" />
              <span class="form__value">Email</span>
            </label>

            <label class="form__label">
              <textarea
                class="form__input form__input--area"
                name="comments"
                placeholder="Ваши пожелания"
              ></textarea>
              <span class="form__value">Комментарий к заказу</span>
            </label>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li v-for="item in choiceOfDelivery" :key="item.id" class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    :value="item.id"
                    v-model="deliveryValue"
                    @click="playmentRefresh(item.id)"
                  />
                  <span class="options__value">
                    {{ item.title }} <b>{{ item.price + ' p' }}</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li v-for="item in choiceOfPayment" :key="item.id" class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    :value="item.id"
                    v-model="playmentValue"
                  />
                  <span class="options__value"> {{ item.title }} </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li
              v-for="item in basketSrore.basketProducts"
              :key="item.product.id"
              class="cart__order"
            >
              <h3>
                {{ item.product.title }}
              </h3>

              <b
                >{{ item.price + ' ₽' }} <span>{{ '(' + item.quantity + ' шт' + ')' }}</span></b
              >
              <span>Артикул: {{ item.id }}</span>
            </li>
          </ul>

          <div class="cart__total" v-if="deliveryValue === 1">
            <p>Доставка: <b>бесплатно</b></p>
            <p>
              Итого: <b>{{ basketSrore.productLength().count }}</b>
              {{ basketSrore.productLength().words }} на сумму
              <b>{{ basketSrore.totalPrice + ' ₽' }}</b>
            </p>
          </div>

          <div class="cart__total" v-if="deliveryValue === 2">
            <p>Доставка: <b>курьером</b></p>
            <p>
              Итого: <b>{{ basketSrore.productLength().count }}</b>
              {{ basketSrore.productLength().words }} на сумму
              <b>{{ basketSrore.totalPrice + 1200 + ' ₽' }}</b>
            </p>
          </div>

          <button class="cart__button button button--primery" type="submit">Оформить заказ</button>
        </div>
        <div v-if="formErrorMessage" class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.</p>
        </div>
      </form>
    </section>
  </main>
</template>
