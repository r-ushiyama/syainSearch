//パラメータが入力されているか確認
function getparam(){
	//URLから部署IDを取得する。nullの場合は部署の新規作成
	var parameter  = location.search.substring( 1, location.search.length );
	parameter = decodeURIComponent( parameter );
	errorparam = parameter.split('=')[1];
	if(errorparam==0){
		$('#message').html('<font color="00FFFF" size="16">データベースへの登録が完了しました</font>');
	}else if(errorparam==1){
		$('#message').html('<font color="FF0000" size="16">データベースへの登録に失敗しました</font>');
	}else{
		location.href = '/syainSearch/syain/syaintable.html';
	}
}
function gotop(){
	location.href = '/syainSearch/syain/syaintable.html';
}

$(document).ready(function () {

	'use strict';

	//パラメータが入力されているか確認
	getparam();

	// 更新ボタンにイベント設定
	$('#confirm').bind('click',confirm);


});