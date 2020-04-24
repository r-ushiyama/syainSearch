
// 部署一覧表示
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
			console.log(json)


			for(var i=0;i<json.length;i++){
				var syain = json[i];
				var syainName = syain.syainName
				var tableElement='<tr>'
								+'<td>'+syain.syainId+'</td>'
								+'<td>'+syain.syainName+'</td>'
								+'<td><input type="button" name="edit" value="編集" id="'+syain.syainId+'" onclick="editSyain(this.id);"></td>'
								+'<td><input type="button" name="delete" value="削除" id="'+syain.syainId+'" onclick="deleteSyain(this.id);"></td>'
								+'</tr>'
				$('#syainData').append(tableElement);
			}
		}
	});
}

//編集ボタンをクリック、編集ページへ飛ぶ
function editSyain(id_value){
	//押したボタンの部署IDを代入
	var edit_syainId = id_value;

	if(edit_syainId==='addSyain'){
		console.log('新規追加します');
		location.href = '/syainSearch/syain/syainedit.html';
	}else{
		console.log(edit_syainId+' の社員を編集します');
		location.href = '/syainSearch/syain/syainedit.html?syainid='+edit_syainId;

	}

}

//削除ボタンをクリック、即削除
function deleteSyain(id_value){
	//押したボタンの部署IDを代入
	var requestQuery = {
			"syainId" : id_value,
			"request" : "deleteSyain"
	};
	console.log(requestQuery+'の部署を削除します');
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
}

//ページ読み込み時
$(document).ready(function () {
	'use strict';
	// 初期表示用
	executeAjax();

	// 更新ボタンにイベント設定
	$('#searchBtn').bind('click',executeAjax);
});
