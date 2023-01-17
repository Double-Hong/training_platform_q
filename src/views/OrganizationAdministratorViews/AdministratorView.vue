<template>
  <div id="one">
    <h1>This is AdministratorView</h1>
<!--    <h2>{{pageInfo.username}}</h2>-->
    <p>{{pageInfo.username}}</p>

  </div>
</template>

<script lang="ts">
import {useRouter} from "vue-router";
import {defineComponent, reactive} from "vue";

export default defineComponent( {
  name: "AdministratorView",
  created() {
    const myRouter = useRouter();
    this.pageInfo.username=<string>myRouter.currentRoute.value.params.username
  },
  setup(){
    const pageInfo = reactive({
      username:''
    })

    return{
      pageInfo,
    }
  }
})
</script>

<style>
#one{
  background-color: #42b983;
  position: absolute;
  width: 100%;
  top: 0;
  height: 100%;
}
</style>