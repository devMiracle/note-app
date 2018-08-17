<template>
    <div align="center" class="text-center margin-top">
        <form class="form-signin" @submit.prevent="signUp">
          <message-alert :message="alertMessage"></message-alert>
          <h1 class="h3 mb-3 font-weight-normal">Sign Up Now!!!</h1>
          <div class="input-group mb-2 mr-sm-2">
            <div class="input-group-prepend">
              <div class="input-group-text"><icon name="user"></icon></div>
            </div>
            <input type="text" class="form-control" placeholder="Name" v-model="user.name" required autofocus>
          </div>
          <div class="input-group mb-2 mr-sm-2">
            <div class="input-group-prepend">
              <div class="input-group-text"><icon name="envelope"></icon></div>
            </div>
            <input type="email" class="form-control" placeholder="Email address" v-model="user.email" required>
          </div>
          <div class="input-group mb-2 mr-sm-2">
            <div class="input-group-prepend">
              <div class="input-group-text"><icon name="lock"></icon></div>
            </div>
            <input type="password" class="form-control" placeholder="Password" v-model="user.password" required>
          </div>
          <button type="submit" class="btn btn-lg btn-primary btn-block">Sign Up</button><br>
        </form>

         <div>
             <router-link to="/login">Sign In</router-link>
         </div>

        
    </div>
</template>
<script>
  import API from '../constants';
  import axios from 'axios';
    export default{
        name: 'Register',
        data(){
          return {
            user:{
                name:null,
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
          gotoLogin:function(){
            this.$router.push('/login');
          },
          signUp(){
            axios.post(API.userUrl+'/register',this.user)
            .then(res=>{
              const alert = {status:res.data.status,message:res.data.message}
              this.alertMessage = alert;
              if(res.data.status){
                   setTimeout(this.gettoLogin, 2000);
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

