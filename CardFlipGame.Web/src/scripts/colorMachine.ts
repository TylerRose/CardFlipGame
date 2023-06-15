export class ColorMachine {
  colors: string[];

  constructor() {
    this.colors = [
      "red",
      "red-accent-3",
      "pink",
      "pink-accent-4",
      "purple",
      "purple-accent-3",
      "deep-purple",
      "deep-purple-accent-2",
      "indigo",
      "indigo-accent-4",
      "blue",
      "blue-accent-4",
      "light-blue",
      "cyan",
      "cyan-accent-3",
      "teal",
      "teal-accent-3",
      "green",
      "green-accent-4",
      "light-green-darken-1",
      "amber-darken-2",
      "orange",
      "orange-accent-4",
      "deep-orange",
      "deep-orange-accent-4",
      "blue-grey",
      "purple-darken-4",
      "pink-darken-4",
      "indigo-darken-4",
      "blue-darken-4",
      "green-darken-4",
      "teal-darken-4",
      "red-darken-4",
      "orange-darken-4",
      "purple-accent-4",
    ];
  }

  //pick a number of icons from the list
  getColors(size: number): string[] {
    this.colors = this.colors.sort(() => Math.random() - 0.5);
    if (size > this.colors.length) {
      return this.colors;
    }
    return this.colors.slice(0, size);
  }
}
