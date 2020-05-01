function getUserData() {
	// 入力されたユーザーIDとパスワード
	var requestQuery = {};
	// サーバーからデータを取得する
	$.ajax({
		type : 'POST',
		dataType:'json',
		url : '/syainSearch/GetLoginInfoServlet',
		data : requestQuery,
		success : function(json) {
			// サーバーとの通信に成功した時の処理
			console.dir(json)
			if(!json.userId){
				$('#comment').html('ログインが必要です。');
				var Element = '<input type="button" value="ログイン画面へ" id="goSyain" onclick="location.href = \'/syainSearch/login.html\';">'
				$('#button').append(Element);

			}else{
				userRoll = json.userRoll
				executeAjax(json.userRoll);
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}
	});
}
// 部署一覧表示
function executeAjax (userRoll) {
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
			var tableElement = '<table id="deptData">'
			+'<tr>'
			+'<th>ID</th>'
			+'<th>部署名</th>'
			+'</tr>'
			if(userRoll==="マネージャー"){
				for(var i=0;i<json.length;i++){
					var dept = json[i];
					var deptName = dept.deptName
					tableElement += '<tr>'
									+'<td>'+dept.deptId+'</td>'
									+'<td>'+dept.deptName+'</td>'
									+'<td><input type="button" name="'+dept.deptId+'" value="編集" class="'+dept.deptId+'" onclick="editDept(this.name);"></td>'
									+'<td><input type="button" name="'+dept.deptId+'" value="削除" class="'+dept.deptId+'" onclick="deleteDept(this.name);"></td>'
									+'</tr>';


				}
				$('#deptData').append(tableElement);
				tableElement += '</table>';
				$('#button').append('<input type="button" value="新規追加" id="addDept" onclick="editDept(this.id);"><br>')
				$('#button').append('<input type="button" value="社員情報" id="goSyain" onclick="location.href = \'/syainSearch/syain/syaintable.html\';"><br>')
				$('#button').append('<input type="button" value="経費情報" id="goExp" onclick="location.href = \'/syainSearch/expense/expensetable.html\';"><br>')
				$('#button').append('<input type="button" value="ログアウト" id="logout" onclick="location.href = \'../index.html?request=logout\';">')
			}else if(userRoll==="メンバー"){
				for(var i=0;i<json.length;i++){
					var dept = json[i];
					var deptName = dept.deptName
					tableElement+='<tr>'
									+'<td>'+dept.deptId+'</td>'
									+'<td>'+dept.deptName+'</td>'
									+'</tr>'
				}
				$('#deptData').append(tableElement);
				tableElement += '</table>';
				$('#button').append('<input type="button" value="社員情報" id="goSyain" onclick="location.href = \'/syainSearch/syain/syaintable.html\';"><br>')
				$('#button').append('<input type="button" value="経費情報" id="goExp" onclick="location.href = \'/syainSearch/expense/expensetable.html\';"><br>')
				$('#button').append('<input type="button" value="ログアウト" id="logout" onclick="location.href = \'../index.html?request=logout\';">')
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
	getUserData();

});
