

//社員情報内に都道府県名をセット
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
	Element += '都道府県:<select name="pref" id="pref">'
	for(var i=0;i<prefName.length;i++){
		var select = "";
		if(prefName[i]==syainPref){
			select = "selected";
		}else if(prefName[i]==="東京都"){
			select = "selected"
		}
		Element += '<option value="'+prefName[i]+'" '+select+'>'+prefName[i]+'</option>';
	}
	Element += '</select></br>';
	return Element;
}

//社員情報内に性別をセット
function Sex(syainSex,Element){
	var Sex = ['男','女'];
	Element += '<div id="check">性別:'
	for(var i=0; i<Sex.length;i++){
		var Check = ""
		if(Sex[i]===syainSex){
			Check = "checked"
		}
		Element += '<input type="radio" name="gender" value="'+Sex[i]+'" id="syainSex" '+Check+' required>'+Sex[i]+''

	}
	Element += '</div>'
	return Element;

}

//社員情報内に部署をセット
function Dept(syainDeptName,deptName,Element){
	Element += '所属:<select name="Dept" id="Dept">';
	for(var i=0;i<deptName.length;i++){
		var getdeptName = deptName[i];
		var Select_dept = "";
		if(getdeptName==syainDeptName){
			Select_dept = "selected";
		}
		Element += '<option value="'+getdeptName+'"'+Select_dept+'>'+getdeptName+'</option>'
	}
	Element += '</select></br>'
	return Element;
}

//社員情報を表示(編集)
function setsyainInfo(deptName) {
	var requestQuery = {
			"request" : "setsyainInfo",
			"syainId" : syainId
	};
	'use strict';
	$.ajax({
		type : 'GET',
		url : '/syainSearch/SyainServlet',
		dataType : 'json',
		data :requestQuery,
		success : function (json) {
			var syain = json[0];
			var syainId = syain.syainId
			var syainName = syain.syainName
			var syainAge = syain.syainAge
			var syainSex = syain.syainSex
			var syainDeptId = syain.syainDeptId
			var syainDeptName = syain.syainDeptName
			var syainJoinDate = syain.syainJoinDate
			syainJoinDate = syainJoinDate.substr( 0, 10 );
			var syainLeaveDate = syain.LeaveDate
			if(!syainLeaveDate) syainLeaveDate = '';
			syainLeaveDate = syainLeaveDate.substr( 0, 10 );
			var syainZip = syain.syainZip
			var syainPref = syain.syainPrefecture
			var syainAddress = syain.syainAddress

			var Element='社員ID:<input value="'+syainId+'" id="syainId" placeholder="EMP0001" required></br>'
			+'名前:<input value="'+syainName+'" id="syainName" placeholder="田中太郎" required></br>'
			+'年齢:<input value="'+syainAge+'" id="syainAge" placeholder="20" required></br>';
			Element = Sex(syainSex,Element); //社員ラジオボタン
			Element += '郵便番号:<input value="'+syainZip+'" id="syainZip" placeholder="100-1000" required></br>'

			Element = Pref(syainPref,Element); //都道府県プルダウンメニュー
			Element += '住所:<input value="'+syainAddress+'" id="syainAddress" placeholder="千代田区" required></br>'
			Element = Dept(syainDeptName,deptName,Element);
			Element += '入社日:<input value="'+syainJoinDate+'" id="syainJoinDate" placeholder="2000-04-01" required></br>'
			+'退社日:<input value="'+syainLeaveDate+'" id="syainLeaveDate" placeholder="2000-04-01"></br>'
			$('#syainInfo').append(Element);

		}

	});
}

//部署一覧取得
function getDepttable(req) {
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
			if(req==="add"){
				inputSyainInfo(deptName)
			}else if(req==="edit"){
				setsyainInfo(deptName);
			}

		}
	});
}

//社員情報入力(新規追加)
function inputSyainInfo(deptName){
	var syainSex="";
	var syainPref="";
	var syainDeptName="";
	var Element='社員ID:<input id="syainId" placeholder="EMP0001" required></br>'
	+'名前:<input id="syainName" placeholder="田中太郎" required></br>'
	+'年齢:<input id="syainAge" placeholder="20" required></br>';
	Element = Sex(syainSex,Element); //社員ラジオボタン
	Element += '郵便番号:<input id="syainZip" placeholder="100-1000" required></br>'
	Element = Pref(syainPref,Element); //都道府県プルダウンメニュー
	Element += '住所:<input id="syainAddress" placeholder="千代田区" required></br>'
	Element = Dept(syainDeptName,deptName,Element);
	Element += '入社日:<input id="syainJoinDate" placeholder="2000-04-01" required></br>'
	+'退社日:<input id="syainLeaveDate" placeholder="2000-04-01"></br>'
	$('#syainInfo').append(Element);

}

//URLパラメータを取得
function getparam(){
	//URLから部署IDを取得する。nullの場合は部署の新規作成
	var parameter  = location.search.substring( 1, location.search.length );
	parameter = decodeURIComponent( parameter );
	syainId = parameter.split('=')[1];
	if(!syainId){
		$('#comment').html('<font size="16">社員データを新規作成</font>')
		var req="add"
		getDepttable(req);
	}else{
		var req="edit"
		getDepttable(req);
	}
}


//設定ボタンを押した際に実行
function confirm(){
	var parameter  = location.search.substring( 1, location.search.length );
	parameter = decodeURIComponent( parameter );
	syainId = parameter.split('=')[1];

	if(!syainId){
		var request = "createSyain"
	}else{
		var request = "updateSyainInfo"
	}

	var requestQuery = {
		"request" : request,
		"oldsyainId" : syainId,
		"newsyainId" : $('#syainId').val(),
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
		$.ajax({
			type : 'POST',
			url : '/syainSearch/SyainUpdateServlet',
			dataType : 'json',
			data :requestQuery,
			success : function (json) {//正常にアップデートできた際
				location.href = '/syainSearch/syain/done.html?error=0';
			},
			error: function (json) { //エラーが発生した際
				location.href = '/syainSearch/syain/done.html?error=1';
			}

		});
	}

}

//キャンセル
function cancel(){
	location.href = '/syainSearch/syain/syaintable.html';
}

$(document).ready(function () {

	'use strict';

	//パラメータが入力されているか確認
	getparam();


});