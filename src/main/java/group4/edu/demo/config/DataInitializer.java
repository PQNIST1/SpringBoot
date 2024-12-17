package group4.edu.demo.config;

import group4.edu.demo.model.Role;
import group4.edu.demo.model.UserDemo;
import group4.edu.demo.repository.RoleRepository;
import group4.edu.demo.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer {
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;



    @PostConstruct
    public void init() {


        // Kiểm tra nếu chưa có tài khoản admin
        if (!userRepository.findByEmail("admin@gmail.com").isPresent()) {
            // Tạo tài khoản admin
            UserDemo adminUser = new UserDemo();
            adminUser.setEmail("admin@gmail.com");
            adminUser.setFirstName("Admin");
            adminUser.setLastName("Admin");
            adminUser.setPassword(passwordEncoder.encode("admin"));  // Đặt mật khẩu cho admin

            // Tạo vai trò admin
            Role adminRole = roleRepository.findByName("ROLE_ADMIN")
                    .orElseGet(() -> {
                        Role role = new Role();
                        role.setName("ROLE_ADMIN");
                        return roleRepository.save(role);
                    });

            // Gán vai trò cho admin
            adminUser.setRoles(new HashSet<>(Set.of(adminRole)));

            // Lưu tài khoản admin vào database
            userRepository.save(adminUser);
        }

        if (roleRepository.findByName("ROLE_USER").isEmpty()) {
            Role userRole = new Role();
            userRole.setName("ROLE_USER");
            roleRepository.save(userRole);
        }

        if (roleRepository.findByName("ROLE_ADMIN").isEmpty()) {
            Role adminRole = new Role();
            adminRole.setName("ROLE_ADMIN");
            roleRepository.save(adminRole);
        }
    }
}
