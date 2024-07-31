<template>
  <div>
    <div :class="`modal ${show ? 'show' : ''}`">
      <div class="modal__bgblue">
        <div class="modal__head">Hey! I'm a Little Popup .</div>
      </div>
      <div class="model__content">
        <div class="modal__detail">
          <p class="detail">Read Full Article <a
              href="https://medium.com/codesxdiary/%E0%B8%97%E0%B8%B3-modal-%E0%B9%80%E0%B8%A5%E0%B9%88%E0%B8%99%E0%B9%86-%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B9%83%E0%B8%8A%E0%B9%89-javascript-%E0%B8%81%E0%B9%87%E0%B8%97%E0%B8%B3%E0%B9%84%E0%B8%94%E0%B9%89-7177de5db4bb"
              target="_blank" class="detail--link">here</a></p>
          <p class="detail">Source Code <a href="https://github.com/nueymoo/modal-window-css" target="_blank"
              class="detail--link">@github</a></p>
        </div>
        <div class="modal__follow">
          <p class="follow-us">FOLLOW US</p>
        </div>
      </div>
      <label for="click" class="button">
        <a class="button-close">CLOSE</a>
      </label>
    </div>
    <div class="overlay" @click="$emit('close', false)"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  showPopup: {
    type: Boolean,
    required: true,
  },
});

const { showPopup } = props

const show = ref<Boolean> (showPopup)
</script>

<style lang="scss" scoped>
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
  background-color: #fff;
  border-radius: 15px;
  width: 100%;
  max-width: 540px;
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
}

.modal.show {
  pointer-events: auto;
  opacity: 1;
  -webkit-transform: translateY(0);
  transform: translateY(0);
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
  transition-delay: 0.2s;
}
.modal.show ~ .overlay {
  pointer-events: auto;
  opacity: 0.75;
}
</style>