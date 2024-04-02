<!-- eslint-disable vue/valid-v-model -->
<script setup lang="ts">
import { addProductBasket } from '@/api/basket'
import { getProductId } from '@/api/product'
import GlobalColor from '@/components/GlobalColor.vue'
import SizesList from '@/components/SizesList.vue'
import type { IProductCart } from '@/types/productCart'
import TabsGlobal from '@/utils/TabsGlobal.vue'
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{ id: number }>()
const product = ref<IProductCart>()
const quantity = ref(1)
const productSize = ref<number>()
const currentColor = ref<number>()

//tabs
const tabs = [
  { name: 'information', label: 'Информация о товаре' },
  { name: 'delivery', label: 'Доставка и возврат' }
]
const selectedTab = ref('information')
const changeTab = (tabName: string) => {
  selectedTab.value = tabName
}
// end tabs

//Полуваем продукт и передаем цвет по умолчанию
const loadProduct = async (id: number) => {
  const response = await getProductId(id)

  product.value = response
  currentColor.value = product.value?.colors[0].color.id
  productSize.value = product.value?.sizes[0].id
}

const img = computed(() => {
  if (product.value?.colors[0].gallery?.[0].file.url)
    return product.value.colors
      .find((item) => item.color.id === currentColor.value)
      ?.gallery.find((el) => el.file)?.file.url
  return '../../public/no-photo.jpg'
})

//Вычисляем процент материала
const materialPercent = computed(() =>
  product.value?.materials.reduce(
    (acc, material) => acc + Math.round(material.productsCount) / 100,
    0
  )
)

const addProduct = async (obj: IProductCart | undefined) => {
  const newProduct = {
    productId: obj?.id,
    colorId: currentColor.value,
    sizeId: productSize.value,
    quantity: quantity.value
  }
  await addProductBasket(newProduct)
}

//При рендере отправляем запрос на бек
onMounted(() => {
  loadProduct(props.id)
})
</script>

<template>
  <div class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <RouterLink :to="{ name: 'home' }" class="breadcrumbs__link"> Каталог </RouterLink>
        </li>
        <li class="breadcrumbs__item">
          <RouterLink :to="{ name: 'home' }" class="breadcrumbs__link">
            {{ product?.category.title }}
          </RouterLink>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> {{ product?.title }} </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="img" :alt="product?.title" />
        </div>
        <ul v-if="product?.colors" class="pics__list">
          <li v-for="item in product.colors[0].gallery" :key="item.file.name" class="pics__item">
            <a class="pics__link pics__link--current">
              <img width="98" height="98" :src="img" :alt="product?.title" />
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
                <button @click="quantity--" type="button" aria-label="Убрать один товар">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" :value="quantity" :v-model="quantity" />

                <button @click="quantity++" type="button" aria-label="Добавить один товар">
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
                <GlobalColor :colors="product?.colors" v-model:colormodel="currentColor" />
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label class="form__label form__label--small form__label--select">
                  <SizesList :sizes="product?.sizes" v-model:productSize="productSize" />
                </label>
              </fieldset>
            </div>

            <button
              class="item__button button button--primery"
              type="submit"
              @click.prevent="addProduct(product)"
            >
              В корзину
            </button>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <TabsGlobal :names="tabs" :selected-tab="selectedTab" @change-tab="changeTab">
              <div v-if="selectedTab === 'information'" class="item__content">
                <h3>Состав:</h3>

                <p v-for="material in product?.materials" :key="material.id">
                  <span>{{ Math.round(material.productsCount / (materialPercent || 0)) }} % </span>
                  <span>{{ material.title }}</span>
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

              <div v-if="selectedTab === 'delivery'" class="item__content">
                <h3>Доставка:</h3>

                <p>
                  1. Курьерская доставка по Москве и Московской области – 290 ₽<br />
                  2.Самовывоз из магазина. Список и адреса магазинов Вы можете посмотреть здесь<br />
                </p>

                <h3>Возврат:</h3>

                <p>
                  Любой возврат должен быть осуществлен в течение Возвраты в магазине БЕСПЛАТНО.<br />
                  Вы можете вернуть товары в любой магазин. Магазин должен быть расположен в стране,
                  в которой Вы осуществили покупку. БЕСПЛАТНЫЙ возврат в Пункт выдачи заказов.<br />
                  Для того чтобы вернуть товар в одном из наших Пунктов выдачи заказов, позвоните по
                  телефону 8 800 600 90 09<br />
                </p>
              </div>
            </TabsGlobal>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
