<template>
  <div class="container" :class="[isCollapse?'hideBar':'showBar']">
    <div class="menu aside ">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b" :collapse="isCollapse">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right">
      <div class="header">
        <p class="fold-btn" @click="handleOpenOrClose"><i class="el-icon-s-fold"></i></p>
      </div>
      <div class="con">
        <!--<router-view></router-view>-->
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        isCollapse:true
      }
    },
    methods: {
      handleOpenOrClose(){
        this.isCollapse=!this.isCollapse
      },
    },
    mounted(){
      console.log(this.$router);
    }
  }
</script>
<style scoped>
.container{
  height:100vh;
  width:100%;
  display: flex;
  justify-content: flex-start;
}
.container .menu{
  transition: all 0.3s  ease;
  background-color: rgb(84, 92, 100);
  position: fixed;
  left:0;
  top:0;
  bottom:0;
}
.menu >>>.el-menu{
  border-right:none;
}
.hideBar .aside{
  width:64px;
}
.showBar .aside{
  width:200px;
}
.showBar .right{
  flex:1;
  margin-left: 200px;
  transition: all 0.3s  ease;
}
.hideBar .right{
  flex:1;
  margin-left: 64px;
  transition: all 0.3s  ease;
}
.container .right .header{
  background: #eee;
  height:60px;
}
.container .right .con{
  height:calc(100vh - 60px);
  background: #ccc;
}
  .fold-btn i{
    font-size: 18px;
    margin-left:10px;
    margin-top:20px;
  }
</style>
