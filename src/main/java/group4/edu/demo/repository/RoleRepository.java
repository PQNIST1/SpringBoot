package group4.edu.demo.repository;

import group4.edu.demo.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.Set;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(String name);
    Set<Role> findByUsers_Id(Integer userId);
}
