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
      "fas fa-bolt",
      "fas fa-bug",
      "fas fa-robot",
      "fas fa-rocket",
      "fas fa-crown",
      "fas fa-gift",
      "fas fa-dove",
      "fas fa-fish-fins",
      "fas fa-eye",
      "fas fa-diamond",
      "fas fa-gem",
      "fas fa-atom",
      "fas fa-biohazard",
      "fas fa-bomb",
      "fas fa-bone",
    ];
    // TODO: Create topic-specific icon sets.
  }

  //pick a number of icons from the list
  getIcons(size: number): string[] {
    this.icons = this.icons.sort(() => Math.random() - 0.5);
    if (size > this.icons.length) {
      return this.icons;
    }
    return this.icons.slice(0, size);
  }
}
