package group4.edu.demo.controller;

import group4.edu.demo.dto.UserDTO;
import group4.edu.demo.model.Authen;
import group4.edu.demo.model.UserDemo;
import group4.edu.demo.repository.UserRepository;
import group4.edu.demo.service.AuthenticationService;
import group4.edu.demo.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class RestUserController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;



    @Autowired
    private AuthenticationService authenticationService;


    @PostMapping("/register")
    public ResponseEntity<Authen> register(@RequestBody UserDemo request){
        return ResponseEntity.ok(authenticationService.register(request));
    }

    //LOGIN
    @PostMapping("/login")
    public ResponseEntity<Authen> login(@RequestBody UserDemo request){
        return ResponseEntity.ok(authenticationService.login(request));
    }


    @GetMapping("user/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_USER')")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @GetMapping("/users")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    //ADD USER
    @PostMapping("/admin/user/add")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<String> createUser(@RequestBody UserDemo user) {
        try {
            userService.createUser(user);  // Giả sử bạn có phương thức này trong service
            return new ResponseEntity<>("User created successfully", HttpStatus.CREATED);  // Trả về thành công
        } catch (Exception e) {
            return new ResponseEntity<>("Error creating user: " + e.getMessage(), HttpStatus.BAD_REQUEST);  // Trả về lỗi nếu có
        }
    }


    //UPDATE USER
    @PutMapping("/admin/update/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<String> updateUser(@PathVariable("id") Long id, @RequestBody UserDemo userDetails) {
        try {
            // Gọi phương thức updateUser trong service để cập nhật dữ liệu
            UserDemo updatedUser = userService.updateUser(id, userDetails);

            if (updatedUser != null) {
                return new ResponseEntity<>("User updated successfully", HttpStatus.OK);  // Trả về thành công
            } else {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);  // Nếu không tìm thấy người dùng
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Error updating user: " + e.getMessage(), HttpStatus.BAD_REQUEST);  // Trả về lỗi nếu có
        }
    }

    //DELETE USER
    @DeleteMapping("/admin/delete/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @Transactional
    public String deleteUser(@PathVariable long id) throws IOException {
        Optional<UserDemo> user = userRepository.findById(id);
        if (user.isPresent()) {
            userRepository.deleteByUserId(id);
            userRepository.deleteById(id);
            return "Delete Successfully";
        } else {
            return "User not found";
        }
    }
    // Get User no company
    @GetMapping("/admin/users/no-company")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<List<UserDTO>> getUsersWithoutCompany() {
        // Lấy danh sách các người dùng chưa có công ty
        List<UserDemo> usersWithoutCompany = userRepository.findByCompanyIsNull();

        // Chuyển đổi danh sách UserDemo sang UserDTO
        List<UserDTO> userDTOs = usersWithoutCompany.stream()
                .map(user -> new UserDTO(user))  // Sử dụng constructor UserDTO(UserDemo)
                .collect(Collectors.toList());

        // Trả về danh sách người dùng dưới dạng ResponseEntity
        return new ResponseEntity<>(userDTOs, HttpStatus.OK);
    }
}
