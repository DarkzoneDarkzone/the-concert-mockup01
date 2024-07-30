<template>
  <div class="flex flex-wrap gap-y-5 mt-10 mx-[-1rem]">
    <div class="px-2 w-full sm:w-1/2 lg:w-1/3" v-for="(concert, index) in concertList" :key="index">
      <ProductCard :concert="concert" />
    </div>
    <div v-if="isLoading" role="status" class="px-2 w-full sm:w-1/2 lg:w-1/3 animate-pulse">
      <div class="card flex gap-3 overflow-hidden rounded-2xl bg-[#1B181A] p-3">
        <div class="flex items-center justify-center w-2/5 flex-shrink-0 h-full bg-gray-600 rounded-2xl">
          <div class="flex items-center justify-center w-full h-full aspect-[144/193]">
            <svg class="w-10 h-10 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="currentColor" viewBox="0 0 20 18">
              <path
                d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
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
      <img src="~/assets/icon-loading.webp" class="_loading-img max-w-[160px]" />
    </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue';
const props = defineProps({
  concertList: {
    type: Array,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true
  }
});
const { concertList } = props;
</script>
