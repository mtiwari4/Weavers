package boss.data.repositories;
import org.hibernate.Query;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.sql.*;
import java.util.Date;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import boss.data.entities.BossAccount;
import boss.data.entities.BossExtTransaction;
import boss.data.entities.BossUser;

@Repository
public class  BossUserRepository{
	//private static final Logger log = LoggerFactory
		//	.getLogger(BossUserRepository.class);

	@Value("test")
	protected String tableSchema;

	@Autowired
	private SessionFactory sessionFactory;
	
	public BossUserRepository() {
	
	}

	public Map<String, Object> addUser(EntityManager em, BossUser userDetails,boolean isEntityExists) {
		Map<String, Object> returnMap = new HashMap<String, Object>();

		try {
			EntityTransaction tx = em.getTransaction();
			try {
				tx.begin();
				if (isEntityExists) {
					
				} else {
					em.persist(userDetails);
				}
				tx.commit();
				returnMap.remove("result");
				returnMap.put("result", true);
				returnMap.put("userDetails",userDetails );
			} catch (Exception e) {
				return returnMap;
			} finally {
				if (tx.isActive())
					tx.rollback();
			}
		} finally {
		}
		return returnMap;
	}
	
	
	public  int saveNewCustomer(String lastName,String firstName, String pwd, String pwdSalt,String address, String emailID, String contactNumber,char customerType){

		Session session = null;
		Transaction transaction = null;
		try {
			session = sessionFactory.getCurrentSession();
			transaction = session.beginTransaction();
		} catch (HibernateException  e1) {
			e1.printStackTrace();
		};

       // long userId =  UUID.randomUUID().getMostSignificantBits();
		

				BossUser customerEntity = new BossUser();
				//customerEntity.setId(userId);
				
				customerEntity.setEmail(emailID);
				
                
				try {

					session.save(customerEntity);
					
                    long accountNo = UUID.randomUUID().getMostSignificantBits();;
					BossAccount accountEntity = new BossAccount();
					accountEntity.setAccountId(accountNo);
					//accountEntity.setAccountType("SAVINGS");
					//accountEntity.setUserId(userId);
					//accountEntity.setBalance(5000);
				

					transaction = session.beginTransaction();
					session.save(customerEntity);
					session.save(accountEntity);
					transaction.commit();
					
				} catch (Exception e) {
					e.printStackTrace();
					transaction.rollback();
					return 0;
				}
				finally {
					session.flush();
					session.close();
				}
			
		
		return 0;
	}

/*
----------------------------------------------	
External User View Account Details
Author:Praneeth
-----------------------------------------------
*/
@SuppressWarnings("unchecked")
@Transactional
public synchronized List<BossAccount> viewaccountdetails(String username)
{
	
	Session session = this.sessionFactory.openSession();

	String hib = "FROM BossAccount WHERE UNAME = :username";	

	org.hibernate.Query que = session.createQuery(hib);

	que.setParameter("username", username);

	List<BossAccount> results = que.list();

	return results;
}

/*
----------------------------------------------	
External User View Profile Details
Author:Praneeth
-----------------------------------------------
*/
@SuppressWarnings("unchecked")
@Transactional
public synchronized List<BossUser> viewprofiledetails(String username)
{
	
	Session session = this.sessionFactory.openSession();

	String hib = "FROM BossUser WHERE UNAME = :username";

	org.hibernate.Query que = session.createQuery(hib);
	
	que.setParameter("username", username);

	List<BossUser> results = que.list();

	return results;
}

/*
----------------------------------------------	
External User View Transaction Details
Author:Praneeth
-----------------------------------------------
*/

@SuppressWarnings("unchecked")
@Transactional
public synchronized List<BossExtTransaction> viewtransactiondetails(String username)
{
	
	Session session = this.sessionFactory.openSession();

	String hib = "FROM BossExtTransaction WHERE UNAME = :username";

	org.hibernate.Query que = session.createQuery(hib);
	
	que.setParameter("username", username);

	List<BossExtTransaction> results = que.list();

	return results;
}

/*
----------------------------------------------	
External User Credit Function
Author:Praneeth
-----------------------------------------------
*/

@SuppressWarnings("unchecked")
@Transactional
public synchronized boolean credit(double amount,String username)
{
	boolean status=false;
	
	Session session = this.sessionFactory.getCurrentSession();
			
	String hib = "FROM BossAccount WHERE UNAME = :username";

	Query que = session.createQuery(hib);
	
	que.setParameter("username", username);
	
	List<BossAccount> userList = que.list();
	
	BossAccount accnts = userList.get(0);

	double oldbal=accnts.getAccountbal();
			
	double total=amount+oldbal;
	
	String hibs = "UPDATE BossAccount set ACCTBAL =:Balances WHERE UNAME =:Username";
	
	que = session.createQuery(hibs);
	
	que.setParameter("Balances",total);
	
	que.setParameter("Username",username);

	int result = que.executeUpdate();
	
			
	if (result==1)
	{
		status=true;
		
	}
	else
	
	status=false;
				
return status;
	}

/*
----------------------------------------------	
External User Credit Transaction
Author:Praneeth
-----------------------------------------------
*/

@SuppressWarnings("unchecked")
public synchronized boolean saveTranscredit(double amount,String username,String status)
{
	boolean b=true;
	
	Session session = this.sessionFactory.openSession();
	
	session.beginTransaction();
	
	String hib = "FROM BossAccount WHERE UNAME =:use";
		
	Query que = session.createQuery(hib);
	
	que.setParameter("use", username);
	
	List<BossAccount> userList = que.list();
	
	BossAccount accnts = userList.get(0);
	
	long accid=accnts.getAccountId();
	
	BossExtTransaction bet=new BossExtTransaction();
	
	bet.setTransamt(amount);
	
	bet.setTransdate(new Date());
	
	bet.setTransdesc("Credited money");
	
	bet.setTransfrom(accid);
	
	bet.setTransto(accid);
	
	bet.setTranstype("money");
	
	bet.setUsername(username);
	
	bet.setTransstatus(status);
	
	session.save(bet);
	
	session.getTransaction().commit();
	
	return b;
}

/*
----------------------------------------------	
External User Debit Transaction
Author:Praneeth
-----------------------------------------------
*/

@SuppressWarnings("unchecked")
@Transactional
public synchronized boolean saveTransdebit(double amount,String username,String status)
{
boolean b=true;
	
	Session session = this.sessionFactory.openSession();
	
	session.beginTransaction();
	
	String hib = "FROM BossAccount WHERE UNAME =:use";
		
	Query que = session.createQuery(hib);
	
	que.setParameter("use", username);
	
	List<BossAccount> userList = que.list();
	
	BossAccount accnts = userList.get(0);
	
	long accid=accnts.getAccountId();
	
	BossExtTransaction bet=new BossExtTransaction();
	
	bet.setTransamt(amount);
	
	bet.setTransdate(new Date());
	
	bet.setTransdesc("Debited money");
	
	bet.setTransfrom(accid);
	
	bet.setTransto(accid);
	
	bet.setTranstype("money");
	
	bet.setUsername(username);
	
	bet.setTransstatus(status);
	
	session.save(bet);
	
	session.getTransaction().commit();
	
	return b;	
}


/*
----------------------------------------------	
External User Debit Function
Author:Praneeth
-----------------------------------------------
*/

@SuppressWarnings("unchecked")
@Transactional
public synchronized boolean debit(double amount,String username)
{
	boolean status=false;
	
	Session session = this.sessionFactory.getCurrentSession();
	
	String hib = "FROM BossAccount WHERE UNAME = :username";

	Query que = session.createQuery(hib);
	
	que.setParameter("username", username);
	
	List<BossAccount> userList = que.list();
	
	BossAccount accnts = userList.get(0);

	double oldbal=accnts.getAccountbal();
		
	double total=oldbal-amount;
	
	String hibs = "UPDATE BossAccount set ACCTBAL =:Balances WHERE UNAME =:username";
	
	que = session.createQuery(hibs);
	
	que.setParameter("Balances",total);
	
	que.setParameter("username",username);

	int result = que.executeUpdate();
	
	if (result==1)
	{
		status=true;
	}
	
	else
	
		status=false;
	
return status;
	}

/*
----------------------------------------------	
External User Funds Transfer
Author:Praneeth
-----------------------------------------------
*/

@SuppressWarnings("unchecked")
@Transactional
public synchronized boolean fundtransfer(long account,double amount,String username)
{
	
	boolean status=false;
	
	Session session = this.sessionFactory.getCurrentSession();
	
	String boss4 = "FROM BossAccount WHERE UNAME = :username";

	Query que = session.createQuery(boss4);
	
	que.setParameter("username", username);
	
	List<BossAccount> userList = que.list();
	
	BossAccount accnts = userList.get(0);

	double fromaccount=accnts.getAccountbal();
			
	String boss2 = "FROM BossAccount WHERE ACCTNUM = :account";
	
	que = session.createQuery(boss2);
	
	que.setParameter("account",account);
	
	List<BossAccount> accountList = que.list();
	
	BossAccount accnt = accountList.get(0);
	
	double toaccount=accnt.getAccountbal();
	
	double fromamount=fromaccount-amount;
	
	double toamount=toaccount+amount;
	
	String boss = "UPDATE BossAccount set ACCTBAL =:Balances WHERE UNAME =:Username";
	
	que = session.createQuery(boss);
	
	que.setParameter("Balances",fromamount);
	
	que.setParameter("Username",username);

	int result1 = que.executeUpdate();
	
	String boss5 = "UPDATE BossAccount set ACCTBAL =:Balances WHERE ACCTNUM = :account";
	
	que = session.createQuery(boss5);
	
	que.setParameter("Balances",toamount);
	
	que.setParameter("account",account);

	int result2 = que.executeUpdate();
	
	
	if (result1==1 && result2==1)
	{
		status=true;
	}
	else
		status=false;
	
return status;
}

/*
----------------------------------------------	
External User Funds Transfer Transactions
Author:Praneeth
-----------------------------------------------
*/

@SuppressWarnings("unchecked")
@Transactional
public synchronized boolean transactionFunds(long account,double amount,String name,String status)
{
	boolean b=true;
	
	Session session=this.sessionFactory.openSession();
	
	session.beginTransaction();
	
	String hq="FROM BossAccount WHERE UNAME  =:name";
	
	Query que=session.createQuery(hq);
	
	que.setParameter("name",name);
		
	List<BossAccount> userList = que.list();
	
	BossAccount accnts = userList.get(0);
	
	long fromaccntnum=accnts.getAccountId();
	
	long toaccntnum=account;
	
	BossExtTransaction bet=new BossExtTransaction();
	
	bet.setTransamt(amount);
	
	bet.setTransdate(new Date());
	
	bet.setTransdesc("Transfer");
	
	bet.setTransfrom(fromaccntnum);
	
	bet.setTransto(toaccntnum);
	
	bet.setUsername(name);
	
	bet.setTransstatus(status);
	
	bet.setTranstype("money");
	
	session.save(bet);
	
	session.getTransaction().commit();
		
	return b;
}

}