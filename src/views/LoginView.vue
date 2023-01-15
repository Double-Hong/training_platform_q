<template>
  <div style="background-color: beige;overflow: hidden;height: auto">
    <div style="width: 450px;margin:200px auto">
      <div style="color: #42b983;font-size: 30px;text-align: center">欢迎登录</div>
     <div >
       <el-form :model="loginForm" label-width="120px">
         <el-form-item label="name" prop="name" >
           <el-col :span="16">
             <el-input v-model="loginForm.username"/>
           </el-col>
         </el-form-item>
         <el-form-item label="password" prop="password">
           <el-col :span="16">
             <el-input v-model="loginForm.password" show-password/>
           </el-col>
         </el-form-item>
         <el-radio-group v-model="loginForm.userType">
           <el-radio :label="1">超级管理员</el-radio>
           <el-radio :label="2">机构管理员</el-radio>
           <el-radio :label="3">学员</el-radio>
         </el-radio-group>
         <el-form-item>
           <el-button type="primary" @click="onSubmit()" style="width: 30%">登录</el-button>
           <el-button type="primary" @click="onzhuci()" style="width: 30%">注册</el-button>
         </el-form-item>
       </el-form>
     </div>

    </div>
  </div>


</template>

<script>
import {defineComponent, ref} from 'vue'
import axios from "axios";
import {ElMessage} from "element-plus";
import router from "@/router";

export default defineComponent({
  name: "LoginView",
      data(){
  return {
    loginForm: {
      username:"",
      password:"",
      userType:"",
    },

  }
},
  setup(){
  const radio = ref(1)

  return{
    radio,
  }
},
  methods:{
    onSubmit(){
      console.log(this.loginForm);
      axios.post("http://localhost:9090/personal-info-entity/checkUser",this.loginForm).then(res=>{
        if (res.data=== 1){

          // Cookies.set('name',this.loginForm.name)
          ElMessage({
            message: "Login successful",
            type: 'success'
          })
          let username =this.loginForm.name
          // router.push({path:'/about/'+username})
          console.log(username)
        }
        else {
          ElMessage.error("用户名或密码错误"
          )
        }
      })
    }
  }



})
</script>

<style scoped>
</style>
