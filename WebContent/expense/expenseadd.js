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
				executeAjax(json.userRoll,json.userName);
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}
	});
}
//
function executeAjax (userRoll,userName) {
	'use strict';
	var requestQuery = {"expId":"all"};
	$.ajax({
		type : 'GET',
		url : '/syainSearch/GetExpenseServlet',
		dataType : 'json',
		data :requestQuery,
		success : function (json) {
			// DOM操作
			console.dir(json);

					$('#button').append('<input type="button" value="新規追加" id="addExp" onclick="addExp(this.id);"><br>')
					$('#button').append('<input type="button" value="社員情報" id="searchSyain" onclick="location.href = \'/syainSearch/syain/syaintable.html\';"><br>')
					$('#button').append('<input type="button" value="部署情報" id="goDept" onclick="location.href = \'/syainSearch/department/depttable.html\';"><br>')
					$('#button').append('<input type="button" value="ログアウト" id="logout" onclick="location.href = \'../index.html?request=logout\';">')



		}
	});
}


//ページ読み込み時
$(document).ready(function () {
	'use strict';
	// 初期表示用
	getUserData();

	// 更新ボタンにイベント設定
	$('#searchBtn').bind('click',executeAjax);
});
