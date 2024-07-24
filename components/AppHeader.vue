<script setup>
import {
  faCoins,
  faAngleDown,
  faBars,
  faBell,
  faPersonWalkingLuggage,
  faTicket,
} from '@fortawesome/free-solid-svg-icons';

import { onMounted } from 'vue';

onMounted(() => {
  window.addEventListener('scroll', function () {
    var navbar = document.getElementById('nav');
    var navbarMobile = document.getElementById('navmobile');
    var nav_classes = navbar.classList;
    var nav_classes_mobile = navbarMobile.classList;

    // desktop
    if (document.documentElement.scrollTop >= 60) {
      if (nav_classes.contains('scrolled') === false) {
        nav_classes.toggle('scrolled');
      }
    } else {
      if (nav_classes.contains('scrolled') === true) {
        nav_classes.toggle('scrolled');
      }
    }
    // mobile
    if (document.documentElement.scrollTop >= 38) {
      if (nav_classes_mobile.contains('scrolled') === false) {
        nav_classes_mobile.toggle('scrolled');
      }
    } else {
      if (nav_classes_mobile.contains('scrolled') === true) {
        nav_classes_mobile.toggle('scrolled');
      }
    }
  });
});

const expand = () => {
  const dropdown = document.querySelector('#dropdown-expand');
  if (dropdown) {
    dropdown.style.display =
      dropdown.style.display === 'block' ? 'none' : 'block';
  }
};

const closeExpand = () => {
  const dropdown = document.querySelector('#dropdown-expand');
  if (dropdown) {
    dropdown.style.display = 'none';
  }
};
</script>

<template>
  <div
    id="nav"
    class="container-fluid z-[9999] bg-black border-dotted border-b border-[#3d3d3d] header-topnavigation w-full sticky hidden lg:block"
  >
    <div class="container mx-auto hidden lg:flex justify-between py-4 px-5">
      <div>
        <a href="#"><img src="~/assets/tcc-main-logo.svg" loading="lazy" /></a>
      </div>
      <div class="flex justify-content-end">
        <div class="shortcut-service flex gap-4">
          <img
            src="~/assets/sell-ticket-th.svg"
            loading="lazy"
            class="cursor-pointer h-[27px]"
          />
          <img
            src="~/assets/ticket-agent-th.svg"
            loading="lazy"
            class="cursor-pointer h-[27px]"
          />
          <img
            src="~/assets/create-page-th.svg"
            loading="lazy"
            class="cursor-pointer h-[27px]"
          />
        </div>
        <div class="flex items-center h-fit mt-2 ml-5">
          <div class="currency-box flex items-center">
            <div
              id="change_lang_currency"
              data-toggle="dropdown"
              aria-haspopup="false"
              aria-expanded="false"
              class="dropdown show px-2"
            >
              <button
                class="dropbtn ripple active p-0 text-white text-sm h-[24px]"
              >
                <font-awesome class="mr-1" :icon="faCoins" />
                ฿ THB
                <font-awesome class="ml-2" :icon="faAngleDown" />
              </button>
              <div
                id="dropdown-menu-c"
                aria-labelledby="dropdown_currency"
                class="dropdown-content text-white"
              >
                <a
                  href="#"
                  class="dropdown-item text-[white] hover:text-[#e31f26] bg-[#121212] hover:bg-[#121212] text-sm"
                >
                  $ USD
                </a>
              </div>
            </div>
          </div>
          <div
            data-toggle="dropdown"
            aria-haspopup="false"
            aria-expanded="false"
            class="dropdown show px-2"
          >
            <button
              class="dropbtn flex items-center gap-2 ripple active pa-0 text-white text-sm h-[24px]"
            >
              <img class="w-[15px] h-[15px]" src="~/assets/th.png" />TH
              <font-awesome :icon="faAngleDown" />
            </button>
            <div
              id="dropdown-menu-lang"
              aria-labelledby="dropdownlang"
              class="dropdown-content"
            >
              <a
                href="#"
                class="flex gap-2 items-center dropdown-item text-[white] hover:text-[#e31f26] bg-[#121212] hover:bg-[#121212] text-sm"
              >
                <img class="w-[15px] h-[15px]" src="~/assets/en.png" />EN
              </a>
              <a
                href="#"
                class="flex gap-2 items-center dropdown-item text-[white] hover:text-[#e31f26] bg-[#121212] hover:bg-[#121212] text-sm"
              >
                <img class="w-[15px] h-[15px]" src="~/assets/zh.png" />CN
              </a>
            </div>
          </div>
          <div class="px-2">
            <img
              src="~/assets/_icon-helpcenter.svg"
              loading="lazy"
              width="20"
              height="20"
              class="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="container mx-auto hidden lg:flex justify-end lg:justify-between pt-3 px-5 menu-list"
    >
      <ul class="flex gap-5 h-fit">
        <li class="text-md">
          <a href="javascript:void(0)">หน้าแรก</a>
        </li>
        <li class="text-md active">
          <a href="javascript:void(0)">คอนเสิร์ต</a>
        </li>
        <li class="text-md">
          <a href="javascript:void(0)">ไนต์คลับ </a>
        </li>
        <li class="text-md">
          <a href="javascript:void(0)">ศิลปิน</a>
        </li>
        <li class="text-md">
          <a href="javascript:void(0)">โปรโมชัน</a>
        </li>
        <li class="text-md">
          <a href="javascript:void(0)">สินค้า</a>
        </li>
        <li class="text-md">
          <a href="javascript:void(0)">ข่าวสาร</a>
        </li>
        <li class="text-md relative">
          <a
            href="#"
            class="msg-trigger-btn"
            @click="expand()"
            @focusout="closeExpand()"
          >
            ลูกค้าธุรกิจ
            <font-awesome :icon="faAngleDown" />
          </a>
          <div id="dropdown-expand" class="message-dropdown absolute">
            <ul class="dropdown-msg-list">
              <li class="msg-list-item d-flex">
                <a href="javascript:void(0)" class="dropdown-item text-sm">
                  <i class="las la-clipboard-check"></i>&nbsp; บริการของเรา
                </a>
              </li>
              <li class="msg-list-item d-flex">
                <a href="javascript:void(0)" class="dropdown-item text-sm">
                  <i class="las la-credit-card"></i>&nbsp; ค่าบริการ
                </a>
              </li>
              <li class="msg-list-item d-flex">
                <a href="javascript:void(0)" class="dropdown-item text-sm"
                  ><i class="las la-user-cog"></i>&nbsp; บัญชีธุรกิจ
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li class="text-md">
          <a href="javascript:void(0)">บริการคุ้มครองตั๋วการแสดง</a>
        </li>
      </ul>
      <div id="shortcut_bar" class="shortcut-bar flex gap-3">
        <div class="short-profile">
          <div class="short-profile flex items-center">
            <!-- <font-awesome :icon="faBars" class="text-2xl text-[white] lg:hidden block mr-2" /> -->
            <div class="avatar mr-2">
              <img
                class="w-[20px] h-[20px]"
                src="~/assets/profile-pic-default@2x.png"
                loading="lazy"
              />
            </div>
            <div
              id="_open-panel"
              class="cursor-pointer -display-name text-[white]"
            >
              flk
            </div>
          </div>
        </div>
        <a href="#" class="msg-trigger-btn1">
          <font-awesome :icon="faBell" class="text-[white]" />
        </a>
        <a href="#">
          <font-awesome :icon="faPersonWalkingLuggage" class="text-[white]" />
        </a>
        <a href="#">
          <font-awesome :icon="faTicket" class="text-[white]" />
        </a>
      </div>
    </div>
  </div>
  <div id="navmobile" class="header-topnavigation-mobile z-[9999] container-fluid bg-black border-dotted border-b border-[#3d3d3d] w-full sticky lg:hidden flex items-center">
    <div
      class="container mx-auto lg:hidden flex justify-end lg:justify-between px-5 menu-list"
    >
      <div id="shortcut_bar" class="shortcut-bar flex gap-3">
        <div class="short-profile">
          <div class="short-profile flex items-center">
            <font-awesome
              :icon="faBars"
              class="text-2xl text-[white] lg:hidden block mr-2"
            />
            <div class="avatar mr-2">
              <img
                class="w-[20px] h-[20px]"
                src="~/assets/profile-pic-default@2x.png"
                loading="lazy"
              />
            </div>
            <div
              id="_open-panel"
              class="cursor-pointer -display-name text-[white]"
            >
              flk
            </div>
          </div>
        </div>
        <a href="#" class="msg-trigger-btn1">
          <font-awesome :icon="faBell" class="text-[white]" />
        </a>
        <a href="#">
          <font-awesome :icon="faPersonWalkingLuggage" class="text-[white]" />
        </a>
        <a href="#">
          <font-awesome :icon="faTicket" class="text-[white]" />
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="css">
.header-topnavigation {
  top: 0;
  transition: all 0.5s;
  height: 124px;
}

.header-topnavigation.scrolled {
  top: -60px;
}

.header-topnavigation-mobile {
  top: 0;
  transition: all 0.5s;
  height: 38px;
}

.header-topnavigation-mobile.scrolled {
  top: -38px;
}

.dropbtn {
  background-color: transparent;
  color: white;
  border: none;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  min-width: 80px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  padding: 8px 16px;
  text-decoration: none;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  animation: ripple 1s ease-out;
}

@keyframes ripple {
  0% {
    background: rgba(218, 53, 52, 0.2);
  }
  100% {
    background: transparent;
  }
}

.menu-list ul li {
  color: white;
  padding: 0.1rem 0rem;
}

.menu-list ul li.active {
  background-color: #e31f26;
  border-radius: 15px;
  padding: 0.1rem 1rem;
}

.message-dropdown {
  display: none;
  top: 100%;
  left: 0;
  width: 225px;
  height: auto;
  color: white;
  padding: 15px;
  position: absolute;
  background-color: #000;
  border-radius: 0 0 2px 2px;
  z-index: 999;
  box-shadow: 0 1px 15px 0 rgba(51, 51, 51, 0.2);
}

.message-dropdown .msg-list-item {
  cursor: pointer;
  margin-right: 0;
  padding: 15px 0;
  border-bottom: 1px solid #3d3d3d;
  text-align: left;
  justify-content: space-between;
}
</style>
