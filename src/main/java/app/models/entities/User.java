package app.models.entities;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;


@Entity
@Getter
@Setter
@NoArgsConstructor
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @NotEmpty
    @Email
    @Column(nullable = false, unique = true)
    private String email;

    @NotNull
    @NotEmpty
    @Column(nullable = false, unique = true)
    private String username;

    @NotNull
    @NotEmpty
    private String profileImageUrl;

    @NotNull
    @NotEmpty
    private String password;

    @Transient
    private String matchingPassword;


    @Column(nullable = false)
    private String role;

    private String fullName;

    private String birthday;

    private String gender;

    private String phone;

    private String status;

    @ManyToOne(cascade = CascadeType.ALL)
    private Direccion direccion;


    public boolean passwordMatchingValidation() {
        return this.password.equals(this.matchingPassword);
    }


    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", username='" + username + '\'' +
                ", profileImageUrl='" + profileImageUrl + '\'' +
                ", password='" + password + '\'' +
                ", matchingPassword='" + matchingPassword + '\'' +
                ", role='" + role + '\'' +
                ", fullName='" + fullName + '\'' +
                ", birthday='" + birthday + '\'' +
                ", gender='" + gender + '\'' +
                ", phone='" + phone + '\'' +
                ", direccion=" + direccion +
                '}';
    }
}