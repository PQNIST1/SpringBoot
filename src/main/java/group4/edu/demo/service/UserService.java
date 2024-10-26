package group4.edu.demo.service;

import group4.edu.demo.model.UserDemo;
import group4.edu.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public void saveOrUpdate(UserDemo user) {
        userRepository.save(user);
    }
}

