export function truncateText(text, maxLength = 120) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function formatPrice(price) {
  return price.replace(/\d/g, (d) => new Intl.NumberFormat('th-TH').format(parseInt(d)));
}