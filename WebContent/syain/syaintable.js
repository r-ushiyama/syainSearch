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
				executeAjax(json.userRoll,json.userId);
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
function executeAjax (userRoll,userId) {
	'use strict';
	var requestQuery = {
			"request":"syaintable"
	};
	$.ajax({
		type : 'GET',
		url : '/syainSearch/SyainServlet',
		dataType : 'json',
		data :requestQuery,
		success : function (json) {
			// DOM操作
			if(json.length==0){
				$('#userInput').append("登録されている社員がいません");
			}else{
				$('#comment').html('社員一覧：')
				if(userRoll=="マネージャー"){
					var Element = '<table id="syainData">'
						//+'<tr>'
						+'<th>社員ID</th>'
						+'<th>名前</th>'
						//+'</tr>'
					for(var i=0;i<json.length;i++){
						var syain = json[i];
						var syainName = syain.syainName
						Element += '<tr>'
										+'<td>'+syain.syainId+'</td>'
										+'<td>'+syain.syainName+'</td>'
										+'<td><input type="button" name="'+syain.syainId+'" value="編集" class="'+syain.syainId+'" onclick="editSyain(this.name);"></td>'
										+'<td><input type="button" name="'+syain.syainId+'" value="削除" class="'+syain.syainId+'" onclick="deleteSyain(this.name);"></td>'
										+'</tr>'
					}
					Element += '</table>';
					$('#button').append('<input type="button" value="新規追加" id="addSyain" onclick="editSyain(this.id);"><br>')
					$('#button').append('<input type="button" value="社員検索" id="searchSyain" onclick="location.href = \'/syainSearch/syain/syainsearch.html\';"><br>')
					$('#button').append('<input type="button" value="部署情報" id="goDept" onclick="location.href = \'/syainSearch/department/depttable.html\';"><br>')
					$('#button').append('<input type="button" value="経費情報" id="goExp" onclick="location.href = \'/syainSearch/expense/expensetable.html\';"><br>')
					$('#button').append('<input type="button" value="ログアウト" id="logout" onclick="location.href = \'../index.html?request=logout\';">')

				}else if(userRoll=="メンバー"){
					var Element = '<table id="syainData">'
						//+'<tr>'
						+'<th>社員ID</th>'
						+'<th>名前</th>'
						//+'</tr>'
					for(var i=0;i<json.length;i++){
						var syain = json[i];
						var syainName = syain.syainName
						Element += '<tr>'
										+'<td>'+syain.syainId+'</td>'
										+'<td>'+syain.syainName+'</td>'
						if(syain.syainId===userId){
							Element += '<td><input type="button" name="'+syain.syainId+'" value="編集" class="'+syain.syainId+'" onclick="editSyain(this.name);"></td>'
						}
						Element += '</tr>'
					}
					Element += '</table>';
					$('#button').append('<input type="button" value="社員検索" id="searchSyain" onclick="location.href = \'/syainSearch/syain/syainsearch.html\';"><br>')
					$('#button').append('<input type="button" value="部署情報" id="goDept" onclick="location.href = \'/syainSearch/department/depttable.html\';"><br>')
					$('#button').append('<input type="button" value="経費情報" id="goExp" onclick="location.href = \'/syainSearch/expense/expensetable.html\';"><br>')
					$('#button').append('<input type="button" value="ログアウト" id="logout" onclick="location.href = \'../index.html?request=logout\';">')
				}
				$('#syainData').append(Element);
			}



		}
	});
}

//編集ボタンをクリック、編集ページへ飛ぶ
function editSyain(id_value){
	//押したボタンの部署IDを代入
	var edit_syainId = id_value;

	if(edit_syainId==='addSyain'){
		location.href = '/syainSearch/syain/syainedit.html';
	}else{
		location.href = '/syainSearch/syain/syainedit.html?syainid='+edit_syainId;

	}

}

//削除ボタンをクリック、即削除
function deleteSyain(id_value){
	if(userRoll==="マネージャー"){
		//押したボタンの部署IDを代入
		var requestQuery = {
				"oldsyainId" : id_value,
				"request" : "deleteSyain"
		};
		//console.log(id_value+'の社員を削除します');
		'use strict';


		$.ajax({
			type : 'POST',
			url : '/syainSearch/SyainUpdateServlet',
			dataType : 'json',
			data :requestQuery,
			success : function (json) {
				// DOM操作
				console.log(json)
				location.href = '/syainSearch/syain/syaintable.html';
			},
			error: function (json) {
		       alert('エラーが発生したため削除することができませんでした。');
		    }
		});
	}else{
		alert("権限がありません");
		location.href = '/syainSearch/syain/syaintable.html';
	}


}

//ページ読み込み時
$(document).ready(function () {
	'use strict';
	// 初期表示用
	getUserData();

	// 更新ボタンにイベント設定
	$('#searchBtn').bind('click',executeAjax);
});
