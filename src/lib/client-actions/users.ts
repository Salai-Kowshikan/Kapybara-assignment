async function registerUser(values: {
  username: string;
  email: string;
  password: string;
}) {
  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to register user');
  }

  return response.json();
}

export { registerUser };
