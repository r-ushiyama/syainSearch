//都道府県名セレクト
function Pref(syainPref,Element){
	var prefName = [
		'北海道',		'青森県',		'岩手県',		'宮城県',		'秋田県',		'山形県',		'福島県',
		'茨城県',		'栃木県',		'群馬県',		'埼玉県',		'千葉県',		'東京都',		'神奈川県',
		'新潟県',		'富山県',		'石川県',		'福井県',		'山梨県',		'長野県',		'岐阜県',
		'静岡県',		'愛知県',		'三重県',		'滋賀県',		'京都府',		'大阪府',		'兵庫県',
		'奈良県',		'和歌山県',		'鳥取県',		'島根県',		'岡山県',		'広島県',		'山口県',
		'徳島県',		'香川県',		'愛媛県',		'高知県',		'福岡県',		'佐賀県',		'長崎県',
		'熊本県',		'大分県',		'宮崎県',		'鹿児島県',		'沖縄県'
	];
	Element += '<select name="pref" id="pref">'
		+ '<option value="">都道府県選択</option>'
	for(var i=0;i<prefName.length;i++){
		var select = "";
		if(prefName[i]==syainPref){
			var select = "selected";
		}
		Element += '<option value="'+prefName[i]+'" '+select+'>'+prefName[i]+'</option>';
	}
	Element += '</select></br>';
	return Element;
}

function Sex(){
	var Sex = ['男','女'];

}
//社員情報を表示
function setsyainInfo (deptName) {
	var requestQuery = {
			"request" : "setsyainInfo",
			"syainId" : syainId
	};
	'use strict';

	console.dir(requestQuery);

	$.ajax({
		type : 'GET',
		url : '/syainSearch/SyainServlet',
		dataType : 'json',
		data :requestQuery,
		success : function (json) {
			console.log(json);
			var syain = json[0];
			var syainId = syain.syainId
			var syainName = syain.syainName
			var syainAge = syain.syainAge
			var syainSex = syain.syainSex
			var syainDeptId = syain.syainDeptId
			var syainDeptName = syain.syainDeptName
			var syainJoinDate = syain.syainJoinDate
			var syainLeaveDate = syain.LeaveDate
			if(!syainLeaveDate) syainLeaveDate = '';
			var syainZip = syain.syainZip
			var syainPref = syain.syainPrefecture
			var syainAddress = syain.syainAddress
			if(syainSex=="男"){
				var Check_male = 'checked'
			}else if(syainSex=="女"){
				var Check_female = 'checked'
			}

			var Element='社員ID:<input value="'+syainId+'" id="syainId"></br>'
			+'名前:<input value="'+syainName+'" id="syainName"></br>'
			+'年齢:<input value="'+syainAge+'" id="syainAge"></br>'
			+'<div id="check">性別:'
			+'<input type="radio" name="gender" value="'+syainSex+'" id="syainAge" '+Check_male+'>男性'
			+'<input type="radio" name="gender" value="'+syainSex+'" id="syainAge" '+Check_female+'>女性'
			+'</div>'
			+'郵便番号:<input value="'+syainZip+'" id="syainZip"></br>'
			+'都道府県:'
			Element = Pref(syainPref,Element); //都道府県プルダウンメニュー
			Element += '住所:<input value="'+syainAddress+'" id="syainAddress"></br>'
			+'所属:<select name="Dept" id="Dept">'
			for(var i=0;i<deptName.length;i++){
				var getdeptName = deptName[i];
				//初期値設定
				var Select_dept = '';
				if(getdeptName==syainDeptName){
					Select_dept = "selected";
				}
				Element += '<option value="'+getdeptName+'"'+Select_dept+'>'+getdeptName+'</option>';
			}
			Element += '</select></br>'
			+'入社日:<input value="'+syainJoinDate+'" id="syainJoinDate"></br>'
			+'退社日:<input value="'+syainLeaveDate+'" id="syainLeaveDate"></br>'
			$('#syainInfo').append(Element);
		}

	});
}


//部署一覧表示
function getDepttable () {
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
			console.log(json)
			var deptName = [];
			for(var i=0;i<json.length;i++){
				var dept = json[i];
				deptName.push(dept.deptName);
			}
			console.log(deptName);
			setsyainInfo(deptName);
		}
	});
}


//部署の更新と追加
function changeSyain(syainId,inputValue,request){
	var requestQuery = {
			"request" : request,
			"syainId" : syainId,
			"newName" : inputValue
	};
	'use strict';

	console.dir(requestQuery);

	$.ajax({
		type : 'POST',
		url : '/syainSearch/SyainUpdateServlet',
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
function getparam(){
	//URLから部署IDを取得する。nullの場合は部署の新規作成
	var parameter  = location.search.substring( 1, location.search.length );
	parameter = decodeURIComponent( parameter );
	syainId = parameter.split('=')[1];
	console.log(syainId);
	if(!syainId){
		$('#comment').html('<font size="16">社員データを新規作成</font>')
		var Element = ''
	}else{
		getDepttable ();
	}
}


//設定ボタンを押した際に実行
function confirm(){
	var requestQuery = {
		"request" : "updateSyainInfo",
		"syainId" : $('#syainId').val(),
		"syainName" : $('#syainName').val(),
		"syainAge" : $('#syainAge').val(),
		"syainSex" : $('input[name="gender"]:checked').val(),
		"syainPhotoId" : "",
		"syainZip" : $('#syainZip').val(),
		"syainPref" : $("#pref option:selected").text(),
		"syainAddress" : $('#syainAddress').val(),
		"syainDeptName" : $("#Dept option:selected").text(),
		"syainJoinDate" : $('#syainJoinDate').val(),
		"syainLeaveDate" : $('#syainLeaveDate').val()
	}
	if(!$('#syainId').val()||!$('#syainName').val()||!$('#syainAge').val()||
			!$('input[name="gender"]:checked').val()||!$('#syainZip').val()||
			!$("#pref option:selected").text()||!$('#syainAddress').val()||
			!$("#Dept option:selected").text()||!$('#syainJoinDate').val()){
		alert("正常に入力されていません")
	}else{
		'use strict';

		console.dir(requestQuery);

		$.ajax({
			type : 'POST',
			url : '/syainSearch/SyainUpdateServlet',
			dataType : 'json',
			data :requestQuery,
			success : function (json) {//正常にアップデートできた際
				//alert(json);
				location.href = '/syainSearch/syain/done.html?error=0';
			},
			error: function (json) { //エラーが発生した際
				location.href = '/syainSearch/syain/done.html?error=1';
			}

		});
	}



	/*
	if(!inputValue){
		alert("何も入力されていません");
	}else{

		if(!syainId){
			var request = "createSyain"
			changeSyain(syainId,inputValue,request);
			//console.log("部署を新規作成します")
		}else{
			var request = "updateSyain"
			changeSyain(syainId,inputValue,request);
			//console.log("部署名を編集します")
		}
	}
	*/

}

function cancel(){
	location.href = '/syainSearch/syain/syaintable.html';
}
$(document).ready(function () {

	'use strict';

	//パラメータが入力されているか確認
	getparam();

	// 設定ボタン
	$('#confirm').bind('click',confirm);


});