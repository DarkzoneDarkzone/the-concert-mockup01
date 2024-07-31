<template>
  <div class="card flex gap-3 cursor-pointer overflow-hidden rounded-2xl bg-[#1B181A] p-3" @click="navigateTo(`/concert/${concert.id}`)" >
    <figure class="m-0 p-0 w-2/5 flex-shrink-0">
      <img class="aspect-[144/193] h-full rounded-2xl"
        :src="`https://alpha-res.theconcert.com/w_450,h_600,c_thumb/${concert.images[0].id}/${concert.images[0].name}`"
        alt="" />
    </figure>
    <div class="w-3/5 text-white">
      <h4
        class="text-md sm:text-sm md:text-md lg:text-sm 2xl:text-md font-medium lg:h-[40px] title-2lines mb-2 2xl:mb-3">
        {{ concert?.name.th }}
      </h4>
      <div class="text-sm sm:text-xs mb-1 font-medium text-[#33fb21]">
        <font-awesome class="mr-1" :icon="faCalendarDays" />
        {{ concert?.show_time.text_short_date }}
      </div>
      <div class="text-sm sm:text-xs mb-1 font-medium text-[#33fb21]">
        <font-awesome class="mr-1" :icon="faClock" />
        {{ concert?.show_time.text_short?.split(', ')[1] }}
      </div>
      <div class="text-sm sm:text-xs font-medium text-[#2bbfff] title-1lines">
        <font-awesome class="mr-1" :icon="faLocationDot" />
        {{ concert?.venue.name.th }}
      </div>
      <hr class="border-dotted border-0 border-b border-[#3d3d3d] my-5 sm:my-2 lg:my-2 xl:my-4" />

      <button v-if="concert.sales_status" type="button"
        class="bg-[#e31f26] py-1 px-4 rounded-3xl font-semibold text-xs">
        ซื้อบัตร
      </button>
      <button v-else type="button" class="bg-white text-[#e31f26] py-1 px-4 rounded-3xl font-semibold text-xs">
        ดูรายละเอียด
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  faLocationDot,
  faCalendarDays,
  faClock,
} from '@fortawesome/free-solid-svg-icons';

const props = defineProps({
  concert: {
    type: Object,
    required: true,
  }
});

</script>