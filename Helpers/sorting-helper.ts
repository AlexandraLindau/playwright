import { SortingOption } from '../PageObjects/ProductsPage';

export function sortByPrice(prices: string[], asc: boolean): string[] {
  return prices.map((element) => Number(element.replace('$', ''))).sort((a, b) => (asc ? a - b : b - a)).map((element) => `$${element}`);
}

export function sortByName(names: string[], asc: boolean): string[] {
  return names.sort((a, b) => (asc ? a.localeCompare(b) : b.localeCompare(a)));
}

export function calculateExpectedSorting(data: string[], sorting: SortingOption): string[] {
  switch (sorting) {
    case 'lohi': return sortByPrice(data, true);
    case 'hilo': return sortByPrice(data, false);
    case 'az': return sortByName(data, true);
    case 'za': return sortByName(data, false);
    default: throw new Error(`Invalid parameter: ${sorting}`);
  }
}
