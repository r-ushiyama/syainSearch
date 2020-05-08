var userName;
var userRoll;
var userId;
function getUserData() {
	var requestQuery = {};
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
				userName = json.userName
				userId = json.userId
				executeAjax();
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}
	});
}

function executeAjax () {
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
					var Element = '<table id="syainData">'
						+'<th>社員ID</th>'
						+'<th>名前</th>'
					for(var i=0;i<json.length;i++){
						var syain = json[i];
						var syainName = syain.syainName
						Element += '<tr>'
								+'<td>'+syain.syainId+'</td>'
								+'<td>'+syain.syainName+'</td>'
						if(syain.syainId===userId || userRoll==="マネージャー"){
								Element += '<td><input type="button" name="'+syain.syainId+'" value="編集" class="'+syain.syainId+'" onclick="editSyain(this.name);"></td>'
						}
						if(userRoll === "マネージャー"){
								Element +='<td><input type="button" name="'+syain.syainId+'" value="削除" class="'+syain.syainId+'" onclick="deleteSyain(this.name);"></td>'
						}
						Element+='</tr>'
					}
					Element += '</table>';
					$('#userData').append('名前:'+userName+'さん<br>')
					$('#userData').append('役職:'+userRoll+'<br>')
					setButton(userRoll);
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
