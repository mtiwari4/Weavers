package boss.boss_rs;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import boss.data.entities.BossAccount;
import boss.data.entities.BossExtTransaction;
import boss.data.entities.BossUser;
import boss.data.repositories.BossUserRepository;

@Service
public class BossUserService {
	
	@Autowired
	private BossUserRepository userRepo;

	  
	@Transactional
	public synchronized List<BossAccount> viewaccountdetails(String username)
	{
		return userRepo.viewaccountdetails(username);
	}
	
	@Transactional
	public synchronized List<BossUser> viewprofiledetails(String username)
	{
		return userRepo.viewprofiledetails(username);
	}
	
	@Transactional
	public synchronized boolean credit(double amount,String username)
	{
		return userRepo.credit(amount,username);
	}
	
	@Transactional
	public synchronized boolean debit(double amount,String username)
	{
		return userRepo.debit(amount,username);
	}
	
	@Transactional
	public synchronized boolean fundtransfer(long account,double amount,String username)
	{
		return userRepo.fundtransfer(account,amount,username);
	}
	
	@Transactional
	public synchronized boolean saveTranscredit(double amount,String username,String status)
	{
		return userRepo.saveTranscredit(amount,username,status);
	}
	
	@Transactional
	public synchronized boolean saveTransdebit(double amount,String username,String status)
	{
		return userRepo.saveTransdebit(amount,username,status);
	}
	
		
	@Transactional
	public synchronized boolean transactionFunds(long account,double amount,String name,String status)
	{
		return userRepo.transactionFunds(account,amount,name,status);
	}
	
	@Transactional
	public synchronized List<BossExtTransaction> viewtransactiondetails(String username)
	{
		return userRepo.viewtransactiondetails(username);
	}
	
	}
