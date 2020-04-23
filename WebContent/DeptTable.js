// AjaxでJSONを取得する
function executeAjax () {
	'use strict';
	var requestQuery = "";
	$.ajax({
		type : 'GET',
		url : '/syainSearch/DeptServlet',
		dataType : 'json',
		data :requestQuery,
		success : function (json) {
			// DOM操作
			console.log(json)

			for(var i=0;i<json.length;i++){
				var dept = json[i];
				var tableElement='<tr>'
								+'<td>'+dept.deptId+'</td>'
								+'<td>'+dept.deptName+'</td>'
								+'<td><button type="button" name="edit" value="edit">編集</button></td>'
								+'<td><button type="button" name="delete" value="delete">削除</button></td>'
								+'</tr>'
				$('#deptData').append(tableElement);
			}
		}
	});
}

$(document).ready(function () {
	'use strict';
	// 初期表示用
	executeAjax();

	// 更新ボタンにイベント設定
	$('#searchBtn').bind('click',executeAjax);
});
