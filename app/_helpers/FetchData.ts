import { cookies } from "next/headers";
import { decryptToken } from "./GlobalHelpers";

export default async function FetchData(api: string, paginationState: boolean) {
  try {
    const cookieStore = cookies();

    const cookieToken = await (
      await cookieStore
    ).get(`${process.env.NEXT_PUBLIC_TOKEN_NAME}`);
    const token = cookieToken && decryptToken(cookieToken.value);

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const url = `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}${api}`;

    const options: RequestInit = {
      method: "GET",
      credentials: "include", // ⬅️ عشان الكوكي يتبعت
      headers,
      cache: "no-store",
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    if (paginationState) {
      return {
        data: result.data || [],
        pagination: result.pagination || {},
      };
    }

    return result.data || [];
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    return { error: "Something went wrong while fetching data." };
  }
}
