import { useState } from "react";

interface Props {
  open: boolean;
  initialRating?: number;
  onClose: () => void;
  onSubmit: (rating: number) => void;
}

const RatingModal = ({
  open,
  initialRating = 0,
  onClose,
  onSubmit,
}: Props) => {
  const [rating, setRating] =
    useState(initialRating);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-md rounded-lg bg-white p-6">

        <h2 className="mb-6 text-2xl font-bold">
          Rate Store
        </h2>

        <select
          className="w-full rounded border p-3"
          value={rating}
          onChange={(e) =>
            setRating(Number(e.target.value))
          }
        >
          <option value={1}>1 ⭐</option>
          <option value={2}>2 ⭐⭐</option>
          <option value={3}>3 ⭐⭐⭐</option>
          <option value={4}>4 ⭐⭐⭐⭐</option>
          <option value={5}>5 ⭐⭐⭐⭐⭐</option>
        </select>

        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={() => onSubmit(rating)}
            className="rounded bg-blue-600 px-5 py-2 text-white"
          >
            Save
          </button>

        </div>

      </div>

    </div>
  );
};

export default RatingModal;