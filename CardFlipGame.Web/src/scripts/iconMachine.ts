export class IconMachine {
  icons: string[];

  constructor() {
    this.icons = [
      "fas fa-cloud",
      "fas fa-cloud-bolt",
      "fas fa-sun",
      "fas fa-cloud-rain",
      "fas fa-cloud-sun",
      "fas fa-snowflake",
      "fas fa-wind",
      "fas fa-smog",
      "fas fa-tornado",
      "fas fa-umbrella",
      "fas fa-squirrel",
      "fas fa-acorn",
      "fas fa-tree",
      "fas fa-trees",
      "fas fa-bench-tree",
      "fas fa-leaf",
      "fas fa-seedling",
      "fas fa-carrot",
      "fas fa-lemon",
    ];
    this.icons = this.icons.sort(() => Math.random() - 0.5);
  }

  //pick a number of icons from the list
  getIcons(size: number): string[] {
    if (size > this.icons.length) {
      return this.icons;
    }
    return this.icons.slice(0, size);
  }
}

// enum IconMap {
//   cloudy = "fas fa-cloud",
//   lightningStorm = "fas fa-cloud-bolt",
//   sunny = "fas fa-sun",
//   raining = "fas fa-cloud-rain",
//   partlySunny = "fas fa-cloud-sun",
//   snowing = "fas fa-snowflake",
//   windy = "fas fa-wind",
//   foggy = "fas fa-smog",
// }
