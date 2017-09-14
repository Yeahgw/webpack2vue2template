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
                let _this = this;
                require.ensure(['./content.vue'], ()=>{
                    resolve(require('./content.vue'));
                    console.log(this);
                    console.log('loaded Content');
                }, 'content');
            }
        }
    }
</script>