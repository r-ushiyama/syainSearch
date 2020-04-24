//部署の名前をHTMLにセットする
function setdeptName () {
	var requestQuery = {
			"request" : "setdeptName",
			"deptId" : deptId
	};
	'use strict';
	// --------------- TODO 編集ここから---------------

	console.dir(requestQuery);

	$.ajax({
		type : 'GET',
		url : '/syainSearch/DeptServlet',
		dataType : 'json',
		data :requestQuery,
		success : function (json) {
			var dept = json[0];
			var deptName = dept.deptName;
			$('#comment').html('<font size="16">'+deptName+'の名前を変更</font>')
		}

	});
	// ---------------ここまで---------------
}

//部署の更新と追加
function changeDept(deptId,inputValue,request){
	var requestQuery = {
			"request" : request,
			"deptId" : deptId,
			"newName" : inputValue
	};
	'use strict';

	console.dir(requestQuery);

	$.ajax({
		type : 'POST',
		url : '/syainSearch/DeptUpdateServlet',
		dataType : 'json',
		data :requestQuery,
		success : function (json) {
			//alert(json);
			location.href = '/syainSearch/department/done.html';
		}

	});
}

//パラメータが入力されているか確認
function getparam(){
	//URLから部署IDを取得する。nullの場合は部署の新規作成
	var parameter  = location.search.substring( 1, location.search.length );
	parameter = decodeURIComponent( parameter );
	deptId = parameter.split('=')[1];

	if(!deptId){
		$('#comment').html('<font size="16">部署データを新規作成</font>')
	}else{
		setdeptName();
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
			console.log("部署を新規作成します")
		}else{
			var request = "updateDept"
			changeDept(deptId,inputValue,request);
			console.log("部署名を編集します")
		}
	}

}

function cancel(){
	location.href = '/syainSearch/department/depttable.html';
}
$(document).ready(function () {

	'use strict';

	//パラメータが入力されているか確認
	getparam();

	// 更新ボタンにイベント設定
	$('#confirm').bind('click',confirm);


});