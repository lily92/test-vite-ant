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
        <img :src="text.thumbnail" alt="" srcset="" />
      </template>
      <template #action>
        <a-button class=" text-center" size="small">操作</a-button>
      </template>
    </a-table>
  </div>
</template>
<script>
import { defineComponent, ref, watch, computed } from "vue";
import { usePagination } from "vue-request";
import api from "/src/utils/api";
export default defineComponent({
  props: {
    tableObj: {
      type: Object,
      default: () => {
        columns: [], (queryData = (params) => {});
      },
    },
  },
  setup(props) {
    console.log(props.tableObj, "props");
    const columns = props.tableObj.columns;
    const {
      data: dataSource,
      run,
      loading,
      current,
      pageSize,
    } = usePagination(props.tableObj.queryData, {
      formatResult: (res) => res.results,
      pagination: {
        currentKey: "page",
        pageSizeKey: "results",
      },
    });
    const pagination = computed(() => ({
      total: props.tableObj.total,
      current: current.value,
      pageSize: pageSize.value,
      showSizeChanger: true,
    }));

    //filters过滤
    const handleTableChange = (pag, filters, sorter) => {
      console.log(pag, filters, sorter);
      console.log(filters);
      console.log(sorter);
      run({
        results: pag.pageSize,
        page: pag?.current,
        sortField: sorter.field, //需要排序的字段
        sortOrder: sorter.order, //排序
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
  methods: {},
});
</script>
