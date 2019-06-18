<template>
    <transition name="slide">
        <music-list :songs="songs" :bg-image="bgImage" :title="title"></music-list>
    </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singer' 
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song.js'
import MusicList from 'components/music-list/music-list'
export default {
    data() {
        return {
            songs: []
        }
    },
    computed: {
        bgImage() {
            return this.singer.avatar
        },
        title() {
            return this.singer.name
        },
        ...mapGetters([
            'singer'
        ])
    },

    created() {
        console.log(this.singer)
        this._getDetail()
    },

    methods: {
        _getDetail() {
            getSingerDetail(this.singer.id).then((res) => {
                if(!this.singer.id) {
                    this.$router.push('/singer')
                    return
                }
                if(res.code == ERR_OK) {
                    this.songs = this._normalizeSongs(res.data.list)
                }
            })
        },

        _normalizeSongs(list) {
            let ret = []
            list.forEach((item) => {
                let {musicData} = item
                ret.push(createSong(musicData))
            })
            return ret
        }
    },

    components: {
        MusicList
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.singer-detail
    position fixed;
    top 0;
    left 0;
    right 0;
    bottom: 0;
    background-color #fff;
    z-index 100;


.slide-enter-active, .slide-leave-active
    transition: all 0.3s
.slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
