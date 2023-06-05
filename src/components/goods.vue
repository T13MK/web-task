<script setup lang='ts'>
    import axios from "axios"
    import { inject ,ref, reactive} from 'vue'
    import chat from "./chat.vue";
    const ID=inject("ID")
    const goods=ref()
    const goodsImage=ref()
    const receiver=ref()
    const is=ref(false)
    // console.log($route.params.id)
    axios.get('http://localhost:3000/mysql/goods/select',{params:{id:ID.value}})
        .then(response => {     
          goods.value=response.data
          receiver.value=goods.value.shopkeeper   
      })
      .catch(error => {
        console.log(error);
      });
    axios.get('http://localhost:3000/mysql/goods/imageSelect',{params:{id:ID.value}})
        .then(response => {     
          console.log(response.data)
          // goodsImage.value = response.data.toString('base64');
          goodsImage.value=`data:image/jpeg;base64,${response.data}`;
          console.log(goodsImage,34)
      })
      .catch(error => {
        console.log(error);
      });
    const chatView=()=>{
      is.value=!is.value
    }
</script>

<template> 
    <div class="page">    
        <div class="image-container"><img class="image" :src="goodsImage" alt=""></div>
        <div class="cotent" >
          <div class="shopkeeper des">商家:{{ goods.shopkeeper }}</div>
          <div class="title des">商品:{{ goods.title }}</div>      
          <div class="price des">价格:{{ goods.price}}</div>
          <div class="num des">数量:{{ goods.num}}</div>
          <button @click="chatView()" class="des">私聊</button>
        </div>
    </div>
    <div v-show="is" class="chat">
        <chat :receiver-name="receiver"></chat>
    </div>
    <div class="comments">

    </div>
</template>

<style scoped>
.image{
  width: 360px;
  height: 400px;
}
.image-container{
  margin: 100px 0 0 300px;
}
.page{
  width: 1500px;
  height: 800px;
  display:flex;
  align-items: center;
  justify-content:space-between;
  flex-shrink: 0;
  flex-wrap: wrap;
  margin: auto;
  border: 1px solid black;
}
.cotent{
  display: flex;
  flex-direction: column;  
  margin: 100px 500px 0 0;
}
.des{
  margin: 10px;
}
.shopkeeper{
  font-size: 30px;
}
.chat{
  position:absolute ;
  top:10%;
  right:10%;
}
</style>