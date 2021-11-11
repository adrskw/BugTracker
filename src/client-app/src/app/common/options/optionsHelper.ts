import { SelectOption } from "./selectOption";

export function getOptionDisplayedName(options: SelectOption[], optionValue: string): string {
  return options.find(x => x.value === optionValue)!.displayedText;
}