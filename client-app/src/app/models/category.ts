import { StrictIconProps } from "semantic-ui-react";

export interface ICategory {
  categories: string[];
}

export const categoryIcon = new Map<string, StrictIconProps["name"]>([
  ['Biology', 'dna'],
  ['Theology', 'book'],
  ['Computer-Science', 'code'],
  ['Hardware', 'microchip'],
  ['English', 'pencil alternate'],
  ['History', 'history'],
  ['Economics', 'money']
])