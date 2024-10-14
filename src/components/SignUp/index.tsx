import { useState } from "react";
import { EyeOffOutline, EyeOutline } from "react-ionicons";
import { useSignUp } from "../../hooks/useRegister";
import { useNavigate } from "react-router-dom";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role] = useState("ROLE_ADMIN");
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, loading, error, success } = useSignUp();
  const navigate = useNavigate(); 
  

  const handleSignUp = () => {
    signUp(email, password, confirmPassword, role);
    if (success) {
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-5">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Cadastre-se!
        </h2>
        <div className="mb-4">
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOffOutline color={"#555"} /> : <EyeOutline color={"#555"} />}
          </div>
        </div>
        <div className="mb-6 relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">Sign up successful!</p>}

        <button
          onClick={handleSignUp}
          className={`w-full py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-500 transition duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Já tem uma conta?
          </p>
          <button
            onClick={() => navigate("/login")}
            className="text-indigo-600 hover:underline text-sm font-medium"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpScreen;
