package group4.edu.demo.controller;

import group4.edu.demo.dto.CompanyDTO;
import group4.edu.demo.dto.UserDTO;
import group4.edu.demo.model.Company;
import group4.edu.demo.model.UserDemo;
import group4.edu.demo.repository.CompanyRepository;
import group4.edu.demo.repository.UserRepository;
import group4.edu.demo.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class RestComController {
    @Autowired
    private CompanyService companyService;

    @Autowired
    private UserRepository userRepository;



    @Autowired
    private CompanyRepository companyRepository;

    //GET ALL COMPANIES
    @GetMapping("/admin/companies")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<List<CompanyDTO>> getCompanies() {
        List<Company> companies = companyRepository.findAll();  // Lấy danh sách công ty từ database
        List<CompanyDTO> companyDTOs = companies.stream()
                .map(company -> {
                    List<UserDTO> userDTOs = company.getUsers().stream()
                            .map(user -> new UserDTO(user)) // Chuyển đổi mỗi UserDemo thành UserDTO
                            .collect(Collectors.toList());
                    return new CompanyDTO(company.getId(), company.getName(), userDTOs);
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(companyDTOs);  // Trả về danh sách các công ty cùng với người dùng
    }

    //GET COMPANY BY ID
    @GetMapping("/admin/company/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> getCompanyById(@PathVariable("id") Long id) {
        try {
            Optional<Company> companyOpt = companyRepository.findById(id);  // Tìm công ty theo ID

            if (!companyOpt.isPresent()) {
                return new ResponseEntity<>("Company not found", HttpStatus.NOT_FOUND);  // Nếu không tìm thấy công ty
            }

            Company company = companyOpt.get();  // Lấy công ty từ Optional
            List<UserDTO> userDTOs = company.getUsers().stream()
                    .map(user -> new UserDTO(user))  // Sử dụng constructor UserDTO(UserDemo user)
                    .collect(Collectors.toList());

//            List<UserDTO> userDTOs = company.getUsers().stream()
//                    .map(user -> new UserDTO(  // Chuyển mỗi UserDemo thành UserDTO
//                            user.getId(),
//                            user.getEmail(),
//                            user.getFirstName(),
//                            user.getLastName()
//                    ))
//                    .collect(Collectors.toList());

            CompanyDTO companyDTO = new CompanyDTO(
                    company.getId(),
                    company.getName(),
                    userDTOs  // Danh sách người dùng liên kết
            );

            return ResponseEntity.ok(companyDTO);  // Trả về công ty dưới dạng DTO

        } catch (Exception e) {
            return new ResponseEntity<>("Error fetching company: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);  // Nếu có lỗi
        }
    }

    //ADD COMPANY
    @PostMapping("/admin/company/add")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<String> addCompany(@RequestBody CompanyDTO companyDTO) {
        try {
            // Kiểm tra tên công ty có trùng lặp không
            Optional<Company> existingCompany = companyRepository.findByName(companyDTO.getName());
            if (existingCompany.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Company name already exists");
            }

            // Tạo mới công ty từ DTO
            Company company = new Company();
            company.setName(companyDTO.getName());

            // Lưu công ty vào cơ sở dữ liệu
            companyRepository.save(company);

            // Thêm người dùng vào công ty qua ID
            if (companyDTO.getUserIds() != null) {
                List<UserDemo> users = companyDTO.getUserIds().stream()
                        .map(userId -> userRepository.findById(userId)
                                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId)))
                        .collect(Collectors.toList());

                // Gán công ty cho các người dùng
                users.forEach(user -> user.setCompany(company));
                userRepository.saveAll(users);  // Lưu lại các người dùng đã được liên kết với công ty
            }

            return ResponseEntity.status(HttpStatus.CREATED).body("Company and users created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error creating company and users: " + e.getMessage());
        }
    }

    // UPDATE COMPANY NAME
    @PutMapping("/admin/update/company/name/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<String> updateCompanyName(@PathVariable("id") Long id,
                                                    @RequestBody String newCompanyName) {
        try {
            // Tìm công ty theo companyId
            Optional<Company> companyOpt = companyRepository.findById(id);
            if (!companyOpt.isPresent()) {
                return new ResponseEntity<>("Company not found", HttpStatus.NOT_FOUND);  // Nếu không tìm thấy công ty
            }

            Company company = companyOpt.get();

            // Cập nhật tên công ty
            company.setName(newCompanyName);
            companyRepository.save(company);  // Lưu công ty với tên mới

            return new ResponseEntity<>("Company name updated successfully", HttpStatus.OK);  // Trả về thông báo thành công

        } catch (Exception e) {
            return new ResponseEntity<>("Error updating company name: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);  // Nếu có lỗi
        }
    }

    // UPDATE ADD USER IN COMPANY
    @PutMapping("/admin/add/company/{companyId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<String> addUsersToCompany(@PathVariable("companyId") Long companyId,
                                                    @RequestBody List<Long> userIds) {
        try {
            // Tìm công ty theo companyId
            Optional<Company> companyOpt = companyRepository.findById(companyId);
            if (!companyOpt.isPresent()) {
                return new ResponseEntity<>("Company not found", HttpStatus.NOT_FOUND);  // Nếu không tìm thấy công ty
            }

            Company company = companyOpt.get();

            // Lặp qua danh sách userIds và thêm người dùng vào công ty
            for (Long userId : userIds) {
                Optional<UserDemo> userOpt = userRepository.findById(userId);
                if (!userOpt.isPresent()) {
                    return new ResponseEntity<>("User with ID " + userId + " not found", HttpStatus.NOT_FOUND);  // Nếu không tìm thấy người dùng
                }

                UserDemo user = userOpt.get();

                // Nếu người dùng không có trong công ty, thêm vào danh sách
                if (user.getCompany() == null || !user.getCompany().equals(company)) {
                    user.setCompany(company);  // Gán công ty cho người dùng
                    userRepository.save(user);  // Lưu người dùng với công ty mới
                }
            }

            return new ResponseEntity<>("Users added to company successfully", HttpStatus.OK);  // Trả về thông báo thành công

        } catch (Exception e) {
            return new ResponseEntity<>("Error adding users to company: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);  // Nếu có lỗi
        }
    }


    // UPDATE REMOVE USER FROM COMPANY
    @PutMapping("/admin/remove/company/{companyId}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<String> removeUsersFromCompany(@PathVariable("companyId") Long companyId,
                                                         @RequestBody List<Long> userIds) {
        try {
            // Tìm công ty theo companyId
            Optional<Company> companyOpt = companyRepository.findById(companyId);
            if (!companyOpt.isPresent()) {
                return new ResponseEntity<>("Company not found", HttpStatus.NOT_FOUND);  // Nếu không tìm thấy công ty
            }

            Company company = companyOpt.get();

            // Lặp qua danh sách userIds và loại bỏ người dùng khỏi công ty
            for (Long userId : userIds) {
                Optional<UserDemo> userOpt = userRepository.findById(userId);
                if (!userOpt.isPresent()) {
                    return new ResponseEntity<>("User with ID " + userId + " not found", HttpStatus.NOT_FOUND);  // Nếu không tìm thấy người dùng
                }

                UserDemo user = userOpt.get();

                // Nếu người dùng thuộc công ty này, gỡ liên kết
                if (user.getCompany() != null && user.getCompany().equals(company)) {
                    user.setCompany(null);  // Loại bỏ liên kết công ty khỏi người dùng
                    userRepository.save(user);  // Lưu lại người dùng đã sửa
                }
            }

            return new ResponseEntity<>("Users removed from company successfully", HttpStatus.OK);  // Trả về thông báo thành công

        } catch (Exception e) {
            return new ResponseEntity<>("Error removing users from company: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);  // Nếu có lỗi
        }
    }




    //DELETE COMPANY
    @DeleteMapping("/admin/company/delete/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteCompany(@PathVariable("id") Long companyId) {
        // Lấy công ty theo ID
        Optional<Company> company = companyRepository.findById(companyId);

        if (company.isPresent()) {
            Company companyToDelete = company.get();

            // Ngắt kết nối tất cả các UserDemo liên kết với công ty
            for (UserDemo user : companyToDelete.getUsers()) {
                user.setCompany(null);  // Loại bỏ liên kết giữa UserDemo và Company
            }

            // Lưu lại sự thay đổi (ngắt kết nối)
            userRepository.saveAll(companyToDelete.getUsers());

            // Xóa công ty
            companyRepository.delete(companyToDelete);

            return new ResponseEntity<>("Company deleted successfully, users are preserved.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Company not found", HttpStatus.NOT_FOUND);
        }
    }

}
