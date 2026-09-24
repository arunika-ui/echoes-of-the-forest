/** Human-readable file size. */
export const mb = (bytes: number) => (bytes >= 1e6 ? `${(bytes / 1e6).toFixed(2)} MB` : `${Math.round(bytes / 1e3)} KB`)
