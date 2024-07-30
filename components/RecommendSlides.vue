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
          <img class="w-full rounded-2xl aspect-[268/357]"
            :src="`https://alpha-res.theconcert.com/w_450,h_600,c_thumb/${slide.images[0].id}/${slide.images[0].name}`"
            :alt="slide" />
          <div v-if="showDetail" class="text-white rounded-2xl bg-[#121212] p-4">
            <h4
              class="text-md sm:text-sm md:text-md lg:text-sm 2xl:text-md font-medium lg:h-[40px] title-2lines mb-2 2xl:mb-3">
              {{ slide?.name }}
            </h4>
            <div class="text-sm sm:text-xs mb-1 font-medium text-[#33fb21]">
              <font-awesome class="mr-1" :icon="faCalendarDays" />
              {{ slide?.show_time.text_short_date }}
            </div>
            <div class="text-sm sm:text-xs mb-1 font-medium text-[#33fb21]">
              <font-awesome class="mr-1" :icon="faClock" />
              {{ slide?.show_time.text_short?.split(', ')[1] }}
            </div>
            <div class="text-sm sm:text-xs font-medium text-[#2bbfff] title-1lines">
              <font-awesome class="mr-1" :icon="faLocationDot" />
              {{ slide?.venue.name }}
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </ClientOnly>
</template>

<script setup>
import {
  faLocationDot,
  faCalendarDays,
  faClock,
} from '@fortawesome/free-solid-svg-icons';

const props = defineProps({
  recommends: {
    type: Array,
    required: true,
  },
  showDetail: {
    type: Boolean,
    default: false
  }
});
const { recommends, showDetail } = props;
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