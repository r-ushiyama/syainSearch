//部署をプルダウンメニューとして表示
function Dept(deptName,Element){
	Element += '所属:<select name="Dept" id="Dept">'
		+'<option value="none">未指定</option>';
	for(var i=0;i<deptName.length;i++){
		var getdeptName = deptName[i];
		Element += '<option value="'+getdeptName+'">'+getdeptName+'</option>'
	}
	Element += '</select></br>'
	return Element;
}

//社員ID、氏名の入力ボックスを表示
function createInputbox() {
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
			var deptName = [];
			for(var i=0;i<json.length;i++){
				var dept = json[i];
				deptName.push(dept.deptName);
			}
			var Element = '';
			Element = Dept(deptName,Element);
			Element += '社員ID：<input type="text" id="syainId" placeholder="EMP0001"><br>'
					+'名前に含む文字：<input type="text" id="syainName" placeholder="田中太郎">'
			$('#userInput').append(Element);
		}
	});
}

//社員を検索
function searchSyain(){
	var syainDeptName = $("#Dept option:selected").text()
	if(syainDeptName==="未指定"){
		syainDeptName = "";
	}
	var requestQuery = {
		"request" : "searchSyain",
		"syainId" : $('#syainId').val(),
		"syainName" : $('#syainName').val(),
		"syainDeptName" : syainDeptName
	}

	$.ajax({
		type : 'GET',
		url : '/syainSearch/SyainServlet',
		dataType : 'json',
		data :requestQuery,
		success : function (json) {
			// DOM操作
			console.log(json)
			$('#userInput').html('');
			if(json.length==0){
				$('#userInput').append('登録されている社員がいません');
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
						+'</tr>'

				}
				$('#userInput').append(Element);
				$('#searchSyain').attr({'value': '再検索','onclick':'reload()'});
				//$('#search').append(research);
				Element += '</table>'
				//console.log(Element);
				$('#comment').html("社員一覧：")
			}


		}
	});
}

//リロード
function reload(){
	location.href = '/syainSearch/syain/syainsearch.html'
}

//キャンセル
function cancel(){
	location.href = '/syainSearch/syain/syaintable.html';
}

$(document).ready(function () {

	'use strict';

	//パラメータが入力されているか確認
	createInputbox();


});