package group4.edu.demo.repository;

import group4.edu.demo.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer> {
    // Các phương thức CRUD được kế thừa từ JpaRepository
}
