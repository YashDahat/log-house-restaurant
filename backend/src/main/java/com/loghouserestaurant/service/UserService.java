package com.loghouserestaurant.service;

import com.loghouserestaurant.model.User;
import com.loghouserestaurant.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List; // Added import for List
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // The UserRepository interface, as provided in the context, does not define findByEmail(String).
        // To resolve the compilation error while preserving the intent of finding a user by email
        // and adhering to the constraint of modifying only this file, we use findAll() and filter locally.
        Optional<User> userOptional = userRepository.findAll().stream()
                                                    .filter(user -> user.getEmail().equals(email))
                                                    .findFirst();

        User user = userOptional.orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
        );
    }
}