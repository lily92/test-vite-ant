<template>
  <div class="about">
    <div class="flex items-center">
      <a-button>sdfsdfsdf</a-button>
      <img class="inline-block" alt="Vue logo" src="../assets/logo.png" />
      <!-- <ACalendar :fullscreen="false"/> -->
      <img
        src="https://weapp-1254144956.file.myqcloud.com//image/20210305/8d55a8d3d8fa29a2.png?imageView2/1/w/122/h/34"
      />
    </div>
    <h1>This is an about page</h1>

    <vue-cropper
      ref="cropper"
      src="https://weapp-1254144956.file.myqcloud.com//image/20210305/8d55a8d3d8fa29a2.png?imageView2/1/w/122/h/34"
    >
    </vue-cropper>
    裁剪后的图片
    <img :src="cropImg" />
    <div class="actions">
      <a href="#" role="button" @click.prevent="zoom(0.2)"> Zoom In </a>
      <a href="#" role="button" @click.prevent="zoom(-0.2)"> Zoom Out </a>
      <a href="#" role="button" @click.prevent="move(-10, 0)"> Move Left </a>
      <a href="#" role="button" @click.prevent="move(10, 0)"> Move Right </a>
      <a href="#" role="button" @click.prevent="move(0, -10)"> Move Up </a>
      <a href="#" role="button" @click.prevent="move(0, 10)"> Move Down </a>
      <a href="#" role="button" @click.prevent="rotate(90)"> Rotate +90deg </a>
      <a href="#" role="button" @click.prevent="rotate(-90)"> Rotate -90deg </a>
      <a ref="flipX" href="#" role="button" @click.prevent="flipX"> Flip X </a>
      <a ref="flipY" href="#" role="button" @click.prevent="flipY"> Flip Y </a>
      <a href="#" role="button" @click.prevent="cropImage"> Crop </a>
      <a href="#" role="button" @click.prevent="reset"> Reset </a>
      <a href="#" role="button" @click.prevent="getData"> Get Data </a>
      <a href="#" role="button" @click.prevent="setData"> Set Data </a>
      <a href="#" role="button" @click.prevent="getCropBoxData">
        Get CropBox Data
      </a>
      <a href="#" role="button" @click.prevent="setCropBoxData">
        Set CropBox Data
      </a>
      <a href="#" role="button" @click.prevent="showFileChooser">
        Upload Image
      </a>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Calendar } from "ant-design-vue";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
//  preview=".preview"
export default defineComponent({
  components: {
    [Calendar.name]: Calendar,
    VueCropper,
  },
  data() {
    return {
      // imgSrc: '../../assets/logo.png',
      cropImg: "",
      data: null,
    };
  },
  methods: {
    cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
    },
    flipX() {
      const dom = this.$refs.flipX;
      let scale = dom.getAttribute("data-scale");
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleX(scale);
      dom.setAttribute("data-scale", scale);
    },
    flipY() {
      const dom = this.$refs.flipY;
      let scale = dom.getAttribute("data-scale");
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleY(scale);
      dom.setAttribute("data-scale", scale);
    },
    getCropBoxData() {
      this.data = JSON.stringify(this.$refs.cropper.getCropBoxData(), null, 4);
    },
    getData() {
      this.data = JSON.stringify(this.$refs.cropper.getData(), null, 4);
    },
    move(offsetX, offsetY) {
      this.$refs.cropper.move(offsetX, offsetY);
    },
    reset() {
      this.$refs.cropper.reset();
    },
    rotate(deg) {
      this.$refs.cropper.rotate(deg);
    },
    setCropBoxData() {
      if (!this.data) return;

      this.$refs.cropper.setCropBoxData(JSON.parse(this.data));
    },
    setData() {
      if (!this.data) return;

      this.$refs.cropper.setData(JSON.parse(this.data));
    },
    setImage(e) {
      const file = e.target.files[0];

      if (file.type.indexOf("image/") === -1) {
        alert("Please select an image file");
        return;
      }

      if (typeof FileReader === "function") {
        const reader = new FileReader();

        reader.onload = (event) => {
          this.imgSrc = event.target.result;
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result);
        };

        reader.readAsDataURL(file);
      } else {
        alert("Sorry, FileReader API not supported");
      }
    },
    showFileChooser() {
      this.$refs.input.click();
    },
    zoom(percent) {
      this.$refs.cropper.relativeZoom(percent);
    },
  },
});
</script>
<style scoped>
.actions a {
  border: 1px solid #ccc;
  margin-right: 10px;
}
</style>
