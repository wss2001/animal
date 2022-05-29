<template>
  <div ref="ap">
    <Header v-show="$route.meta.showHeader" @changeTheme="changeTheme"></Header>
    <router-view ref="ro"></router-view>
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
import {reqGetCwBase} from './api/index'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
export default {
  name:'App',
  components:{Header,Footer},
  data() {
    return {
      
    }
  },
  mounted() {
    this.$store.dispatch('getCwBase')
  },
  methods: {
    changeTheme(theme){
      console.log(theme);
      let ap = this.$refs.ap
      let ro = this.$refs.ro
      console.log(ap);
      if(theme){
        ap.style.backgroundColor = 'white'
      }else{
        ap.style.backgroundColor = 'black'
      }
    }
  },
}
</script>

<style>

</style>