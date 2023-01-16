<template>
  <div style="background-color: beige;overflow: hidden;height: auto">
    <div style="width: 450px;margin:200px auto">
      <div style="color: #42b983;font-size: 30px;text-align: center">欢迎登录</div>
      <div >
        <el-form :model="loginForm" label-width="120px">
          <el-form-item label="name" prop="name" >
            <el-col :span="16">
              <el-input v-model="loginForm.name"/>
            </el-col>
          </el-form-item>
          <el-form-item label="password" prop="password">
            <el-col :span="16">
              <el-input v-model="loginForm.password" show-password/>
            </el-col>
          </el-form-item>
          <el-radio-group v-model="loginForm.poewerevel">
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
    <el-button @click="goToAdministrator">Go to AdministratorView</el-button>
    </div>
  </div>


</template>

<script>
import {defineComponent, ref} from 'vue'
import router from "@/router";

export default defineComponent({
  name: "LoginView",
  data(){
    return {
      loginForm: {
        name:"",
        password:"",
        poewerevel:"",
      },

    }
  },
  setup(){
    const radio = ref(1)
    const goToAdministrator = ()=>{
      router.push({
        path:'/administrator'
      })
    }
    return{
      radio,
      goToAdministrator,
    }
  },
  methods:{
    onSubmit(){
      console.log(this.loginForm.poewerevel);
    }
  }



})
</script>

<style scoped>

</style>