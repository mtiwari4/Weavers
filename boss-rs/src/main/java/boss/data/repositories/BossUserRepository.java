package boss.data.repositories;


import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.StringWriter;
import java.math.BigDecimal;
import java.sql.Clob;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.FlushModeType;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.xml.stream.XMLStreamException;

import org.hibernate.ejb.QueryImpl;
import org.hibernate.internal.SQLQueryImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import boss.data.entities.BossUser;

import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class  BossUserRepository{
	private static final Logger log = LoggerFactory
			.getLogger(BossUserRepository.class);

	@Value("${table.schema}")
	protected String tableSchema;

	@Autowired
    private BossUser userDetails;
	//@Autowired
	//private EntityObjectMapper mapper;
	
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
}