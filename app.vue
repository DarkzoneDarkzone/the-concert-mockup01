<template>
  <NuxtLayout>
    <AppHeader />
    <div class="container-fluid main-container bg-black text-white">
      <div class="container mx-auto px-5 lg:px-0 py-5">
        <NuxtPage />
      </div>
    </div>
    <AppFooter />
  </NuxtLayout>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  @import url('~/assets/css/style.css');
  
  * {
    font-family: "Kanit", sans-serif !important;
  }

  .main-container {
    min-height: calc(100svh - 124px - 208px);
  }

  .container {
    @media screen and (min-width: 1140px) {
      max-width: 1110px !important;
    }
  }

  input:-internal-autofill-selected {
    background-color: rgba(62,62,62,0.5) !important;
  }
</style>