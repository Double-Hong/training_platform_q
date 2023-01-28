<template>
<h1>
  学员名单
</h1>
  <el-table :data="userData" style="width: 100%">
    <el-table-column prop="username" label="用户名" width="180" />
    <el-table-column prop="name" label="姓名" width="180" />
    <el-table-column prop="phone" label="电话" />
    <el-table-column prop="sex" label="性别" />

    <el-table-column prop="qq" label="QQ" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="phone" label="电话" />
  </el-table>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";
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
    return{
      pageInfo,
      userData,
    }
  }
})
</script>

<style scoped>

</style>