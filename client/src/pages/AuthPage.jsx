import { useState } from "react";
import {login} from '../features/auth/authSlice';
import { useDispatch } from "react-redux";
import API from "../api/axios";
const AuthPage = () => {

  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [err, setErr] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    const form = e.target;

    const name = form.name?.value;
    const email = form.email.value;
    const password = form.password.value;

    try{
      const res = await API.post(`/auth/${isLogin ? 'login': 'signup'}`, {name, email, password});

      const data = res.data;
      // dispatch payload containing token&user to redux store
      dispatch(login({ 
        token: data.data.token, 
        user: data.data.user 
      }));
    }catch(error){
      setErr(err.response?.data?.message 
        || 'Something went wrong. Please try again.'
      );
    }

    // TODO:
    // if (isLogin) call login API
    // else call signup API

  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div
        className="
          w-full
          max-w-md
          bg-darkBlue/95
          border border-golden/30
          rounded-2xl
          shadow-2xl
          p-8
        "
      >
        <div className="flex justify-center mb-5">
          <div className="h-1 w-16 bg-golden rounded-full" />
        </div>

        <h1 className="text-3xl font-bold text-golden text-center">
          Expense Tracker
        </h1>

        <p className="text-center text-cream/70 mt-2 mb-8">
          {isLogin
            ? "Welcome back. Sign in to manage your expenses."
            : "Create an account and start tracking smarter."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-cream text-sm mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                required={!isLogin}
                className="
                  w-full
                  bg-black/30
                  border border-oliveGreen/30
                  rounded-lg
                  px-4
                  py-3
                  text-cream
                  placeholder:text-cream/40
                  focus:outline-none
                  focus:border-golden
                "
              />
            </div>
          )}

          <div>
            <label className="block text-cream text-sm mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="
                w-full
                bg-black/30
                border border-oliveGreen/30
                rounded-lg
                px-4
                py-3
                text-cream
                placeholder:text-cream/40
                focus:outline-none
                focus:border-golden
              "
            />
          </div>

          <div>
            <label className="block text-cream text-sm mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              minLength={6}
              autoComplete="password"
              className="
                w-full
                bg-black/30
                border border-oliveGreen/30
                rounded-lg
                px-4
                py-3
                text-cream
                placeholder:text-cream/40
                focus:outline-none
                focus:border-golden
              "
            />
          </div>

          <button
            type="submit"
            className="
              w-full
              bg-golden
              text-darkBlue
              font-semibold
              py-3
              rounded-lg
              transition-all
              duration-200
              hover:scale-[1.02]
            "
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          {isLogin ? (
            <p className="text-cream/60">
              First time here?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="text-golden hover:underline font-medium"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p className="text-cream/60">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="text-golden hover:underline font-medium"
              >
                Sign In
              </button>
            </p>
          )}
        </div>

        <p className="text-center text-cream/40 text-sm mt-6">
          Track. Analyze. Improve.
        </p>
      </div>
    </div>
  );
};

export default AuthPage;