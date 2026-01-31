const viewTabs = ["style-guide", "character", "npc"];
viewTabs.forEach((tab) => {
  on(`clicked:${tab}`, () => {
    console.log(`Switching to tab: ${tab}`);

    setAttrs({ sheet_type: tab });
  });
});
