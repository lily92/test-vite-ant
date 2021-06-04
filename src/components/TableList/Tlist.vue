<template>
  <div>
    <a-table
      size="small"
      :columns="columns"
      :row-key="(record) => record.login.uuid"
      :data-source="dataSource"
      expandedRowKeys=""
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template #name="{ text }">{{ text.first }} {{ text.last }}</template>
      <template #login="{ text }">{{ text.username }}</template>
      <template #picture="{ text }">
        <img :src="text.thumbnail" alt="" srcset=""  style="width:50px; height:50px"/>
      </template>
      <template #action>
        <a-button class=" text-center" size="small" @click="del">删除</a-button>
      </template>
    </a-table>
  </div>
</template>
<script>
import {defineComponent, ref, watch, computed} from 'vue';
import {usePagination} from 'vue-request';
import api from '/src/utils/api';
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
  props: {
    tableObj: {
      type: Object,
      default: () => {
        [], (queryData = (params) => {});
      },
    },
  },
  setup(props) {
    console.log(props.tableObj, 'props');

    const {
      data: dataSource,
      run,
      loading,
      current,
      pageSize,
    } = usePagination(props.tableObj.queryData, {
      formatResult: (res) => res.results,
      pagination: {
        currentKey: 'page',
        pageSizeKey: 'results',
      },
    });
    const pagination = computed(() => ({
      total: props.tableObj.total,
      current: current.value,
      pageSize: pageSize.value,
      showSizeChanger: true,
    }));

    // filters过滤
    const handleTableChange = (pag, filters, sorter) => {
      console.log(pag, filters, sorter);
      console.log(filters);
      console.log(sorter);
      run({
        results: pag.pageSize,
        page: pag?.current,
        sortField: sorter.field, // 需要排序的字段
        sortOrder: sorter.order, // 排序
        ...filters,
      });
    };
    const onShowSizeChange = (current, pageSize) => {
      console.log(current, pageSize);
    };

    return {
      dataSource,
      pagination,
      loading,
      columns,
      handleTableChange,
      onShowSizeChange,
    };
  },
  data() {
    return {};
  },
  methods: {
    del() {},
  },
});
</script>
