<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import { onMounted } from 'vue'
import { useBasketStore } from '@/stores/basketStore'
const basketStore = useBasketStore()
//получаем корзину
onMounted(async () => {
  basketStore.basketApi()
})
</script>

<template>
  <header class="header container">
    <div class="header__wrapper">
      <span class="header__info">Каталог</span>

      <router-link :to="{ name: 'home' }" class="header__logo">
        <img
          src="./assets/img/svg/logo-moire.svg"
          alt="Логотип интернет магазина Moire"
          width="116"
          height="34"
        />
      </router-link>

      <a class="header__tel" href="tel:8 800 600 90 09"> 8 800 600 90 09 </a>

      <router-link
        :to="{ name: 'basket' }"
        class="header__cart"
        href="cart.html"
        aria-label="Корзина с товарами"
      >
        <svg width="19" height="24">
          <use xlink:href="#icon-cart" />
        </svg>
        <span class="header__count" aria-label="Количество товаров">{{
          basketStore.basketProducts.length
        }}</span>
      </router-link>
    </div>
  </header>

  <RouterView />

  <footer class="footer container">
    <div class="footer__wrapper">
      <ul class="footer__links">
        <li>
          <a class="footer__link" href="#"> Каталог </a>
        </li>
        <li>
          <a class="footer__link" href="tel:88006009009"> 8 800 600 90 09 </a>
        </li>
        <li>
          <a class="footer__link" href="mailto:hi@technozavrrr.com"> hi@technozavrrr.com </a>
        </li>
        <li>
          <a class="footer__link" href="#"> Распродажа </a>
        </li>
        <li>
          <a class="footer__link footer__link--medium" href="#"> Заказать звонок </a>
        </li>
      </ul>

      <ul class="footer__social social">
        <li class="social__item">
          <a class="social__link" href="#" aria-label="Вконтакте">
            <svg width="20" height="11" fill="currentColor">
              <use xlink:href="#icon-vk"></use>
            </svg>
          </a>
        </li>
        <li class="social__item">
          <a class="social__link" href="#" aria-label="Инстаграм">
            <svg width="17" height="17" fill="currentColor">
              <use xlink:href="#icon-insta"></use>
            </svg>
          </a>
        </li>
        <li class="social__item">
          <a class="social__link" href="#" aria-label="Facebook">
            <svg width="17" height="17" fill="currentColor">
              <use xlink:href="#icon-facebook"></use>
            </svg>
          </a>
        </li>
        <li class="social__item">
          <a class="social__link" href="#" aria-label="Twitter">
            <svg width="17" height="14" fill="currentColor">
              <use xlink:href="#icon-twitter"></use>
            </svg>
          </a>
        </li>
        <li class="social__item">
          <a class="social__link" href="#" aria-label="Telegram">
            <svg width="19" height="17" fill="currentColor">
              <use xlink:href="#icon-telegram"></use>
            </svg>
          </a>
        </li>
      </ul>

      <p class="footer__desc">
        Все права на&nbsp;материалы, находящиеся на&nbsp;сайте, охраняются в&nbsp;соответствии
        с&nbsp;законодательством&nbsp;РФ, в&nbsp;том числе об&nbsp;авторском праве и&nbsp;смежных
        правах.
      </p>

      <ul class="footer__data">
        <li>
          <a class="footer__link" href="#" target="_blank" rel="noopener" type="application/pdf">
            Политика конфиденциальности
          </a>
        </li>
        <li>
          <a class="footer__link" href="#" target="_blank" rel="noopener" type="application/pdf">
            Публичная оферта
          </a>
        </li>
      </ul>
      ./stores/basketStore
      <span class="footer__copyright"> © 2020 Moire </span>
    </div>
  </footer>
</template>
