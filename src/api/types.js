import ajax from './ajax'

const Base = "http://47.97.170.173:8211"
export const LOGIN = (userName,password) => ajax(Base+"/user/login",{userName,password},'POST',true)  //登录
export const REGISTER = (userName,password) => ajax(Base+"/register",{userName,password},'POST')  //注册
