package com.example.combankb.Controller;


import com.example.combankb.Model.LoginRequest;
import com.example.combankb.Model.LoginResponse;
import com.example.combankb.Model.User;
import com.example.combankb.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;



    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest) {
        String nic = loginRequest.getNic();
        String password = loginRequest.getPassword();

        User user = userService.authenticateUser(nic, password);

        if (user != null) {
            return new LoginResponse(true, "Login successful");
        } else {
            return new LoginResponse(false, "Invalid NIC or password");
        }
    }




    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @GetMapping("/user-count")
    public int getUserCount() {
        return userService.getAllUsers().size();
    }




    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @PostMapping("/customEndpoint")
    public User createCustomUser(@RequestBody User user) {
        // Custom logic for creating user with additional processing
        return userService.saveUser(user);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        user.setId(id); // Ensure the ID is set from the path variable
        return userService.saveUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
