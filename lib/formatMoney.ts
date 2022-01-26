const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "NOK",
});

export default function formatMoney(cents: number) {
  const dollars = cents / 100;
  return formatter.format(dollars);
}
