package group4.edu.demo.service;

import group4.edu.demo.dto.UserDTO;
import group4.edu.demo.exception.ResourceNotFoundException;
import group4.edu.demo.model.Role;
import group4.edu.demo.model.UserDemo;
import group4.edu.demo.repository.RoleRepository;
import group4.edu.demo.repository.UserRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;


    public UserDemo createUser(UserDemo user) {
        // Kiểm tra xem email đã tồn tại chưa
        Optional<UserDemo> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("Email is already in use"); // Hoặc bạn có thể trả về một ResponseEntity lỗi
        }

        // Mã hóa mật khẩu trước khi lưu
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Lấy hoặc tạo role cho user
        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseGet(() -> {
                    Role newRole = new Role();
                    newRole.setName("ROLE_USER");
                    return roleRepository.save(newRole);
                });

        // Gắn role cho user
        Set<Role> roles = new HashSet<>();
        roles.add(userRole);
        user.setRoles(roles);

        // Lưu user vào cơ sở dữ liệu
        return userRepository.save(user);
    }


    // Cập nhật bất kỳ trường nào của user
    public UserDemo updateUser(Long id, UserDemo userDetails, Set<String> roleNames) {
        Optional<UserDemo> userOptional = userRepository.findById(id);

        if (userOptional.isPresent()) {
            UserDemo existingUser = userOptional.get();

            // Cập nhật thông tin cơ bản
            if (userDetails.getEmail() != null) {
                existingUser.setEmail(userDetails.getEmail());
            }

            if (userDetails.getFirstName() != null) {
                existingUser.setFirstName(userDetails.getFirstName());
            }

            if (userDetails.getLastName() != null) {
                existingUser.setLastName(userDetails.getLastName());
            }

            if (userDetails.getPassword() != null) {
                existingUser.setPassword(passwordEncoder.encode(userDetails.getPassword()));
            }

            // Cập nhật roles nếu roleNames được cung cấp
            if (roleNames != null && !roleNames.isEmpty()) {
                Set<Role> updatedRoles = roleNames.stream()
                        .map(roleName -> roleRepository.findByName(roleName)
                                .orElseGet(() -> {
                                    Role newRole = new Role();
                                    newRole.setName(roleName);
                                    return roleRepository.save(newRole);
                                }))
                        .collect(Collectors.toSet());

                existingUser.setRoles(updatedRoles);
            }

            // Lưu lại người dùng đã cập nhật
            return userRepository.save(existingUser);
        }

        throw new RuntimeException("User not found");
    }


    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }


    public UserDTO getUserById(Long id) {
        UserDemo user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return new UserDTO(user);
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());
    }
}

