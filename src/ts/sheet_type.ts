const sheetTypes = ["character", "npc", "style_guide"];
sheetTypes.forEach((v) => {
  on(`clicked:${v}`, () => {
    setAttrs({ sheet_type: v });
  });
});
