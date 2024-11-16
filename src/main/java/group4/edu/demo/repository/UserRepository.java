package group4.edu.demo.repository;

import group4.edu.demo.model.UserDemo;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface UserRepository extends CrudRepository<UserDemo, Integer> {
    List<UserDemo> findAll();
}

