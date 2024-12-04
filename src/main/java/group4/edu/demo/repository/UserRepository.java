package group4.edu.demo.repository;

import group4.edu.demo.model.UserDemo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserDemo, Integer> {
    Optional<UserDemo> findByEmail(String email);
    @Modifying
    @Query(value = "DELETE FROM USER_ROLE WHERE user_id = :userId", nativeQuery = true)
    void deleteByUserId(@Param("userId") int userId);

}

