package syain;

import java.io.Serializable;

public class Syain implements Serializable {

	//ID
	private String syainId;
	//名前
	private String syainName;
	//年齢
	private int syainAge;
	//性別
	private String syainSex;
	//写真ID
	private String syainPhotoId;
	//住所
	private String syainAddress;
	//部署ID
	private String syainDeptId;

	public String getSyainId() {
		return syainId;
	}
	public void setSyainId(String syainId) {
		this.syainId = syainId;
	}
	public String getSyainName() {
		return syainName;
	}
	public void setSyainName(String syainName) {
		this.syainName = syainName;
	}
	public int getSyainAge() {
		return syainAge;
	}
	public void setSyainAge(int syainAge) {
		this.syainAge = syainAge;
	}
	public String getSyainSex() {
		return syainSex;
	}
	public void setSyainSex(String syainSex) {
		this.syainSex = syainSex;
	}
	public String getSyainPhotoId() {
		return syainPhotoId;
	}
	public void setSyainPhotoId(String syainPhotoId) {
		this.syainPhotoId = syainPhotoId;
	}
	public String getSyainAddress() {
		return syainAddress;
	}
	public void setSyainAddress(String syainAddress) {
		this.syainAddress = syainAddress;
	}
	public String getSyainDeptId() {
		return syainDeptId;
	}
	public void setSyainDeptId(String syainDeptId) {
		this.syainDeptId = syainDeptId;
	}


}

