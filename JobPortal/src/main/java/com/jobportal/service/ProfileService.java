package com.jobportal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.mapper.ProfileMapper;
import com.jobportal.repository.ProfileRepository;

@Service
public interface ProfileService {

    @Autowired
    private ProfileRepository profileRepo;



    
}
