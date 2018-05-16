<template>
  <div class="favor">
    <mt-cell title="本地音乐" value="（39）">
      <img slot="icon" src="../../assets/img/1.jpg" width="24" height="24">
    </mt-cell>
    <mt-cell title="最近播放" value="（39）">
      <img slot="icon" src="../../assets/img/1.jpg" width="24" height="24">
    </mt-cell>
    <mt-cell title="下载管理" value="（39）">
      <img slot="icon" src="../../assets/img/1.jpg" width="24" height="24">
    </mt-cell>
    <mt-cell title="我的电台" value="（39）">
      <img slot="icon" src="../../assets/img/1.jpg" width="24" height="24">
    </mt-cell>
    <mt-cell title="我的收藏" value="（39）">
      <img slot="icon" src="../../assets/img/1.jpg" width="24" height="24">
    </mt-cell>
  </div>
</template>

<script>
export default {
  name: 'favor',
  data () {
    return {
      favor:[
        {
            title:'本地音乐'
        }
      ]
    }
  },
  beforeMount(){

  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.favor{
  .mint-cell{
    text-align: left;
    color: #2b2b2b;
    .mint-cell-wrapper{
      font-size: 26px!important;
      .mint-cell-title{
        -ms-flex: none;
        flex: none;
      }
    }
  }
}

</style>
