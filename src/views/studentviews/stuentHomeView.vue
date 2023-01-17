<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="6"><div class="grid-content ep-bg-purple" />
            <div style="text-align: left">培训用户主界面</div>
          </el-col>
          <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
          <el-col :span="6"><div class="grid-content ep-bg-purple" />用户： {{ pageInfo.userName }}
          </el-col>
          <el-col :span="6"><div class="grid-content ep-bg-purple" />
            <el-button type="primary"  @click="onesc()">退出</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              style="width: auto"

          >
            <el-sub-menu index="1" >
              <template #title>

                <span>菜单</span>
              </template>

              <el-menu-item index="1-1" @click="oncommunication">联系人</el-menu-item>
              <el-menu-item index="1-2" @click="onuserinfo">用户信息</el-menu-item>
              <el-menu-item index="1-3" @click="onincome">收入</el-menu-item>
              <el-menu-item index="1-4" @click="onoutput">支出</el-menu-item>
              <el-menu-item index="1-5" @click="onmemorandum">
<!--                <template #title >备忘录</template>-->
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main>
          <el-descriptions title="用户基本信息" :column="3" border>
            <el-descriptions-item
                label="Username"
                label-align="right"
                align="center"
                label-class-name="my-label"
                class-name="my-content"
                width="150px"
            >{{ pageInfo.userName }}</el-descriptions-item
            >
            <el-descriptions-item label="Telephone" label-align="right" align="center"
            >{{personinfo.phone}}</el-descriptions-item
            >
            <el-descriptions-item label="qq" label-align="right" align="center"
            >{{personinfo.qq}}</el-descriptions-item
            >
            <el-descriptions-item label="性别" label-align="right" align="center">
              {{personinfo.sex}}
<!--              <el-tag size="small">School</el-tag>-->
            </el-descriptions-item>
            <el-descriptions-item label="住址" label-align="right" align="center">
              {{personinfo.address}}
            </el-descriptions-item>
            <el-descriptions-item label="年龄" label-align="right" align="center">
              {{personinfo.age}}
            </el-descriptions-item>
            <el-descriptions-item label="邮箱" label-align="right" align="center">
              {{personinfo.email}}
            </el-descriptions-item>
            <el-descriptions-item label="姓名" label-align="right" align="center">
              {{personinfo.name}}
            </el-descriptions-item>
            <el-descriptions-item label="机构" label-align="right" align="center">
            {{this.pageInfo.organizationName}}
            </el-descriptions-item>
          </el-descriptions>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {defineComponent, reactive, retrieve} from "vue";
import {useRouter} from "vue-router";
import router from "@/router";
import axios from "axios";

export default defineComponent({

  name: "stuentHomeView",
  data(){
    return{
      pageInfo:{
        userName:'',
        organizationName:'',
      },
    }
  },
  setup(){
     const personinfo=reactive({
       username:"",
       password:"",
       name:"",
       age:"",
       sex:"",
       phone:"",
       qq:"",
       address:"",
       email:"",
       id:"",
       organizationId:"",
     })
    return{
       personinfo,
    }
  },
  methods:{
    onesc(){//退出按钮
      router.push({path:'/'})
    },

  },
  created(){
    const myroute =useRouter()
    this.pageInfo.userName = myroute.currentRoute.value.params.username
    axios.get("http://localhost:9090/personal-info-entity/FindUserByUserName/"+this.pageInfo.userName).then(res=>{
      this.personinfo.age=res.data.age
      this.personinfo.name=res.data.name
      this.personinfo.username=res.data.username
      this.personinfo.sex=res.data.sex
      this.personinfo.qq=res.data.qq
      this.personinfo.address=res.data.address
      this.personinfo.email=res.data.email
      this.personinfo.phone=res.data.phone
      this.personinfo.password=res.data.password
      this.personinfo.id=res.data.id
      this.personinfo.organizationId=res.data.organizationId
     if (res.data.organizationId === null){
       this.pageInfo.organizationName=null
     }
     else {
       axios.get("http://localhost:9090/organization-info-entity/getOrganizationById/"+this.personinfo.organizationId).then(res=>{
            this.pageInfo.organizationName=res.data
           // console.log(res.data.name)
       })
     }
    })
  }
})
</script>

<style scoped>

</style>