// src/lib/utils.ts
export const cn = (...inputs: any[]) => {
    return inputs
        .flat() // Flatten nested arrays
        .filter(Boolean) // Remove falsy values
        .join(" "); // Join with spaces
};