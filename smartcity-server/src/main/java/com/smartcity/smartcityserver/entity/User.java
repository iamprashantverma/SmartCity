package com.smartcity.smartcityserver.entity;

import com.smartcity.smartcityserver.entity.enums.Role;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity(name = "users")
@Data
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, length = 20)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.STUDENT;

    @Column(unique = true, nullable = false, length = 20)
    private String email;

    @Column(nullable = false)
    private Boolean active = Boolean.TRUE;

    @Column(length = 13)
    private String phoneNumber;

    @Column(nullable = false,length = 60)
    private String password;

    private String profilePictureUrl;

    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT false")
    private Boolean emailVerified = false;

    @Override
    public boolean isEnabled() {
        return this.active;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + this.role.name()));
    }

    @Override
    public String getUsername() {
        return this.email;
    }
}
