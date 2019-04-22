var emTableConfig = {
	outerDivId : "outerId",
	searchConfig : {
		searchItems : [ {
			isShow : true,
			label : '操作用户',
			id : 'username',
			type : 'input'
		},{
			isShow : true,
			label : '操作模块',
			id : 'module',
			type : 'input'
		} ,{
			isShow : true,
			label : '操作内容',
			id : 'context',
			type : 'input'
		}],
		searchButton : true,
		resetButton : true
	},
	ajaxConfig : {
		url : SERVER_PATH + '/log/ajax/list',
		method : 'POST',
		data : {
			module : '#module',
			context : '#context',
			username : '#username'
		},
		startType : "startNum",
		startParams : "start",
		limitParams : "limit",
		defaultLimit : 20,
		supportLimit : [ 20, 50, 100 ],
		result : {
			dataArray : "result.list",
			totalCount : "result.totalCount",
			totalPageNum : "result.totalPage",
			currentPage : "result.currentPage",
		}
	},
	tableConfig : {
		isNeedIndexRow : true,
		rowItems : [
				{
					isShow : true,
					title : "操作用户",
					width : "10%",
					context : "@{username}"
				},
				{
					isShow : true,
					title : "操作模块",
					width : "10%",
					context : "@{module}"
				},
				{
					isShow : true,
					title : "操作内容",
					width : "30%",
					context : "@{context}"
				},
				{
					isShow : true,
					title : "操作时间",
					width : "10%",
					context : "@{operTime}"
				}]
	}
}

emTable('emTableConfig');

