<template>
  <div id="myBody">
    <br><br><br><br>
    <div id="welcome">
      <h1><i>交通运输培训</i></h1>
    </div>
    <div id="myInput">
      <br>
      <el-input v-model="input" placeholder="请输入用户名" type="text" maxlength="12" style="width: 60%;"
                show-word-limit clearable/>
      <br><br><br>
      <el-input v-model="password" placeholder="请输入密码" style="width: 60%;" clearable show-password/>
      <div id="bookmark">
        <bookmark theme="outline" size="30" fill="#333"/>
      </div>
      <br><br>
      <el-button @click="login" style="width: 20%">登录</el-button>
      <el-button @click="test3">test3</el-button>
    </div>
  </div>
</template>
<script>
import {ref} from 'vue'
import axios from "axios";
import {Bookmark} from "@icon-park/vue-next";
import router from "@/router";
import {ElMessage} from "element-plus";


export default {
  name: 'Login',
  components: {
    Bookmark
  },
  setup() {
    const input = ref('')
    const password = ref('')
    return {
      input,
      password
    }
  },
  data() {
    return {
      mission:
          {
            id: 0,
            userName: "无",
            myEvent: "无",
            completionStatus: "1"
          }
    }
  },
  created() {
    this.test1();
  },
  methods: {
    test1() {
      axios.get("http://localhost:9090/personal-mission-plan-entity/getAllMisson").then(resp => {
        this.mission = resp.data[0];
      })
    },
    login() {
      axios.post("http://localhost:9090/user-entity/checkUserMessage", {
        userName: this.input,
        sex: "男",
        password: this.password
      }).then(resp => {
        if (resp.data.message === '登录成功') {
          ElMessage({
            showClose: true,
            message: resp.data.message,
            type: 'success',
          })
          let username = resp.data.t.userName;
          router.push({
            path: '/about/' + username
          })
        } else {
          ElMessage({
            showClose: true,
            message: resp.data.message,
            type: 'error',
          })
        }
        // router.replace('/about')
      })
    },
    test3() {
      axios.post("http://localhost:9090/user-entity/checkUserMessage", {
        userName: this.input,
        password: this.password
      }).then(resp => {
        console.log(resp.data)
        this.mission.userName = 'hhhhh'
      })
    },
    change() {
      // this.$parent.change("sss")
      this.$parent.change("sss")
    }


  }

}
</script>
<style>

#myBody {
  position: absolute;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /*background-color: #1b72c9;*/
  /*background-image: url("../assets/loginBackgroud.png");*/
  background-repeat: no-repeat;
  background-size: cover;
}

#myInput {
  background-color: aqua;
  position: absolute;
  width: 30%;
  height: 25%;
  /*padding: 30px;*/
  border-radius: 20px;
  top: 30%;
  left: 35%;
  text-align: center;
  margin: 0 auto;
}

#bookmark {
  /*background-color: aqua;*/
  position: absolute;
  bottom: 10%;
  left: 17.5%;
}

#welcome {
  text-align: center;
  /*position: absolute;*/
  left: 40%;
  top: 10%;
  /*background-color: #42b983;*/
}
</style>