//- Array is in pug, ts, and scss - keep in sync
const tabs = ["main", "combat", "magic"];
tabs.forEach((tab) => {
  on(`clicked:${tab}`, () => {
    setAttrs({ character_tab: tab });
  });
});
