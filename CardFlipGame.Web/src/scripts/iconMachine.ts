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
      "fas fa-house",
      "fas fa-tree",
      "fas fa-lemon",
      "fas fa-heart",
      "fas fa-face-smile",
      "fas fa-ghost",
      "fas fa-umbrella",
      "fas fa-book",
      "fas fa-droplet",
      "fas fa-fire",
      "fas fa-key",
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
