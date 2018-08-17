<template>

    <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
      <router-link class="navbar-brand" to="/app">Note App</router-link>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <button @click="logout()" class="btn btn-link nav-link">Logout</button>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
</template>
<script>
    export default{
        name: 'NavBar',
        data(){
            return {}
        },
        methods:{
          logout: function () {
            this.$session.destroy();
            this.$router.push('/login')
          }
        }
    }
</script>

