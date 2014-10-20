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
	    @Column(name = "ACCTNUM", nullable = false)
	    private long accountId;
	    @Column(name = "ACCTBAL", nullable = false)
	    private double accountbal;
	    @Column(name = "ACCTCREATEDDATE ", nullable = false)
	    private Date createddate;
	    @Column(name = "UNAME ", nullable = false)
	    private String uname;
	    
		public String getUname() {
			return uname;
		}
		public void setUname(String uname) {
			this.uname = uname;
		}
		public long getAccountId() {
			return accountId;
		}
		public void setAccountId(long accountId) {
			this.accountId = accountId;
		}
		public double getAccountbal() {
			return accountbal;
		}
		public void setAccountbal(double accountbal) {
			this.accountbal = accountbal;
		}
		public Date getCreateddate() {
			return createddate;
		}
		public void setCreateddate(Date createddate) {
			this.createddate = createddate;
		}
	    
	
	    
	}
    
    
