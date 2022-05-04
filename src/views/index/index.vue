<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script>

export default {
  name: 'page_index',
  components: { },
  data() {
    return {
      
    }
  },
  computed: {
      
  },
  created() {
    this.goto_login()
  },
  methods: {
    goto_login () {
      this.$router.push({ 
          name: 'login',
      })
    },
    f(){
    
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>