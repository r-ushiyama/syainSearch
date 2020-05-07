setTimeout(function(){
	window.location.href = '/syainSearch/department/depttable.html';
}, 5*1000);
//パラメータが入力されているか確認
function getparam(){
	//URLから部署IDを取得する。nullの場合は部署の新規作成
	var parameter  = location.search.substring( 1, location.search.length );
	parameter = decodeURIComponent( parameter );
	errorparam = parameter.split('=')[1];
	if(errorparam==0){
		$('#message').html('<font color="00FFFF" size="6">データベースへの登録が完了しました</font><br>5秒後に指定のページに移動します');
		setTimeout();
	}else if(errorparam==1){
		$('#message').html('<font color="FF0000" size="6">データベースへの登録に失敗しました</font><br>5秒後に指定のページに移動します');
		setTimeout();
	}else{
		location.href = '/syainSearch/department/depttable.html';
	}
}

//部署トップへ

$(document).ready(function () {

	'use strict';

	//パラメータが入力されているか確認
	getparam();

});