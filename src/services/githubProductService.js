const GITHUB_PRODUCTS_URL =
  "https://raw.githubusercontent.com/Drevyar/myapp/main/products.json";

export async function fetchGithubProducts() {
  const response = await fetch(GITHUB_PRODUCTS_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return await response.json();
}