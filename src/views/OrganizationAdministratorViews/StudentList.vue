<template>
<h1>
  学员名单
</h1>
  <el-button style="position: absolute;top: 5%;left: 10%;" @click="back">返回</el-button>
  <el-table :data="userData" style="width: 100%">
    <el-table-column prop="username" label="用户名" width="180" />
    <el-table-column prop="name" label="姓名" width="180" />
    <el-table-column prop="phone" label="电话" />
    <el-table-column prop="sex" label="性别" />
    <el-table-column prop="qq" label="QQ" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="phone" label="电话" />
    <el-table-column>
      <template #header>
        <el-input v-model="search" size="default" placeholder="查找学员" />
      </template>
      <template #default="scope">
        <el-menu
            background-color="aqua"
        >
          <el-sub-menu index="1">
            <template #title>
              <span>操作</span>
            </template>
            <el-menu-item index="1-1" @click="goToIntroduction">编辑</el-menu-item>
            <el-menu-item index="1-2" @click="goToStaff">删除</el-menu-item>
            <el-menu-item index="1-3" @click="goToStaff">重置密码</el-menu-item>
            <el-menu-item index="1-4" @click="goToStaff">学习情况</el-menu-item>
            <el-menu-item index="1-3" @click="goToStaff">成绩</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";
import router from "@/router";
export default defineComponent({
  name: "StudentList",
  created() {
    const myRouter = useRouter()
    this.pageInfo.organizationId=<string>myRouter.currentRoute.value.params.organizationId
    axios.get("http://localhost:9090/personal-info-entity/getStudentsInfoByOrganizationId/"+this.pageInfo.organizationId).then(res =>{
      this.userData=res.data
      console.log(res.data)
    })
  },
  setup(){
    const pageInfo =ref({
      organizationId:''
    })
    const userData =ref([{
      id: '',
      username: '',
      name: '',
      age: '',
      sex: '',
      phone: '',
      qq: '',
      email: '',
      address: '',
      password: '',
      userType: 0,
      organizationId: ''
    }])
    const back = ()=>{
      router.go(-1)
    }
    const search = ref('')
    return{
      pageInfo,
      userData,
      back,
      search,
    }
  }
})
</script>

<style scoped>

</style>