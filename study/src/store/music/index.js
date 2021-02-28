export default{
	namespaced:true,
	state:{
		Mtime:0.000001,
		Mstate:0,
		Ptime:0,
		Psrc:'',
		judge:0
	},
	mutations:{
		timeUpdate(state,time){
			state.Mtime=time;
			console.log(state.Mtime);
		},
		pageUpdate(state,date){
			state.Ptime = date.time;
			state.Psrc = date.src;
			console.log(date.src);
			console.log('cnm'+date.time);
		},
		judgeUpdate(state){
			state.judge = 1;
		},
		judgeUpdate1(state){
			state.judge = 0;
		}
	}
}