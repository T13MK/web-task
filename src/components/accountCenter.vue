<script setup lang='ts'>
    
    import axios from "axios"
    import { inject } from 'vue'
    const ifLogin= inject('ifLogin')
    let account:string='';
    let user=inject('userName')
    let password:string=''; 
    const showGoods=(router:any)=>{
        router.push({name:'mygoodsShow'})
    }
    const appendGoods=(router:any)=>{
        router.push({name:'addGoods'})
    }
    const login=(router:any)=>{
        console.log(account,password)
        axios.get('http://localhost:3000/mysql/users/select',{params:{account,password}})
        .then(response => { 
        let data=response.data.userData
        if (data){
          ifLogin.value=true;
          user.value=account
          router.push({name:'PhotoList'})
        }
        else{
          alert("用户名或密码错误")
        }
      })
      .catch(error => {
        console.log(error);
      });
    }
    //register函数
    const register=(router:any)=>{
        router.push({name:'register'})
    }
</script>

<template>
  <div v-if="!ifLogin" class="loginPage">
    <div class="main">
        <span>账号:</span><input class="input" type="text" v-model="account">
        <br>
        <span>密码:</span><input class="input" type="text" v-model="password">
        <br>
        <button class="buttonLogin"  @click ="login($router)">登录</button>
        <button class="buttonRegister"  @click ="register($router)">注册</button>
        <!-- <router-link @click.native="login" :to="name"  style="text-decoration:none">登录</router-link>  -->       
    </div>   
  </div>
  <div v-else class="area">
      <!-- <div><img src="" alt=""></div> -->
      <!-- <div class="info unit" @click="showInfor($router)">个人信息</div> -->
      <div class="unit" @click="appendGoods($router)">添加商品</div>
      <div class="unit" @click="showGoods($router)">自己的商品</div>
      <!-- <div class="chatBox unit" >聊天信息</div> -->
      <div class="content">
        <router-view></router-view>
      </div>
  </div>
</template>

<style scoped>
.loginPage {
    height: 100%;
    width:100%;
    background-color:rgba(153, 102, 102, 0.242);
}
.main {

}
.input{
    background-color: rgba(153, 102, 102, 0.242);
    width: 300px;
    height: 30px;
    margin: 20px;
}
.buttonLogin {

}
.buttonRegister {

}
.area{
  display: flex;
  flex-direction: column;
  width: 1500px;
  height: 800px;
  margin: 50px auto;
  border: 1px solid black;
}

.info{

}
.unit{
  width:100px ;
  height: 30px;
  background-color: antiquewhite;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}
.content{
  width: 700px;
  height: 500px;

}
</style>