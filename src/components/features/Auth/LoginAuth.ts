'use client';

import { FormData } from "@/components/features/Validation/LoginValidate";
import Cookies from "js-cookie";

export async function handleLogin(data: FormData, rememberMe: boolean) {
  const API_URL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}auth/login`;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
      credentials: "include", // Ensure credentials are sent with the request
    });

    const responseData = await response.json();
    console.log('FULL login response:', responseData);

    const accessToken = responseData.accessToken;
    const refreshToken = responseData.refreshToken || null; // May not exist
    const role = responseData.user?.role || null; // Role is inside user object!

    if (!accessToken || !role) {
      throw new Error("Missing access token or role from server.");
    }

    // Set cookies based on rememberMe flag
    if (rememberMe) {
      // Save everything if rememberMe is true
      Cookies.set('accessToken', accessToken, { expires: 7, sameSite: 'Lax', secure: process.env.NODE_ENV === 'production' });
      Cookies.set('refreshToken', refreshToken, { expires: 7, sameSite: 'Lax', secure: process.env.NODE_ENV === 'production' });
      Cookies.set('role', role, { expires: 7, sameSite: 'Lax', secure: process.env.NODE_ENV === 'production' });
    } else {
      // Save only accessToken and role without expiration
      Cookies.set('accessToken', accessToken, { sameSite: 'Lax', secure: process.env.NODE_ENV === 'production' });
      Cookies.set('role', role, { sameSite: 'Lax', secure: process.env.NODE_ENV === 'production' });
    }

    console.log('Saved cookies:', {
      accessToken: Cookies.get('accessToken'),
      refreshToken: Cookies.get('refreshToken'),
      role: Cookies.get('role'),
    });

    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    console.error("Login failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Login failed. Please try again.",
    };
  }
}
