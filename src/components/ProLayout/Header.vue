<template>
  <a-layout-header class="shadow p-0 flex justify-between">
    <div class="px-6 cursor-pointer hover:bg-gray-100" @click="onClickMenuIco">
      <div
        class="text-xl"
        v-is="collapsed ? 'menu-unfold-outlined' : 'menu-fold-outlined'"
      ></div>
    </div>
    <a-space class="flex">
      <a-select
        v-model:value="value"
        show-search
        placeholder="请输入您要查找的功能名称"
        option-filter-prop="children"
        style="width: 200px"
        :filter-option="filterOption"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      >
        <a-select-option
          v-for="menu in menuItems"
          :key="menu.path"
          :value="menu.meta.path"
          >{{ menu.meta.title }}
        </a-select-option>
         <a-select-option
          v-for="cmenu in menuAllItems"
          :key="cmenu.fullPath"
          :value="cmenu.fullPath"
          >{{ cmenu.meta.title }}
        </a-select-option>
      </a-select>
      <a-dropdown class="mx-4">
        <div class="hover:bg-gray-100 cursor-pointer text-center px-4">
          云盈商家
        </div>
        <template v-slot:overlay>
          <a-menu>
            <a-menu-item @click="logout">
              <LogoutOutlined /><span>退出登录</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </a-space>
  </a-layout-header>
</template>

<script>
import Types from 'vue-types';
import {ref} from 'vue';
import menus from '../../mock/menus';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from '@ant-design/icons-vue';

export const BaseMenuProps = {
  menus: Types.array,
};

export default {
  setup() {
    // const handleChange = value => {
    //   // console.log(`selected ${value}`);
    //   router.push(value)

    // };

    const handleBlur = () => {
      console.log('blur');
    };

    const handleFocus = () => {
      console.log('focus');
    };

    const filterOption = (input, option) => {
      console.log(input, option);
      // todo 这里判断不会写
      // for (let i =0 ;i<menus.length ;i++){
      //   if(menus[i].title.indexOf(input) >=0){
      //     return option.value
      //   }
      // }
    };

    return {
      value: ref(undefined),
      menus,
      filterOption,
      handleBlur,
      handleFocus,
      // handleChange,
    };
  },
  computed: {
    menuItems() {
      const fn = (arr, parent = null) =>
        arr
            .filter((i) => i.title && !i.hidden)
            .map((i) => ({
              path: i.path,
              meta: {
                title: i.title,
                icon: i.icon,
              },
              children: i.children,
            }))
            .map((i) => {
              i.fullPath = [];
              if (parent) i.fullPath.push(parent.fullPath);
              i.fullPath.push(i.path);
              i.fullPath = i.fullPath.filter(Boolean).join('/').replace(`//`, '');

              if (i.children?.length) {
                i.children = fn(i.children, i);
              }

              return i;
            });

      return fn(this.menus);
    },
    menuAllItems() {
      const arrays = [];
      const array = this.menuItems.filter((item) => item.children != undefined);
      for (let i = 0; i<array.length; i++ ) {
        for ( let j = 0; j< array[i].children.length; j++) {
          arrays.push(array[i].children[j]);
        }
      }
      return arrays;
    },
  },
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    LogoutOutlined,
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    onClickMenuIco() {
      this.$emit('update:collapsed', !this.collapsed);
    },
    logout() {
      this.$message.info('退出登录');
    },
    handleChange(value) {
      // console.log(`selected ${value}`);
      console.log(this.menuItems, 'menuItems');
      this.$router.push(value);
    },
  },
};
</script>
