<script setup lang="ts">
import {
  faLocationDot,
  faCalendarDays,
  faClock,
} from '@fortawesome/free-solid-svg-icons';

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

const banners = ref<any>([]);
const recommend = ref<any>([]);
const categories = ref<any>([]);
const concertList = ref<any>([]);

const { data: bannerResult } = await useFetch<APIBody>(
  'https://alpha-cdn.theconcert.com/v3/concerts/th/banner-home.json'
);
if (bannerResult.value) {
  banners.value = bannerResult.value.data.record;
}

const { data: categoryResult } = await useFetch<APIBody>(
  'https://alpha-api.theconcert.com/v2/concerts/categories?page=1'
);
if (categoryResult.value) {
  categories.value = categoryResult.value.data.record;
}

const { data: productResult } = await useFetch<APIBody>(
  'https://alpha-api.theconcert.com/v3/products?limit=10&order=show_start&page=1&sort=asc&type=event'
);
if (productResult.value) {
  page.value = productResult.value.data.pagination.current_page;
  lastPage.value = productResult.value.data.pagination.last_page;
  concertList.value = productResult.value.data.record;
}

recommend.value = [
  'https://alpha-res.theconcert.com/w_375,h_499,c_thumb/9bde3cae87f0ad11578552e1a6f8fad61/fb-wednesday(rock-pub).jpg',
  'https://alpha-res.theconcert.com/w_375,h_499,c_thumb/e06f1375e4365ffe87931f49f1533a9c4/s__50495536.jpg',
  'https://alpha-res.theconcert.com/w_375,h_499,c_thumb/db9e571a70a10f7ef020ca4d117c6a6e2/bramble-cocktail-print.jpg',
  'https://alpha-res.theconcert.com/w_375,h_499,c_thumb/b86b532968c55c882b1a2af90360ea926/d935b99649a24def4081e414ea98e0eb.jpg',
  'https://alpha-res.theconcert.com/w_375,h_499,c_thumb/5fe74133816a8178d38899058bc69a8d1/100x-poster-724x1024.gif',
  'https://alpha-res.theconcert.com/w_375,h_499,c_thumb/554b7285c84af02d52c2c0aa0bb98ac7b/side-by-side-bright-win-concert-634f68b912a50-l.jpg',
  'https://alpha-res.theconcert.com/w_375,h_499,c_thumb/b3ba95f2b1f45aa5351c3e40e9781a34a/images.jpg',
  'https://alpha-res.theconcert.com/w_375,h_499,c_thumb/570593ab4331adc8f189780cfc277a424/6_600x800.jpg',
  'https://alpha-res.theconcert.com/w_375,h_499,c_thumb/1c848c0335581bac9cf1b3f874418aa76/600x800-01.jpg',
  'https://alpha-res.theconcert.com/w_375,h_499,c_thumb/9f441eebe9b54c186bd2df6a5a870a096/final-2png-01.jpg',
];

const loadMoreProduct = async () => {
  const { data: productResult } = await $fetch<APIBody>(
    `https://alpha-api.theconcert.com/v3/products?limit=10&order=show_start&page=${page.value}&sort=asc&type=event`
  );
  if (productResult) {
    page.value = productResult.pagination.current_page;
    lastPage.value = productResult.pagination.last_page;
    concertList.value.push(...productResult.record);
  }
  await new Promise((re) => setTimeout(re, 2000));
  isLoading.value = false;
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
        await loadMoreProduct();
      }
    }
  });
});
</script>

<template>
  <div class="pb-24">
    <div class="flex justify-between">
      <h2 class="text-white text-2xl font-bold">คอนเสิร์ต</h2>
      <h5 class="text-white">ค้นหา</h5>
    </div>

    <!-- section banner -->
    <div class="banner mt-5 border-dotted border-b border-[#3d3d3d] md:px-20">
      <Swiper
        class="banner-swiper mb-10"
        :modules="[SwiperAutoplay, SwiperPagination]"
        :slides-per-view="2"
        :pagination="{
          clickable: true,
        }"
        :space-between="20"
        :loop="true"
        :autoplay="{
          delay: 1500,
          disableOnInteraction: true,
        }"
      >
        <SwiperSlide v-for="(slide, index) in banners" :key="index">
          <div class="card w-full rounded-2xl overflow-hidden">
            <img
              class="w-full aspect-[2]"
              :src="slide.images[0].url"
              :alt="slide"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- section recommend -->
    <div class="recommend mt-5 border-dotted border-b border-[#3d3d3d]">
      <h2 class="text-white text-2xl font-bold text-center">แนะนำสำหรับคุณ</h2>
      <ClientOnly>
        <Swiper
          class="recommend-swiper mt-4 mb-10"
          :modules="[SwiperAutoplay, SwiperPagination]"
          :slides-per-view="4"
          :space-between="20"
          :loop="true"
          :autoplay="{
            delay: 5000,
            disableOnInteraction: true,
          }"
          :breakpoints="{
            1024: {
              slidesPerView: 4,
            },
            720: {
              slidesPerView: 3,
            },
          }"
        >
          <SwiperSlide v-for="(slide, index) in recommend" :key="index">
            <div class="card w-full rounded-2xl overflow-hidden">
              <img class="w-full aspect-[268/357]" :src="slide" :alt="slide" />
            </div>
          </SwiperSlide>
        </Swiper>
      </ClientOnly>
    </div>

    <!-- section category -->
    <div class="category mt-5">
      <div class="sm:px-10">
        <ClientOnly>
          <Swiper
            class="category-swiper mt-4 mb-10"
            :modules="[SwiperAutoplay, SwiperPagination]"
            :space-between="20"
            :rewind="true"
            :breakpoints="{
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
            }"
          >
            <SwiperSlide :key="-1">
              <div
                class="card rounded-3xl cursor-pointer flex items-center justify-center text-white bg-[#e31f26] w-[120px] h-[45px]"
              >
                ทั้งหมด
              </div>
            </SwiperSlide>
            <SwiperSlide v-for="(slide, index) in categories" :key="index">
              <div
                class="card rounded-3xl cursor-pointer flex items-center justify-center text-white bg-[#121212] w-[120px] h-[45px]"
              >
                {{ slide.name.th }}
              </div>
            </SwiperSlide>
          </Swiper>
        </ClientOnly>
      </div>
    </div>

    <!-- section concert list -->
    <div class="flex flex-wrap gap-y-5 mt-10">
      <div
        class="px-2 w-full md:w-1/2 lg:w-1/3"
        v-for="(concert, index) in concertList"
        :key="index"
      >
        <div
          class="card flex gap-3 overflow-hidden rounded-2xl bg-[#1B181A] p-3"
        >
          <figure class="m-0 p-0 w-2/5 flex-shrink-0">
            <img
              class="aspect-[144/193] h-full rounded-2xl"
              :src="`https://alpha-res.theconcert.com/w_450,h_600,c_thumb/${concert.images[0].id}/${concert.images[0].name}`"
              alt=""
            />
          </figure>
          <div class="w-3/5 text-white">
            <h4
              class="text-xl md:text-md lg:text-sm 2xl:text-lg font-medium lg:h-[40px] 2xl:h-[55px] title-2lines mb-2 2xl:mb-3"
            >
              {{ concert?.name.th }}
            </h4>
            <div
              class="text-lg md:text-xs 2xl:text-sm mb-1 font-medium text-[#33fb21]"
            >
              <font-awesome class="mr-1" :icon="faCalendarDays" />
              {{ concert?.show_time.text_short_date }}
            </div>
            <div
              class="text-lg md:text-xs 2xl:text-sm mb-1 font-medium text-[#33fb21]"
            >
              <font-awesome class="mr-1" :icon="faClock" />
              {{ concert?.show_time.text_short?.split(', ')[1] }}
            </div>
            <div
              class="text-lg md:text-xs 2xl:text-sm font-medium text-[#2bbfff] title-1lines"
            >
              <font-awesome class="mr-1" :icon="faLocationDot" />
              {{ concert?.venue.name.th }}
            </div>
            <hr
              class="border-dotted border-0 border-b border-[#3d3d3d] my-5 md:my-2 lg:my-2 xl:my-4"
            />

            <button
              type="button"
              class="bg-[#e31f26] py-2 px-4 rounded-3xl font-bold text-lg md:text-sm"
            >
              ซื้อบัตร
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="isLoading"
        role="status"
        class="px-2 w-full md:w-1/2 lg:w-1/3 animate-pulse"
      >
        <div
          class="card flex gap-3 overflow-hidden rounded-2xl bg-[#1B181A] p-3"
        >
          <div
            class="flex items-center justify-center w-2/5 flex-shrink-0 h-full bg-gray-600 rounded-2xl"
          >
            <div
              class="flex items-center justify-center w-full h-full aspect-[144/193]"
            >
              <svg
                class="w-10 h-10 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path
                  d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"
                />
              </svg>
            </div>
          </div>
          <div class="w-3/5 text-white">
            <div class="h-2.5 bg-gray-600 rounded-full w-full mb-2"></div>
            <div class="h-2.5 bg-gray-600 rounded-full w-full mb-2"></div>
            <div class="h-2 bg-gray-600 rounded-full mt-5"></div>
            <div class="h-2 bg-gray-600 rounded-full mt-2"></div>
            <div class="h-2 bg-gray-600 rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="-loading text-center flex justify-center" v-if="isLoading">
      <img
        src="~/assets/icon-loading.webp"
        class="_loading-img max-w-[160px]"
      />
    </div>
  </div>
</template>

<style lang="css">
.title-1lines {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.title-2lines {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.banner-swiper {
  .swiper-pagination {
    position: unset;
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
    .swiper-pagination-bullet {
      pointer-events: auto;
      caret-color: transparent;
      background-color: white;
      opacity: 0.4;
    }
    .swiper-pagination-bullet.swiper-pagination-bullet-active {
      opacity: 0.75;
    }
  }
}

.recommend-swiper {
  .swiper-slide {
    width: 268px !important;
    @media screen and (max-width: 768px) {
      width: 200px !important;
    }
    @media screen and (max-width: 640px) {
      width: 150px !important;
    }
  }
}
</style>
