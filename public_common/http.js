const post = function(option){
	return new Promise((resolve,reject)=>{
			option = Object.assign({
			method:"POST",
			dataType:"json",
			success:function(res){
				resolve(res)
			},
			fail:function(){
			},
			complete:function(){
			}
		},option)
		uni.request(option)
	})
}
const get = function(option){
	return new Promise((resolve,reject)=>{
			option = Object.assign({
			method:"GET",
			dataType:"json",
			success:function(res){
				resolve(res)
			},
			fail:function(){
			},
			complete:function(){
			}
		},option)
		uni.request(option)
	})
}
//update test
module.exports = {
	post,
	get
}