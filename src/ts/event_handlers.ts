//    console.log(`%c On change ${tab}`, "color: blue; font-weight: bold;");

const viewTabs = ["style_guide", "character", "npc"];
viewTabs.forEach((tab) => {
  on(`clicked:${tab}`, () => {
    setAttrs({ sheet_type: tab });
  });
});
