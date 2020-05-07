function searchDeptAll(){
	var requestQuery = {
		"request" : "searchAllDept",
		"deptId" : $('#deptSearchAll').val(),
		"deptName" : $('#deptSearchAll').val(),
	}
		$.ajax({
			type : 'GET',
			url : '/syainSearch/DeptServlet',
			dataType : 'json',
			data :requestQuery,
			success : function (json) {
				// DOM操作
				if(json.length==0){
					$('#userInput').html('登録されている部署がありません');
				}else{
					$('#userInput').html('部署一覧：');
					var tableElement = '<table id="deptData">'
						+'<tr>'
						+'<th>ID</th>'
						+'<th>部署名</th>'
						+'</tr>'
						if(userRoll==="マネージャー"){
							for(var i=0;i<json.length;i++){
								var dept = json[i];
								var deptName = dept.deptName
								tableElement += '<tr>'
												+'<td>'+dept.deptId+'</td>'
												+'<td>'+dept.deptName+'</td>'
												+'<td><input type="button" name="'+dept.deptId+'" value="編集" class="'+dept.deptId+'" onclick="editDept(this.name);"></td>'
												+'<td><input type="button" name="'+dept.deptId+'" value="削除" class="'+dept.deptId+'" onclick="deleteDept(this.name);"></td>'
												+'</tr>';
							}
							$('#deptData').html(tableElement);
							tableElement += '</table>';
						}else if(userRoll==="メンバー"){
							for(var i=0;i<json.length;i++){
								var dept = json[i];
								var deptName = dept.deptName
								tableElement+='<tr>'
												+'<td>'+dept.deptId+'</td>'
												+'<td>'+dept.deptName+'</td>'
												+'</tr>'
							}
							$('#deptData').html(tableElement);
							tableElement += '</table>';
						}
				}


			}
		});
}