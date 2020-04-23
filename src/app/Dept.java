package app;

import java.io.Serializable;

public class Dept implements Serializable {

	//部署ID
	private String deptId;

	//部署名
	private String deptName;


	public String getDeptId() {
		return deptId;
	}

	public void setDeptId(String deptId) {
		this.deptId = deptId;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

}

