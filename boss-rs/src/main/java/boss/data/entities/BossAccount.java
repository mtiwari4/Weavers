package boss.data.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
 

@Entity
@Table(name = "BOSS_ACCOUNT")

public class BossAccount {

	@Id
    @Column(name = "account_id", nullable = false)
    private long accountId;
    @Column(name = "account_type", nullable = false)
    private String accountType;
    @Column(name = "balance", nullable = false)
    private double balance ;
    @Column(name = "created_on", nullable=false)
    private Date createdOn;
    @Column(name = "user_id")
    private long userId;
	public long getAccountId() {
		return accountId;
	}
	public void setAccountId(long accountId) {
		this.accountId = accountId;
	}
	public String getAccountType() {
		return accountType;
	}
	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}
	public double getBalance() {
		return balance;
	}
	public void setBalance(double balance) {
		this.balance = balance;
	}
	public Date getCreatedOn() {
		return createdOn;
	}
	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
	}
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId2) {
		this.userId = userId2;
	} 
    
    
}
