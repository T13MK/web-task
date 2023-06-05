<script setup lang='ts'>
import axios from 'axios'
import {ref} from 'vue'
    // let formData
    // const imageSrc = ref('')
    // let reader:FileReader
    // const onFileSelected=(e:any)=> {
    //   let selectedFile =e.target.files[0]
    // //   formData = new FormData();
    // //   formData.append("image", selectedFile);
    //   // console.log(selectedFile)
    //   reader = new FileReader()
    //   reader.readAsDataURL(selectedFile)
    //   reader.onload = () => {
    //     imageSrc.value = reader.result
    //   }
    // }
    let id:string,password:string,temp:string
    const register=(router:any)=>{
        console.log(id,password)
      if(password==temp){
        axios.post('http://localhost:3000/mysql/users/register',{id:id,password:password})
        .then(response => {    
            router.push({name:'account'})   
        })
        .catch(error => {
            console.log(error);
        });
        }
      else{alert("两次密码输入不一致!")}
    }
</script>

<template>
  <div>
    <div>
        账号：<input type="text" v-model="id"><br>
        密码：<input type="password" v-model="password"><br>
        密码：<input type="password" v-model="temp"><br>
        <!-- 头像：<input type="file" @change="onFileSelected"><br>
        <img  class="image" :src="imageSrc" alt=""> -->
    </div>
    <div>
        <button class="buttonRegister"  @click ="register($router)">注册</button>
    </div>
  </div>
</template>

<style scoped>
.image{
    width: 65px;
    height: 65px;
}
</style>