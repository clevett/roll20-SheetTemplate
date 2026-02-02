const sheetTypes = ["character", "npc"];
sheetTypes.forEach((v) => {
  on(`clicked:${v}`, () => {
    setAttrs({ sheet_type: v });
  });
});
