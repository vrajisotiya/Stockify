import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { verifyEmailCode } from "../features/auth/authThunks";

const EmailVerification = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading, verificationStatus, error } = useSelector(
    (state) => state.auth
  );

  const handleChange = (index, value) => {
    const newCode = [...code];

    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      // Focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input field if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    dispatch(verifyEmailCode(verificationCode));
  };

  useEffect(() => {
    if (verificationStatus === "success") {
      toast.success("Email verified successfully!");
      navigate("/");
    }
  }, [verificationStatus, navigate]);

  // Auto submit when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      const verificationCode = code.join("");
      dispatch(verifyEmailCode(verificationCode));
    }
  }, [code, dispatch]);

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-8 min-h-screen">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Verify Your Email
          </h1>
          <p className="text-lg text-gray-600">
            Enter the 6-digit code sent to your email address
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {error && (
            <div className="p-4 mb-6 bg-red-50 text-red-700 rounded-lg text-sm">
              <div className="flex">
                <div className="ml-3">
                  <p className="font-medium">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between gap-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="6"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl font-medium border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading || code.some((digit) => !digit)}
              className="w-auto flex justify-center items-center py-3 px-4 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify Email"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
