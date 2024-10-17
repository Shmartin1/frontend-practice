const items: string[] = [
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
  
  export async function fetchProductFromApi(): Promise<string[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(items);
      }, 500);
    });
  }
  
  export async function searchProducts(searchQuery: string): Promise<string[]> {
    if (!searchQuery) return [];
    return items.filter((item) => item.toLowerCase().startsWith(searchQuery.toLowerCase()));
  }
  
  export function debouncedSearchProducts(
    onSuccess: ({ products, searchQuery }: { products: string[]; searchQuery: string }) => void,
    delay: number
  ) {
    let timeoutId: NodeJS.Timeout | null = null;
    return (searchQuery: string) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        const products = await searchProducts(searchQuery);
        onSuccess({ products, searchQuery });
      }, delay);
    };
  }
  