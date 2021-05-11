<template>
  <div class="home text-center">
    <img class="inline-block" alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <a-button @click="getList()">xx</a-button>
    <!-- <a-pagination v-model:current="current" :total="50" show-less-items /> -->
  </div>
</template>

<script>
import HelloWorld from "/src/components/HelloWorld.vue";
export default {
  components: {
    HelloWorld,
  },
  data() {
    return {
      cropImg: "",
      data: null,
      current: 2,
    };
  },
  methods: {
    getList() {
      console.log("getlist");
    },
  },
};
</script>
