<template>
    <div class="recommond">
        <div class="recommond-content">
            <div class="slider-wrap" v-if="recommonds.length">
                <slider>
                    <div v-for="item in recommonds">
                        <a :href="item.linkUrl">
                            <img :src="item.picUrl" alt="">
                        </a>
                    </div>
                </slider>
            </div>
            <div class="recommond-list">
                <h1 class="list-title">热门歌单</h1>
            </div>
        </div>
    </div>
</template>

<script>
    import {getRecommend} from 'api/recommend'
    import {ERR_OK} from 'api/config'
    import Slider from 'base/slider/slider'

    export default {
        components: {
            Slider
        },

        data() {
            return {
                recommonds: []
            }
        },

        created() {
            this._getRecommend()
        },
        
        methods: {
            _getRecommend() {
                getRecommend().then((res) => {
                    if(res.code === ERR_OK) {
                        this.recommonds = res.data.slider
                    }
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~common/stylus/variable'
    .recommond
        position fixed
        width 100%
        top 88px
        bottom 0
        .recommond-content
            height 100%
            overflow hidden
            .slider-wrap
                position relative
                width 100%
                overflow hidden
            .recommond-list
                .list-title
                    height 65px
                    line-height 65px
                    text-align center
                    font-size $font-size-medium
                    color $color-theme
</style>


