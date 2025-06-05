import React from "react";

const LoginPage = ({ onLogin }) => {
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);
    localStorage.setItem("isLoggedIn", "true");
    onLogin();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow">
        <h2 className="text-xl mb-4">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="block mb-2 border p-2 w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="block mb-4 border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
