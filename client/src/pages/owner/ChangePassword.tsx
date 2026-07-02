import { useState } from "react";
import { changePassword } from "../../api/owner";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await changePassword({
        currentPassword,
        newPassword,
      });

      alert(
        "Password updated successfully."
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      alert(
        err.response?.data?.message ??
          "Unable to update password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow">

      <h1 className="mb-6 text-3xl font-bold">
        Change Password
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <div>
          <label className="mb-2 block font-medium">
            Current Password
          </label>

          <input
            type="password"
            className="w-full rounded border p-3"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(
                e.target.value
              )
            }
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            New Password
          </label>

          <input
            type="password"
            className="w-full rounded border p-3"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Confirm Password
          </label>

          <input
            type="password"
            className="w-full rounded border p-3"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 py-3 text-white"
        >
          {loading
            ? "Updating..."
            : "Update Password"}
        </button>

      </form>

    </div>
  );
};

export default ChangePassword;