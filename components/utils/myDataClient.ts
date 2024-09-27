import type { SessionWithJwt } from "../constants/types";


interface MyDataResponse {
  // id: number;
  // name: string;
  // email: string;
  // Adjust the fields based on your actual response structure
}


export default async function myData(session: SessionWithJwt): Promise<MyDataResponse> {
  const res = await fetch(`${process.env.API_URL}/api/users-permissions/users/myData`, {
    method: 'GET',
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session?.data?.jwt}`,
    }
  });

  if (!res.ok) {
    throw new Error(`Network response was not ok: ${res.statusText}`);
  }

  const data: MyDataResponse = await res.json();

  return data;
}
