import users from "@/data/users.json";

export function validateUser(username: string, password: string): boolean {
  return users.some(
    (user) => user.username === username && user.password === password
  );
}
