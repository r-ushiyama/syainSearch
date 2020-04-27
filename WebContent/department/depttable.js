
// 部署一覧表示
function executeAjax () {
	'use strict';
	var requestQuery = {
			"request":"depttable"
	};
	$.ajax({
		type : 'GET',
		url : '/syainSearch/DeptServlet',
		dataType : 'json',
		data :requestQuery,
		success : function (json) {
			// DOM操作
			for(var i=0;i<json.length;i++){
				var dept = json[i];
				var deptName = dept.deptName
				var tableElement='<tr>'
								+'<td>'+dept.deptId+'</td>'
								+'<td>'+dept.deptName+'</td>'
								+'<td><input type="button" name="edit" value="編集" id="'+dept.deptId+'" onclick="editDept(this.id);"></td>'
								+'<td><input type="button" name="delete" value="削除" id="'+dept.deptId+'" onclick="deleteDept(this.id);"></td>'
								+'</tr>'
				$('#deptData').append(tableElement);
			}
		}
	});
}

//編集ボタンをクリック、編集ページへ飛ぶ
function editDept(id_value){
	//押したボタンの部署IDを代入
	var edit_deptId = id_value;
	if(edit_deptId==='addDept'){
		location.href = '/syainSearch/department/deptedit.html';
	}else{
		location.href = '/syainSearch/department/deptedit.html?deptid='+edit_deptId;

	}

}

//削除ボタンをクリック、！即削除
function deleteDept(id_value){
	//押したボタンの部署IDを代入
	var requestQuery = {
			"deptId" : id_value,
			"request" : "deleteDept"
	};
	'use strict';
	$.ajax({
		type : 'POST',
		url : '/syainSearch/DeptUpdateServlet',
		dataType : 'json',
		data :requestQuery,
		success : function (json) {
			// DOM操作
			location.href = '/syainSearch/department/depttable.html';
		},
		error: function (json) {
	       alert('エラーが発生したため削除することができませんでした。');
	    }
	});
}

//ページ読み込み時
$(document).ready(function () {
	'use strict';
	// 初期表示用
	executeAjax();

	// 更新ボタンにイベント設定
	$('#searchBtn').bind('click',executeAjax);
});
