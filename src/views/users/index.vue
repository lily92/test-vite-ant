<template>
  <div>
    <a-space class="flex justify-end">
      <a-input
        v-model:value="search_key"
        placeholder="请输入关键字搜索"
        @change="changeInput"
      />
      <a-date-picker
        v-model:value="searchQuery.date"
        placeholder="选择日期"
        @change="changeDate"
      />
      <a-month-picker
        v-model:value="searchQuery.month"
        placeholder="选择月份"
        @change="changeMonth"
      />
      <a-button class="" type="primary" @click="searchBtn" value="small"
        >搜索</a-button
      >
      <a-button class="" type="primary" @click="getApi" value="small"
        >新增用户</a-button
      >
      <a-button type="primary" @click="getApi" value="small">导入用户</a-button>
      <div class="bg-"></div>
    </a-space>
    <div class="mt-3">
      <a-table
        size="small"
        :columns="columns"
        :row-key="(record) => record.login.uuid"
        :data-source="dataSource"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <template #name="{ text }">{{ text.first }} {{ text.last }}</template>
        <template #login="{ text }">{{ text.username }}</template>
        <template #picture="{ text }">
          <img
            :src="text.thumbnail"
            alt=""
            srcset=""
            style="width: 50px; height: 50px"
          />
        </template>
        <template #action>
          <a-button class="text-center" size="small" @click="delItem"
            >删除</a-button
          >
        </template>
      </a-table>
    </div>

    <router-link to="$_append('/')" append></router-link>
  </div>
</template>
<script>
import {defineComponent, ref, watch, computed, reactive} from 'vue';
import {usePagination} from 'vue-request';
import api from '/src/utils/api';
import dayjs from 'dayjs';
import Tlist from '../../components/TableList/Tlist.vue';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    width: '20%',
    slots: {
      customRender: 'name',
    },
  },
  {
    title: 'Picture',
    dataIndex: 'picture',
    width: '10%',
    slots: {
      customRender: 'picture',
    },
  },
  {
    title: 'Login',
    dataIndex: 'login',
    width: '20%',
    slots: {
      customRender: 'login',
    },
  },

  {
    title: 'Gender',
    dataIndex: 'gender',
    sorter: true,
    filters: [
      {
        text: 'Male',
        value: 'male',
      },
      {
        text: 'Female',
        value: 'female',
      },
    ],
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: '30%',
    slots: {
      customRender: 'action',
    },
  },
];

export default defineComponent({
  setup() {
    const search_key = ref('');
    const date = ref('');
    const month = ref('');
    const searchQuery = reactive({search_key: search_key, date: date.value.month});
    const queryData = (params) => {
      return `https://randomuser.me/api?${new URLSearchParams(params)}`;
    };
    const {
      data: dataSource,
      run,
      loading,
      current,
      pageSize,
    } = usePagination(queryData, {
      formatResult: (res) => res.results,
      pagination: {
        currentKey: 'page',
        pageSizeKey: 'results',
      },
    });
    const pagination = computed(() => ({
      total: 100,
      current: current.value,
      pageSize: pageSize.value,
      showSizeChanger: true,
      search_key: search_key.value,
      date: searchQuery.date,
      month: searchQuery.month,
    }));

    // filters过滤
    let query = reactive({
      search_key: search_key,
      date: searchQuery.date,
      month: searchQuery.month,
      page: 1,
      results: pageSize.value,
    });
    const handleTableChange = (pag, filters, sorter) => {
      query = {
        search_key: pag.search_key,
        date: pag.date,
        month: pag.month,
        results: pag.pageSize,
        page: pag?.current,
        sortField: sorter.field, // 需要排序的字段
        sortOrder: sorter.order, // 排序
        ...filters,
      };
      run({...query});
    };

    const searchBtn = () => {
      query.page = 1;
      run({...query});
    };
    const delItem = () => {
      console.log('xx');
      // query.page = 1
      run({...query});
    };

    const onShowSizeChange = (current, pageSize) => {
      console.log(current, pageSize);
    };
    const changeDate = (value, dateString) => {
      console.log('Selected Time: ', value);
      console.log('Formatted Selected Time: ', dateString);
      searchQuery.date = dateString;
    };


    return {
      dataSource,
      pagination,
      loading,
      columns,
      handleTableChange,
      onShowSizeChange,
      search_key,
      searchQuery,
      changeDate,
      queryData,
      query,
      searchBtn,
      delItem,
    };
  },
  mounted() {},
  components: {
    Tlist,
  },
  methods: {
    getApi() {
      api('/admin/appointment/getAppointmentItemById', {
        id: '1',
      }).then((e) => {
        console.log(e);
      });
    },
    changeMonth(e, monthString) {
      console.log(e, '日期');
      console.log(monthString, '1日期');
      this.searchQuery.month = monthString;
    },
    changeInput(e) {
      console.log(e, '关键字');
      // this.search_key = "zxx";
    },

  },
});
</script>
