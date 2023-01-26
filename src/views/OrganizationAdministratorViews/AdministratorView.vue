<template>

  <div id="one">
    <h1>This is AdministratorView</h1>
    <!--    <h2>{{pageInfo.username}}</h2>-->
    <h1>管理员 {{ pageInfo.username }}你好</h1>
    <el-descriptions :border="true" :column="2" size="large">
      <el-descriptions-item label="账户" label-align="center" label-class-name="labelTwo" min-width="200">
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
        <el-tag size="large" v-if="userData.administratorInfo[0].userType===1">超级管理员</el-tag>
        <el-tag size="large" v-else-if="userData.administratorInfo[0].userType===2">机构管理员</el-tag>
        <el-tag size="large" v-else>学员</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="所属机构" label-align="center" label-class-name="labelTwo">
        <el-tooltip
            content="查看机构信息"
        >
          <el-button size="large" @click="openSchoolView">{{ pageInfo.organizationName }}</el-button>
        </el-tooltip>

      </el-descriptions-item>
    </el-descriptions>
    <br><br>
    <el-button @click="openModifyPassword">修改密码</el-button>
    <el-button @click="openModifyInfo">修改个人信息</el-button>
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

  <el-dialog
      title="修改信息"
      width="30%"
      v-model="modifyInfoVisible"
  >
    <el-form label-width="75">
      <el-form-item label="姓名">
        <el-input v-model="editData.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="editData.sex">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
          <el-radio label="其他">其他</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="editData.age" clearable></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="editData.email" clearable></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="editData.address" clearable></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="editData.phone" clearable></el-input>
      </el-form-item>
      <el-form-item label="QQ">
        <el-input v-model="editData.qq" clearable></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="modifyInfo">确认修改</el-button>
  </el-dialog>

</template>

<script lang="ts">
import {useRouter} from "vue-router";
import {defineComponent, reactive, ref} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";
import router from "@/router";

export default defineComponent({
  name: "AdministratorView",
  created() {
    const myRouter = useRouter();
    this.pageInfo.id = <string>myRouter.currentRoute.value.params.id
    axios.get("http://localhost:9090/personal-info-entity/getPersonalInfo/" + this.pageInfo.id).then(res => {
      this.userData.administratorInfo[0] = res.data
      this.pageInfo.username = res.data.username
      this.pageInfo.organizationId = res.data.organizationId
      axios.get("http://localhost:9090/organization-info-entity/getNameById/" + this.pageInfo.organizationId).then(res => {
        this.pageInfo.organizationName = res.data
      })
    })

  },
  setup() {
    const pageInfo = reactive({
      id: '',
      username: '',
      organizationId: '',
      organizationName: '',
    })
    const modifyPasswordVisible = ref(false)
    const modifyPasswordFirstVisible = ref(false)
    const modifyInfoVisible = ref(false)
    const oldPassword = ref("")//原密码
    const newPassword = ref("")//新密码
    interface administratorInfo {
      id: string
      username: string
      name: string
      age: string
      sex: string
      phone: string
      qq: string
      email: string
      address: string
      password: string
      userType: number
      organizationId: string
    }

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
        userType: 0,
        organizationId: ''
      }]
    })
    const editData: administratorInfo = reactive({
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
    })
    //打开修改密码编辑
    const openModifyPassword = () => {
      modifyPasswordFirstVisible.value = false
      oldPassword.value = ''
      modifyPasswordVisible.value = true
    }
    //打开修改信息
    const openModifyInfo = () => {
      editData.id = pageInfo.id
      editData.username = userData.administratorInfo[0].username
      editData.name = userData.administratorInfo[0].name
      editData.sex = userData.administratorInfo[0].sex
      editData.age = userData.administratorInfo[0].age
      editData.email = userData.administratorInfo[0].email
      editData.address = userData.administratorInfo[0].address
      editData.phone = userData.administratorInfo[0].phone
      editData.qq = userData.administratorInfo[0].qq
      editData.userType = userData.administratorInfo[0].userType
      editData.organizationId = userData.administratorInfo[0].organizationId
      editData.password = userData.administratorInfo[0].password
      modifyInfoVisible.value = true
    }
    //确认原密码
    const modifyPasswordFirst = () => {
      newPassword.value = ''
      axios.post("http://localhost:9090/personal-info-entity/checkOldPassword", {
        id: pageInfo.id,
        password: oldPassword.value,
      }).then(res => {
        if (res.data === 1) {
          modifyPasswordFirstVisible.value = true
        } else {
          ElMessage({
            showClose: true,
            message: "原密码错误!",
            type: 'error',
          })
        }
      })
    }
    //确认修改密码
    const modifyPasswordSecond = () => {
      axios.post("http://localhost:9090/personal-info-entity/modifyPassword", {
        id: pageInfo.id,
        password: newPassword.value
      }).then(res => {
        if (res.data == 1) {
          ElMessage({
            showClose: true,
            message: "密码修改成功",
            type: 'success'
          })
          modifyPasswordVisible.value = false
        }
      })
    }
    //确认修改
    const modifyInfo = () => {
      axios.post("http://localhost:9090/personal-info-entity/modifyInfoById", editData).then(res => {
        if (res.data === 1) {
          ElMessage({
            showClose: true,
            message: "个人信息修改成功",
            type: 'success'
          })
          modifyInfoVisible.value = false
          axios.get("http://localhost:9090/personal-info-entity/getPersonalInfo/" + pageInfo.id).then(res => {
            userData.administratorInfo[0] = res.data
          })
        }
      })
    }
    //查看机构简介
    const openSchoolView = () => {
      router.push({
        path: '/school/' + pageInfo.organizationId
      })
    }
    return {
      pageInfo,
      userData,
      editData,
      openModifyPassword,
      openModifyInfo,
      modifyPasswordVisible,
      modifyPasswordFirstVisible,
      modifyInfoVisible,
      modifyPasswordFirst,
      modifyPasswordSecond,
      oldPassword,
      newPassword,
      modifyInfo,
      openSchoolView,
    }
  }
})
</script>

<style lang="scss">
#one {
  /*background-color: #42b983;*/
  position: absolute;
  width: 100%;
  top: 0;
  height: 100%;

  .labelTwo {
    background-color: #7be18f;
    width: 200px;
  }
}


</style>