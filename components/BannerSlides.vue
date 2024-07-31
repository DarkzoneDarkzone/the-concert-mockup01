<template>
  <Swiper class="banner-swiper mb-5" :modules="[SwiperAutoplay, SwiperPagination]" :slides-per-view="2"
    :pagination="{
      clickable: true,
    }"
    :space-between="20" 
    :loop="true" 
    :autoplay="{
      delay: 2000,
      disableOnInteraction: true,
    }" 
    :breakpoints="{
      768: {
        spaceBetween: 20,
      },
      375: {
        spaceBetween: 10,
      },
    }" 
    :centered-slides="true"
  >
    <SwiperSlide v-for="(slide, index) in banners" :key="index">
      <div class="card w-full cursor-pointer rounded-lg sm:rounded-2xl overflow-hidden" @click="navigateTo(`/concert/${getProductId(slide.fields)}`)">
        <img class="w-full aspect-[2]" :src="slide.images[0].url" :alt="slide" />
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
const props = defineProps({
  banners: {
    type: Array,
    required: true,
  },
});
const { banners } = props;

const getProductId = (_fields) => {
  const prod = _fields.find(el => el.name === 'data_id')
  if (prod) {
    return prod.lang
  }
  return 0
}
</script>

<style lang="css">
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
</style>