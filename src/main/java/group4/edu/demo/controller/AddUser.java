package group4.edu.demo.controller;

import group4.edu.demo.model.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class AddUser {
    @GetMapping("/addUser")
    public String showAddUserForm(Model model) {
        model.addAttribute("user", new User());
        return "addUser";
    }
    @PostMapping("/addUser")
    public String submitUser(@ModelAttribute("user") User user, Model model) {
        System.out.println("first name:" + user.getFirstName());
        System.out.println("last name: " + user.getLastName());
        model.addAttribute("user", user);
        return "userDetails";
    }
}
