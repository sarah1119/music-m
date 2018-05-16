/**
 * Created by Administrator on 2017/10/14 0014.
 */
import * as types from './types.js'
export default {
  // datebase:({commit})=>{
  //   commit(types.DATABASE)
  // },
  // saveForm (context) {
  //   axios({
  //     method: 'post',
  //     url: '/user',
  //     data: context.state.test02
  //   })
  // },
  play: ({commit})=>{
    commit(types.PLAY)
  },
  last:({commit})=>{
    commit(types.LAST)
  },
  next:({commit})=>{
    commit(types.NEXT)
  },
  set: ({commit})=>{
    commit(types.SET)
  },
  mask: ({commit})=>{
    commit(types.MASK)
  },
  list:({commit})=>{
    commit(types.LIST)
  },
  listItem:({commit})=>{
    commit(types.LISTITEM)
  },
  brender:({commit})=>{
    commit(types.RENDER)
  },
  deleteAll:({commit})=>{
    commit(types.DELETEALL)
  },
  collectAll:({commit})=>{
    commit(types.COLLECTALL)
  },
  playStyle:({commit})=>{
    commit(types.PLAYSTYLE)
  },
  songDetail:({commit})=>{
    commit(types.SONGDETAIL)
  }
}
