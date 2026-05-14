export const uid = () => "CP-" + Math.random().toString(36).slice(2, 10).toUpperCase();

export const fmtD = (d) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const trunc = (str, n) => (str && str.length > n ? str.slice(0, n) + "…" : str);
