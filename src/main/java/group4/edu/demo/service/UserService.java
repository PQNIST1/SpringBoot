package group4.edu.demo.service;

import group4.edu.demo.model.Company;
import group4.edu.demo.model.Role;
import group4.edu.demo.model.UserDemo;
import group4.edu.demo.repository.CompanyRepository;
import group4.edu.demo.repository.RoleRepository;
import group4.edu.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private CompanyRepository companyRepository;

    public List<UserDemo> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<UserDemo> getUserById(Integer id) {
        return userRepository.findById(id);
    }

    public UserDemo createUser(UserDemo user) {
        return userRepository.save(user);
    }

    public UserDemo updateUser(Integer id, UserDemo userDetails) {
        Optional<UserDemo> user = userRepository.findById(id);

        if (user.isPresent()) {
            UserDemo updatedUser = user.get();
            updatedUser.setFirstName(userDetails.getFirstName());
            updatedUser.setLastName(userDetails.getLastName());
            updatedUser.setPassword(userDetails.getPassword());

            // Cập nhật role nếu có
            if (userDetails.getRole() != null) {
                Optional<Role> role = roleRepository.findById(Long.valueOf(userDetails.getRole().getId()));
                role.ifPresent(updatedUser::setRole);
            }

            return userRepository.save(updatedUser);
        }

        return null; // Hoặc ném ra một ngoại lệ tùy vào nhu cầu của bạn
    }

    public boolean deleteUser(Integer id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }


    // Phương thức để lấy danh sách các vai trò
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    public Optional<Role> getRoleById(Long id) {
        return roleRepository.findById(id);
    }

    public Role createRole(Role role) {
        return roleRepository.save(role);
    }

    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }
    public Optional<Company> getCompanyById(Integer id) {
        return companyRepository.findById(id);
    }
    public Company createCompany(Company company) {
        return companyRepository.save(company);
    }
}

