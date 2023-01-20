<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content ep-bg-purple"/>
            <div style="text-align: left">培训用户主界面</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content ep-bg-purple"/>
          </el-col>
          <el-col :span="6">
            <div class="grid-content ep-bg-purple"/>
            用户： {{ pageInfo.userName }}
          </el-col>
          <el-col :span="6">
            <div class="grid-content ep-bg-purple"/>
            <el-button type="primary" @click="onesc()">退出</el-button>
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
            <el-sub-menu index="1">
              <template #title>

                <span>菜单</span>
              </template>

              <el-menu-item index="1-1" @click="">学习计划</el-menu-item>
              <el-menu-item index="1-2" @click="">学习</el-menu-item>
              <el-menu-item index="1-3" @click="">考试</el-menu-item>
              <el-menu-item index="1-4" @click="onStudenthome">个人信息</el-menu-item>
<!--              <el-menu-item index="1-5" @click="">-->
<!--                &lt;!&ndash;                <template #title >备忘录</template>&ndash;&gt;-->
<!--              </el-menu-item>-->
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
            >{{ pageInfo.userName }}
            </el-descriptions-item
            >
            <el-descriptions-item label="Telephone" label-align="right" align="center"
            >{{ personinfo.phone }}
            </el-descriptions-item
            >
            <el-descriptions-item label="qq" label-align="right" align="center"
            >{{ personinfo.qq }}
            </el-descriptions-item
            >
            <el-descriptions-item label="性别" label-align="right" align="center">
              {{ personinfo.sex }}
              <!--              <el-tag size="small">School</el-tag>-->
            </el-descriptions-item>
            <el-descriptions-item label="住址" label-align="right" align="center">
              {{ personinfo.address }}
            </el-descriptions-item>
            <el-descriptions-item label="年龄" label-align="right" align="center">
              {{ personinfo.age }}
            </el-descriptions-item>
            <el-descriptions-item label="邮箱" label-align="right" align="center">
              {{ personinfo.email }}
            </el-descriptions-item>
            <el-descriptions-item label="姓名" label-align="right" align="center">
              {{ personinfo.name }}
            </el-descriptions-item>
            <el-descriptions-item label="机构" label-align="right" align="center">
              {{ this.pageInfo.organizationName }}
            </el-descriptions-item>
          </el-descriptions>
          <el-button-group style="margin: 10px">
            <el-button style="margin: 10px" @click="updatepassword">修改密码</el-button>
            <el-button style="margin: 10px" @click="updatepersoninfo">修改基本信息</el-button>
            <el-button style="margin: 10px">选择新的机构</el-button>
          </el-button-group>
        </el-main>
      </el-container>
      <el-dialog
          v-model="UpdatePasswordDialogVisible"
          title="修改用户密码"
          width="20%"
          destroy-on-close
          center>
        <el-form-item label="新密码">
          <el-input clearable v-model="mypageinfo.newpassword" show-password/>
        </el-form-item>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="UpdatePasswordDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="makesureupdatepassword">
          确定
        </el-button>
      </span>
        </template>
      </el-dialog>

      <el-dialog
          v-model="personDialogVisible"
          title="修改基本信息"
          width="40%"
          destroy-on-close
          center
      >
        <el-form model="personinfo" label-width="75px">
          <el-form-item label="用户名">
            <el-input clearable v-model="personinfo.username"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input clearable v-model="personinfo.age"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input clearable v-model="personinfo.name"/>
          </el-form-item>
          <el-form-item label="电话">
            <el-input clearable v-model="personinfo.phone"/>
          </el-form-item>
          <el-form-item label="地址">
            <el-input clearable v-model="personinfo.address"/>
          </el-form-item>
          <el-form-item label="qq">
            <el-input clearable v-model="personinfo.qq"/>
          </el-form-item>
          <el-form-item label="性别">
            <el-input clearable v-model="personinfo.sex"/>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input clearable v-model="personinfo.email"/>
          </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="personDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="makesurechange">
          确定
        </el-button>
      </span>
        </template>
      </el-dialog>


      <el-dialog
          v-model="UpdateOrganizationDialogVisible"
          title="选择新的机构"
          width="20%"
          destroy-on-close
          center>
        <el-form-item label="新机构">
          <el-select v-model="value" clearable placeholder="select">
            <el-option
                v-for="option in options.info"
                :key="option.name"
                :label="option.name"
                :value="option.name"
            />
          </el-select>
        </el-form-item>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="UpdateOrganizationDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="makesureupdateOrganization">
          确定
        </el-button>
      </span>
        </template>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
import {defineComponent, reactive, ref, retrieve} from "vue";
import {useRouter} from "vue-router";
import router from "@/router";
import axios, {options} from "axios";
import {ElMessage} from "element-plus";

export default defineComponent({

  name: "stuentHomeView",
  data() {
    return {
      pageInfo: {
        userName: '',
        organizationName: '',
        newpassword: '',
      },
    }
  },
  setup() {
    const UpdatePasswordDialogVisible = ref(false)
    const UpdateOrganizationDialogVisible = ref(false)
    const personDialogVisible = ref(false)
    const value = ref('')
    const options = reactive({
      info: [
        {
          name: '',
        }
      ],
    })
    const mypageinfo = reactive({
      newpassword: ''
    })
    const updatepersoninfo = () => {

      personDialogVisible.value = true
    }

    const makesurechange = () => {
      axios.post("http://localhost:9090/organization-info-entity/updateOrganizationinfo", personinfo).then(res => {
        if (res.data === 1) {
          ElMessage({
            message: "修改成功",
            type: 'success'
          })
        } else {
          ElMessage.error("修改失败"
          )
        }
      })
      personDialogVisible.value = false

    }

    const makesureupdateOrganization = () => {
      // console.log(value.value)

      axios.get("http://localhost:9090/organization-info-entity/getOrganizationIdByname/"+value.value).then(res=>{
        personinfo.organizationId=res.data
        axios.post("http://localhost:9090/organization-info-entity/updateOrganizationinfo", personinfo).then(res => {
          if (res.data === 1) {
            ElMessage({
              message: "修改成功",
              type: 'success'
            })
          } else {
            ElMessage.error("修改失败"
            )
          }
        })
      UpdateOrganizationDialogVisible.value=false
     })
    }
    const makesureupdatepassword = () => {
      console.log(personinfo)
      personinfo.password = mypageinfo.newpassword
      axios.post("http://localhost:9090/organization-info-entity/updateOrganizationinfo", personinfo).then(res => {
        if (res.data === 1) {
          ElMessage({
            message: "修改成功",
            type: 'success'
          })
        } else {
          ElMessage.error("修改失败"
          )
        }
      })
      UpdatePasswordDialogVisible.value = false
    }

    const personinfo = reactive({
      username: "",
      password: "",
      name: "",
      age: "",
      sex: "",
      phone: "",
      qq: "",
      address: "",
      email: "",
      id: "",
      organizationId: "",
    })
    const updatepassword = () => {
      UpdatePasswordDialogVisible.value = true
      mypageinfo.newpassword = ""
    }
    return {
      personinfo,
      updatepassword,
      UpdatePasswordDialogVisible,
      makesureupdatepassword,
      mypageinfo,
      value,
      options,
      makesureupdateOrganization,
      personDialogVisible,
      makesurechange,
      updatepersoninfo,
      UpdateOrganizationDialogVisible,
    }
  },
  methods: {
    onesc() {//退出按钮
      router.push({path: '/'})
    },
    onStudenthome(){
      router.push({path:'/studentsHome/'+this.pageInfo.userName})
    }
  },
  created() {
    const myroute = useRouter()
    this.pageInfo.userName = myroute.currentRoute.value.params.username
    axios.get("http://localhost:9090/personal-info-entity/FindUserByUserName/" + this.pageInfo.userName).then(res => {
      this.personinfo.age = res.data.age
      this.personinfo.name = res.data.name
      this.personinfo.username = res.data.username
      this.personinfo.sex = res.data.sex
      this.personinfo.qq = res.data.qq
      this.personinfo.address = res.data.address
      this.personinfo.email = res.data.email
      this.personinfo.phone = res.data.phone
      this.personinfo.password = res.data.password
      this.personinfo.id = res.data.id
      this.personinfo.organizationId = res.data.organizationId
      if (res.data.organizationId === null) {
        this.pageInfo.organizationName = null
      } else {
        axios.get("http://localhost:9090/organization-info-entity/getOrganizationById/" + this.personinfo.organizationId).then(res => {
          this.pageInfo.organizationName = res.data
          // console.log(res.data.name)
        })
      }
      axios.post("http://localhost:9090/organization-info-entity/getAllOrganizationName").then(res => {
        // this.options.value = res.data.name
        // console.log(res.data)
        this.options.info = res.data
        // console.log(this.options.info)
        // console.log(this.options.info[0].name)
      })
    })
  }
})
</script>

<style scoped>

</style>