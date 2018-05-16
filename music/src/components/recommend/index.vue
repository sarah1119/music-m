<template>
  <div class="recommend" id="recommend">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in bannerLst">
        <a :href="item.href">
          <img :src="item.src" alt="">
        </a>
      </mt-swipe-item>
    </mt-swipe>
    <!--<mt-navbar>-->
    <!--<mt-tab-item id="1"></mt-tab-item >-->
    <!--<mt-tab-item id="2" icon="">选项二</mt-tab-item>-->
    <!--<mt-tab-item id="3" icon="">选项三</mt-tab-item>-->
    <!--<mt-tab-item id="3" icon="">选项三</mt-tab-item>-->
    <!--</mt-navbar>-->
    <mt-tabbar id="test">
      <mt-tab-item id="私人FM">
        <img slot="icon" src="@/assets/img/micon-1.png">
        私人FM
      </mt-tab-item>
      <mt-tab-item id="每日推荐">
        <img slot="icon" src="@/assets/img/micon-2.png">
        每日推荐
      </mt-tab-item>
      <mt-tab-item id="歌单">
        <img slot="icon" src="@/assets/img/micon-3.png">
        歌单
      </mt-tab-item>
      <mt-tab-item id="排行榜">
        <img slot="icon" src="@/assets/img/micon-4.png">
        排行榜
      </mt-tab-item>
    </mt-tabbar>
    <mt-cell title="推荐歌单">
      <span slot="icon"></span>
      <img src="@/assets/img/more.png" width="24" height="24">
    </mt-cell>
    <ul>
      <li></li>
    </ul>
  </div>
</template>
<script>
  export default{
    name: 'recommend',
    data(){
      return {
        bannerLst: []
      }
    },
    mounted(){
      var that = this;
      $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/banner',
        headers: {
          "Conten-Type": "http://localhost:3000/banner"
        },
        success: function (backDate) {
          // body...
          console.log(that.bannerLst)
          that.bannerLst = backDate.data
          console.log(that.bannerLst)

        }
      })
    }
  }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../assets/css/recommend.scss";

  .recommend {
    width: 100%;
    .mint-swipe {
      height: 209px;
      a {
        width: 100%;
        height: 100%;
        display: block;
        img {
          height: 100%;
        }
      }
    }
    .mint-tabbar {
      background: #f0f4f3;
      bottom: auto;
      position: static;
      border-bottom: 1px solid #e7e9e8;
      .mint-tab-item-icon {
        width: 77px !important;
        height: 77px;
        margin: 0 auto;
        position: absolute;
      }
      .mint-tab-item {
        padding: 17px 0;
        .mint-tab-item-icon {
          width: 77px !important;
          height: 77px;
          margin: 0 auto;
          position: absolute;
        }
        .mint-tab-item-label {
          font-size: 15px !important;
        }
      }
    }
    .mint-cell {

    }
    .mint-cell {
      background: #f0f4f3;
      text-align: left;
      font-size: 44px !important;
      .mint-cell-left {
        width: 20px;
        height: 20px;
        background: #000;
      }
      .mint-cell-wrapper {
        background: #000;
        .mint-cell-title {
          line-height: 22px;
          span {
            line-height: 22px;
            &:first-child {

              width: 3px;
              height: 22px;
              background: #d0392e;
              display: inline-block;
              position: absolute;
              left: 0px;
            }
          }
        }
        .mint-cell-value {
          img {
            height: 20px;
            width:12px;
          }
        }
      }
    }
  }

</style>
