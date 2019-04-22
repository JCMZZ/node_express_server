var emTable = function(emTableConfigName) {
	var emTableConfig = getConfig(emTableConfigName);
	var emDiv = "<div id='" + emTableConfig.outerDivId
			+ "_div' class='emtable_div'></div>";
	var searchFrom = searchFromFun(emTableConfigName);
	$("#" + emTableConfig.outerDivId).html(emDiv);
	$("#" + emTableConfig.outerDivId + "_div").append(searchFrom);
	if(emTableConfig.ajaxConfig.defaultSearch === undefined || emTableConfig.ajaxConfig.defaultSearch == true){
		emrefulsh(emTableConfigName);
	}
};

var emrefulsh = function(emTableConfigName, start, limit) {
	tableItemLayout(emTableConfigName, start, limit);
};

var emrefulshByPage = function(emTableConfigName, pageNum, limit) {
	var start = (pageNum - 1) * limit;
	emrefulsh(emTableConfigName, start, limit);
};

var searchFromFun = function(emTableConfigName) {
	var emTableConfig = getConfig(emTableConfigName);
	var searchHtml = searchItems(emTableConfigName);
	var buttonHtml = buttonItems(emTableConfigName);
	var emButtonHtml = emButtonItems(emTableConfigName);
	var html = searchHtml + emButtonHtml + buttonHtml;
	return "<form id='" + emTableConfig.outerDivId
			+ "_search_form' class='emtable_search_form'>" + html + "</form>";
};

var searchItems = function(emTableConfigName) {
	var emTableConfig = getConfig(emTableConfigName);
	var searchHtml = "";
	var searchConfig = emTableConfig.searchConfig;
	if (searchConfig && searchConfig.searchItems) {
		var searchItems = searchConfig.searchItems;
		for ( var i in searchItems) {
			var searchItem = searchItems[i];
			if (searchItem.isShow != null && searchItem.isShow != true) {
				continue;
			}
			var htmls = "";
			switch (searchItem.type) {
			case 'input':
				htmls = "<input type='text' id='" + searchItem.id
						+ "'></input>";
				break;
			case 'br':
				htmls = "<div class='clear'></div>";
				break;
			case 'select':
				htmls = "<select id='" + searchItem.id + "'>";
				if (searchItem.options != null && searchItem.options.length > 0) {
					for ( var j in searchItem.options) {
						var option = searchItem.options[j];
						var ov = typeof(option.value) == "undefined" ? "" : option.value;
						htmls += "<option value='" + ov + "'>"
								+ option.context + "</option>";
					}
				}
				htmls += "</select>";
				break;
			case 'date':
				var dateWhere = "";
				var dateMax = "";
				var dateMin = "";
				var dateFmt = "yyyy-MM-dd";
				if(searchItem.dateFmt){
					dateFmt = searchItem.dateFmt;
				}
				if (searchItem.maxDateId) {
					dateMax = "maxDate:'#F{$dp.$D(\\'" + searchItem.maxDateId
							+ "\\')}'";
				} else if (searchItem.maxDate) {
					dateMax = "maxDate:'" + searchItem.maxDate + "'";
				}
				if (searchItem.minDateId) {
					dateMin = "minDate:'#F{$dp.$D(\\'" + searchItem.minDateId
							+ "\\')}'";
				} else if (searchItem.minDate) {
					dateMin = "minDate:'" + searchItem.minDate + "'";
				}
				if (dateMax != "") {
					dateWhere += "," + dateMax;
				}
				if (dateMin != "") {
					dateWhere += "," + dateMin;
				}
				dateWhere += ",dateFmt:'"+dateFmt+"'";
				htmls += '<input id="'
						+ searchItem.id
						+ '" class="Wdate" type="text"  onfocus="WdatePicker({firstDayOfWeek:1,readOnly:true'
						+ dateWhere + '})"/>';
				break;
			case 'include':
				htmls += $("#" + searchItem.id).css("display", "block").prop(
						'outerHTML');
				$("#" + searchItem.id).remove();
				break;
			default:
				break;
			}
			if (htmls != "") {
				var clear = 'clear';
				if(htmls.indexOf(clear) >= 0){
					htmls = htmls;
				}else{
					htmls = "<div class='emay-search'>" + "<label>"+searchItem.label+"</label>" + htmls + "</div>";
				}
				
			}
			searchHtml += htmls;
		}
	}
	return searchHtml;
};

var buttonItems = function(emTableConfigName) {
	var emTableConfig = getConfig(emTableConfigName);
	var buttonHtml = "";
	var searchConfig = emTableConfig.searchConfig;
	if (searchConfig && searchConfig.buttonItems) {
		var buttonItems = searchConfig.buttonItems;
		for ( var i in buttonItems) {
			var buttonItem = buttonItems[i];
			if (buttonItem.isShow != null && buttonItem.isShow != true) {
				continue;
			}
			var htmls = "<div class='emay-search'><input type='button' id='"
					+ buttonItem.id + "' value='" + buttonItem.label
					+ "'  onClick='" + buttonItem.onClickFunction
					+ "'></input></div>";
			buttonHtml += htmls;
		}
	}
	return buttonHtml;
};

var emButtonItems = function(emTableConfigName) {
	var emTableConfig = getConfig(emTableConfigName);
	var emButtonHtml = "";
	var searchConfig = emTableConfig.searchConfig;
	if (!searchConfig || searchConfig.searchButton == true) {
		emButtonHtml += '<div class="emay-search"><input type="button" class="btn-green" value="查询" onClick="emrefulsh(\''
				+ emTableConfigName + '\')"></div>';
	}
	if (!searchConfig || searchConfig.resetButton == true) {
		emButtonHtml += '<div class="emay-search"><input type=\"reset\" class="btn-blue"  value=\"重置\"></div>';
	}
	return emButtonHtml;
};

var tableItemLayout = function(emTableConfigName, start, limit) {
	var emTableConfig = getConfig(emTableConfigName);
	var tableConfig = emTableConfig.tableConfig;
	var ajaxConfig = emTableConfig.ajaxConfig;
	var dataparams = buildAjaxParams(ajaxConfig, start, limit);
	var searchId = emTableConfig.outerDivId + '_search_form';
	var tableId = emTableConfig.outerDivId + '_table_table';
	var ladHeight = $('#'+searchId).height();
	$('.emay-search').each(function(inx,ele){
		$(ele).find('input:button').attr('disabled','disabled');
	});
	if($('#'+tableId).length > 0){
		$('.emtable_search_form').after('<div class="loadding" style="top:'+ladHeight+'px">loading……</div>');
	}else{
		$('.emtable_search_form').after('<div class="loadding" style="position:relative;height:300px;">loading……</div>');
	}
	
	$.ajax({
		type : ajaxConfig.method ? ajaxConfig.method : "POST",
		url : ajaxConfig.url,
		data : dataparams,
		dataType : "json",
		success : function(data) {
			if(ajaxConfig.afterAjax){
				ajaxConfig.afterAjax(data,tableConfig);
			}
			var theadHtml = tableTtile(tableConfig);
			var dataHtml = dataLayout(data, tableConfig, ajaxConfig);
			var pageHtml = pageLayout(data, emTableConfig, ajaxConfig,
					dataparams.limit, emTableConfigName);
			doLayout(emTableConfig, theadHtml, dataHtml, pageHtml);
			$('.emay-search').each(function(inx,ele){
				$(ele).find('input:button').removeAttr('disabled');
			});
			$('.loadding').remove();
		},
		error : function() {
			alert("system error!");
		}
	});
};


var tableTtile = function(tableConfig) {
	var theadHtml = "<thead><tr>";
	if(tableConfig.checkBoxConfig){
		var checkBox = tableConfig.checkBoxConfig;
		if (typeof(checkBox) !=="undefined" || checkBox !== false){
			theadHtml += "<th width='5%'><input type='checkbox' id='"+checkBox.id+"'/>全选</th>";
		}
	}
	if (typeof(tableConfig.isNeedIndexRow)=="undefined" || tableConfig.isNeedIndexRow == true) {
		theadHtml += "<th width='5%'>序号</th>";
	}
	var rowItems = tableConfig.rowItems;
	for ( var i in rowItems) {
		var row = rowItems[i];
		if (row.isShow != null && row.isShow == false) {
			continue;
		}
		theadHtml += "<th ";
		if (row.width != null) {
			theadHtml += "width='" + row.width + "'";
		}
		theadHtml += ">" + row.title + "</th>";
	}
	theadHtml += "</tr></thead>";
	return theadHtml;
};

var buildAjaxParams = function(ajaxConfig, start, limit) {
	var dataparams = {};
	var dataconfig = ajaxConfig.data;
	for ( var key in dataconfig) {
		var value = dataconfig[key];
		if (value.substr(0, 1) == "." || value.substr(0, 1) == "#") {
			value = $(value).val();
		}
		if(value == null || value == "" || typeof(value) == "undefined"){
			continue;
		}
		dataparams[key] = value;
	}
	if (ajaxConfig.startType == "startNum") {
		dataparams[ajaxConfig.startParams] = start ? (start > 0 ? start : 0)
				: 0;
	} else {
		var pageNum = start ? (start / limit) + 1 : 1;
		dataparams[ajaxConfig.startParams] = pageNum;
	}
	var defaultLimit = ajaxConfig.defaultLimit ? ajaxConfig.defaultLimit : 20;
	dataparams[ajaxConfig.limitParams] = limit ? (limit > 0 ? limit
			: defaultLimit) : defaultLimit;
	return dataparams;
};

var dataLayout = function(data, tableConfig, ajaxConfig) {
	var dataHtml = "<tbody>";
	var datalistV = getData(data, ajaxConfig.result.dataArray);
	for ( var i in datalistV) {
		dataHtml += "<tr>";
		var dataone = datalistV[i];
		for(var is in dataone){
			if(dataone[is]  == null ){
				dataone[is] = "";
			}
		}
		if(tableConfig.checkBoxConfig){
			var checkBox = tableConfig.checkBoxConfig;
			if (typeof(checkBox) !=="undefined" || checkBox !== false) {
				var context = checkBox.sValue;
				if (context) {
					for ( var t in dataone) {
						if (context.indexOf("@{") < 0) {
							break;
						}
						while (context.indexOf("@{" + t + "}") >= 0) {
							context = context.replace("@{" + t + "}", dataone[t]);
						}
					}
					
				}
				dataHtml += "<td><input type='checkbox' sValue='"+context+"' class='"+checkBox.subCalss+"' /></td>";
			}
		}
		if (typeof(tableConfig.isNeedIndexRow)=="undefined" || tableConfig.isNeedIndexRow == true) {
			var index = Number(i)  + 1;
			dataHtml += "<td>" + index + "</td>";
		}
		
		for ( var j in tableConfig.rowItems) {
			var row = tableConfig.rowItems[j];
			if (row.isShow != null && row.isShow == false) {
				continue;
			}
			dataHtml += "<td>";
			var context = row.context;
			var selectors = row.selectors;
			if (context) {
				for ( var t in dataone) {
					if (context.indexOf("@{") < 0) {
						break;
					}
					while (context.indexOf("@{" + t + "}") >= 0) {
						context = context.replace("@{" + t + "}", dataone[t]);
					}
				}
				dataHtml += context;
			}
			if (selectors) {
				for ( var q in selectors) {
					var selector = selectors[q];
					if (selector.isShow != null && selector.isShow == false) {
						continue;
					}
					var term = selector.term.replace("@{", "").replace("}", "");
					var termValue = dataone[term];
					var select = selector.select;
					for ( var s in select) {
						var sele = select[s];
						var seleValue = sele.value;
						var isChoose = false;
						if (seleValue instanceof Array) {
							for ( var st in seleValue) {
								var sv = seleValue[st];
								if (typeof (sv) != "number") {
									for ( var t in dataone) {
										if (sv.indexOf("@{") < 0) {
											break;
										}
										while (sv.indexOf("@{" + t + "}") >= 0) {
											sv = sv.replace("@{" + t + "}",
													dataone[t]);
										}
									}
								}
								if (sv == termValue) {
									isChoose = true;
									break;
								}
							}
						} else {
							var sv = seleValue;
							if (typeof (sv) != "number") {
								for ( var t in dataone) {
									if (sv.indexOf("@{") < 0) {
										break;
									}
									while (sv.indexOf("@{" + t + "}") >= 0) {
										sv = sv.replace("@{" + t + "}",
												dataone[t]);
									}
								}
							}
							if (sv == termValue) {
								isChoose = true;
							}
						}
						if (isChoose == true) {
							var con = sele.context;
							for ( var t in dataone) {
								if (con.indexOf("@{") < 0) {
									break;
								}
								while (con.indexOf("@{" + t + "}") >= 0) {
									con = con.replace("@{" + t + "}",
											dataone[t]);
								}
							}
							dataHtml += con;
						}
					}
				}
			}
			dataHtml += "</td>";
		}
		dataHtml += "</tr>";
	}
	dataHtml += "</tbody>";
	var rowcol = emTableConfig.tableConfig.rowItems.length + (typeof(tableConfig.isNeedIndexRow)=="undefined" || tableConfig.isNeedIndexRow == true ? 1 : 0);
	dataHtml = dataHtml != "<tbody></tbody>" ? dataHtml : "<tr><td colspan='"+rowcol+"'>暂无数据</td></tr>";
	return dataHtml;
};

var pageLayout = function(data, emTableConfig, ajaxConfig, limit,
		emTableConfigName) {
	var totalCount = getData(data, ajaxConfig.result.totalCount);
	var totalPageNum = getData(data, ajaxConfig.result.totalPageNum);
	var currentPage = getData(data, ajaxConfig.result.currentPage);
	var supportLimit = ajaxConfig.supportLimit;
	var pageHtml = "<div class='emtable-page-right'>";
	var startShow = true;
	if (currentPage <= 1) {
		startShow = false;
	}
	if (startShow) {
		pageHtml += '<span class="emtable-page-list" onClick="emrefulsh(\'' + emTableConfigName	+ '\')"> title="首页"><<</span>';
	}else{
		pageHtml += '<span class="emtable-page-list disabled" title="首页"><<</span>';
	}
	
	var perShow = true;
	var perStart = (currentPage - 2) * limit;
	if (perStart < 0) {
		perShow = false;
	}
	if (perShow) {
		pageHtml += '<span  onClick="emrefulsh(\'' + emTableConfigName + '\','
		+ perStart + ',' + limit + ')" title="上一页"><</span>';
	}else{
		pageHtml += '<span class="disabled" title="上一页"><</span>';
	}
	var pages = [ currentPage - 2, currentPage - 1, currentPage,
			currentPage + 1, currentPage + 2 ];
	for ( var i in pages) {
		var num = pages[i];
		if (num <= 0 || num > totalPageNum) {
			continue;
		}
		if (currentPage == num) {
			pageHtml += '<b >' + currentPage + '</b>';
		} else {
			var startNum = (num - 1) * limit;
			pageHtml += '<span onClick="emrefulsh(\'' + emTableConfigName + '\','
					+ startNum + ',' + limit + ')">' + num
					+ '</span>';
		}
	}
	var nextShow = true;
	var nextStart = currentPage * limit;
	if (nextStart >= totalCount) {
		nextShow = false;
	}
	if (nextShow) {
		pageHtml += '<span onClick="emrefulsh(\'' + emTableConfigName + '\','
				+ nextStart + ',' + limit + ')" title="下一页">></span>';
	}else{
		pageHtml += '<span class="disabled" title="下一页">></span>';
	}
	var endShow = true;
	if (currentPage == totalPageNum) {
		endShow = false;
	}
	if (endShow) {
		pageHtml += '<span class="emtable-page-last" onClick="emrefulsh(\'' + emTableConfigName + '\','
				+ ((totalPageNum - 1) * limit) + ',' + limit
				+ ')" title="尾页">>></span>';
	}else{
		pageHtml += '<span class="emtable-page-last disabled" title="尾页">>></span>';
	}
	pageHtml += '<input id="' + emTableConfig.outerDivId
			+ '_jumpnum" type="text" value="' + currentPage
			+ '"/><input type="button" value="跳转" onClick="emrefulshByPage(\''
			+ emTableConfigName + '\',$(\'#' + emTableConfig.outerDivId
			+ '_jumpnum\').val(),' + limit + ')"/>';
	pageHtml += "</div>";
	pageHtml += "<div class='emtable-page-left'>";
	pageHtml += "共" + totalPageNum + "页,共" + totalCount + "条数据 ";
	if (supportLimit) {
		pageHtml += '每页显示:<select class="limitSelect" onChange="emrefulsh(\''
				+ emTableConfigName + '\',0,this.value)">';
		for ( var i in supportLimit) {
			var limits = supportLimit[i];
			pageHtml += '<option value="' + limits + '"';
			if (limit == limits) {
				pageHtml += 'selected="selected"';
			}
			pageHtml += '>' + limits + '</option>';
		}
		pageHtml += '</select>';
	}
	pageHtml += "</div>";
	return pageHtml;
};

var doLayout = function(emTableConfig, theadHtml, dataHtml, pageHtml) {
	var outerDivId = emTableConfig.outerDivId;
	$("#" + outerDivId + "_table_table").remove();
	$("#" + outerDivId + "_page_div").remove();
	var tableItem = "<table id='" + outerDivId
			+ "_table_table' class='emtable_table_table'>" + theadHtml
			+ dataHtml + "</table>" + "<div id='" + outerDivId
			+ "_page_div' class='emtable-page'>" + pageHtml + "</div>";
	$("#" + outerDivId + "_div").append(tableItem);
	if(emTableConfig.tableConfig.checkBoxConfig){
		checkAll(emTableConfig);
	}
};

var getData = function(ajaxResult, dataPath) {
	var ajaxResultCopy = ajaxResult;
	var dataPathtree = dataPath.split('.');
	for ( var t in dataPathtree) {
		ajaxResultCopy = ajaxResultCopy[dataPathtree[t]];
	}
	return ajaxResultCopy;
};

var getConfig = function(emTableConfigName) {
	return window[emTableConfigName];
};

function checkAll(emTableConfig){
	var checkID = emTableConfig.tableConfig.checkBoxConfig.id;
	var subCalss = emTableConfig.tableConfig.checkBoxConfig.subCalss;
	$('#'+checkID).click(function(){
		if($(this).prop('checked')){    
			$("."+subCalss).prop("checked", true);
		}else{    
			$("."+subCalss).prop("checked", false); 
		}  
		
	});
}

var getCheckSvalue = function (name){
	var emTableConfig = getConfig(name);
	var subCalss = emTableConfig.tableConfig.checkBoxConfig.subCalss;
	var checked = [];
	$("."+subCalss+':checked').each(function(inx,ele){
		var id = $(ele).attr('sValue');
		checked.push(id);
	});
	return checked;
}