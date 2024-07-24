package com.bej.movieservice.service;

import com.bej.movieservice.domain.Movie;
import com.bej.movieservice.domain.User;
import com.bej.movieservice.exception.MovieAlreadyExistsException;
import com.bej.movieservice.exception.MovieNotFoundException;
import com.bej.movieservice.exception.UserAlreadyExistsException;
import com.bej.movieservice.exception.UserNotFoundException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IMovieService {
    User registerUser(String username,String email, String password, MultipartFile image) throws UserAlreadyExistsException, IOException;
    User saveMovieToWishList(Movie movie, String userId) throws MovieAlreadyExistsException,UserNotFoundException;
    List<Movie> getAllUserMoviesFromWishList(String userId) throws MovieNotFoundException,UserNotFoundException;
    User deleteMovie(String userId,String movieId) throws MovieNotFoundException, UserNotFoundException;
//    User updateUserMovieWishListWithGivenList(String movieId, Movie movie) throws MovieAlreadyExistsException;
}