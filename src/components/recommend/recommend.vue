<template>
    <div class="recommond">
        <scroll class="recommond-content" :data="discList">
            <div>
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
                    <ul>
                        <li v-for="item in discList" class="item">
                            <div class="icon">
                                <img :src="item.imgurl" width="60" height="60" alt="">
                            </div>
                            <div class="text">
                                <h2 class="name" v-html="item.creator.name"></h2>
                                <p class="desc" v-html="item.dissname"></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
    import scroll from 'base/scroll/scroll'
    import {getRecommend, getDiscList} from 'api/recommend'
    import {ERR_OK} from 'api/config'
    import Slider from 'base/slider/slider'

    export default {
        components: {
            Slider,
            scroll
        },

        data() {
            return {
                recommonds: [],
                discList: []
            }
        },

        created() {
            this._getRecommend(),
            this._getDiscList()
        },
        
        methods: {
            _getRecommend() {
                getRecommend().then((res) => {
                    if(res.code === ERR_OK) {
                        this.recommonds = res.data.slider
                    }
                })
            },
            _getDiscList() {
                getDiscList().then(res => {
                    console.log(res.data.list)
                    this.discList = res.data.list
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
                        display flex
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

</style>


