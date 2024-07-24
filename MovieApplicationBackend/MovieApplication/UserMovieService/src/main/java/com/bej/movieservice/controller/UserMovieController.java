package com.bej.movieservice.controller;

import com.bej.movieservice.domain.Movie;
import com.bej.movieservice.domain.User;
import com.bej.movieservice.exception.MovieAlreadyExistsException;
import com.bej.movieservice.exception.MovieNotFoundException;
import com.bej.movieservice.exception.UserAlreadyExistsException;
import com.bej.movieservice.exception.UserNotFoundException;

import com.bej.movieservice.service.MovieServiceImpl;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

@RestController
//@CrossOrigin(origins = "http://localhost:4200/")
@RequestMapping("/api/v2/")
public class UserMovieController {
    // Auto wire the service layer object
   private final MovieServiceImpl movieService;
    private ResponseEntity<?> responseEntity;
@Autowired
    public UserMovieController(MovieServiceImpl movieService) {
        this.movieService = movieService;
    }

    @PostMapping("register/image")
    public ResponseEntity<?> registerUser(@RequestParam("username") String username, @RequestParam("email") String email,@RequestParam String password,
                                          @RequestParam(value = "image", required =false) MultipartFile image) throws IOException {
        // Handle user registration
        try {
            movieService.registerUser(username, email, password, image);
            return ResponseEntity.ok("User registered successfully");
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }
    }

    @PostMapping("user/movie")
    public ResponseEntity<?> saveMovieToWishList(@RequestBody Movie movie, HttpServletRequest request) throws UserNotFoundException,MovieAlreadyExistsException {
        // add a track to a specific user, return 201 status if track is saved else 500 status
        try {
            Claims claims = (Claims) request.getAttribute("claims");
            System.out.println("claims :"+claims.getSubject());
            String userId = claims.getSubject();
            System.out.println("data :"+movie);
            User user = movieService.saveMovieToWishList(movie,userId);
            System.out.println("added from contr");
            responseEntity = new ResponseEntity<>(user, HttpStatus.CREATED);
        }
        catch (UserNotFoundException e) {
          throw new UserNotFoundException();
        } catch (MovieAlreadyExistsException e) {
          throw  new MovieAlreadyExistsException();
        }
        catch (Exception e){
            responseEntity = new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return responseEntity;

    }

    @GetMapping("user/movies")
    public ResponseEntity<?> getAllUserMoviesFromWishList(HttpServletRequest request) throws MovieNotFoundException,UserNotFoundException {
        // display all the tracks of a specific user, extract user id from claims,
        try{
            System.out.println("header: "+request.getHeader("Authorization"));
            Claims claims = (Claims) request.getAttribute("claims");
            String userId = claims.getSubject();
            List<Movie> movieList = movieService.getAllUserMoviesFromWishList(userId);
            responseEntity = new ResponseEntity<>(movieList, HttpStatus.OK);
        }
        catch (MovieNotFoundException e)
        {
            throw  new MovieNotFoundException();
        }
        catch (UserNotFoundException e)
        {
            throw  new UserNotFoundException();
        }
        catch (Exception e){
            responseEntity = new ResponseEntity<>("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        // return 200 status if user is saved else 500 status
        return responseEntity;
    }

    @DeleteMapping("user/movie/{movieId}")
    public ResponseEntity<?> deleteMovie(@PathVariable String movieId,HttpServletRequest request) throws  MovieNotFoundException, UserNotFoundException {
        // delete a track based on user id and track id, extract user id from claims
        try {
            System.out.println("header: "+request.getHeader("Authorization"));
            Claims claims = (Claims) request.getAttribute("claims");
            String userId = claims.getSubject();
            User user = movieService.deleteMovie(userId, movieId);
            responseEntity = new ResponseEntity<>(user, HttpStatus.OK);
        } catch (UserNotFoundException e) {
           throw new UserNotFoundException();
        }
        catch ( MovieNotFoundException e){
            throw new MovieNotFoundException();
        }
        catch (Exception e){
            responseEntity = new ResponseEntity<>("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        // return 200 status if user is saved else 500 status
        return responseEntity;
    }


}
