package group4.edu.demo.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CompanyDTO {
    private Long id;
    private String name;
    private List<UserDTO> users;
    private List<Long> userIds;

    private List<String> userEmails;

    public CompanyDTO(Long id, String name, List<UserDTO> users) {
        this.id = id;
        this.name = name;
        this.users = users;
    }
}
