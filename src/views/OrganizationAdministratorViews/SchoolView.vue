<template>
  <div id="two">
    <router-view/>
  </div>
  <div id="menu">
    <el-button type="primary" style="position: absolute;top: 8%;left: 40%" @click="back">返回</el-button>
    <el-menu
        style="position:absolute;width: 100%;top: 20%;height: 80%"
    >
      <el-sub-menu index="1">
        <template #title>
          <span>菜单</span>
        </template>
        <el-menu-item index="1-1" @click="goToIntroduction">机构简介</el-menu-item>
        <el-menu-item index="1-2" @click="goToStaff">机构人员</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import {defineComponent, reactive, ref} from "vue";
import {useRouter} from "vue-router";

export default defineComponent({
  name: "SchoolView",
  created() {
    const myRouter = useRouter()
    this.pageInfo.organizationId = <string>myRouter.currentRoute.value.params.id
    this.pageInfo.id=<string>myRouter.currentRoute.value.params.id2
    router.push({
      path:'/school/'+this.pageInfo.organizationId+'/'+this.pageInfo.id+'/introduction'
    })
  },
  setup() {
    const back = () => {
      router.push({
        path:'/administrator/'+pageInfo.id
      })
    }
    const pageInfo = reactive({
      organizationId: '',
      organizationName: '',
      id:'',
    })
    const organizationInfo = ref({
      id: '',
      name: '',
      phone: '',
      email: '',
      introduction: '',
      createTime: '',
      entryRequirement: '',
    })
    const goToIntroduction = () =>{
      router.push({
        path:'/school/'+pageInfo.organizationId+'/'+pageInfo.id+'/introduction'
      })
    }
    const goToStaff = ()=>{
      router.push({
        path:'/school/'+pageInfo.organizationId+'/'+pageInfo.id+'/staff'
      })
    }
    return {
      back,
      pageInfo,
      organizationInfo,
      goToIntroduction,
      goToStaff,
    }
  }
})
</script>

<style>
#two {
  position: absolute;
  height: 100%;
  top: 0;
  left: 20%;
  width: 80%;
}

#menu {
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  width: 20%;
  /*background-color: #7be18f;*/
}
</style>