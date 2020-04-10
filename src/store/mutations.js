import {CHANCEPATHNAMES, CHOICEMENUID, RETURNLOGIN, SETCONFIG} from './mutation_types'

export default {
  //改变路径名字
  [CHANCEPATHNAMES](state,{path}){
    state.pathnames = path
  },

  //改变菜单选择ID
  [CHOICEMENUID](state,{id}){
    state.acticledId = id
  },

  //改变菜单选择ID
  [RETURNLOGIN](state,{yon}){
    state.returnlogin = yon
  },

  //设置令牌
  [SETCONFIG](state,{jwt}){
    state.config = jwt
  },
}
