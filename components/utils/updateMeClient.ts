import type { SessionWithJwt } from "../constants/types";
/**
 * 
 * @param {} fields 
 * e.g. {
 *  confirmed: true,
  * progressData: {
  *    completedModules: [ { lessonModule: 1.01, examScore: 0.5 } ]
  * }
 * }
 */

export default async function updateMe(fields: {}, session: SessionWithJwt) {
  const res = await fetch(
    `${process.env.API_URL}/api/users-permissions/users/me`, {
      method: 'PUT',
      body: JSON.stringify(fields),
      headers: { 
        "Content-Type": "application/json" ,
        "Authorization": `Bearer ${session?.data?.jwt}`,
      }
    }
  );

  return res;
}