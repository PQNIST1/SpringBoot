package group4.edu.demo.service;

import group4.edu.demo.model.Role;
import group4.edu.demo.model.UserDemo;
import group4.edu.demo.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;
    public Role addRole(Role role) {

        return roleRepository.save(role);
    }

}
