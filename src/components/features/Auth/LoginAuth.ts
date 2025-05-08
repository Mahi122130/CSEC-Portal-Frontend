'use client';

import { FormData } from "@/components/features/Validation/LoginValidate";
import Cookies from "js-cookie";

export async function handleLogin(data: FormData) {
  const API_URL = `${process.env.NEXT_PUBLIC_API_ENDPOINT}auth/login`;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const responseData = await response.json();
    const { accessToken, refreshToken, user } = responseData;
    const role = user?.role || null;

    const cookieOptions = {
      path: '/',
      sameSite: 'lax' as const,
      secure: process.env.NODE_ENV === 'production',
      ...(data.rememberMe ? { expires: 7 } : { expires: 1 }),
    };

    Cookies.set('accessToken', accessToken, cookieOptions);
    if (refreshToken) Cookies.set('refreshToken', refreshToken, cookieOptions);
    if (role) Cookies.set('role', role, cookieOptions);
    if (user) localStorage.setItem('user', JSON.stringify(user));

    return { success: true, data: responseData };
  } catch (error) {
    console.log("Login error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Login failed. Please try again.",
    };
  }
}