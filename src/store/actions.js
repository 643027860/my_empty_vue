import {CHANCEPATHNAMES,CHOICEMENUID,SETCONFIG,RETURNLOGIN} from './mutation_types'

export default {
  //选择菜单ID
  choiceMenuId({commit},id){
    commit(CHOICEMENUID,{id})
  },

  //设置路径名
  changePathNames({commit},path){
    commit(CHANCEPATHNAMES,{path})
  },

  //返回登录界面
  returnLogin({commit},path){
    commit(RETURNLOGIN,{path})
  },

  //设置令牌
  setConfig({commit},jwt){
    commit(SETCONFIG,{jwt})
  }
}
