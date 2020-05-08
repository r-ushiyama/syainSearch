userName = "";
var userRoll;
function confirm(expId){
	var requestQuery = {
			"userName":userName,
			"expId":expId,
			"request":"confirm"
	};
	// サーバーからデータを取得する
	$.ajax({
		type : 'POST',
		dataType:'json',
		url : '/syainSearch/ExpenseYesOrNoServlet',
		data : requestQuery,
		success : function(json) {
			// サーバーとの通信に成功した時の処理
			alert("承認しました");
			location.href = '/syainSearch/expense/expensedetail.html?expenseId='+expId+'';
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}
	});
}

function deny(expId){
	if(!$('#deny_reason').val()){
		alert("却下の理由を入力してください")
	}else{
		var requestQuery = {
				"userName":userName,
				"expId":expId,
				"request":"deny",
				"deny_reason" : $('#deny_reason').val()
		};
		// サーバーからデータを取得する
		$.ajax({
			type : 'POST',
			dataType:'json',
			url : '/syainSearch/ExpenseYesOrNoServlet',
			data : requestQuery,
			success : function(json) {
				// サーバーとの通信に成功した時の処理
				alert("却下しました");
				location.href = '/syainSearch/expense/expensedetail.html?expenseId='+expId+'';
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				// サーバーとの通信に失敗した時の処理
				alert('データの通信に失敗しました');
				console.log(errorThrown)
			}
		});
	}
}
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
			userName = json.userName;
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
	var parameter  = location.search.substring( 1, location.search.length );
	parameter = decodeURIComponent( parameter );
	expId = parameter.split('=')[1];
	'use strict';
	var requestQuery = {"expId":expId};
	$.ajax({
		type : 'GET',
		url : '/syainSearch/GetExpenseServlet',
		dataType : 'json',
		data :requestQuery,
		success : function (json) {
			if(json.appName!=userName&&userRoll!="マネージャー"){
				alert("権限がありません");
				location.href = '/syainSearch/index.html';

			}else{
				var tableElement = '<table id="expData">'
					+'<tr>'
					+'<th>申請ID</th>'
					+'<th>申請日</th>'
					+'<th>更新日</th>'
					+'<th>申請者</th>'
					+'<th>タイトル</th>'
					+'<th>支払い先</th>'
					+'<th>金額</th>'
					+'<th>理由</th>'
					+'<th>ステータス</th>'
					+'<th>更新者名</th>'
				for(var i=0;i<json.length;i++){
					var exp = json[i];
					var upDate = exp.updateDate.substring(0, 10)
					var reqDate = exp.reqDate.substring(0, 10)
					var status= "";
					if(exp.status=="0"){
						status = "申請中"
					}else if(exp.status=="1"){
						status = "<font color='green'>承認</font>"
					}else if(exp.status=="2"){
						status ="<font color='red'>却下</font>"
						tableElement += '<th>却下理由</th>'
							+'</tr>'
					}

					tableElement += '<tr>'
						+'<td>'+exp.expenseId+'</td>'
						+'<td>'+reqDate+'</td>'
						+'<td>'+upDate+'</td>'
						+'<td>'+exp.appName+'</td>'
						+'<td>'+exp.title+'</td>'
						+'<td>'+exp.payee+'</td>'
						+'<td>'+exp.amount+'円</td>'
						+'<td>'+exp.reason+'</td>'
						+'<td>'+status+'</td>'
						+'<td>'+exp.updateName+'</td>'
						if(exp.status=="2"){
							status ="<font color='red'>却下</font>"
							tableElement += '<td>'+exp.denyReason+'</td>'
						}
						tableElement +='</tr>';
				}
				tableElement += '</table>';
				$('#expData').append(tableElement);
				if(userRoll==="マネージャー"){
					$('#expData').append('<input type="text" value="" placeholder="却下理由を入力" id="deny_reason" minlength="1" maxlength="16"><br>')
					$('#expData').append('<input type="button" name="'+exp.expenseId+'" value="承認" class="'+exp.expenseId+' Yes" onclick="confirm(this.name)">')
					$('#expData').append('<input type="button" name="'+exp.expenseId+'" value="却下" class="'+exp.expenseId+' No" onclick="deny(this.name)"><br>')
				}
				$('#button').append('<input type="button" value="戻る" id="back" onclick="location.href = \'/syainSearch/expense/expensetable.html\';"><br>')
			}


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
