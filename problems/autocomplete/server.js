const items = [
    "okaxis",
    "BARODAMPAY",
    "rbl",
    "upi",
    "allbank",
    "aubank",
    "axisbank",
    "bandhan",
    "indus",
    "kbl",
    "federal",
    "sbi",
    "yesbank",
    "citi",
    "citigold",
    "dlb",
    "dbs",
    "freecharge",
    "hsbc",
    "icici",
    "kotak",
    "paytm",
    "ybl",
    "okhdfcbank",
    "okicici",
    "oksbi",
    "axl",
    "ibl",
    "sib",
];

async function searchProducts(searchQuery) {
    if (!searchQuery) return [];
    return items.filter((item) => {
      if (item.startsWith(searchQuery)) return item;
    });
  }
  
  export function debouncedSearchProducts(onSuccess, delay) {
    let timeoutId = null;
    return (searchQuery) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        const products = await searchProducts(searchQuery);
        onSuccess({ products, searchQuery });
      }, delay);
    };
  }