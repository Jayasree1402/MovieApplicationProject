package com.bej.movieservice.domain;

import org.springframework.data.annotation.Id;


public class Movie {
    @Id
    private String id;
    private String   original_title;
    private String  overview;
    private long vote_average;
    private String  release_date;
    private String  poster_path;
    private String  original_language;
//    private String  movieRuntime;
//    private Artist artist;

    public Movie() {
    }

    public Movie(String id, String original_title, String overview, long vote_average, String release_date, String poster_path, String original_language) {
        this.id = id;
        this.original_title = original_title;
        this.overview = overview;
        this.vote_average = vote_average;
        this.release_date = release_date;
        this.poster_path = poster_path;
        this.original_language = original_language;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOriginal_title() {
        return original_title;
    }

    public void setOriginal_title(String original_title) {
        this.original_title = original_title;
    }

    public String getOverview() {
        return overview;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public long getVote_average() {
        return vote_average;
    }

    public void setVote_average(long vote_average) {
        this.vote_average = vote_average;
    }

    public String getRelease_date() {
        return release_date;
    }

    public void setRelease_date(String release_date) {
        this.release_date = release_date;
    }

    public String getPoster_path() {
        return poster_path;
    }

    public void setPoster_path(String poster_path) {
        this.poster_path = poster_path;
    }

    public String getOriginal_language() {
        return original_language;
    }

    public void setOriginal_language(String original_language) {
        this.original_language = original_language;
    }

    @Override
    public String toString() {
        return "Movie{" +
                "id=" + id +
                ", original_title='" + original_title + '\'' +
                ", overview='" + overview + '\'' +
                ", vote_average=" + vote_average +
                ", release_date='" + release_date + '\'' +
                ", poster_path='" + poster_path + '\'' +
                ", original_language='" + original_language + '\'' +
                '}';
    }
}
