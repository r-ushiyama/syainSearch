function setButton(userRoll){
	if(userRoll==="マネージャー"){
		$('#button').append('<input type="button" value="新規追加" id="addDept" onclick="editDept(this.id);"><br>')
	}
	$('#button').append('<input type="button" value="社員情報" id="goSyain" onclick="location.href = \'/syainSearch/syain/syaintable.html\';"><br>')
	$('#button').append('<input type="button" value="経費情報" id="goExp" onclick="location.href = \'/syainSearch/expense/expensetable.html\';"><br>')
	$('#button').append('<input type="button" value="ログアウト" id="logout" onclick="location.href = \'../index.html?request=logout\';">')
}
