"use client";

import { useRef, useState } from "react";

interface ImageUploadProps {
  value: string;           // current URL (stored in form state)
  onChange: (url: string) => void;
  bucket?: string;         // Supabase Storage bucket name, defaults to "images"
  folder?: string;         // subfolder within the bucket, e.g. "blog" or "employees"
  label?: string;
}

export default function ImageUpload({
  value,
  onChange,
  bucket = "images",
  folder = "uploads",
  label = "Image",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError("");
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", bucket);
    formData.append("folder", folder);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    const json = await res.json();

    if (!res.ok || json.error) {
      setUploadError(json.error ?? "Upload failed");
      setUploading(false);
      return;
    }

    onChange(json.url);
    setUploading(false);
  }

  function handleClear() {
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {value ? (
        <div className="relative inline-block">
          <img
            src={value}
            alt="Preview"
            className="h-32 w-auto rounded-lg border border-gray-200 object-cover"
          />
          <button
            type="button"
            onClick={handleClear}
            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gray-900 text-white text-xs flex items-center justify-center hover:bg-red-600 transition-colors"
            aria-label="Remove image"
          >
            ✕
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors"
        >
          {uploading ? (
            <span className="text-sm text-gray-500">Uploading…</span>
          ) : (
            <>
              <svg className="w-7 h-7 text-gray-400 mb-1.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <span className="text-sm text-gray-500">Click to upload</span>
              <span className="text-xs text-gray-400 mt-0.5">PNG, JPG, WebP</span>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {uploadError && (
        <p className="text-xs text-red-600">{uploadError}</p>
      )}
    </div>
  );
}
