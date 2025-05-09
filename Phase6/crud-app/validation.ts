export const validateName = (name: string): boolean => {
  return name.trim() !== "";
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateAge = (age: number): boolean => {
  return !isNaN(age) && age >= 0 && age <= 120;
};

export const validateUniqueEmail = async (email: string, connection): Promise<boolean> => {
  const [existingEmails] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);
  return existingEmails.length === 0;
};
