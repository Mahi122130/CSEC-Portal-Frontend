'use client';

import { FormData } from "@/components/features/Validation/LoginValidate";
import Cookies from "js-cookie";

export async function handleLogin(data: FormData) {
  const API_URL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}auth/login`;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
      credentials: "include",
    });

    const responseData = await response.json();
    console.log('FULL login response:', responseData);

    const accessToken = responseData.accessToken;
    const refreshToken = responseData.refreshToken || null;
    const role = responseData.user?.role || null;

    if (!accessToken || !role) {
      throw new Error("Missing access token or role from server.");
    }

    // Set cookies based on rememberMe flag from the form data
    if (data.rememberMe) {
      Cookies.set('accessToken', accessToken, { expires: 7, sameSite: 'Lax', secure: process.env.NODE_ENV === 'production' });
      Cookies.set('refreshToken', refreshToken, { expires: 7, sameSite: 'Lax', secure: process.env.NODE_ENV === 'production' });
      Cookies.set('role', role, { expires: 7, sameSite: 'Lax', secure: process.env.NODE_ENV === 'production' });
    } else {
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