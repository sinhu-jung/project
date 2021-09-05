package com.douzone.ucare.model;

import java.io.Serializable;

public class JwtResponse implements Serializable {
	
    private static final long serialVersionUID = -8091879091924046844L;
    private final String jwttoken;
	private int userNo;
	private String id;
	private String password;
	private String name;
	private String role;

    public JwtResponse(String jwttoken) {
        this.jwttoken = jwttoken;
    }

    public String getToken() {
        return this.jwttoken;
    }

	public int getUserNo() {
		return userNo;
	}

	public void setUserNo(int userNo) {
		this.userNo = userNo;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	@Override
	public String toString() {
		return "JwtResponse [jwttoken=" + jwttoken + ", userNo=" + userNo + ", id=" + id + ", password=" + password
				+ ", name=" + name + ", role=" + role + "]";
	}
}
