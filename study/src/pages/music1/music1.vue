<template>
	<view class="L0">
		
		<!-- <navigation-bar :title="music"/> -->
		<image src="../../static/music/1music.png" mode="heightFix"></image>
		<view class="L3">
			<view>不为谁而作的歌</view>
			
			<text>林俊杰</text>
		</view>
		<progress :percent="$store.state.Music.Mtime" show-info />
		<view class="L2">
			<image src="../../static/music/shangyishou.png" mode="heightFix"></image>
			<image v-if="jude" src="../../static/music/bofang2.png" mode="heightFix"></image>
			<image v-else src="../../static/music/zanting2.png" mode="heightFix"></image>
			<image src="../../static/music/xiayishou.png" mode="heightFix"></image>
		</view>
	</view>
	
</template>

<script>
	import { mapState,mapMutations } from 'vuex'
	const innerAudioContext = uni.createInnerAudioContext();
	var that = null;
	export default{
		data() {
				return {
					muisic:"muisc",
					jude:false,
					id: '', //数据请求id
					paused: false,
					recycled: false,
					playing: 0,
					playList: [
						// {
						// 	id: 1,
						// 	src: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3',
						// 	name: '致爱丽丝',
						// 	album: '睡前轻音乐大全',
						// 	status: 0
						// },
						// {
						// 	id: 2,
						// 	src: 'http://mp3.jinmiao.cn/mp3file/huiben/19/quting9xu.mp3',
						// 	name: '鼹鼠做裤子',
						// 	album: '童话故事大全',
						// 	status: 0
						// },
						{
							id: 1,
							src: '../../static/music/buweishei.mp3',
							name: '一样的夏天',
							album: '离开',
							status: 0
						}
					],
					now: '00:00',
					duration: '00:00',
					progress_max: 0
				};
			},
			onLoad(option) {
				// this.innerAudioContext.
				console.log(option.cnm);
				console.log(this.$store);
				console.log(this.innerAudioContext);
				// this.innerAudioContext.seek(this.$store.state.Music.Ptime);
				// this.innerAudioContext.play();
				this.innerAudioContext.startTime=this.$store.state.Music.Ptime;
				this.innerAudioContext.play();
			},
			onShow() {
				
				// console.log(innerAudioContext);
				// console.log(innerAudioContext.currentTime);
			},
			onBackPress() {
				this.judgeUpdate();
				console.log('你好'+this.$store.state.Music.judge);
				this.timeUpdate(this.innerAudioContext.currentTime);
			},
			methods:{
				...mapMutations({
						'judgeUpdate':'Music/judgeUpdate',
						'timeUpdate':'Music/timeUpdate'
					}),
			}
		};
</script>

<style lang="scss">
	.L0{
		width: 100vw;
		height: 100vh;
		background-color: #e7eefe;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		progress{
			width: 80vw;
		}
	}
	.L2{
		width: 76vw;
		height: 5vh;
		display: flex;
		justify-content: space-between;
		margin-bottom: 21vh;
		image{
			height: 10vh;
		}
	}
	.L3{
		display: flex;
		flex-direction: column;
		justify-content: center;
		text{
			display: flex;
			justify-content: center;
		}
	}
</style>
