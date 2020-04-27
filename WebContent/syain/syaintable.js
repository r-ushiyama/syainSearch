
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
			if(json.length==0){
				$('#userInput').append("登録されている社員がいません");
			}else{
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
									+'<td><input type="button" name="edit" value="編集" id="'+syain.syainId+'" onclick="editSyain(this.id);"></td>'
									+'<td><input type="button" name="delete" value="削除" id="'+syain.syainId+'" onclick="deleteSyain(this.id);"></td>'
									+'</tr>'


				}
				Element += '</table>';
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

}

//ページ読み込み時
$(document).ready(function () {
	'use strict';
	// 初期表示用
	executeAjax();

	// 更新ボタンにイベント設定
	$('#searchBtn').bind('click',executeAjax);
});
