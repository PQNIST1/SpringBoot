package group4.edu.demo.service;

import group4.edu.demo.model.Authen;
import group4.edu.demo.model.Role;
import group4.edu.demo.model.UserDemo;
import group4.edu.demo.repository.RoleRepository;
import group4.edu.demo.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RoleRepository roleRepository;

    public Authen register(UserDemo request) {
        if (request.getEmail() == null || request.getPassword() == null) {
            throw new IllegalArgumentException("Email and password are required");
        }

        // Tạo đối tượng UserDemo mới từ dữ liệu yêu cầu
        UserDemo user = new UserDemo();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());

        // Kiểm tra xem email đã tồn tại chưa
        Optional<UserDemo> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Email is already in use");
        }

        // Mã hóa password trước khi lưu vào DB
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // Tìm hoặc tạo role "ROLE_USER"
        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseGet(() -> {
                    Role newRole = new Role();
                    newRole.setName("ROLE_USER");
                    return roleRepository.save(newRole);
                });

        // Gán role cho người dùng
        Set<Role> roles = new HashSet<>();
        roles.add(userRole);
        user.setRoles(roles);

        // Lưu người dùng vào DB
        user = userRepository.save(user);

        // Tạo token sau khi đăng ký thành công
        String token = jwtService.generateToken(user);

        // Trả về đối tượng Authen chứa token
        return new Authen(token);
    }



    public Authen login(UserDemo request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        UserDemo user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        String token = jwtService.generateToken(user);
        return new Authen(token);
    }

}
