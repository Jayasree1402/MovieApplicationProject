package com.bej.movieservice.service;

import com.bej.movieservice.domain.Movie;
import com.bej.movieservice.domain.User;

import com.bej.movieservice.exception.MovieAlreadyExistsException;
import com.bej.movieservice.exception.MovieNotFoundException;
import com.bej.movieservice.exception.UserAlreadyExistsException;
import com.bej.movieservice.exception.UserNotFoundException;
import com.bej.movieservice.proxy.UserProxy;
import com.bej.movieservice.repository.UserMovieRepository;
import com.bej.movieservice.util.ImageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
public class MovieServiceImpl implements IMovieService {

    private UserMovieRepository userMovieRepository;
    private UserProxy userProxy;
    private final String uploadDir = "C:\\Users\\Jayasree\\Downloads\\downloadImagesFromApp"; // Directory to store uploaded files

    // Autowire the UserTrackRepository using constructor autowiring
    @Autowired
    public MovieServiceImpl(UserMovieRepository userMovieRepository, UserProxy userProxy) {
        this.userMovieRepository = userMovieRepository;
        this.userProxy = userProxy;
    }


    @Transactional
    @Override
    public User registerUser(String username, String email, String password, MultipartFile image) throws UserAlreadyExistsException, IOException {
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(password);

        // Handle image upload
        if (image != null && !image.isEmpty()) {
            String fileName = StringUtils.cleanPath(image.getOriginalFilename());
            String fileExtension = fileName.substring(fileName.lastIndexOf("."));
            String newFileName = UUID.randomUUID().toString() + fileExtension;
            Path uploadPath = Paths.get(uploadDir);

            // Create the upload directory if it doesn't exist
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Save the file to the server
            Path filePath = uploadPath.resolve(newFileName);
            Files.copy(image.getInputStream(), filePath);

            // Set the image path in the user entity
            user.setImagePath(filePath.toString());
        }

//         Save the user details to the database
        User savedUser = userMovieRepository.save(user);
        if(!savedUser.getUserId().isEmpty())
        {
            ResponseEntity<?> r = userProxy.saveUser(user);
            System.out.println(r.getBody());
        }
        return savedUser;
//        return userMovieRepository.save(user);
        }






    @Override
    public User saveMovieToWishList(Movie movie,String userId) throws UserNotFoundException, MovieAlreadyExistsException {

        System.out.println("service data :"+movie);
        System.out.println("service data :"+userId);
//        System.out.println(userMovieRepository.findById(userId).get());
        if(userMovieRepository.findById(userId).isEmpty()){
            throw new UserNotFoundException();
        }
        User user = userMovieRepository.findById(userId).get();
        if(user.getMovieList()==null){
            System.out.println("add to list");
            user.setMovieList(Arrays.asList(movie));
        }
        else {
            List<Movie> movieList = user.getMovieList();
            for(Movie m:movieList){
                if(m.getId().equals(movie.getId())){
                    throw new MovieAlreadyExistsException();
                }
            }
            movieList.add(movie);
            user.setMovieList(movieList);
        }
        return userMovieRepository.save(user);
    }
    @Override
    public List<Movie> getAllUserMoviesFromWishList(String userId) throws MovieNotFoundException,UserNotFoundException {
        // Get all the tracks for a specific user
        if(userMovieRepository.findById(userId).isEmpty()){
            throw new UserNotFoundException();
        }
        User user = userMovieRepository.findById(userId).get();
        List<Movie> movieList = user.getMovieList();
        if(movieList.isEmpty())
        {
            throw new MovieNotFoundException();
        }
        return userMovieRepository.findById(userId).get().getMovieList();
    }

    @Override
    public User deleteMovie(String userId, String movieId) throws MovieNotFoundException,UserNotFoundException {
        if(userMovieRepository.findById(userId).isEmpty()){
            throw new UserNotFoundException();
        }
        User user = userMovieRepository.findById(userId).get();
        List<Movie> movieList = user.getMovieList();
        boolean isMoviePresent = movieList.removeIf(movie -> movie.getId().equals(movieId));
        if(!isMoviePresent){
            throw new MovieNotFoundException();
        }
        // delete the user details specified
        user.setMovieList(movieList);
        return userMovieRepository.save(user);
    }


//    @Override
//    public User updateUserMovieWishListWithGivenList(String userId, Movie movie) throws MovieAlreadyExistsException {
//        // Update the specific details of User
//  if(userMovieRepository.findById(userId).isEmpty())
//  {
//      throw new UserNotFoundException();
//  }
//        User user = userMovieRepository.findById(userId).get();
//        List<Movie> movieList = user.getMovieList();
//
//        Movie existingMovie = null;
//        for (Movie t: movieList){
//            if(Objects.equals(t.getMovieId(),movie.getMovieId())){
//                existingMovie = t;
//            }
//            if(existingMovie == null){
//                throw new TrackNotFoundException();
//            }
//            if(existingMovie.equals(track)){
//                throw new TrackAlreadyExistsException();
//            }
//        }
//
//        movieList.remove(existingMovie);
//        movieList.add(movie);
//        return userMovieRepository.save(user);
//    }

}