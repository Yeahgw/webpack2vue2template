<template>
    <div class="container">
        <p class="detail">这里是细节</p>
        <contentList />
    </div>
</template>

<script>
    export default {
        name: 'detail',
        components:{
            contentList: resolve=>{
                setTimeout(function(){
                    require.ensure(['./content.vue'], ()=>{
                        resolve(require('./content.vue'));
                    }, 'content');
                }, 1000);
            }
        }
    }
</script>