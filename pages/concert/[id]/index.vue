<template>
  <div>
    <div class="top flex justify-between">
      <div class="cursor-pointer" @click="$router.back()">
        <font-awesome class="mr-1" :icon="faArrowLeft" />
        ย้อนกลับ
      </div>
      <div class="cursor-pointer">
        <font-awesome class="text-xl" :icon="faShareNodes" />
      </div>
    </div>
    <div class="detail flex gap-8 mt-5 pb-10">
      <figure class="w-2/5">
        <img class="rounded-3xl"
          :src="`https://alpha-res.theconcert.com/w_450,h_600,c_thumb/${product.images[0].id}/${product.images[0].name}`"
          alt="">
      </figure>
      <div class="w-3/5 flex flex-col justify-between">
        <div class="text-white">
          <h4 class="text-md sm:text-sm md:text-2xl font-bold title-2lines">
            {{ product?.name.th }}
          </h4>
          <div v-if="product?.attributes?.find((el: any) => el.code === 'genre')" class="mt-3 mb-4 border border-[#8d8d8d] text-[#8d8d8d] rounded-xl h-[22px] text-[10px] py-1 w-fit px-3 flex items-center">
            {{ product?.attributes?.find((el: any) => el.code === 'genre').items[0].name.th }}
          </div>
          <div class="text-sm sm:text-xs mb-2 font-medium text-[#33fb21]">
            <font-awesome class="mr-1" :icon="faCalendarDays" />
            {{ product?.show_time.text_short_date }}
          </div>
          <div class="text-sm sm:text-xs mb-2 font-medium text-[#33fb21]">
            <font-awesome class="mr-1" :icon="faClock" />
            {{ product?.show_time.text_short?.split(', ')[1] }}
          </div>
          <div class="text-sm sm:text-xs font-medium text-white title-1lines">
            <font-awesome class="mr-1" :icon="faLocationDot" />
            {{ product?.venue.name.th }}
          </div>
          <div v-if="product?.attributes?.find((el: any) => el.code === 'artist')" class="artist">
            <div class="mt-5 mb-3 text-sm font-bold">ศิลปิน</div>
            <div class="flex gap-4">
              <div v-for="item of product?.attributes?.find((el: any) => el.code === 'artist').items" class="text-center">
                <figure class="w-[64px] rounded-full aspect-square border-2 border-white">
                  <img class="rounded-full w-full h-full object-cover"
                  :src="`https://alpha-res.theconcert.com/w_450,h_600,c_thumb/${item.image.id}/${item.image.name}`"
                  alt="">
                </figure>
                <div class="text-[11px] mt-2">{{ item.name.th }}</div>
              </div>
            </div>
          </div>
          <div v-if="product?.store?.id" class="store cursor-pointer">
            <div class="mt-5 mb-3 text-sm font-bold">ผู้จัดงาน</div>
            <div class="flex gap-4">
              <div class="text-center">
                <figure class="w-[64px] rounded-full aspect-square border-2 border-white">
                  <img class="rounded-full w-full h-full object-cover"
                  :src="`https://alpha-res.theconcert.com/w_450,h_600,c_thumb/${product.store.image.id}/${product.store.image.name}`"
                  alt="">
                </figure>
                <div class="text-[11px] mt-2">{{ product.store.name }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="section-buy items-center px-10 flex justify-between bg-white h-[90px] rounded-[50px]">
          <div class="price flex flex-col text-black">
            <div class="">ราคาเริ่มต้น :</div>
            <div class="text-xl font-bold">{{ product.price.min_text }}</div>
          </div>
          <button type="button" class="w-[130px] h-[40px] bg-[#e31f26] text-white rounded-3xl">ซื้อบัตร</button>
        </div>
      </div>
    </div>
    <div class="description" v-html="product.description.th" />
  </div>
</template>

<script setup lang="ts">
import {
  faArrowLeft,
  faShareNodes,
  faLocationDot,
  faCalendarDays,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { type APIBody } from '@/types/ApiResponse'

const route = useRoute()
const router = useRouter()

const product = ref<any>(null)

const fetchProduct = async () => {
  const { data: productResult } = await useFetch<APIBody>(
    `https://alpha-api.theconcert.com/v3/products/${route.params.id}?device_type=web`
  );
  console.warn(productResult.value)
  if (productResult.value) {
    product.value = productResult.value.data;
  } else {
    router.back()
  }
}

await fetchProduct()
</script>

<style lang="scss">
.description {
  font-size: 1.1rem !important;
  line-height: 1.4;
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif !important;
}
</style>