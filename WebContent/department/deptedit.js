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
				var parameter  = location.search.substring( 1, location.search.length );
				parameter = decodeURIComponent( parameter );
				deptId = parameter.split('=')[1];
				if(json.userRoll==="マネージャー"){


					getparam(deptId);
				}else{
					alert("権限がありません");
					location.href = '/syainSearch/syain/syaintable.html';
				}
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}
	});
}
//部署の名前をHTMLにセットする
function setdeptName () {
	var requestQuery = {
			"request" : "setdeptName",
			"deptId" : deptId
	};
	'use strict';
	$.ajax({
		type : 'GET',
		url : '/syainSearch/DeptServlet',
		dataType : 'json',
		data :requestQuery,
		success : function (json) {
			var dept = json[0];
			var deptName = dept.deptName;
			$('#comment').append('<font size="6">'+deptName+'の名前を変更</font><br>');
			$('#comment').append('名前：<input type="text" id="inputName" value='+deptName+'>')
			$('#button').append('<input type="button" value="設定" id="confirm" onclick="confirm();"><br>')
			$('#button').append('<input type="button" value="キャンセル" id="cancel" onclick="cancel();">')
		}

	});
}

//部署の更新と追加
function changeDept(deptId,inputValue,request){
	var requestQuery = {
			"request" : request,
			"deptId" : deptId,
			"newName" : inputValue
	};
	'use strict';
	$.ajax({
		type : 'POST',
		url : '/syainSearch/DeptUpdateServlet',
		dataType : 'json',
		data :requestQuery,
		success : function (json) {//正常にアップデートできた際
			//alert(json);
			location.href = '/syainSearch/department/done.html?error=0';
		},
		error: function (json) { //エラーが発生した際
			location.href = '/syainSearch/department/done.html?error=1';
		}

	});
}

//パラメータが入力されているか確認
function getparam(deptId){
	if(!deptId){
		$('#comment').html('<font size="6">部署データを新規作成</font><br>')
		$('#comment').append('名前：<input type="text" id="inputName">')
		$('#button').append('<input type="button" value="設定" id="confirm" onclick="confirm();"><br>')
		$('#button').append('<input type="button" value="キャンセル" id="cancel" onclick="cancel();">')
	}else{
		setdeptName(deptId);
	}
}

//設定ボタンを押した際に実行
function confirm(){

	var inputValue = $('#inputName').val();

	if(!inputValue){
		alert("何も入力されていません");
	}else{

		if(!deptId){
			var request = "createDept"
			changeDept(deptId,inputValue,request);
		}else{
			var request = "updateDept"
			changeDept(deptId,inputValue,request);
		}
	}

}

//キャンセル
function cancel(){
	location.href = '/syainSearch/department/depttable.html';
}


$(document).ready(function () {

	'use strict';

	//パラメータが入力されているか確認
	getUserData();


});