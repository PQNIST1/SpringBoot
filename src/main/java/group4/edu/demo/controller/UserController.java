package group4.edu.demo.controller;

import group4.edu.demo.model.User;
import group4.edu.demo.model.UserDemo;
import group4.edu.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/user")
    public String trangChiTiet(Model model) {
        model.addAttribute("userName", "Nguyen Van A");
        return "user";
    }

    @GetMapping("/addUser")
    public String addUser(Model model) {
        model.addAttribute("user", new User());
        return "addUser";
    }

    //    @PostMapping("/addUser")
//    public String submitUser(@ModelAttribute("user") User user, Model model) {
//        System.out.println("First Name: " + user.getFirstName());
//        System.out.println("Last Name: " + user.getLastName());
//        model.addAttribute("user", user);
//        return "userDetails";
//    }
    @PostMapping("/addUser")
    public void saveUser(@ModelAttribute("user") UserDemo user) {
        System.out.println("firstName: " + user.getFirstName());
        System.out.println("lastName: " + user.getLastName());
        userService.saveOrUpdate(user);
    }
}
