<template>
    <div align="center" class="text-center margin-top">
        <form class="form-signin" @submit.prevent="signIn">
          <h1 class="h3 mb-3 font-weight-normal">Sign In</h1>
          <message-alert :message="alertMessage"></message-alert>
          <div class="input-group mb-2 mr-sm-2">
            <div class="input-group-prepend">
              <div class="input-group-text"><icon name="envelope"></icon></div>
            </div>
            <input type="email" class="form-control" placeholder="Email address" v-model="user.email" required autofocus>
          </div>
          <div class="input-group mb-2 mr-sm-2">
            <div class="input-group-prepend">
              <div class="input-group-text"><icon name="lock"></icon></div>
            </div>
            <input type="password" class="form-control" placeholder="Password" v-model="user.password" required>
          </div>
          <button type="submit" class="btn btn-lg btn-primary btn-block">Sign in</button>
        </form>
        
         <div>
             <router-link to="/register">Create An Account</router-link>
         </div>
    </div>
</template>
<script>
  import API from '../constants';
  import axios from 'axios';
  // import VueSession from 'vue-session'
    export default{
        name: 'SignIn',
        data(){
          return {
            user:{
              email:null,
              password:null
            },
            alertMessage:null, 
          }
        },
        beforeCreate: function () {
          if (this.$session.has('token')) {
            this.$router.push('/app')
          }
        },
        methods:{
          gotoApp:function(){
            this.$router.push('/app');
          },
          signIn(){
            axios.post(API.userUrl+'/login',this.user)
            .then(res=>{
              const alert = {status:res.data.status,message:res.data.message}
              this.alertMessage = alert;
              this.$session.start()
              
              if(res.data.status){
                this.$session.set('token', res.data.payload.token)
                setTimeout(this.gotoApp, 2000);
              }
              
            }).catch(error=>{
              console.log(error)
            })
          }
        }
    }
</script>
<style scoped>


.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.margin-top{
  margin-top: 10%
}
</style>

