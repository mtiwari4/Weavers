package boss.boss_rs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import boss.data.repositories.BossUserRepository;

@Service
public class BossUserService {
	
	@Autowired
	private BossUserRepository userRepo;

    @Transactional
    public double accountBalance(long accountId){
    	return userRepo.account(accountId);
    }
        

}
