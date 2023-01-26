<template>
  <div id="two">
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
<!--      <el-descriptions-item label="姓名" label-align="center" label-class-name="labelTwo" min-width="200">-->
<!--        {{ userData.administratorInfo[0].name }}-->
<!--      </el-descriptions-item>-->
<!--      <el-descriptions-item label="性别" label-align="center" label-class-name="labelTwo">-->
<!--        {{ userData.administratorInfo[0].sex }}-->
<!--      </el-descriptions-item>-->
<!--      <el-descriptions-item label="年龄" label-align="center" label-class-name="labelTwo">-->
<!--        {{ userData.administratorInfo[0].age }}-->
<!--      </el-descriptions-item>-->
<!--      <el-descriptions-item label="邮箱" label-align="center" label-class-name="labelTwo">-->
<!--        {{ userData.administratorInfo[0].email }}-->
<!--      </el-descriptions-item>-->
    </el-descriptions>
  </div>
  <div id="menu">
    <el-button type="primary" style="position: absolute;top: 8%;left: 40%" @click="back">返回</el-button>
    <el-menu
        style="position:absolute;width: 100%;top: 20%;height: 80%"
    >
      <el-sub-menu index="1">
        <template #title>
          <span>菜单</span>
        </template>
        <el-menu-item index="1-1">机构简介</el-menu-item>
        <el-menu-item index="1-2">机构人员</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import {defineComponent, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";

export default defineComponent({
  name: "SchoolView",
  created() {
    const myRouter = useRouter()
    this.pageInfo.organizationId = <string>myRouter.currentRoute.value.params.id
    axios.get("http://localhost:9090/organization-info-entity/getOrganizationById/" + this.pageInfo.organizationId).then(res => {
      this.organizationInfo = res.data
      this.pageInfo.organizationName = res.data.name
      console.log(this.organizationInfo.name)
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

<style>
#two {
  position: absolute;
  height: 100%;
  top: 0;
  left: 20%;
  width: 80%;
}

#menu {
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  width: 20%;
  /*background-color: #7be18f;*/
}
</style>