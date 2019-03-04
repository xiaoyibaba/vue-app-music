<template>
    <div class="recommond">
        <scroll ref="scroll" class="recommond-content" :data="discList">
            <div>
                <div class="slider-wrap" v-if="recommonds.length">
                    <slider>
                        <div v-for="item in recommonds">
                            <a :href="item.linkUrl">
                                <img class="needsclick" @load="loadImage" :src="item.picUrl" alt="">
                            </a>
                        </div>
                    </slider>
                </div>
                <div class="recommond-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul>
                        <li v-for="(item, index) in discList" :key="index" class="item">
                            <div class="icon">
                                <img width="60" height="60" v-lazy="item.imgurl" alt="">
                            </div>
                            <div class="text">
                                <h2 class="name" v-html="item.creator.name"></h2>
                                <p class="desc" v-html="item.dissname"></p>
                            </div>
                        </li>   
                    </ul>
                </div>
            </div>
            <div class="loading-container" v-show="!discList.length">
                <loading></loading>
            </div>
        </scroll>
    </div>
</template>

<script>
    import {getRecommend, getDiscList} from 'api/recommend'
    import {ERR_OK} from 'api/config'
    import Slider from 'base/slider/slider'
    import Scroll from 'base/scroll/scroll'
    import Loading from 'base/loading/loading'

    export default {
        components: {
            Slider,
            Scroll,
            Loading
        },

        data() {
            return {
                recommonds: [],
                discList: []
            }
        },

        created() {
            this._getRecommend()
            this._getDiscList()
        },
        
        methods: {
            // 获取轮播图数据
            _getRecommend() {
                getRecommend().then((res) => {
                    if(res.code === ERR_OK) {
                        this.recommonds = res.data.slider
                    }
                })
            },

            // 获取热门歌单推荐数据
            _getDiscList() {
                getDiscList().then((res) => {
                    if(res.code === ERR_OK) {
                        this.discList = res.data.list
                    }
                })
            },

            // 轮播图图片加载完一张后
            loadImage() {
                if(!this.checkloaded) {
                    this.$refs.scroll.refresh()
                    this.checkloaded = true
                }
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
                .item
                    display flex
                    box-sizing border-box
                    align-items center
                    padding 0 20px 20px 20px
                    .icon 
                        flex 0 0 60px
                        width 60px
                        padding-right 20px
                    .text
                        display flex;
                        flex-direction column
                        justify-content center
                        flex 1
                        line-height 20px
                        overflow hidden
                        font-size $font-size-medium
                        .name
                            margin-bottom 10px
                            color $color-text
                        .desc 
                            color $color-text-d
        .loading-container
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)
</style>


