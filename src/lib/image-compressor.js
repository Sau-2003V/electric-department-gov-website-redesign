/* eslint-disable no-console */
import imageCompression from "browser-image-compression";

/**
 * Format bytes to readable string (e.g. 1.2 MB or 340 KB)
 */
export function formatBytes(bytes) {
  if (!bytes || bytes === 0) return "0 KB";
  const k = 1024;
  if (bytes < k * k) {
    return `${Math.max(1, Math.round(bytes / k))} KB`;
  }
  return `${(bytes / (k * k)).toFixed(1)} MB`;
}

/**
 * Compresses an image file and converts it into `.webp` format.
 * Uses Web Workers for background non-blocking compression.
 *
 * @param {File} file - Original image file from input
 * @param {object} [customOptions] - Optional overrides for compression
 * @returns {Promise<{ file: File, previewUrl: string, name: string, originalSizeBytes: number, compressedSizeBytes: number, originalSize: string, compressedSize: string }>}
 */
export async function compressAndConvertToWebP(file, customOptions = {}) {
  const originalSizeBytes = file.size;
  const originalSize = formatBytes(originalSizeBytes);

  // Derive new webp filename (e.g. photo.jpg -> photo.webp)
  const baseName = file.name.replace(/\.[^/.]+$/, "");
  const webpName = `${baseName}.webp`;

  const options = {
    maxSizeMB: 0.8, // Target max ~800KB
    maxWidthOrHeight: 1600, // Max dimension
    useWebWorker: true,
    fileType: "image/webp",
    initialQuality: 0.8,
    ...customOptions,
  };

  try {
    const compressedBlob = await imageCompression(file, options);
    // Create a new File instance with webp extension and mime type
    const compressedFile = new File([compressedBlob], webpName, {
      type: "image/webp",
      lastModified: Date.now(),
    });

    const compressedSizeBytes = compressedFile.size;
    const compressedSize = formatBytes(compressedSizeBytes);
    const previewUrl =
      typeof URL !== "undefined" ? URL.createObjectURL(compressedFile) : null;

    return {
      file: compressedFile,
      previewUrl,
      name: webpName,
      originalSizeBytes,
      compressedSizeBytes,
      originalSize,
      compressedSize,
    };
  } catch (err) {
    console.warn("Fast WebP compression fallback to standard canvas:", err);
    // Graceful fallback if Web Worker encounters an issue in edge environments
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let { width, height } = img;
          const maxDim = 1600;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error("Canvas conversion failed"));
                return;
              }
              const webpFile = new File([blob], webpName, {
                type: "image/webp",
                lastModified: Date.now(),
              });
              resolve({
                file: webpFile,
                previewUrl: URL.createObjectURL(webpFile),
                name: webpName,
                originalSizeBytes,
                compressedSizeBytes: webpFile.size,
                originalSize,
                compressedSize: formatBytes(webpFile.size),
              });
            },
            "image/webp",
            0.8
          );
        };
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  }
}
