package boss.data.repositories;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.StringWriter;
import java.math.BigDecimal;
import java.sql.Clob;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.FlushModeType;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.xml.stream.XMLStreamException;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.ejb.QueryImpl;
import org.hibernate.internal.SQLQueryImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import boss.data.entities.BossAccount;
import boss.data.entities.BossUser;
import com.fasterxml.jackson.databind.ObjectMapper;

//@Component
@Repository
public class  BossUserRepository{
	private static final Logger log = LoggerFactory
			.getLogger(BossUserRepository.class);

	@Value("test")
	protected String tableSchema;

	//@Autowired
    //private BossUser userDetails;
	//@Autowired
	//private EntityObjectMapper mapper;
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

        long userId =  UUID.randomUUID().getMostSignificantBits();
		//int userID = LoginDbManager.generateUserID();

		//if(LoginDbManager.createLoginDetails(userID, pwd, pwdSalt,customerType, session)){	

			//LoggingUtil.logUserInfo(userID + "","New customer's login details created");			

			//int accountNo = AccountDbManager.generateAccountNo();
		
			
			//Calendar c = Calendar.getInstance(); 
			//c.setTime(new Date()); 
			//c.add(Calendar.YEAR, 3);
			//Date dt = c.getTime();
			//cardEntity.setCardExpiratrionDate(dt);

			
				//LoggingUtil.logUserInfo(userID + "","New customer's credit card numbers created");

				BossUser customerEntity = new BossUser();
				customerEntity.setId(userId);
				//customerEntity.setAddress(address);
				//customerEntity.setContactNumber(contactNumber);
				//customerEntity.setCustomerType(customerType);
				customerEntity.setEmail(emailID);
				//customerEntity.setLastname(lastName);
				//customerEntity.setFirstname(firstName);
                
				try {

					session.save(customerEntity);
	
					//LoggingUtil.logUserInfo(userID + "","New customer details created");
                    long accountNo = UUID.randomUUID().getMostSignificantBits();;
					BossAccount accountEntity = new BossAccount();
					accountEntity.setAccountId(accountNo);
					accountEntity.setAccountType("SAVINGS");
					accountEntity.setUserId(userId);
					accountEntity.setBalance(5000);

					/*if(saveAccountDetails(accountEntity,session)){
						EMailUtil emailUtil = new EMailUtil();
						emailUtil.createMailContentForCustomer(userId,emailUtil.setupEMailClient(), emailID);
						//LoggingUtil.logUserInfo(userID + "","New customer's Account numbers created");
						transaction.commit();
						return userId;
					}*/

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
	public static int SignUpCustomer(String name, String lastname,
			String address, String emailID, String contactNumber,
			char customerType, String password) {

		SignUpEntity customerEntity = new SignUpEntity();
		//customerEntity.setId(1223);
		customerEntity.setAddress(address);
		customerEntity.setContact(contactNumber);
		customerEntity.setCustomerType(customerType);
		customerEntity.setEmailId(emailID);
		customerEntity.setLastName(lastname);
		customerEntity.setFirstName(name);
		customerEntity.setCreationStatus("Pending");
		//Get a Password and Salt for the generated string.
		List<String> hashedPwdAndSalt = EncryptDigest.getHashedPwdAndSalt(password);
		String passwordDB = "";
		String pwdSaltDB = "";
		if(hashedPwdAndSalt != null)
		{
			passwordDB = hashedPwdAndSalt.get(0);
			pwdSaltDB = hashedPwdAndSalt.get(1);
		}
		
		customerEntity.setPassword(passwordDB);
		customerEntity.setPwdsalt(pwdSaltDB);

		Session session = null;
		Transaction transaction = null;

		try {
			session = HibernateUtil.getSessionFactory().openSession();
			transaction = session.beginTransaction();
			session.save(customerEntity);
			transaction.commit();
		} catch (Exception e) {
			e.printStackTrace();
			//transaction.rollback();
			return 0;
		} finally {
			session.flush();
			session.close();
		}

		return 0;
	}

*/
	
	public BossAccount getUserAccountDetails(EntityManager em, int userId) {
		Map<String, Object> returnMap = new HashMap<String, Object>();
		
		
	//BigDecimal m_accountId = new BigDecimal(accountId);
	//BigDecimal m_resourceId = new BigDecimal(resourceId);

	String sqlQuery = "from BOSS_ACCOUNT ar where ar.user_id = :m_userId";
	//sqlQuery = sqlQuery + " and ar.id = :m_resourceId";
    
	BossAccount accDet = null;
	try {
		Query resourceQuery = em.createQuery(sqlQuery);
		resourceQuery.setParameter("m_userId", userId);
		//resourceQuery.setParameter("m_resourceId", m_resourceId);
		accDet = (BossAccount) resourceQuery.getSingleResult();
	} catch (Exception e) {
		log.error("error : {}", e.getMessage(), e.getStackTrace());
	} finally {
	}
	return accDet;
	}
	

@Transactional
	public synchronized double account(long accountId)
	{
		Session session = this.sessionFactory.getCurrentSession();
		BossAccount accnt = (BossAccount) session.get(BossAccount.class,
				accountId); 
		return accnt.getBalance();
	}


@SuppressWarnings("unchecked")
@Transactional
public synchronized List<BossUser> viewaccountdetails(String username)
{
	
Session session = this.sessionFactory.openSession();

String hql = "FROM BossUser WHERE USER_NAME = :username";

Query query = (Query) session.createQuery(hql);
query.setParameter("username", username);

List<BossUser> results = ((SQLQueryImpl) query).list();

return results;
}
@SuppressWarnings("unchecked")
@Transactional
public synchronized boolean approve(int rd)
{
	boolean status=false;
	Session session = this.sessionFactory.getCurrentSession();
	
	String hql = "FROM Bossupdate WHERE REQUESTID = :req";

	Query query = (Query) session.createQuery(hql);
	query.setParameter("req", rd);
	//List<Bossupdate> userList = query.list();
	//Bossupdate accnts = userList.get(0);
	
	
	//if(accnts.getStatus()=='a')
	if (true)
	{
	hql = "UPDATE BossUser set  address= :address "  + 
            "WHERE userid = :AccountID";
	 query = (Query) session.createQuery(hql);
	//query.setParameter("address",accnts.getName());
	//query.setParameter("AccountID", accnts.getId());

	query.executeUpdate();
	
status=true;
	}
else
{
status=false;		
}
	return status;
}
@Transactional
public synchronized boolean updateaccount(long accountID,double balance)
{
	boolean status=false;
	Session session = this.sessionFactory.getCurrentSession();
	BossAccount accnt = (BossAccount) session.get(BossAccount.class,accountID);
	double oldbal=accnt.getBalance();
	double newbal=balance;
	double total=newbal+oldbal;
	String hql = "UPDATE BossAccount set balance = :Balance "  + 
            "WHERE account_id = :AccountID";
	org.hibernate.Query query = session.createQuery(hql);
	query.setParameter("Balance",total);
	query.setParameter("AccountID", accountID);

	int result = query.executeUpdate();
	if (result==1)
	{
		status=true;
	}
else
	status=false;
	
return status;
	}
	

}