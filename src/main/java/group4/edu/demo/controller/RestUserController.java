package group4.edu.demo.controller;

import group4.edu.demo.model.UserDemo;
import group4.edu.demo.repository.UserRepository;
import group4.edu.demo.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

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

    @GetMapping("/admin/users")
    public ResponseEntity<?> getAllUSer(){
        return new ResponseEntity<List<UserDemo>>(userService.getAllUsers(), HttpStatus.OK);
    }
    @PostMapping("/register")
    public ResponseEntity<UserDemo> register(@RequestBody UserDemo request){
        return ResponseEntity.ok(userService.createUser(request));
    }

    @PostMapping("/admin/update/{id}")
    public ResponseEntity<?> updateUser(@RequestBody UserDemo user, @PathVariable int id){
        return new ResponseEntity<UserDemo>(userService.updateUser(id, user), HttpStatus.OK);
    }

    @DeleteMapping("/admin/delete/{id}")
    @Transactional
    public String deleteMessage(@PathVariable int id) throws IOException {
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
