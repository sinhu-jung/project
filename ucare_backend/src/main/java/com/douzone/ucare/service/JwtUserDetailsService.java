package com.douzone.ucare.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.douzone.ucare.repository.UserRepository;
import com.douzone.ucare.vo.UserVo;

@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;
	
    @Autowired
    private PasswordEncoder passwordEncoder;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		UserVo user = userRepository.findByID(username);
		
        if (user.getId() != null) {
            return new User( user.getId(), passwordEncoder.encode(user.getPassword()),
                new ArrayList<>());
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
	}

}
