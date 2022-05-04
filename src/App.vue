<template>
  <div id="app">
    <!-- <NavBar /> -->
    <!-- <nav>
      <router-link to="/">index</router-link> |
      <router-link to="/register">register</router-link>|
      <router-link to="/login">login</router-link>|
      <router-link to="/login">login</router-link>|
    </nav> -->
    <router-view/>
  </div>
</template>

<script>
// import NavBar from './views/layout/NavBar.vue'


export default{
  // components:{NavBar},
  data(){
    return {
    }
  },
  mounted(){
    //初始化函数
    
  },
} 
</script>


<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active { 
      color: #42b983;
    }
  }
}
</style>
