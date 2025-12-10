import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { signUp } from "../service/api/authService";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const resp = await signUp(form);
      console.log("Signup successful:", resp.data);
      toast.success("Signup successful");
    } catch (err) {
      setError(err.response?.data?.error?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;


    let newValue = null ;
    // phone number can be contains digits only
    if (name === "phoneNumber") {
      newValue = value.replace(/[^0-9+]/g, "");
    }

    setForm((prev) => ({
      ...prev,
      [name]: newValue ?? value,
    }));
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-4 border rounded">
      <Toaster position="top-right" />

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="border p-2 w-full rounded"
            required
            minLength={2}
            maxLength={50}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            placeholder="your@email.com"
            className="border p-2 w-full rounded"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={form.password}
            onChange={handleInputChange}
            placeholder="Enter password"
            className="border p-2 w-full rounded"
            required
            minLength={6}
            maxLength={20}
          />
          <span
            className="absolute right-3 top-9 cursor-pointer text-xl"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleInputChange}
            placeholder="+91 9876543210"
            className="border p-2 w-full rounded"
            required
            inputMode="numeric"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
      </form>
    </div>
  );
};

export default SignUp;
