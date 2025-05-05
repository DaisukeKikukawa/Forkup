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
