userName = "";
userId = "";
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
				alert("権限がありません");
				location.href = '/syainSearch/login.html';

			}else{
				userRoll = json.userRoll
				userName = json.userName
				inputExp()
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}
	});
}
function confirm(){
	var requestQuery = {
			"Title" : $('#Title').val(),
			"Payee" : $('#Payee').val(),
			"Amount" : $('#Amount').val(),
			"Reason" : $('#Reason').val(),
			"userName" : userName
		}

		if(!$('#Title').val()||!$('#Payee').val()||!$('#Amount').val()||!$('#Reason').val()||isNaN($('#Amount').val())){
			alert("正常に入力されていません")
		}else{
			$.ajax({
				type : 'POST',
				dataType:'json',
				url : '/syainSearch/ExpenseAddServlet',
				data : requestQuery,
				success : function(json) {
					// サーバーとの通信に成功した時の処理
					alert("経費を申請しました");
					location.href = '/syainSearch/expense/expensetable.html';
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
					// サーバーとの通信に失敗した時の処理
					alert('データの通信に失敗しました');
					console.log(errorThrown)
				}
			});
		}
}
function inputExp(){
		var Element='タイトル:<input id="Title" placeholder="文房具の購入" required></br>'
		+'名前:<input id="Payee" placeholder="株式会社○○" required></br>'
		+'金額:<input id="Amount" placeholder="1100" required></br>'
		+'理由:<input type="text" id="Reason" placeholder="会議室に文具を配備するため"></br>'
		$('#expData').append(Element);
		$('#button').append('<input type="button" value="設定" id="confirm" onclick="confirm();"><br>')
		$('#button').append('<input type="button" value="キャンセル" id="cancel" onclick="location.href = \'/syainSearch/expense/expensetable.html\';">')


}
//ページ読み込み時
$(document).ready(function () {
	'use strict';
	// 初期表示用
	getUserData();

});
