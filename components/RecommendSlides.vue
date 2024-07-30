<template>
  <ClientOnly>
    <Swiper class="recommend-swiper mt-4 mb-10" :modules="[SwiperAutoplay, SwiperPagination]" :slides-per-view="4"
      :centered-slides="true" :space-between="20" :loop="true" :autoplay="{
        delay: 5000,
        disableOnInteraction: true,
      }" :breakpoints="{
        1140: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 3,
        },
        720: {
          slidesPerView: 3,
        },
        375: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
      }">
      <SwiperSlide v-for="(slide, index) in recommends" :key="index">
        <div class="card w-full rounded-2xl overflow-hidden">
          <img class="w-full aspect-[268/357]"
            :src="`https://alpha-res.theconcert.com/w_450,h_600,c_thumb/${slide.images[0].id}/${slide.images[0].name}`"
            :alt="slide" />
        </div>
      </SwiperSlide>
    </Swiper>
  </ClientOnly>
</template>

<script setup>
const props = defineProps({
  recommends: {
    type: Array,
    required: true,
  },
});
const { recommends } = props;
</script>

<style lang="scss">
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