package group4.edu.demo.controller;

import group4.edu.demo.dto.CompanyDTO;
import group4.edu.demo.dto.Convert;
import group4.edu.demo.dto.UserDTO;
import group4.edu.demo.model.Authen;
import group4.edu.demo.model.Company;
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
import java.util.ArrayList;
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
    private Convert convert;

    @Autowired
    private AuthenticationService authenticationService;

    //GET ALL USER
    @GetMapping("/admin/users")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        try {
            List<UserDemo> users = userRepository.findAll();
            List<UserDTO> userDTOs = users.stream()
                    .map(convert::convertUserToDTO)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(userDTOs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ArrayList<>());
        }
    }

    //GET USER BY ID
    @GetMapping("/admin/user/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_ADMIN')")
    public ResponseEntity<?> getUserById(@PathVariable Integer id) {
        try {
            UserDemo user = userRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));

            UserDTO userDTO = convert.convertUserToDTO(user);

            return ResponseEntity.ok(userDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching user: " + e.getMessage());
        }
    }

    //REGISTER
//    @PostMapping("/register")
//    public ResponseEntity<UserDemo> register(@RequestBody UserDemo request){
//        return ResponseEntity.ok(userService.createUser(request));
//    }
    @PostMapping("/register")
    public ResponseEntity<Authen> register(@RequestBody UserDemo request){
        return ResponseEntity.ok(authenticationService.register(request));
    }

    //LOGIN
    @PostMapping("/login")
    public ResponseEntity<Authen> login(@RequestBody UserDemo request){
        return ResponseEntity.ok(authenticationService.login(request));
    }

    //UPDATE USER
    @PostMapping("/admin/update/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<String> updateUser(@RequestBody UserDemo user, @PathVariable int id) {
        userService.updateUser(id, user);
        return new ResponseEntity<>("Update Successfully", HttpStatus.OK);
    }

    //DELETE USER
    @DeleteMapping("/admin/delete/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @Transactional
    public String deleteUser(@PathVariable int id) throws IOException {
        Optional<UserDemo> user = userRepository.findById(id);
        if (user.isPresent()) {
            userRepository.deleteByUserId(id);
            userRepository.deleteById(id);
            return "Delete Successfully";
        } else {
            return "User not found";
        }
    }
}
