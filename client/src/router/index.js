import Vue from 'vue'
import Router from 'vue-router'
import App from '@/components/App';
import SignIn from '@/components/SignIn';
import SignUp from '@/components/Register';

Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',component:App},
    {path:'/app',name:'AppMain',component:App},
    {path:'/login',name:'SignIn',component:SignIn},
    {path:'/register',name:'Register',component:SignUp}
  ]
})
