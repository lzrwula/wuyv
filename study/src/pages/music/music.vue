<template>
	<view class="root">
		<!-- #ifdef APP-PLUS -->  
		<view class="status_bar">  
		    <view class="top_view"></view>  
		</view>  
		<!-- #endif -->
		
		<view class="play-list-wrap">
			
			<!-- 播放列表 -->
			<checkbox-group class="list">
				<view class="item" v-for="(item, index) in playList" :key="item.id">
					<view @click="change_item(index)" class="story">
						<!-- label -->
						<!-- <checkbox value="0" /> -->
						<view class="story-info">
							<view class="title">{{ item.name }}</view>
							<view class="album">{{ item.album }}</view>
						</view>
					</view>
					<view class="controller">
						<!-- 暂停 -->
						<image v-if="!paused && index == playing" @click="pause(index)" src="../../static/music/pause.png" mode="aspectFit"></image>
						<image v-if="paused && index == playing" @click="pause(index)" src="../../static/music/play.png" mode="aspectFit"></image>
						<!-- 收藏 -->
						<image @click="collecte(index, item.id)" v-if="item.status == 1" style="margin-left: 40upx;" src="../../static/music/collected.png" mode="aspectFit"></image>
						<image @click="collecte(index, item.id)" v-else style="margin-left: 40upx;" src="../../static/music/collect.png" mode="aspectFit"></image>
					</view>
				</view>
			</checkbox-group>
		</view>

		<!-- 底部音频控制器 -->
		<!-- 上方控制按钮  -->
		<view class="audio-controller">
			<view class="top">
				<view @click="show = !show" class="title">{{ playList[playing].name }}</view>
				<view class="controller-icon">
					<image @click="last_song" src="../../static/music/last.png" mode="aspectFit"></image>
					<image v-if="!paused" @click="pause()" src="../../static/music/pause.png" mode="aspectFit"></image>
					<image v-else @click="pause" src="../../static/music/play.png" mode="aspectFit"></image>
					<image @click="next_song" src="../../static/music/next.png" mode="aspectFit"></image>
					<!-- <image @click="go_history" src="../../static/img/play-history.png" mode="aspectFit"></image> -->
				</view>
			</view>
			<!-- 下方进度条 -->
			<view class="bottom">
				<view class="progress-bar" style="display: flex;">
					<slider
						@touchstart="progress_touch_start"
						@change="progress_touch_end"
						blockSize="30"
						blockBgColor="#9a999b"
						bgColor="#f0edf1"
						activeColor="#4fa7df"
						:width="400"
						height="6"
						minDefault="0"
						:maxDefault="progress_max"
					></slider>
				</view>
				<view @click="show = !show" style="height: 37px; flex-grow: 1;">
					
				</view>
				<view class="time">
					<text>{{ now }} / {{ duration }}</text>
					<image @click="loop" v-if="recycled" src="../../static/music/recycled.png" mode="aspectFits"></image>
					<image @click="loop" v-else src="../../static/music/recycle.png" mode="aspectFits"></image>
				</view>
			</view>
			
			<!-- </---------------------------------------------------------------------------------------------------->
			<u-popup mode="bottom" v-model="show" height="100%">
						
						<view class="L0">
							<view class="L4">
								<view class="L5" @click="show = !show">
								<!-- <image style="height: 5vh;" src="../../static/music/back.png" mode=""></image> -->
								</view>
							</view>
							
							
							<!-- <navigation-bar :title="music"/> -->
							<image src="../../static/music/1music.png" mode="heightFix"></image>
							<view class="L3">
								<view>{{playList[playing].name}}</view>
								
								<text>{{playList[playing].album}}</text>
							</view>
							<progress :percent="$store.state.Music.Mtime" show-info=false />
							<view class="L2">
								<image @click="last_song()" src="../../static/music/shangyishou.png" mode="heightFix"></image>
								<image @click="pause1()" v-if="paused" src="../../static/music/bofang2.png" mode="heightFix"></image>
								<image @click="pause1()" v-else src="../../static/music/zanting2.png" mode="heightFix"></image>
								<image @click="next_song()" src="../../static/music/xiayishou.png" mode="heightFix"></image>
							</view>
						</view>
			</u-popup>
		</view>
	</view>
</template>


<script>
import slider from '../../components/slider/slider.vue';
import {mapMutations} from 'vuex';



// import Vue from 'vue';

var that = null;
// const innerAudioContext = uni.getBackgroundAudioManager();
// Vue.prototype.innerAudioContext = uni.createInnerAudioContext();
// const innerAudioContext = uni.createInnerAudioContext();
export default {
	data() {
		return {
			jude:false,
			show: false,
			id: '', //数据请求id
			paused: true,
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
					name: '不为谁而做的歌',
					album: '阿信',
					status: 0
				},
				{
					id: 2,
					src: '../../static/music/yiyangdexiatian.flac',
					name: '一样的夏天',
					album: '孙燕姿',
					status: 0
				},
				{
					id: 3,
					src: '../../static/music/yy.mp3',
					name: '爷爷泡的茶',
					album: '周杰伦',
					status: 0
				},
				{
					id: 4,
					src: '../../static/music/wr.mp3',
					name: '温柔',
					album: '五月天',
					status: 0
				},
				{
					id: 5,
					src: '../../static/music/xyq.mp3',
					name: '爱在西元前',
					album: '周杰伦',
					status: 0
				}
			],
			now: '00:00',
			duration: '00:00',
			progress_max: 0
		};
	},
	watch: {
		// 监听播放列表的变化
		playing(val, odlVal) {
			let userInfo = uni.getStorageSync('userInfo');
			console.log('playing:', val);
			console.log('odlVal:', odlVal);
		},
		// that.progress_max:
	},
	onLoad(options) {
		that = this;
		console.log(typeof(uni));
		this.innerAudioContext.autoplay = false;
		this.innerAudioContext.onPlay(() => {
			uni.hideLoading();
		});
		this.innerAudioContext.onWaiting(function() {
			uni.showLoading({
				title: '正在加载'
			});
		});
		this.innerAudioContext.onCanplay(function() {
			uni.hideLoading();
		});
		// innerAudioContext.onPrev(() => {
		// 	that.last_song();
		// });
		// innerAudioContext.onNext(() => {
		// 	that.next_song();
		// });
		this.innerAudioContext.onError(res => {
			console.log(res.errMsg);
			console.log(res.errCode);
		});
		this.innerAudioContext.onTimeUpdate(() => {
			that.now = that.time_format(this.innerAudioContext.currentTime);
			that.duration = that.time_format(this.innerAudioContext.duration);
			that.progress_max = parseInt(100 * (this.innerAudioContext.currentTime / this.innerAudioContext.duration));
			this.timeUpdate(that.progress_max);
			// 在此可做试听限制，比如试听15s
			// if (parseInt(innerAudioContext.currentTime) > 15) {
			// 	innerAudioContext.pause();
			// 	innerAudioContext.destroy();
			// 	// 自定义提示
			// }
			// console.log(that.time_format(innerAudioContext.currentTime))
			// console.log(that.time_format(innerAudioContext.duration))
		});
		this.innerAudioContext.onSeeked(function() {
			this.innerAudioContext.play();
		});
		this.innerAudioContext.onPause(function() {
			that.paused = true;
		});
		this.innerAudioContext.onPlay(function() {
			that.paused = false;
		});
		this.innerAudioContext.onEnded(() => {
			console.log(':end');
			if (!that.recycled && that.playing < that.playList.length - 1) {
				that.playing++;
				this.innerAudioContext.src = that.playList[that.playing].src;
				// innerAudioContext.title = that.playList[that.playing].name;
			} else if (that.recycled) {
				this.innerAudioContext.seek(0);
				this.innerAudioContext.src = that.playList[that.playing].src;
				// innerAudioContext.title = that.playList[that.playing].name;
			} else if (!that.recycled && that.playing == that.playList.length - 1) {
				that.playing = 0;
				this.innerAudioContext.src = that.playList[that.playing].src;
				// innerAudioContext.title = that.playList[that.playing].name;
			}
		});
	},
	onShow() {
		// this.innerAudioContext.src = that.playList[that.playing].src;
		// console.log("返回");
		// console.log(this.$store.state.Music.judge);
		// if(this.$store.state.Music.judge==1){
		// 	this.innerAudioContext.startTime=this.$store.state.Music.Ptime;
		// 	this.innerAudioContext.play();
		// 	this.judgeUpdate1();
		// 	console.log("返回");
		// }
		
		// innerAudioContext.title = that.playList[that.playing].name;
		// 保持屏幕常亮
		// uni.setKeepScreenOn({
		// 	keepScreenOn: true
		// });
	},
	onHide() {
		console.log('hide:');
	// onUnload() {
	// 	console.log('onUnload pause innerAudioContext');
	},
	components: {
		slider
	},
	computed:{
		// progress_max:timeUpdate1(progress_max)
	},
	methods: {
		...mapMutations({
			'pageUpdate':'Music/pageUpdate',
			'timeUpdate':'Music/timeUpdate',
			'judgeUpdate1':'Music/judgeUpdate1'
		}),
		//播放器控制相关
		last_song() {
			if (that.playing != 0) {
				that.playing--;
				this.innerAudioContext.src = that.playList[that.playing].src;
				this.innerAudioContext.play();
				// innerAudioContext.title = that.playList[that.playing].name;
				console.log("可以");
			}
		},
		next_song() {
			if (that.playing < that.playList.length - 1) {
				that.playing++;
				this.innerAudioContext.src = that.playList[that.playing].src;
				this.innerAudioContext.play();
				// innerAudioContext.title = that.playList[that.playing].name;
			} else if (that.playing == that.playList.length - 1) {
				that.playing = 0;
				this.innerAudioContext.src = that.playList[that.playing].src;
				this.innerAudioContext.play();
				// innerAudioContext.title = that.playList[that.playing].name;
				// uni.pageScrollTo({
				// 	scrollTop: 0
				// });
			}else{
				console.log('do nothing ');
			}
			
		},
		pause(index) {
			if (this.innerAudioContext.paused) {
				if(index == this.playing && this.innerAudioContext.currentTime >= 0.000001){
					this.innerAudioContext.play();
				}else{
					that.playing = index;
					this.innerAudioContext.src = that.playList[that.playing].src;
					this.innerAudioContext.play();
				}
			} else {
				this.innerAudioContext.pause();
			}
			console.log(that.paused);
			that.paused=!that.paused;
		},
		pause1(){
			if(this.innerAudioContext.paused){
				this.innerAudioContext.play();
				that.paused=!that.paused;
			}else{
				this.innerAudioContext.pause();
				that.paused=!that.paused;
			}
		},
		loop() {
			// innerAudioContext.loop = !innerAudioContext.loop //loop属性为true时不会触发 onEnded()
			this.recycled = !that.recycled;
			if (that.recycled) {
				uni.showToast({
					icon: 'none',
					title: '开启循环'
				});
			}
		},
		go_history() {},
		// 进度条相关
		progress_touch_start() {
			this.innerAudioContext.pause();
		},
		progress_touch_end(percent) {
			console.log('num :>> ', percent.detail.__args__[0]);
			let s = (percent.detail.__args__[0] / 100) * this.innerAudioContext.duration;
			this.innerAudioContext.seek(parseInt(s));
		},
		// 业务逻辑
		change_item(index) {
			// this.pageUpdate({time:this.innerAudioContext.currentTime,src:this.innerAudioContext.src});
			this.show = !this.show;
			// if(that.playing == index){
				
			// }else{
				
			// }
			if(this.innerAudioContext.paused == false&&that.playing == index){
				
			}else{
				that.playing = index;
				this.innerAudioContext.src = that.playList[that.playing].src;
				this.innerAudioContext.play();
			}
			
			// if((this.innerAudioContext.paused == false&&that.playing != index)||(this.innerAudioContext.paused == true&&that.playing != index)){
			// 	that.playing = index;
			// 	this.innerAudioContext.src = that.playList[that.playing].src;
			// 	this.innerAudioContext.play();
			// }else if(this.innerAudioContext.paused == true&&that.playing == index){
			// 	this.innerAudioContext.play();
			// }else{
			// 	that.playing = index;
			// }
			
			// uni.navigateTo({
			// 	url:'../music1/music1?cnm=this.innerAudioContext',
			// 	success() {
			// 		console.log("ok");
			// 	},
			// 	fail() {
			// 		console.log("no");
			// 	}
			// });
			// innerAudioContext.title = that.playList[that.playing].name;
		},
		// 点赞
		collecte(index, id) {
			that.playList[index].status == 0 ? (that.playList[index].status = 1) : (that.playList[index].status = 0);
		},
		time_format(second) {
			let m = Math.floor((second / 60) % 60) < 10 ? '0' + Math.floor((second / 60) % 60) : Math.floor((second / 60) % 60);
			let s = Math.floor(second % 60) < 10 ? '0' + Math.floor(second % 60) : Math.floor(second % 60);
			return `${m}:${s}`;
		}
	}
};

// onLoad(options) {
// 		that = this;
// 		innerAudioContext.autoplay = false;
// 		innerAudioContext.onPlay(() => {
// 			uni.hideLoading();
// 		});
// 		innerAudioContext.onWaiting(function() {
// 			uni.showLoading({
// 				title: '正在加载'
// 			});
// 		});
// 		innerAudioContext.onCanplay(function() {
// 			uni.hideLoading();
// 		});
// 		innerAudioContext.onPrev(() => {
// 			that.last_song();
// 		});
// 		innerAudioContext.onNext(() => {
// 			that.next_song();
// 		});
// 		innerAudioContext.onError(res => {
// 			console.log(res.errMsg);
// 			console.log(res.errCode);
// 		});
// 		innerAudioContext.onTimeUpdate(() => {
// 			that.now = that.time_format(innerAudioContext.currentTime);
// 			that.duration = that.time_format(innerAudioContext.duration);
// 			that.progress_max = parseInt(100 * (innerAudioContext.currentTime / innerAudioContext.duration));
// 			// 在此可做试听限制，比如试听15s
// 			// if (parseInt(innerAudioContext.currentTime) > 15) {
// 			// 	innerAudioContext.pause();
// 			// 	innerAudioContext.destroy();
// 			// 	// 自定义提示
// 			// }
// 			// console.log(that.time_format(innerAudioContext.currentTime))
// 			// console.log(that.time_format(innerAudioContext.duration))
// 		});
// 		// innerAudioContext.onSeeked(function() {
// 		// 	innerAudioContext.play();
// 		// });
// 		innerAudioContext.onPause(function() {
// 			that.paused = true;
// 		});
// 		innerAudioContext.onPlay(function() {
// 			that.paused = false;
// 		});
// 		innerAudioContext.onEnded(() => {
// 			console.log(':end');
// 			if (!that.recycled && that.playing < that.playList.length - 1) {
// 				that.playing++;
// 				innerAudioContext.src = that.playList[that.playing].src;
// 				innerAudioContext.title = that.playList[that.playing].name;
// 			} else if (that.recycled) {
// 				innerAudioContext.seek(0);
// 				innerAudioContext.src = that.playList[that.playing].src;
// 				innerAudioContext.title = that.playList[that.playing].name;
// 			} else if (!that.recycled && that.playing == that.playList.length - 1) {
// 				that.playing = 0;
// 				innerAudioContext.src = that.playList[that.playing].src;
// 				innerAudioContext.title = that.playList[that.playing].name;
// 			}
// 		});
// 	},
// 	onShow() {
// 		innerAudioContext.src = that.playList[that.playing].src;
// 		innerAudioContext.title = that.playList[that.playing].name;
// 		// 保持屏幕常亮
// 		uni.setKeepScreenOn({
// 			keepScreenOn: true
// 		});
// 	},
// 	onHide() {
// 		console.log('hide:');
// 	},
// 	onUnload() {
// 		console.log('onUnload pause innerAudioContext');
// 	},
// 	components: {
// 		slider
// 	},
// 	methods: {
// 		//播放器控制相关
// 		last_song() {
// 			if (that.playing != 0) {
// 				that.playing--;
// 				innerAudioContext.src = that.playList[that.playing].src;
// 				innerAudioContext.title = that.playList[that.playing].name;
// 			}
// 		},
// 		next_song() {
// 			if (that.playing < that.playList.length - 1) {
// 				that.playing++;
// 				innerAudioContext.src = that.playList[that.playing].src;
// 				innerAudioContext.title = that.playList[that.playing].name;
// 			} else if (that.playing == that.playList.length - 1) {
// 				that.playing = 0;
// 				innerAudioContext.src = that.playList[that.playing].src;
// 				innerAudioContext.title = that.playList[that.playing].name;
// 				uni.pageScrollTo({
// 					scrollTop: 0
// 				});
// 			}else{
// 				console.log('do nothing ');
// 			}
// 		},
// 		pause() {
// 			if (innerAudioContext.paused) {
// 				innerAudioContext.play();
// 				that.paused=!that.paused;
// 			} else {
// 				innerAudioContext.pause();
// 				that.paused=!that.paused;
// 			}
// 		},
// 		loop() {
// 			// innerAudioContext.loop = !innerAudioContext.loop //loop属性为true时不会触发 onEnded()
// 			this.recycled = !that.recycled;
// 			if (that.recycled) {
// 				uni.showToast({
// 					icon: 'none',
// 					title: '开启循环'
// 				});
// 			}
// 		},
// 		go_history() {},
// 		// 进度条相关
// 		progress_touch_start() {
// 			innerAudioContext.pause();
// 		},
// 		progress_touch_end(percent) {
// 			console.log('num :>> ', percent.detail.__args__[0]);
// 			let s = (percent.detail.__args__[0] / 100) * innerAudioContext.duration;
// 			innerAudioContext.seek(parseInt(s));
// 		},
// 		// 业务逻辑
// 		change_item(index) {
// 			that.playing = index;
// 			innerAudioContext.src = that.playList[that.playing].src;
// 			innerAudioContext.title = that.playList[that.playing].name;
// 		},
// 		// 点赞
// 		collecte(index, id) {
// 			that.playList[index].status == 0 ? (that.playList[index].status = 1) : (that.playList[index].status = 0);
// 		},
// 		time_format(second) {
// 			let m = Math.floor((second / 60) % 60) < 10 ? '0' + Math.floor((second / 60) % 60) : Math.floor((second / 60) % 60);
// 			let s = Math.floor(second % 60) < 10 ? '0' + Math.floor(second % 60) : Math.floor(second % 60);
// 			return `${m}:${s}`;
// 		}
// 	}
//};
</script>

<style lang="scss" scoped>
	.status_bar {  
	    height: var(--status-bar-height);  
	    width: 100%;  
	    // background-color: #F8F8F8;  
	}  
	.top_view {  
	    height: var(--status-bar-height);  
	    width: 100%;  
	    position: fixed;  
	    // background-color: #F8F8F8;  
	    top: 0;  
	    z-index: 999;  
	}
.root {
	height: var(--status-bar-height);
	width: 100%;
}

.play-list-wrap {
	margin-bottom: 300upx;
}

.list {
	width: 100%;

	.item {
		width: 96%;
		padding: 25upx 3%;
		display: flex;
		justify-content: space-between;
		border-bottom: 2upx solid #f0edf1;

		.all {
			font-size: 28upx;

			text {
				display: inline-block;
				margin-left: 15upx;
				font-size: 32upx;
				padding-top: 5upx;
			}
		}

		.delete {
			background: rgba(245, 49, 49, 1);
			border-radius: 8upx;
			padding: 5upx 15upx;
			color: #ffffff;
			font-size: 26upx;
		}

		.story {
			display: flex;
			width: 80%;
			checkbox {
				margin-top: 15upx;
			}

			.story-info {
				margin-left: 15upx;

				.title {
					font-size: 28upx;
				}

				.album {
					font-size: 24upx;
					margin-top: 5upx;
				}
			}
		}

		.controller {
			margin-top: 25upx;

			image {
				display: inline-block;
				width: 32upx;
				height: 32upx;
				margin-right: 20upx;
			}
		}
	}
}

.audio-controller {
	position: fixed;
	z-index: 999;
	width: 100%;
	background: #ffffff;
	bottom: 0upx;

	.top {
		display: flex;
		justify-content: space-between;

		.title {
			width: 57%;
			margin-left: 3%;
			font-size: 30upx;
		}

		.controller-icon {
			display: flex;
			justify-content: space-around;
			width: 40%;

			image {
				display: inline-block;
				height: 30upx;
				width: 30upx;
			}
		}
	}

	.bottom {
		width: 100%;
		display: flex;
		justify-content: space-between;

		.time {
			margin-top: 26upx;
			margin-right: 20upx;
			color: #808080;
			font-size: 28upx;
			display: flex;

			image {
				display: block;
				width: 30upx;
				height: 30upx;
				margin-left: 30upx;
				margin-top: 5upx;
			}
		}
	}
}
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
		.L4{
			width: 100%;
			height: 60px;
			.L5{
			margin-left: 20px;
			transform:rotate(266deg);
			width: 60px;
			height: 60px;
			background: url(../../static/music/back.png);
			background-repeat:no-repeat;
			background-size: auto 100%;
		}
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
