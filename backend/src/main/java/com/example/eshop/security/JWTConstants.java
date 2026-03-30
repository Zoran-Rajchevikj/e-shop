package com.example.eshop.security;

public class JWTConstants {
    public static final String SECRET_KEY = "Zkc0R0tDcUtaQ0hjRnNmQWFYTXlWNnYyVmRPcE44QXlIdTdtTXJnaTYyUA==";
    public static final Long EXPIRATION_TIME = 864000000L;
    public static final String HEADER = "Authorization";
    public static final String TOKEN_PREFIX = "Bearer ";
}