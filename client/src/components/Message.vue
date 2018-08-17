<template>
    <div class="mt-3" v-if="message">

        <div v-if="message.status" class="alert alert-success fade show" role="alert">
            {{message.message}}
        </div>
        <div v-else class="alert alert-warning fade show" role="alert">
            {{message.message}}
        </div>
    </div>
</template>
<script>
    export default{
        name:'Message',
         props: {
            message: {
                type: Object,
            }
        },
        data(){
            return {
                
            }
        },
    }
</script>
