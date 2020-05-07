function searchSyainAll(){
	var syainDeptName = $("#Dept option:selected").text()
	if(syainDeptName==="未指定"){
		syainDeptName = "";
	}
	var requestQuery = {
		"request" : "searchAllSyain",
		"searchData" : $('#syainSearchAll').val(),
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
					if(userRoll=="マネージャー"){
					Element += '<tr>'
						+'<td>'+syain.syainId+'</td>'
						+'<td>'+syain.syainName+'</td>'
						+'<td><input type="button" name="'+syain.syainId+'" value="編集" class="'+syain.syainId+'" onclick="editSyain(this.name);"></td>'
						+'<td><input type="button" name="'+syain.syainId+'" value="削除" class="'+syain.syainId+'" onclick="deleteSyain(this.name);"></td>'
						+'</tr>'
					}else if(userRoll=="メンバー")
						Element += '<tr>'
							+'<td>'+syain.syainId+'</td>'
							+'<td>'+syain.syainName+'</td>'
							if(syain.syainId===userId){
								Element += '<td><input type="button" name="'+syain.syainId+'" value="編集" class="'+syain.syainId+'" onclick="editSyain(this.name);"></td>'
							}
							Element += '</tr>'
				}
				$('#syainData').html(Element);
				$('#search').attr({'value': '再検索','onclick':'reload()'});
				//$('#search').append(research);
				Element += '</table>'
				//console.log(Element);
				$('#comment').html("社員一覧：")
			}
		}
	});
}