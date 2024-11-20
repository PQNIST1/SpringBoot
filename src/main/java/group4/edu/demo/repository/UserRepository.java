package group4.edu.demo.repository;

import group4.edu.demo.model.UserDemo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserDemo, Integer> {

}

