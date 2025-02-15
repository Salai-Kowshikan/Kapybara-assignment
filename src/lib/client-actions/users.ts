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
    throw new Error(errorData.message || "Failed to register user");
  }

  return response.json();
}

async function loginUser(values: { email: string; password: string }) {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to login user");
  }

  const data = await response.json();
  return data;
}

async function logoutUser() {
  const response = await fetch("/api/logout", {
    method: "POST",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to logout user");
  }

  return response.json();
}

async function getUsername() {
  const response = await fetch("/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch username");
  }

  const data = await response.json();
  return data;
}

export { registerUser, loginUser, logoutUser, getUsername };



