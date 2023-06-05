<script setup lang='ts'>
  import { inject ,ref,reactive,provide} from 'vue'
  import axios from 'axios';
  import addGoods from './components/addGoods.vue';
  import test from './components/test.vue';
  import Avatar from './components/Avatar.vue'
  import PhotoList from './components/PhotoList.vue';
  import chat from './components/chat.vue';
  const ifLogin = inject('ifLogin')
  console.log(ifLogin)
  let Goods = reactive({ id:[],price:[],title:[] })
  let GoodsImage = reactive({ image:[] })
  provide("Goods",Goods)
  provide("GoodsImage",GoodsImage)
  const name=reactive({})
  provide('userName',name)
  const msgIs=ref(false)
  const search=ref()
  const check=(router:any)=>{
    router.push({name:'account'})
  }
  const check1=(router:any)=>{  
      router.push({name:'PhotoList'})
  }
  const messageShow=()=>{
    msgIs.value=!msgIs.value
  }
  const searchFor=(router:any)=>{
    Goods.id=[]
    axios.get('http://localhost:3000/mysql/goods/search',{params:{search:search.value}})
    .then(response => {     
          console.log(response.data)
          for(let i=0; i<response.data.length; i++){           
            axios.get('http://localhost:3000/mysql/goods/imageSelect',{params:{id:response.data[i]}})
            .then(response => {     
              GoodsImage.image[i]=response.data
              GoodsImage.image[i]=`data:image/jepg;base64,${GoodsImage.image[i]}`
              console.log(GoodsImage,12231)
            })
            .catch(error => {
                console.log(error);
            });
            axios.get('http://localhost:3000/mysql/goods/select',{params:{id:response.data[i]}})
            .then(response => {
              Goods.id[i]=response.data.id
              Goods.title[i]=response.data.title
              Goods.price[i]=response.data.price
              console.log(Goods,56566)
            })
            .catch(error => {
                console.log(error);
            });
          }
          router.push({name:'search'})
      })
    .catch(error => {
        console.log(error);
      });
  }
</script>
<!-- div的排版布局？ -->
<template>
  <div class="mainPage" >
    <header class="head"> 
      <div style="display: flex; align-items: center;">
        <div style="cursor:pointer ;margin: 0 10px;" @click ="check1($router)">主业</div> 
        <!-- <div style="margin: 0 10px;">分类</div>   -->
      </div>
      <div>
          <input type="text" v-model="search" placeholder="输入商品信息">
          <button @click="searchFor($router)">搜索</button>
        </div>
      <div class="accountCenter" @click ="check($router)">
        <!-- <router-link :to="ifLogin.value? {name:'index'}:{name:'account'}"><img src="../public/account_image.png" alt="account"></router-link> -->
        <Avatar :src="url"></Avatar>
        <div>{{name.value}}</div>
        <img :src="url" alt="">
      </div>
      <div class="msg" @click="messageShow">聊天</div>
    </header>
    <div class="aside" v-show="msgIs" v-if="name.value"><chat></chat></div>
    <div>
      <!-- <chat></chat> -->
     
      <!-- <add-goods/> -->
      <!-- <test ></test> -->
      
    </div>
    
    <router-view></router-view>
  </div>
</template>

<style scoped>
.mainPage {
  position:absolute;
  background-color:rgba(153, 102, 102, 0.242);
  height:100%;
  width: 100%;
  
}
.head{
  display: flex;
  align-items: center;
  justify-content:space-around;
  flex-shrink: 0;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
}
.accountCenter{
  display: flex;
  align-items: center;
  /* justify-content:space-around; */
  cursor: pointer;
}
.msg{
  cursor: pointer;
}
.aside{
  position: fixed;
  width: 200px;
  height: 500px;
}
</style>