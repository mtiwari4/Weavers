package boss.data.entities;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "BOSS_EXT_TRANSACTION")

public class BossExtTransaction 
{
		@Id
	    @Column(name = "TRANSID", nullable = false)
	    private long transid;
	    @Column(name = "TRANSTYPE", nullable = false)
	    private String transtype;
	    @Column(name = "TRANSAMT ", nullable = false)
	    private double transamt ;
	    @Column(name = "TRANSDESC ", nullable = false)
	    private String transdesc ;
	    @Column(name = "TRANSSTATUS ", nullable = false)
	    private String transstatus ;
	    @Column(name = "TRANSFROM ", nullable = false)
	    private long transfrom ;
	    @Column(name = "TRANSTO ", nullable = false)
	    private long transto ;
	    @Column(name = "TRANSDATE ", nullable = false)
	    private Date transdate ;
	    
	    @Column(name = "UNAME ", nullable = false)
	    private String username ;
	    
	    
		public String getUsername() {
			return username;
		}
		public void setUsername(String username) {
			this.username = username;
		}
		public long getTransid() {
			return transid;
		}
		public void setTransid(long transid) {
			this.transid = transid;
		}
		public String getTranstype() {
			return transtype;
		}
		public void setTranstype(String transtype) {
			this.transtype = transtype;
		}
		public double getTransamt() {
			return transamt;
		}
		public void setTransamt(double transamt) {
			this.transamt = transamt;
		}
		public String getTransdesc() {
			return transdesc;
		}
		public void setTransdesc(String transdesc) {
			this.transdesc = transdesc;
		}
		public String getTransstatus() {
			return transstatus;
		}
		public void setTransstatus(String transstatus) {
			this.transstatus = transstatus;
		}
		public long getTransfrom() {
			return transfrom;
		}
		public void setTransfrom(long accid) {
			this.transfrom = accid;
		}
		public long getTransto() {
			return transto;
		}
		public void setTransto(long transto) {
			this.transto = transto;
		}
		public Date getTransdate() {
			return transdate;
		}
		public void setTransdate(java.util.Date date) {
			this.transdate = date;
		}
   

	
}
