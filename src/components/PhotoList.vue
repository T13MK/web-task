<!-- Vue3中并没有传统的"生命周期"的概念，而是采用了"组合式API"的概念，提供了一些以on为前缀的函数。这些函数可以在setup函数中被编写。以下是一些常见的组合式API"生命周期"函数:

onBeforeMount: 在组件挂载到DOM前触发。
onMounted: 在组件挂载到DOM后触发。
onBeforeUpdate: 在组件更新前触发。
onUpdated: 在组件更新后触发。
onBeforeUnmount: 在组件从DOM卸载前触发。
onUnmounted: 在组件从DOM卸载后触发。Vue3中并没有传统的"生命周期"的概念，而是采用了"组合式API"的概念，提供了一些以on为前缀的函数。这些函数可以在setup函数中被编写。以下是一些常见的组合式API"生命周期"函数:

onBeforeMount: 在组件挂载到DOM前触发。
onMounted: 在组件挂载到DOM后触发。
onBeforeUpdate: 在组件更新前触发。
onUpdated: 在组件更新后触发。
onBeforeUnmount: 在组件从DOM卸载前触发。
onUnmounted: 在组件从DOM卸载后触发。 -->
<template>
    <div class="content"> 
        <ul class="goodsList" >
            <li class="goods"  v-for="goods in goodsPage" @click="linkToGoods($router,goods.id)">
                <img class="image" :src="GoodsImage.image[goods.id-1]" alt=""><br>
                {{ goods.title }},{{ goods.price }}        
            </li>
        </ul>
        <pagination class="pagination"
        :total="Goods.data.length"
        :page-size=pageSize
        @page-change="(n) => currentPage = n"
        />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted,reactive } from 'vue'
  import axios from 'axios'
  import Pagination from './Pagination.vue'
  import { inject } from 'vue'
//   const allPhotos = ref([])
    const ID= inject('ID')
  const pageSize = 6
  const currentPage = ref(1)
  const linkToGoods=(router:any,key:number)=>{
        ID.value=key
      router.push({ name: 'goods' })
}
  const goodsPage = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize
    const endIndex = startIndex + pageSize
    return Goods.data.slice(startIndex, endIndex)
  })
    const Goods = reactive({ data: [] })
    const GoodsImage = reactive({ id:[],image:[] })
  onMounted(() => {
    axios.get('http://localhost:3000/mysql/goods/show')
        .then(response => { 
        Goods.data = response.data
      })
      .catch(error => {
        console.log(error);
      });
    axios.get('http://localhost:3000/mysql/goods/imageShow')
        .then(response => {     
        GoodsImage.id=response.data.image.id;
        GoodsImage.image=response.data.image.image
        // console.log(GoodsImage.image)
        for(let i in GoodsImage.image){
          GoodsImage.image[i]=`data:image/jepg;base64,${GoodsImage.image[i]}`
          // console.log(GoodsImage.image[i])
        }
        // console.log(31243432534234,GoodsImage.image[0],typeof(GoodsImage.image[0]))
      })
      .catch(error => {
        console.log(error);
      });
  })
  </script>

<style scoped>
.image{
  width: 240px;
  height: 220px;
}
.content{
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  /* width: 1500px;
  height: 800px; */
}
.goodsList{
  width: 900px;
  height: 700px;
  display:flex;
  align-items: center;
  justify-content:space-between;
  flex-shrink: 0;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
}
.goods{
  display: flex;
  flex-wrap: wrap;
  flex-basis: 250px;
  cursor: pointer;
}
.pagination{
  display: flex;
  margin-left: auto;
  margin-right: auto;
}
</style>
  