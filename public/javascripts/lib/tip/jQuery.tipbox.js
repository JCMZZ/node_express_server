// JavaScript Document  
(function($){
	
	$.fn.extend({
		tipClick:function(options){
			//定义默认值
			var defauls = {
				title : '提示框',
				width : '300',
				height : '200',
				btn : false,
				tipClose : true,
				concent : ''
			}
			this.click(function(){
				options = $.extend(defauls,options);
				return tipCen(options.title,options.width,options.height,options.btn,options.tipClose,options.concent);
			});
			
		},
		tipOpen:function(options){
			//定义默认值
			var defauls = {
				title : '提示框',
				width : 'auto',
				height : 'auto',
				btn : false,
				tipClose : true,
				concent : ''
			}
			options = $.extend(defauls,options);
			return tipCen(options.title,options.width,options.height,options.btn,options.tipClose,options.concent);
						
		},
		tipLog:function(val){
			return tiplog(this,val);
		},
		tipAlert:function(text,time,ind){
			if($('.easyTipBorder').length <= 0){
				return easyTipCen(text,time,ind);
			}
			
		},
		tipShut:function(time){
			time = time*1000;
			setTimeout(function(){$('.layer,.tipBorder').remove();},time);
		}
		
	});
	
	var number = 0;
	//简单弹框
	function easyTipCen(text,time,ind){
		number++;
		var html = '<div class="easyTipBorder" id="tipBox_'+number+'">';
			html += '<div class="tipCen">';
			if(ind != undefined){
				html += '<i class="tipicon tipicon-'+ind+'"></i>';
			}
			html += text;
			html += '</div>';
			html += '</div>';
		$('body').append(html);
		tipPosition(number);
		if(time == undefined){
			time = 1.5;
		}
		time = time*1000;
		setTimeout(function(){easyTipClose(number)},time);
		
	}
	//弹框框架
	function tipCen(title,width,height,btn,tipClose,concent){
		number++;
		layer();
		var html = '<div class="tipBorder" id="tipBox_'+number+'">';
			if(title != false && tipClose == true){
				html += '<div class="tipTitle"><span class="tipTitle-text">'+title+'</span><i class="tipicon tipClose">关闭</i></div>';
			}else if(title != false && tipClose != true){
				html += '<div class="tipTitle"><span class="tipTitle-text">'+title+'</span></div>';
			}else if(title == false && tipClose == true){
				html += '<i class="tipicon tipClose">关闭</i>';
			}
			
			html += '<div class="tipCen">';
			html += concent;
			html += '</div>';
			if(btn != false){
				var buttonHtml = "";
				for ( var i in btn) {
					var buttonItem = btn[i];
					var htmls = "<button type='button' class='tipBtn' id='"
							+ buttonItem.id + "' onClick='" + buttonItem.onClickFunction
							+ "'>" + buttonItem.label + "</button>";
					buttonHtml += htmls;
				}
				html += '<div class="tipFoot">';
				html += buttonHtml+'<button type="button" class="tipBtn tip-cancel">取消</button>';
				html += '</div>';
			}
			html += '</div>';
		$('body').append(html);
		$('.tipCen').css({'width':width+'px','height':height+'px'});
		tipPosition(number);
		if(tipClose == true){
			tipCloses(number);
		}else{
			tipCancel(number);
		}
		drag(number);
	}
	//制定ID弹出
	function tiplog(obj,val){
		var zfc = $(obj).attr('id');
		if(val == 'open'){
			layer();
			var html = '<div class="tipLog" id="tipBox_'+zfc+'">';
				html += '<div class="tipCen">';
				html += $(obj).html();
				html += '</div>';
				html += '</div>';
			$('body').append(html);
			tipPosition(zfc);
		}else{
			$('#tipBox_'+zfc).remove();
			$('.layer').remove();
		}
	}
	//拖拽功能
	function drag(number){
		var $tar = $('#tipBox_'+number+'');
		$tar.mousedown(function(e){
			if(e.target.className == "tipTitle" || e.target.className == "tipTitle-text" ){
				var diffX = e.clientX - $tar.offset().left;
				var diffY = e.clientY - $tar.offset().top;
				$(document).mousemove(function(e){
					var tipWidth = $tar.outerWidth();
					var tipHidth = $tar.outerHeight();
					var left = e.clientX - diffX;
					var top = e.clientY - diffY;
					if(tipWidth > $(window).width()){
						left = 0;
					}else if(tipHidth > $(window).height()){
						top = 0;
					}else{
						if (left < 0){
							left = 0;
						}
						else if (left <= $(window).scrollLeft()){
							left = $(window).scrollLeft();
						}
						else if (left > $(window).width() +$(window).scrollLeft() - tipWidth){
							left = $(window).width() +$(window).scrollLeft() - tipWidth;
						}
						if (top < 0){
							top = 0;
						}
						else if (top <= $(window).scrollTop()){
							top = $(window).scrollTop();
						}
						else if (top > $(window).height() +$(window).scrollTop() - tipHidth){
							top = $(window).height() +$(window).scrollTop() - tipHidth;
						}
					}
					$tar.css("left",left + 'px').css("top",top + 'px');
				});
			}
			$(document).mouseup(function(){
				$(this).unbind("mousemove");
				$(this).unbind("mouseup")
			});
		});
	}
	
	//弹出窗口定位
	function tipPosition(number){
		var gd = $(this).scrollTop();
		var width = $('#tipBox_'+number+'').width();
		var height = $('#tipBox_'+number+'').height();
		var browserW = $(window).width();
		var browserH = $(window).height();
		var left = (browserW-width)/2;
		var top;
		if($('#tipBox_'+number+'').hasClass('tipBorder')){
			top = (browserH-height)/2+gd;
		}else{
			top = (browserH-height)/2;
		}
		
		
		if(left <= 0){
			left = 0;
		}
		if(top <= 0){
			top = 0;
		}
		$('#tipBox_'+number+'').css({'left':left+'px','top':top+'px'});
	}
	
	
	
	//添加罩层
	function layer(){
		var layer = '<div class="layer"></div>';
		$('body').append(layer);
	}
	//删除罩层
	function delLayer(number){
		$('.layer,#tipBox_'+number+'').remove();
	}
	//关闭按钮关闭罩层
	function tipCloses(number){
		$('.layer,.tipClose,.tip-cancel').on('click',function(){
			delLayer(number);
		});
	}
	//取消按钮
	function tipCancel(number){
		$('.tip-cancel').on('click',function(){
			delLayer(number);
		});
	}
	
	//简单删除罩层
	function easyTipClose(number){
		$('#tipBox_'+number+'').fadeOut(800,function(){
			this.remove();
		});
	}
	
})(jQuery);
