<template>
  <div class="container-fluid mx-auto border-dotted border-t border-[#3d3d3d] mt-[-1px]">
    <div class="bg-[#e31f26] lg:h-[186px]">
      <div class="container mx-auto p-3">
        <div class="flex justify-between flex-wrap sm:flex-nowrap">
          <div class="footer-brand w-25 text-center sm:text-left">
            <div class="title-application text-white uppercase text-xs font-bold">The Concert Mobile Application</div>
            <div class="donwload-section flex gap-2 mt-5 justify-center sm:justify-start">
              <div class="google-play app-download-link">
                <a
                  href="https://play.google.com/store/apps/details?id=org.theconcert.mobileapp"
                  target="_blank"
                >
                  <img
                    src="~/assets/google_play.png"
                    width="94px"
                    alt=""
                    loading="lazy"
                  />
                </a>
              </div>
              <div class="app-store app-download-link">
                <a
                  href="https://itunes.apple.com/th/app/the-concert/id1425946801?mt=8"
                  target="_blank"
                >
                  <img
                    src="~/assets/app_store.png"
                    width="94px"
                    alt=""
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
            <div class="follow-us text-white uppercase text-xs font-bold mt-4">FOLLOW US</div>
            <div class="flex gap-1 mt-2 justify-center sm:justify-start">
              <a href="https://www.youtube.com/@theconcert7452" target="_blank"
                ><img src="~/assets/follow_youtube.svg" loading="lazy" />
              </a>
              <a
                href="https://www.facebook.com/theconcertapplication/"
                target="_blank"
              >
                <img src="~/assets/follow_facebook.svg" loading="lazy" />
              </a>
              <a href="https://twitter.com/the_concertapp" target="_blank">
                <img src="~/assets/follow_twitter.svg" loading="lazy" />
              </a>
              <a
                href="https://www.instagram.com/theconcertapplication"
                target="_blank"
              >
                <img src="~/assets/follow_ig.svg" loading="lazy" />
              </a>
            </div>
          </div>
          <div class="footer-menu w-25">
            <div class="mt-3">
              <div class="title text-[#fca4a7] text-md md:text-lg lg:text-xl">รายการหลัก</div>
              <ul class="mt-3 flex flex-col gap-y-2">
                <li><a href="#" class="text-white text-xs lg:text-sm">ข่าวสารวงการเพลง</a></li>
                <li><a href="#" class="text-white text-xs lg:text-sm">คอนเสิร์ตทั้งหมด</a></li>
                <li><a href="#" class="text-white text-xs lg:text-sm">ภาพกิจกรรม</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-menu w-25">
            <div class="contact-footer mt-3">
              <div class="title text-[#fca4a7] text-md md:text-lg lg:text-xl">เกี่ยวกับเรา</div>
              <ul class="mt-3 flex flex-col gap-y-2">
                <li><a href="#" target="_blank" class="text-white text-xs lg:text-sm">เกี่ยวกับเรา</a></li>
                <li>
                  <a href="#" target="_blank" class="text-white text-xs lg:text-sm">ข้อกำหนดการให้บริการ</a>
                </li>
                <li>
                  <a href="#" target="_blank" class="text-white text-xs lg:text-sm">นโยบายความเป็นส่วนตัว</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="footer-menu w-25">
            <div class="contact-footer mt-3">
              <div class="title text-[#fca4a7] text-md md:text-lg lg:text-xl">ฝ่ายลูกค้าสัมพันธ์</div>
              <ul class="mt-3 flex flex-col gap-y-2">
                <li class="text-white text-xs lg:text-sm">Tel. 02-0199455</li>
                <li class="text-white text-xs lg:text-sm">Line : @theconcertapp</li>
                <li class="text-white text-xs lg:text-sm">Wed - Fri 10 a.m. - 6 p.m.</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-footer-res lg:hidden block mx-auto text-center mt-5">
          <div class="copyright text-[hsla(0,0%,88.2%,0.8)] text-[10px] font-bold">THE CONCERT APPLICATION CO.,LTD</div>
          <div class="legal-links text-white">
            <a href="#" target="_blank" class="text-[#777] text-[8px] font-bold">นโยบายความเป็นส่วนตัว</a>
            |
            <a href="#" target="_blank" class="text-[#777] text-[8px] font-bold">ข้อกำหนดการให้บริการ</a>
            | <br />
            <a href="#" target="_blank" class="text-[#777] text-[8px] font-bold">เกี่ยวกับเรา</a> |
            <a href="#" target="_blank" class="text-[#777] text-[8px] font-bold">ฝ่ายลูกค้าสัมพันธ์</a>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-[#a0060c] h-[22px] flex justify-center">
      <span class="text-[#fca4a7] text-sm">
        Copyright © 2022 The Concert All rights reserved.
      </span>
    </div>
  </div>
</template>

<style lang="css" scoped>
@media screen and (max-width: 640px) {
  .footer-brand {
    width: 100% !important;
  }
  .footer-menu {
    width: 33.33% !important;
  }
}
</style>