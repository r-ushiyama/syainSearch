package expense;

public class Expense {
	private String ExpenseId;
	private String reqDate;
	private String appName;
	private String Title;
	private String Payee;
	private String Amount;
	private String updateDate;
	private String updateName;
	private String Status;
	private String Reason;
	private String denyReason;
	public String getExpenseId() {
		return ExpenseId;
	}
	public void setExpenseId(String expenseId) {
		ExpenseId = expenseId;
	}
	public String getReqDate() {
		return reqDate;
	}
	public void setReqDate(String reqDate) {
		this.reqDate = reqDate;
	}
	public String getAppName() {
		return appName;
	}
	public void setAppName(String appName) {
		this.appName = appName;
	}
	public String getTitle() {
		return Title;
	}
	public void setTitle(String title) {
		Title = title;
	}
	public String getPayee() {
		return Payee;
	}
	public void setPayee(String payee) {
		Payee = payee;
	}
	public String getAmount() {
		return Amount;
	}
	public void setAmount(String amount) {
		Amount = amount;
	}
	public String getUpdateDate() {
		return updateDate;
	}
	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
	}
	public String getUpdateName() {
		return updateName;
	}
	public void setUpdateName(String updateName) {
		this.updateName = updateName;
	}
	public String getStatus() {
		return Status;
	}
	public void setStatus(String status) {
		Status = status;
	}
	public String getReason() {
		return Reason;
	}
	public void setReason(String reason) {
		Reason = reason;
	}
	public String getDenyReason() {
		return denyReason;
	}
	public void setDenyReason(String denyReason) {
		this.denyReason = denyReason;
	}

}
