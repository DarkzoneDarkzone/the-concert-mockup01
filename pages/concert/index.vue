<template>
  <div class="pb-24">
    <div class="flex justify-between">
      <h2 class="text-white text-2xl font-bold">คอนเสิร์ต</h2>
      <div class="flex gap-3">
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <font-awesome class="text-gray-500" :icon="faMagnifyingGlass" />
          </div>
          <input type="text" id="input-group-1" v-model="searchText" autocomplete="off"
            class="bg-[rgba(62,62,62,0.5)] min-w-[330px] border text-white border-transparent text-xs rounded-3xl focus:ring-transparent focus:border-transparent block w-full ps-10 p-2.5"
            placeholder="ค้นหาคอนเสิร์ตที่นี่" />
          <div class="absolute inset-y-0 end-0 flex items-center pe-3.5" v-if="searchText"
            @click="(searchText = ''), fetchProduct(true)">
            <font-awesome class="cursor-pointer text-gray-200" :icon="faXmark" />
          </div>
        </div>
        <button @click="fetchProduct(true)" type="button" :disabled="!searchText" :class="`cursor-pointer bg-[#e31f26] text-white h-full py-1 px-5 rounded-3xl text-xs ${searchText ? '' : 'opacity-70'
          }`">
          ค้นหา
        </button>
        <div class="flex items-center relative" @click="showModal()">
          <img class="cursor-pointer w-[1.5rem] aspect-square" src="~/assets/icon-filter-1.svg" alt="" />
          <span v-if="attributeValueIds.length"
            class="bg-[#33FB21] w-[14px] h-[14px] rounded-[50%] text-xs flex absolute top-2 items-center justify-center">
            {{ attributeValueIds.length }}
          </span>
        </div>
        <div class="flex items-center">
          <img class="cursor-pointer w-[1.5rem] aspect-square" src="~/assets/icon-marker.svg" alt="" />
        </div>
      </div>
    </div>

    <!-- popup filter attribute -->
    <div id="app" class="h-full w-full flex items-center">
      <transition name="fade">
        <div v-show="show_modal" class="fixed inset-0 z-[300]">
          <div v-show="show_modal" @click="showModal()"
            class="bg-filter bg-black opacity-75 fixed inset-0 w-full h-full z-20"></div>
          <main class="flex flex-col items-center justify-center h-full w-full relative">
            <transition name="fade-up-down">
              <div v-show="show_modal"
                class="modal-wrapper w-full max-w-md mx-auto md:max-w-xl flex items-center z-[350] absolute top-12 border border-[#2e2e2e] rounded">
                <div class="modal w-full bg-black max-h-screen shadow-lg flex-row rounded relative">
                  <div
                    class="modal-header p-5 bg-black text-gray-900 rounded-t border-b border-dotted border-[#3d3d3d]">
                    <h5 class="text-white text-md font-bold uppercase select-none">
                      ฟิลเตอร์
                    </h5>
                  </div>
                  <div class="modal-body px-8 py-5 w-full h-full h-100">
                    <div class="text-white text-sm font-extralight select-none">
                      แนวเพลง
                    </div>
                    <div class="max-h-[58vh] h-100 overflow-y-auto text-white">
                      <ul class="w-full text-sm font-medium text-white rounded-lg pl-0 pr-5">
                        <li class="w-full" v-for="(attr, index) in attributeList.values" :key="index">
                          <div class="flex items-center ps-3 relative">
                            <label :for="`list-checkbox-attr-${index}`"
                              class="cursor-pointer select-none checkbox-custom-label w-full py-3 ms-2 text-sm font-medium text-[#909090]">
                              {{ attr.name.th }}
                            </label>
                            <input :id="`list-checkbox-attr-${index}`" type="checkbox" :value="attr.id"
                              @change="changeAttribute(attr.id)" name="attr-checkbox"
                              class="checkbox-custom select-none cursor-pointer w-6 h-6 border border-[#3d3d3d]" />
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="modal-footer pb-10 px-5 border0-t text-center">
                    <button class="bg-[#e31f26] px-5 py-2 text-white w-[200px] rounded-3xl"
                      @click="fetchProduct(true), showModal()">
                      ใช้
                    </button>
                  </div>
                </div>
              </div>
            </transition>
          </main>
        </div>
      </transition>
    </div>

    <!-- section banner -->
    <div class="banner mt-5 border-dotted border-b border-[#3d3d3d]">
      <BannerSlides :banners="banners" />
    </div>

    <!-- section recommend -->
    <div class="recommend mt-5 border-dotted border-b border-[#3d3d3d]">
      <h2 class="text-white text-2xl font-bold text-center">แนะนำสำหรับคุณ</h2>
      <RecommendSlides :recommends="recommends" />
    </div>

    <!-- section category -->
    <div class="category mt-5">
      <div class="sm:px-1">
        <ClientOnly>
          <Swiper class="category-swiper mt-4 mb-10" :modules="[SwiperAutoplay, SwiperPagination]"
            :space-between="20" :rewind="true" :breakpoints="{
              1280: {
                slidesPerView: 8,
              },
              1024: {
                slidesPerView: 6,
              },
              720: {
                slidesPerView: 4,
              },
              576: {
                slidesPerView: 3,
              },
              375: {
                slidesPerView: 2,
              },
            }">
            <SwiperSlide :key="-1">
              <div @click="(categoryId = ''), fetchProduct(true)" 
                :class="`card rounded-3xl cursor-pointer flex items-center justify-center w-[120px] h-[45px] text-white ${!categoryId ? 'bg-[#e31f26]' : 'bg-[#121212]'}`"
              >
                ทั้งหมด
              </div>
            </SwiperSlide>
            <SwiperSlide v-for="(slide, index) in categories" :key="index">
              <div @click="(categoryId = slide.id.toString()), fetchProduct(true)" 
                :class="`card rounded-3xl cursor-pointer flex items-center justify-center w-[120px] h-[45px] text-white 
                ${categoryId === slide.id.toString()
                  ? 'bg-[#e31f26]'
                  : 'bg-[#121212]'
                }`"
              >
                {{ slide.name.th }}
              </div>
            </SwiperSlide>
          </Swiper>
        </ClientOnly>
      </div>
    </div>

    <!-- section concert list -->
    <ProductList :concertList="concertList" :isLoading="isLoading" />
  </div>
</template>

<script setup lang="ts">
import {
  faMagnifyingGlass,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

import BannerSlides from '~/components/BannerSlides.vue';
import RecommendSlides from '~/components/RecommendSlides.vue';
import ProductList from '~/components/ProductList.vue';

interface APIBody {
  data: {
    pagination: {
      current_page: number;
      last_page: number;
      limit: number;
      total: number;
    };
    record: Array<any>;
  };
}

const page = ref(1);
const lastPage = ref(7);
const isLoading = ref(false);

const show_modal = ref<boolean>(false);

// filter
const searchText = ref<string>('');
const attributeId = ref<string>('');
const attributeValueIds = ref<Array<string>>([]);
const categoryId = ref<string>('');

// list display
const attributeList = ref<any>([]);
const banners = ref<any>([]);
const recommends = ref<any>([]);
const categories = ref<any>([]);
const concertList = ref<any>([]);

const fetchAttribute = async () => {
  const { data: attributeResult } = await useFetch<APIBody>(
    'https://alpha-api.theconcert.com/attributes?code=genre&show_value=true&status=true&value_status=true'
  );
  if (attributeResult.value) {
    attributeList.value = attributeResult.value.data.record[0];
    attributeId.value = attributeList.value.id;
  }
}

const fetchBanner = async () => {
  const { data: bannerResult } = await useFetch<APIBody>(
    'https://alpha-cdn.theconcert.com/v3/concerts/th/banner-home.json'
  );
  if (bannerResult.value) {
    banners.value = bannerResult.value.data.record;
  }
}

const fetchCategory = async () => {
  const { data: categoryResult } = await useFetch<APIBody>(
    'https://alpha-api.theconcert.com/v2/concerts/categories?page=1'
  );
  if (categoryResult.value) {
    categories.value = categoryResult.value.data.record;
  }
}

const fetchRecommend = async () => {
  const { data: recommendResult } = await useFetch<APIBody>(
    'https://alpha-cdn.theconcert.com/v3/concerts/th/highlight.json'
  );
  if (recommendResult.value) {
    recommends.value = recommendResult.value.data.record;
  }
}

const fetchProductFirstTime = async () => {
  const { data: productDefaultResult } = await useFetch<APIBody>(
    'https://alpha-api.theconcert.com/v3/products?limit=10&order=show_start&page=1&sort=asc&type=event'
  );
  if (productDefaultResult.value) {
    page.value = productDefaultResult.value.data.pagination.current_page;
    lastPage.value = productDefaultResult.value.data.pagination.last_page;
    concertList.value = productDefaultResult.value.data.record;
  }
}

await Promise.all([
  fetchAttribute(),
  fetchBanner(),
  fetchCategory(),
  fetchRecommend(),
  fetchProductFirstTime()
])

const showModal = () => {
  if (show_modal.value) {
    document
      .getElementsByTagName('html')[0]
      .classList.remove('overflow-y-hidden');
    show_modal.value = false;
  } else {
    document.getElementsByTagName('html')[0].classList.add('overflow-y-hidden');
    show_modal.value = true;
  }
};

const fetchProduct = async (resetPage: boolean = false) => {
  const params = {
    limit: '10',
    order: 'show_start',
    sort: 'asc',
    type: 'event',
    page: resetPage ? '1' : page.value?.toString(),
    attribute_id: attributeId.value,
    attribute_value_ids: attributeValueIds.value.join(','),
    q: searchText.value,
    category_id: categoryId.value,
  };

  const searchParams = new URLSearchParams(params);
  const { data: productResult } = await $fetch<APIBody>(
    `https://alpha-api.theconcert.com/v3/products?${searchParams}`
  );
  if (productResult) {
    page.value = productResult.pagination.current_page;
    lastPage.value = productResult.pagination.last_page;
    if (
      resetPage &&
      (searchText.value ||
        attributeId.value ||
        attributeValueIds.value ||
        categoryId.value)
    ) {
      concertList.value = productResult.record;
    } else {
      concertList.value.push(...productResult.record);
    }
  }
  await new Promise((re) => setTimeout(re, 2000));
  isLoading.value = false;
};

const changeAttribute = (_value: string) => {
  if (attributeValueIds.value.includes(_value)) {
    attributeValueIds.value = attributeValueIds.value.filter(
      (el) => el !== _value
    );
  } else {
    attributeValueIds.value.push(_value);
  }
};

onMounted(() => {
  window.addEventListener('scroll', async function (e) {
    if (
      window.innerHeight + window.pageYOffset >=
      document.body.offsetHeight - 209 &&
      !isLoading.value
    ) {
      page.value += 1;
      if (lastPage.value >= page.value) {
        isLoading.value = true;
        await fetchProduct();
      }
    }
  });
});
</script>

<style lang="css">
/* animation for vue transition tag */

.fade-up-down-enter-active {
  transition: all 0.5s ease-in-out;
}

.fade-up-down-leave-active {
  transition: all 0.5s ease-in-out;
}

.fade-up-down-enter {
  transform: translateY(-100px);
  opacity: 0;
}

.fade-up-down-leave-to {
  transform: translateY(-100px);
  opacity: 0;
}

.fade-enter-active {
  -webkit-transition: opacity 0.5s;
  transition: opacity 0.5s;
}

.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

[type='checkbox'] {
  background-color: transparent;
  position: relative;
  border-radius: 50%;
}

[type='checkbox']:after {
  content: '';
  position: absolute;
}

[type='checkbox']:checked:after {
  left: 8px;
  top: 3px;
  width: 7px;
  height: 13px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

[type='checkbox']:checked {
  background-image: none !important;
  color: #11b602;
}

[type='checkbox']:focus,
[type='checkbox']:focus {
  box-shadow: none !important;
}
</style>
