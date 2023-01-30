<template>
<h1>{{pageInfo.organizationName}}课程管理</h1>
  <div id="course">
    <el-table :data="courseData" style="width: 100%">
      <el-table-column prop="name" label="课程名称" />
      <el-table-column prop="description" label="课程描述" />
      <el-table-column>
        <template #default="scope">
          <el-button @click="showCoursePeople(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-button @click="back" style="position: absolute;top: 5%;left: 10%">返回</el-button>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import router from "@/router";
import axios from "axios";

export default defineComponent({
  name: "CourseView",
  created() {
    const myRouter = useRouter()
    this.pageInfo.organizationId = <string>myRouter.currentRoute.value.params.organizationId
    this.pageInfo.peopleId = <string>myRouter.currentRoute.value.params.peopleId
    // axios.get("http://localhost:9090/organization-info-entity/getOrganizationById/" + this.pageInfo.organizationId).then(res => {
    //   this.pageInfo.organizationName = res.data.name
    // })
    axios.get("http://localhost:9090/course-entity/getCourseByOrganizationId/"+this.pageInfo.organizationId).then(res =>{
      this.courseData=res.data
      console.log(res.data)
      // console.log(this.courseData)
    })
  },
  setup() {
    const pageInfo = reactive({
      organizationName:'',
      organizationId: '',
      peopleId: ''
    })

    interface course{
      id:string,
      name:string,
      description:string,
      orgId:string,
    }
    const courseData = ref([{
      id:'',
      name:'',
      description:'',
      orgId:'',
    }])

    //展示选择此门课程的学员
    const showCoursePeople = (row:course)=>{
      console.log(row)
    }
    const back = () => {
      router.push({
        path: '/administrator/' + pageInfo.peopleId
      })
    }

    return {
      pageInfo,
      back,
      courseData,
      showCoursePeople,

    }
  }
})
</script>

<style>
#course{
  /*background-color: #7be18f;*/
  position: absolute;
  width: 100%;
  height: 80%;
  top: 20%;
}
</style>