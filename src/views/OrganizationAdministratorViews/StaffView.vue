<template>
<h1>机构人员</h1>
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
  name: "StaffView",
  created() {
    const myRouter = useRouter();
    this.pageInfo.organizationId = <string>myRouter.currentRoute.value.params.id
    this.pageInfo.id=<string>myRouter.currentRoute.value.params.id2
    axios.get("http://localhost:9090/personal-info-entity/getPersonalInfo/"+this.pageInfo.id).then(res =>{
      this.pageInfo.userType=res.data.userType
      axios.get("http://localhost:9090/personal-info-entity/getInfoByOrganizationId/"+this.pageInfo.organizationId+","+this.pageInfo.userType).then(res =>{
        this.userData=res.data
      })
    })

  },
  setup(){
    const pageInfo = ref({
      id:'',
      organizationId:'',
      userType:0
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