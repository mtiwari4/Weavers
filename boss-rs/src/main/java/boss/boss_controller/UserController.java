package boss.boss_controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import boss.boss_rs.BossUserService;
import boss.data.entities.BossExtTransaction;


@Controller
public class UserController {


@SuppressWarnings("unused")
private static final String String = null;

@Autowired
private BossUserService userService;

	@RequestMapping(value = { "/", "/welcome" }, method = RequestMethod.GET)
	public ModelAndView welcomePage() {

		ModelAndView model = new ModelAndView();
		
		model.setViewName("homepage");
		
		return model;

	}

	@RequestMapping(value = "/admin", method = RequestMethod.GET)
	public ModelAndView apage() {

		ModelAndView model = new ModelAndView();
		
		model.setViewName("admin");

		return model;

	}
	
	@RequestMapping(value = "/extuser", method = RequestMethod.GET)
	public ModelAndView extuserPage() {

		ModelAndView model = new ModelAndView();
		model.setViewName("userhome");

		return model;

	}
	
	@RequestMapping(value = "/extusertransactiondetails/{pageContext.request.userPrincipal.name}")
	public String transactiondetails(@PathVariable("pageContext.request.userPrincipal.name") String str,Model model) {

		model.addAttribute("extusertrandetails",userService.viewtransactiondetails(str));
		
		return "extusertrandetails";
	

	}
	
	
	@RequestMapping(value = "/extuserprofiledetails/{pageContext.request.userPrincipal.name}")
	public String profiledetails(@PathVariable("pageContext.request.userPrincipal.name") String str,Model model) {

		model.addAttribute("userprofiledetails",userService.viewprofiledetails(str));
		
		return "userprofiledetails";

	}
	
	@RequestMapping(value = "/extusercreditdebit/{pageContext.request.userPrincipal.name}")
	public ModelAndView creditdebit() {

		ModelAndView model = new ModelAndView();
		model.setViewName("usercreditdebit");

		return model;

	}
	
	@RequestMapping(value = "/extusertransferfunds/{pageContext.request.userPrincipal.name}")
	public ModelAndView transferfunds() {

		ModelAndView model = new ModelAndView();
		model.setViewName("extuserfundstransfer");

		return model;

	}
	

	@RequestMapping(value = "/extusertransferfunds/fundtransfer/{pageContext.request.userPrincipal.name}", method = RequestMethod.POST)
	public ModelAndView transferfund(@RequestParam("account") long account,@RequestParam("amount") double amount,@PathVariable("pageContext.request.userPrincipal.name") String name) {

		ModelAndView model = new ModelAndView();
		
		String a=null;
		
		String status=null;
		
		boolean b=userService.fundtransfer(account,amount,name);
		
		if(b==true)
		{
			a="Transfer Successful";
			
			status="Transfer Success";
			
			userService.transactionFunds(account,amount,name,status);
		}
		else
		{				
			a="Failed";
			
			status="Failed Transfer";
			
			userService.transactionFunds(account,amount,name,status);
			
		}	
		
		model.addObject("statu",a);
		
		model.setViewName("action");
		
		return model;

	}
	
	@RequestMapping(value = "/extusercreditdebit/extusercredit/{pageContext.request.userPrincipal.name}", method = RequestMethod.POST)
	public ModelAndView update(@RequestParam("credit") double credit,@PathVariable("pageContext.request.userPrincipal.name") String name)
	{

		ModelAndView model = new ModelAndView();
				
		String a=null;
		
		String status=null;
				
		boolean b=userService.credit(credit,name);
								
		
		
		if(b==true)
		{
			a="Credited Successfully";
			
			status="Success";
					
			userService.saveTranscredit(credit,name,status);
		}
		else
		{
			a="Crediting Failed";
			
			status="Failed";
			
			userService.saveTranscredit(credit,name,status);
			
			
		}
		model.addObject("status",a);
		model.setViewName("action");
		return model;

	}
	

	@RequestMapping(value = "/extusercreditdebit/extuserdebit/{pageContext.request.userPrincipal.name}", method = RequestMethod.POST)
	public ModelAndView debit(@RequestParam("debit") double debit,@PathVariable("pageContext.request.userPrincipal.name") String name)
	{

		ModelAndView model = new ModelAndView();
				
		String a=null;
		
		String status=null;
				
		boolean b=userService.debit(debit,name);
				
		if(b==true)
		{
			a="Debited Successfully";
			status="Success";
			userService.saveTransdebit(debit,name,status);
		}
		else
		{
			a="Failed Transaction";
			status="Debiting Failed";
			userService.saveTransdebit(debit,name,status);
			
		}
		model.addObject("mesg",a);
		model.setViewName("action");
		return model;

	}
	
	@RequestMapping(value = "/extuseraccountdetails/{pageContext.request.userPrincipal.name}")
	public String accountdetails(@PathVariable("pageContext.request.userPrincipal.name") String str,Model model) {
			
				
		model.addAttribute("useraccountdetails",userService.viewaccountdetails(str));
		
		return "useraccountdetails";

	}
		
	
	@ModelAttribute
	public void greetings(Model model)
	{
		model.addAttribute("welcome","WELCOME TO BOSS");
		model.addAttribute("message","THE SECURED BANKING SYSTEM");
	}
	
	@RequestMapping(value = "/adminview", method = RequestMethod.GET)
	public ModelAndView adminPag() {

		ModelAndView model = new ModelAndView();
		
		model.setViewName("account");

		return model;

	}
		
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public ModelAndView login(@RequestParam(value = "error", required = false) String error,
			@RequestParam(value = "logout", required = false) String logout) {

		ModelAndView model = new ModelAndView();
		if (error != null) {
			model.addObject("error", "Invalid username and password!");
		}

		if (logout != null) {
			model.addObject("msg", "You've been logged out successfully.");
		}
		model.setViewName("login");

		return model;

	}
	
	}