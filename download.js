// ==UserScript==
// @name         worktile任务下载
// @namespace    填写域名
// @version      0.1
// @description  try to take over the world!
// @author       zhangfengman
// @match        填写域名
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function loadScript(src, callback) {
 var script = document.createElement('script'),
  head = document.getElementsByTagName('head')[0];
 script.type = 'text/javascript';
 script.charset = 'UTF-8';
 script.src = src;
 if (script.addEventListener) {
  script.addEventListener('load', function () {
   callback();
  }, false);
 } else if (script.attachEvent) {
  script.attachEvent('onreadystatechange', function () {
   var target = window.event.srcElement;
   if (target.readyState == 'loaded') {
    callback();
   }
  });
 }
 head.appendChild(script);
    }
   setTimeout(()=>{
	 loadScript('https://cdn.bootcdn.net/ajax/libs/jquery/1.8.3/jquery.min.js',function(){
	  console.log('end')
	     var array =[]
	    
		
		$('.styx-table-list table tr').each((index,obj)=>{
				var no = $($(obj).find('td')[0]).text();
				var taskTitle = $(obj).find('.task-title').text();
				var start = $($(obj).find('td')[5]).text();
				var end = $($(obj).find('td')[6]).text();
				console.log(no,taskTitle,start,end);
				//array.push(taskTitle+", , ," + end +"\r\n");
				array.push({
					title:taskTitle,
					identifier:'',
					end:end
				})
		})
		
		var tr = $(".styx-table-list table tr")
		//判断是否能下载
		if(tr.length>0){
			//接口获取任务编号
			$.ajax({url:"https://bkir20201118072037917.worktile.com/api/mission-vnext/table/5ffd58a2035da114efc1c289/views/5ffd58a2035da114efc1c28c/content?pi=0&pz=50&t=1646299177156",success:function(result){
				console.log(result)
				result.data.value.forEach(element => {
					for(let i =0;i<array.length;i++){
						if(array[i].title == element.title){
							array[i].identifier = element.identifier;
							break;
						}
					}
				});


				loadScript('https://cdn.bootcdn.net/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js',function(){
					console.log('end 2')
					var strArray = [];
					for(let i =0;i<array.length;i++){
						strArray.push(array[i].title+","+array[i].identifier+", ," + array[i].end +"\r\n");
					}
					var blob = new Blob(strArray, {type: "text/plain;charset=utf-8"});
					saveAs(blob, "我的任务.csv");
					  
				})

			}});
		 
		
		}
		
		
		
			  
   });
   
   },5000)
  
   
})();