<template>
  <div>
    <div class="section-top flex flex-col items-center border-b border-dotted border-[#3d3d3d] pb-4">
      <img class="h-[60px]" src="~/assets/logo-discover.svg">
      <div class="flex gap-4 mt-4">
        <NuxtLink to="/artist"
          class="nav-link cursor-pointer h-[36px] w-[150px] border-2 border-[#2137fb] rounded-3xl text-center text-sm flex items-center justify-center">
          ศิลปิน/ผู้จัด
        </NuxtLink>
        <NuxtLink to="/concert"
          class="nav-link cursor-pointer h-[36px] w-[150px] border-2 border-[#e31f26] rounded-3xl text-center text-sm flex items-center justify-center">
          คอนเสิร์ต
        </NuxtLink>
        <NuxtLink to="/nightclub"
          class="nav-link cursor-pointer h-[36px] w-[150px] border-2 border-[#33fb21] rounded-3xl text-center text-sm flex items-center justify-center">
          ไนต์คลับ
        </NuxtLink>
      </div>
    </div>

    <!-- section recommend -->
    <div class="recommend mt-5 border-dotted border-b border-[#3d3d3d]">
      <h2 class="text-white text-2xl font-bold text-center">แนะนำสำหรับคุณ</h2>
      <RecommendSlides :recommends="recommends" :show-detail="true" />
      <div class="flex justify-center pb-5">
        <NuxtLink to="/artist">
          <span class="text-[#e31f26] cursor-pointer">
            ดูเพิ่มเติม
            <font-awesome class="mr-1" :icon="faChevronRight" />
          </span>
        </NuxtLink>
      </div>
    </div>

    <!-- section banner -->
    <div class="banner mt-7 border-dotted border-b border-[#3d3d3d]">
      <BannerSlides :banners="banners" />
    </div>

    <div class="mt-5">
      <h2 class="text-white text-2xl font-bold text-center">เวาเชอร์</h2>

      <div class="flex flex-wrap">
        <div v-for="item in vouchers" class="box-pro w-1/3 px-2 h-[140px] flex gap-4 items-center">
          <div class="w-[106px] h-[106px] ml-3 flex-shrink-0">
            <img class="w-full h-full rounded-2xl"
              :src="`https://alpha-res.theconcert.com/w_450,h_600,c_thumb/${item.images[0].id}/${item.images[0].name}`"
              loading="lazy">
          </div>
          <div class="flex flex-col justify-between h-full py-2 w-full">
            <div class="border-dotted border-b border-[#3d3d3d] pb-2">
              <h4 class="text-sm font-bold">{{ item.name }}</h4>
              <p class="text-xs text-[#2bbfff] mt-1">
                <font-awesome class="mr-1" :icon="faLocationDot" />
                {{ item.store.name }}
              </p>
              <p class="text-xs text-[#33fb21] mt-1">
                <font-awesome class="mr-1" :icon="faLocationDot" />
                {{ item.show_time.text_short_date }}
              </p>
            </div>
            <div class="mt-2">
              <div class="btn-get-now bg-[#e31f26] h-[30px] w-[60px] flex justify-center items-center rounded-2xl">
                <a href="#" class="text-xs"> ซื้อบัตร</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center pb-5">
        <NuxtLink to="/voucher">
          <span class="text-[#e31f26] cursor-pointer">
            ดูเพิ่มเติม
            <font-awesome class="mr-1" :icon="faChevronRight" />
          </span>
        </NuxtLink>
      </div>
    </div>

    <section>
      <div :class="`modal ${showPopup ? 'show' : ''}`">
        <div class="model__content">
          <div class="modal__detail w-[375px] p-4 relative" v-if="popup">
            <img class="rounded-xl" :src="`https://alpha-res.theconcert.com/w_450,h_600,c_thumb/${popup.images[0].id}/${popup.images[0].name}`" alt="">
            <div class="text-center px-5 w-[120px] py-2 bg-[#e31f26] text-white text-xs border-2 border-black rounded-3xl font-bold absolute bottom-0 left-0 right-0 mx-auto">
              Buy Now
            </div>
          </div>
        </div>
        <div data-dismiss="modal" class="close justify-center items-center flex" @click="showPopup = false">
          <font-awesome class="text-[20px]" :icon="faX" />
        </div>
      </div>
      <div class="overlay" @click="showPopup = false"></div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { faChevronRight, faLocationDot, faX } from '@fortawesome/free-solid-svg-icons';

import BannerSlides from '~/components/BannerSlides.vue';
import RecommendSlides from '~/components/RecommendSlides.vue';

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

const recommends = ref<any>([]);
const banners = ref<any>([]);
const vouchers = ref<any>([]);
const popups = ref<any>([]);
const popup = ref<any>(null);
const showPopup = ref<boolean>(false);

const fetchRecommend = async () => {
  const { data: recommendResult } = await useFetch<APIBody>(
    'https://alpha-cdn.theconcert.com/v3/concerts/th/highlight.json'
  );
  if (recommendResult.value) {
    recommends.value = recommendResult.value.data.record;
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

const fetchVoucher = async () => {
  const { data: voucherResult } = await useFetch<APIBody>(
    'https://alpha-cdn.theconcert.com/v3/vouchers/th/highlight.json'
  );
  if (voucherResult.value) {
    vouchers.value = voucherResult.value.data.record;
  }
}

const fetchPopup = async () => {
  const { data: popupResult } = await useFetch<APIBody>(
    'https://alpha-cdn.theconcert.com/v3/concerts/en/popup.json'
  );
  if (popupResult.value) {
    popups.value = popupResult.value.data.record;
  }
}

await Promise.all([
  fetchRecommend(),
  fetchBanner(),
  fetchVoucher(),
  fetchPopup()
])

onMounted(() => {
  let popupId = null
  for (const value of popups.value) {
    const popupCookie = useCookie(`popup-${value.id}`, { maxAge: 60 * 60 * 24})
    if (!popupCookie.value) {
      popupId = value.id
      popupCookie.value = 'true'
      break
    }
  }
  if (popupId) {
    const popupFinded = popups.value.find((el: any) => el.id === popupId)
    if (popupFinded) {
      popup.value = popupFinded
      showPopup.value = true
    }
  }
})
</script>

<style lang="scss" scoped>
.box-pro {
  display: flex;
  background: url('~/assets/background-vouchert-home.png');
  background-repeat: no-repeat;
  background-size: 100%;
  border-radius: 15px;
  padding: 0.8em;
}
</style>

<style lang="scss">
.overlay {
  background-color: #000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
  pointer-events: none;
  opacity: 0;
}

.modal {
  border-radius: 15px;
  width: 100%;
  max-width: fit-content;
  padding-bottom: 20px;
  height: fit-content;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  -webkit-transform: translateY(-50px);
  transform: translateY(-50px);
  z-index: 250;
  pointer-events: none;
  opacity: 0;
  transition: transform 0.15s ease-out, opacity 0.3s ease-out;
  transition-delay: 0.1s;
  &.show {
    pointer-events: auto;
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
    transition: transform 0.3s ease-out, opacity 0.3s ease-out;
    transition-delay: 0.2s;
  }

  .close {
    right: 0;
    position: absolute;
    font-size: 26px;
    color: #fff;
    z-index: 2;
    border-radius: 50%;
    background: #212121;
    padding: 5px;
    left: 0;
    bottom: -40px;
    width: 40px;
    height: 40px;
    text-align: center;
    margin: 0 auto;
    border: #fff solid 1.5px;
    cursor: pointer;
  }
}
.modal.show ~ .overlay {
  pointer-events: auto;
  opacity: 0.75;
}
</style>