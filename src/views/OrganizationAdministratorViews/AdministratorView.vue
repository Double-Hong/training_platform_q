<template>

  <div id="one">
    <h1>This is AdministratorView</h1>
    <!--    <h2>{{pageInfo.username}}</h2>-->
    <h1>管理员 {{ pageInfo.username }}你好</h1>
    <el-descriptions :border="true" :column="2" size="large">
      <el-descriptions-item label="账户" label-align="center" label-class-name="labelOne" min-width="200">
        {{ userData.administratorInfo[0].username }}
      </el-descriptions-item>
      <el-descriptions-item label="姓名" label-align="center" label-class-name="labelTwo" min-width="200">
        {{ userData.administratorInfo[0].name }}
      </el-descriptions-item>
      <el-descriptions-item label="性别" label-align="center" label-class-name="labelTwo">
        {{ userData.administratorInfo[0].sex }}
      </el-descriptions-item>
      <el-descriptions-item label="年龄" label-align="center" label-class-name="labelTwo">
        {{ userData.administratorInfo[0].age }}
      </el-descriptions-item>
      <el-descriptions-item label="邮箱" label-align="center" label-class-name="labelTwo">
        {{ userData.administratorInfo[0].email }}
      </el-descriptions-item>
      <el-descriptions-item label="地址" label-align="center" label-class-name="labelTwo">
        {{ userData.administratorInfo[0].address }}
      </el-descriptions-item>
      <el-descriptions-item label="电话" label-align="center" label-class-name="labelTwo">
        {{ userData.administratorInfo[0].phone }}
      </el-descriptions-item>
      <el-descriptions-item label="QQ" label-align="center" label-class-name="labelTwo">
        {{ userData.administratorInfo[0].qq }}
      </el-descriptions-item>
      <el-descriptions-item label="类型" label-align="center" label-class-name="labelTwo">
        <el-tag size="large">{{ userData.administratorInfo[0].userType }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="所属机构" label-align="center" label-class-name="labelTwo">
        <el-tag size="large">{{ userData.administratorInfo[0].organizationId }}</el-tag>
      </el-descriptions-item>
    </el-descriptions>
    <el-button @click="modifyPasswordVisible=true">修改密码</el-button>
  </div>
  <el-dialog
      title="修改密码"
      v-model="modifyPasswordVisible"
      width="30%"
  >
    <el-form v-show="!modifyPasswordFirstVisible">
      <el-form-item label="输入原密码">
        <el-input v-model="oldPassword" show-password clearable></el-input>
      </el-form-item>
      <el-button style="width: 50%" @click="modifyPasswordFirst">下一步</el-button>
    </el-form>
    <el-form v-show="modifyPasswordFirstVisible">
      <el-form-item label="输入新密码">
        <el-input v-model="newPassword" show-password clearable></el-input>
      </el-form-item>
<!--      <el-button @click="modifyPasswordFirstVisible=false">上一步</el-button>-->
      <el-button @click="modifyPasswordSecond">确认修改</el-button>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import {useRouter} from "vue-router";
import {defineComponent, reactive, ref} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";

export default defineComponent({
  name: "AdministratorView",
  created() {
    const myRouter = useRouter();
    this.pageInfo.id = <string>myRouter.currentRoute.value.params.id
    // this.pageInfo.username = <string>myRouter.currentRoute.value.params.username
    axios.get("http://localhost:9090/personal-info-entity/getPersonalInfo/" + this.pageInfo.id).then(res => {
      this.userData.administratorInfo[0] = res.data
      this.pageInfo.username = res.data.username
      console.log(res.data)
    })
  },
  setup() {
    const pageInfo = reactive({
      id: '',
      username: ''
    })
    const modifyPasswordVisible = ref(false)
    const modifyPasswordFirstVisible = ref(false)
    const oldPassword=ref("")//原密码
    const newPassword =ref("")//新密码
    const userData = reactive({
      administratorInfo: [{
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
        userType: '',
        organizationId: ''
      }]
    })
    //确认原密码
    const modifyPasswordFirst = ()=>{
      axios.post("http://localhost:9090/personal-info-entity/checkOldPassword",{
        id:pageInfo.id,
        password:oldPassword.value,
      }).then(res =>{
        if (res.data===1){
          modifyPasswordFirstVisible.value=true
        }
        else{
          ElMessage({
            showClose:true,
            message:"原密码错误!",
            type:'error',
          })
        }
      })
    }
    const modifyPasswordSecond = ()=>{
      axios.post("http://localhost:9090/personal-info-entity/modifyPassword",{
        id:pageInfo.id,
        password:newPassword.value
      }).then(res=>{
        if (res.data==1){
          ElMessage({
            showClose:true,
            message:"修改成功",
            type:'success'
          })
        }
      })
    }
    return {
      pageInfo,
      userData,
      modifyPasswordVisible,
      modifyPasswordFirstVisible,
      modifyPasswordFirst,
      modifyPasswordSecond,
      oldPassword,
      newPassword,
    }
  }
})
</script>

<style>
#one {
  /*background-color: #42b983;*/
  position: absolute;
  width: 100%;
  top: 0;
  height: 100%;
}
</style>