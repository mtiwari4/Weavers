package com.mkyong.web.controller;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HelloController {

	@RequestMapping(value = { "/", "/welcome**" }, method = RequestMethod.GET)
	public ModelAndView welcomePage() {

		ModelAndView model = new ModelAndView();
		model.addObject("title", "Spring Security Custom Login Form");
		model.addObject("message", "This is welcome page!");
		model.setViewName("hello");
		return model;

	}

	@RequestMapping(value = "/admin**", method = RequestMethod.GET)
	public ModelAndView adminPage() {

		ModelAndView model = new ModelAndView();
		model.addObject("title", "Spring Security Custom Login Form");
		model.addObject("message", "This is protected page!");
		model.setViewName("admin");

		return model;

	}

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public ModelAndView login(@RequestParam(value = "error", required = false) String error,
			@RequestParam(value = "logout", required = false) String logout,@RequestParam(value = "session", required = false) String session) {

		ModelAndView model = new ModelAndView();
		if (error != null) {
			model.addObject("error", "Invalid username and password!");
		}

		if (logout != null) {
			model.addObject("msg", "You've been logged out successfully.");
		}
		
		if (session != null) {
			model.addObject("session", "Invalid session");
		}
		
		model.setViewName("login");

		return model;

	}

	@RequestMapping(value = "/user**", method = RequestMethod.GET)
	public ModelAndView aPage() {

		ModelAndView model = new ModelAndView();
				model.setViewName("user");

		return model;
	}

		@RequestMapping(value = "/employee**", method = RequestMethod.GET)
		public ModelAndView aaPage() {

			ModelAndView model = new ModelAndView();
					model.setViewName("emp");

			return model;
	}
		@RequestMapping(value = "/account**", method = RequestMethod.GET)
		public ModelAndView aaaPage() {

			ModelAndView model = new ModelAndView();
					model.setViewName("account");

			return model;
	}
		@RequestMapping(value = "/403", method = RequestMethod.GET)
		public ModelAndView accesssDenied() {

			ModelAndView model = new ModelAndView();
			
			//check if user is login
			Authentication auth = SecurityContextHolder.getContext().getAuthentication();
			if (!(auth instanceof AnonymousAuthenticationToken)) {
				UserDetails userDetail = (UserDetails) auth.getPrincipal();
				System.out.println(userDetail);
			
				model.addObject("username", userDetail.getUsername());
				
			}
			
			model.setViewName("403");
			return model;

		}
		@RequestMapping(value = "/view**", method = RequestMethod.GET)
		public ModelAndView aaaPge() {

			ModelAndView model = new ModelAndView();
					model.setViewName("view");

			return model;
	}
		@RequestMapping(value = "/create**", method = RequestMethod.GET)
		public ModelAndView aaaage() {

			ModelAndView model = new ModelAndView();
					model.setViewName("create");

			return model;
	}
}