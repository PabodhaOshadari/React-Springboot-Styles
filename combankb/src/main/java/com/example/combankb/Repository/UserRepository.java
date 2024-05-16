package com.example.combankb.Repository;

import com.example.combankb.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByNicAndPassword(String nic, String password);
}

