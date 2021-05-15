<template>
  <div>
    <a-space class="flex justify-end">
      search_key: {{ search_key }}
      <a-input
        v-model:value="search_key"
        placeholder="请输入关键字搜索"
        @change="changeInput"
      />
      <a-date-picker
        v-model:value="date"
        placeholder="选择日期"
        @change="changeDate"
      />
      <a-month-picker
        v-model:value="value1"
        placeholder="选择月份"
        @change="changeMonth"
      />
      <a-button class="" type="primary" @click="getApi" value="small"
        >新增用户</a-button
      >
      <a-button type="primary" @click="getApi" value="small">导入用户</a-button>
      <div class="bg-"></div>
    </a-space>
    <div class="mt-3">
      <Tlist :tableObj="tableObj" />
    </div>

    <router-link to="$_append('/')" append></router-link>
  </div>
</template>
<script>
import { defineComponent, ref, watch, computed, reactive } from "vue";
import api from "/src/utils/api";
import dayjs from "dayjs";
import Tlist from "../../components/TableList/Tlist.vue";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: true,
    width: "20%",
    slots: {
      customRender: "name",
    },
  },
  {
    title: "Picture",
    dataIndex: "picture",
    width: "10%",
    slots: {
      customRender: "picture",
    },
  },
    {
    title: "Login",
    dataIndex: "login",
    width: "20%",
    slots: {
      customRender: "login",
    },
  },
    
  {
    title: "Gender",
    dataIndex: "gender",
    sorter: true,
    filters: [
      {
        text: "Male",
        value: "male",
      },
      {
        text: "Female",
        value: "female",
      },
    ],
    width: "20%",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Action",
    key: 'operation',
    fixed: 'right',
    width: "30%",
    slots: {
      customRender: 'action',
    },
  },
];
// const queryData = (params) => {
//   return (
//     `https://randomuser.me/api?search_key=` +
//     search_key +
//     `&a=2&${new URLSearchParams(params)}`
//   );
// };
export default defineComponent({
  setup() {
    const search_key = ref("");
    // search_key.value = xxx
    const obj = reactive({ search_key });
    return {
      value1: ref(),
      date: ref(),
      search_key: ref(""),
    };
  },
  mounted() {},
  data() {
    return {
      tableObj: {
        columns,
        queryData:this.queryData,
        total: 100,
      },
    };
  },
  components: {
    Tlist,
  },
  methods: {
    queryData(params) {
      return (
        `https://randomuser.me/api?search_key=` +
        this.search_key +
        `&a=2&${new URLSearchParams(params)}`
      );
    },
    getApi() {
      api("/admin/appointment/getAppointmentItemById", {
        id: "1",
      }).then((e) => {
        console.log(e);
        console.log(this.search_key, "xxxx-search0key");
        console.log(this.tableObj.queryData, "queryData");
      });
    },
    changeDate(e) {
      console.log(e, "日期");
    },
    changeMonth(e) {
      console.log(e, "日期");
    },
    changeInput(e) {
      console.log(e, "关键字");
      // this.search_key = "zxx";
    },
  },
});
</script>
