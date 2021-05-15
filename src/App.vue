<template>
  <router-view v-if="isAuthPage"/>
    <pro-layout v-else :menus="menus">
      <router-view />
    </pro-layout>
</template>
<script>
import ProLayout from '/src/components/ProLayout/index.vue';
import menus from './mock/menus';

import {useRoute} from 'vue-router';
import {watch, ref} from 'vue';

export default {
  components: {
    ProLayout,
  },
  setup() {
    const route = useRoute();

    const isAuthPage = ref(true);
    watch(route, () => {
      isAuthPage.value = route.fullPath.includes('/login');
    });

    return {
      menus,
      isAuthPage,
    };
  },
};
</script>
<style lang="scss">
@font-face {
  font-family: "iconfont"; /* Project id 2547815 */
  src: url('//at.alicdn.com/t/font_2547815_z5nogkhciwp.woff2?t=1620961532650') format('woff2'),
       url('//at.alicdn.com/t/font_2547815_z5nogkhciwp.woff?t=1620961532650') format('woff'),
       url('//at.alicdn.com/t/font_2547815_z5nogkhciwp.ttf?t=1620961532650') format('truetype');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 14px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-right: 5px;
}

.icon-home:before {
  content: "\e623";
}

.icon-guanli:before {
  content: "\e615";
}

.icon-user:before {
  content: "\e916";
}

</style>


