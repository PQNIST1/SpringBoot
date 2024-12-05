package group4.edu.demo.controller;

import group4.edu.demo.model.Role;
import group4.edu.demo.model.UserDemo;
import group4.edu.demo.service.RoleService;
import group4.edu.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/")
    public String home() {
        return "home";
    }


    @GetMapping("/register")
    public String showRegistrationForm(Model model) {
        model.addAttribute("user", new UserDemo());
        return "register";
    }

    @PostMapping("/register")
    public String registerUser(@ModelAttribute("user") UserDemo user) {
        userService.createUser(user);
        return "redirect:/login?success";
    }

    @GetMapping("/addUser")
    public String addUser(Model model) {
        model.addAttribute("user", new UserDemo());
        return "addUser";
    }

    @PostMapping("/addUser")
    public String createUser(@ModelAttribute("user") UserDemo user) {
        userService.createUser(user);
        return "redirect:/users";
    }



    @GetMapping("/users")
    public String getAllUsers(Model model) {
        List<UserDemo> users = userService.getAllUsers();
        model.addAttribute("users", users);
        return "getAll";
    }

    // Hiển thị form chỉnh sửa người dùng
//    @GetMapping("/edit/{id}")
//    public String showEditForm(@PathVariable("id") Integer id, Model model) {
//        UserDemo user = userService.getUserById(id).orElse(null);
//        if (user != null) {
//            model.addAttribute("user", user);
//            model.addAttribute("companies", userService.getAllCompanies());
//            return "editUser";
//        }
//        return "redirect:/users";
//    }

    // Xử lý chỉnh sửa người dùng
    @PostMapping("/update/{id}")
    public String updateUser(@PathVariable("id") Integer id, @ModelAttribute("user") UserDemo user) {
        userService.updateUser(id, user);
        return "redirect:/users";
    }

    // Xóa người dùng
    @GetMapping("/delete/{id}")
    public String deleteUser(@PathVariable("id") Integer id) {
        userService.deleteUser(id);
        return "redirect:/users";
    }

    @PostMapping("/addRole")
    public String createRole(@ModelAttribute("role") Role role) {
        roleService.addRole(role);
        return "redirect:/users";
    }


}
