var loginInfo;
function getParam(){
	var parameter  = location.search.substring( 1, location.search.length );
	parameter = decodeURIComponent( parameter );
	parameter = parameter.split('=')[1];
	if(parameter==="logout"){
		logout();
	}else{
		getUserData();
	}
}
/* ログインファンクション */
function getUserData() {

	// 入力されたユーザーIDとパスワード
	var requestQuery = {"loginRequest":"login"};
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
				$('#syainId').html('ようこそ'+json.userName+'さん<br>');
				$('#syainId').append('あなたの役職は「'+json.userRoll+'」です');
				var Element = '<input type="button" value="社員情報" id="goSyain" onclick="location.href = \'/syainSearch/syain/syaintable.html\';"><br>'
					+'<input type="button" value="部署情報" id="goDept" onclick="location.href = \'/syainSearch/department/depttable.html\';"><br>'
					+'<input type="button" value="経費情報" id="goExp" onclick="location.href = \'/syainSearch/expense/expensetable.html\';"><br>'
					+'<input type="button" value="ログアウト" id="logout" onclick="logout()">'
				$('#button').append(Element);
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}
	});
}

function logout() {
	// 入力されたユーザーIDとパスワード
	var requestQuery = {"loginRequest":"logout"};
	// サーバーからデータを取得する
	$.ajax({
		type : 'POST',
		dataType:'json',
		url : '/syainSearch/GetLoginInfoServlet',
		data : requestQuery,
		success : function(json) {
			// サーバーとの通信に成功した時の処理
			console.dir(json)
			location.href = '/syainSearch/login.html'
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}
	});
}


/**
 * 読み込み時の動作
 */
$(document).ready(function() {

	// ログインボタンを押したときのイベント
	getParam();



});
