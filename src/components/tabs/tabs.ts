const tabs = ["style_guide", "character", "npc"];
tabs.forEach((tab) => {
  on(`clicked:${tab}`, () => {
    console.log(`Switching to tab: ${tab}`);

    setAttrs({ sheet_type: tab });
  });
});
