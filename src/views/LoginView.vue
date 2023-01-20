<template>
  <div style="background-color: beige;overflow: hidden;height: 100%">
    <div style="width: 450px; margin:200px auto ">
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
  <el-dialog
      v-model="zhuceDialogVisible"
      title="注册学员账户"
      width="40%"
      destroy-on-close
      center
  >
    <el-form model="add" label-width="75px">
      <el-form-item label="用户名">
        <el-input clearable v-model="add.username"/>
      </el-form-item>
      <el-form-item label="名字">
        <el-input clearable v-model="add.name"/>
      </el-form-item>
      <el-form-item label="性别">
        <el-input clearable v-model="add.sex"/>
      </el-form-item>

      <el-form-item label="年龄">
        <el-input clearable v-model="add.age"/>
      </el-form-item>
      <el-form-item label="qq">
        <el-input clearable v-model="add.qq"/>
      </el-form-item>
      <el-form-item label="电话">
        <el-input clearable v-model="add.phone"/>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input clearable v-model="add.email"/>
      </el-form-item>
      <el-form-item label="地址">
        <el-input clearable v-model="add.address"/>
      </el-form-item>

      <el-form-item label="密码">
        <el-input clearable v-model="add.password"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="zhuceDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="makesureadd">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script>
import {defineComponent, reactive, ref} from 'vue'
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


    const add=reactive({
      username:"",
      password:"",
      name:"",
      age:"",
      sex:"",
      phone:"",
      qq:"",
      address:"",
      userType:3,
      email:"",
    })

    const radio = ref(1)
    const  zhuceDialogVisible=ref(false)
    const onzhuci=()=>{
      zhuceDialogVisible.value=true
      add.sex=""
      add.age=""
      add.address=""
      add.name=""
      add.qq=""
      add.email=""
      add.password=""
      add.phone=""
      add.username=""
      add.userType=3
    }
    const makesureadd=()=>{
      // console.log(add)
      axios.post("http://localhost:9090/personal-info-entity/zhuceUser",add).then(res=>{
        if (res.data=== 1){

          // Cookies.set('name',this.loginForm.name)
          ElMessage({
            message: "注册成功",
            type: 'success'
          })
        }
        else if (res.data === -1) {
          ElMessage.error("密码和用户名不能为空"
          )
        }
        else {
          ElMessage.error("注册失败"
          )
        }
      })
    }
    return{
      makesureadd,
      radio,
      zhuceDialogVisible,
      add,
      onzhuci,
    }
  },
  methods:{
    onSubmit(){   //登录按钮
      console.log(this.loginForm);
      axios.post("http://localhost:9090/personal-info-entity/checkUser",this.loginForm).then(res=>{
        if (res.data=== 1){

          // Cookies.set('name',this.loginForm.name)
          ElMessage({
            message: "Login successful",
            type: 'success'
          })
          let username =this.loginForm.username
          router.push({path:'/studentsHome/'+username})
        }
        else {
          ElMessage.error("用户名或密码错误"
          )
        }
      })
    },

  }



})
</script>

<style scoped>
</style>
