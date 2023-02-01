<template>
  <h1>{{ organizationInfo.name }}</h1>
  <el-descriptions :border="true" :column="1" size="large">
    <el-descriptions-item label="机构名" label-align="center" label-class-name="labelTwo" min-width="1">
      {{ organizationInfo.name }}
    </el-descriptions-item>
    <el-descriptions-item label="机构电话" label-align="center" label-class-name="labelTwo" min-width="1">
      {{ organizationInfo.phone }}
    </el-descriptions-item>
    <el-descriptions-item label="机构邮箱" label-align="center" label-class-name="labelTwo" min-width="1">
      {{ organizationInfo.email }}
    </el-descriptions-item>
    <el-descriptions-item label="机构介绍" label-align="center" label-class-name="labelTwo" min-width="1">
      {{ organizationInfo.introduction }}
    </el-descriptions-item>
    <el-descriptions-item label="机构要求" label-align="center" label-class-name="labelTwo" min-width="1">
      {{ organizationInfo.entryRequirement }}
    </el-descriptions-item>

  </el-descriptions>
</template>

<script lang="ts">
import router from "@/router";
import {defineComponent, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";

export default defineComponent({
  name: "IntroductionView",
  created() {
    const myRouter = useRouter()
    this.pageInfo.organizationId = <string>myRouter.currentRoute.value.params.id
    axios.get("http://localhost:9090/organization-info-entity/getOrganizationById/" + this.pageInfo.organizationId).then(res => {
      this.organizationInfo = res.data
      this.pageInfo.organizationName = res.data.name
    })
  },
  setup() {
    const back = () => {
      router.back()
    }
    const pageInfo = reactive({
      organizationId: '',
      organizationName: '',
    })
    const organizationInfo = ref({
      id: '',
      name: '',
      phone: '',
      email: '',
      introduction: '',
      createTime: '',
      entryRequirement: '',
    })
    return {
      back,
      pageInfo,
      organizationInfo,
    }
  }
})
</script>

<style scoped>

</style>