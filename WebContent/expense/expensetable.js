function getUserData() {
	var requestQuery = {};
	// サーバーからデータを取得する
	$.ajax({
		type : 'POST',
		dataType:'json',
		url : '/syainSearch/GetLoginInfoServlet',
		data : requestQuery,
		success : function(json) {
			// サーバーとの通信に成功した時の処理
			if(!json.userId){
				alert("権限がありません");
				location.href = '/syainSearch/login.html';
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
					var tableElement = '<table class="expData">'
						+'<tr>'
						+'<th>申請ID</th>'
						+'<th>申請日</th>'
						+'<th>更新日</th>'
						+'<th>更新者</th>'
						+'<th>タイトル</th>'
						+'<th>金額</th>'
						+'<th>ステータス</th>'
						+'<th>詳細</th>'
						+'</tr>'

					for(var i=0;i<json.length;i++){
						var exp = json[i];
						var upDate = exp.updateDate.substring(0, 10)
						var reqDate = exp.reqDate.substring(0, 10)
						var status= ""
						if(exp.status=="0"){
							status = "申請中"
						}else if(exp.status=="1"){
							status = "<font color='green'>承認</font>"
						}else if(exp.status=="2"){
							status ="<font color='red'>却下</font>"
						}
						if(userRoll==="マネージャー"||(userRoll==="メンバー"&&exp.appName==userName)){
						tableElement += '<tr>'
										+'<td>'+exp.expenseId+'</td>'
										+'<td>'+reqDate+'</td>'
										+'<td>'+upDate+'</td>'
										+'<td>'+exp.updateName+'</td>'
										+'<td>'+exp.title+'</td>'
										+'<td>'+exp.amount+'円</td>'
										+'<td>'+status+'</td>'
										+'<td><input type="button" name="'+exp.expenseId+'" value="詳細" class="'+exp.expenseId+'" onclick="location.href = \'/syainSearch/expense/expensedetail.html?expenseId='+exp.expenseId+'\';"></td>'
										+'</tr>';
						}
					}
					$('#expData').append(tableElement);
					tableElement += '</table>';
				$('#button').append('<input type="button" value="新規追加" id="addExp" onclick="location.href = \'/syainSearch/expense/expenseadd.html\';"><br>')
				setButton(userRoll);
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
