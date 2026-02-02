const views = ["edit_mode", "settings"];
views.forEach((v) => {
  on(`clicked:${v}`, () => {
    getAttrs([`${v}`], (attrs) => {
      const current = attrs[v] || "off";
      const newValue = current === "on" ? "off" : "on";
      setAttrs({ [`${v}`]: newValue });
    });
  });
});
