package group4.edu.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "USER_DEMO")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDemo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "password")
    private String password;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;


}

