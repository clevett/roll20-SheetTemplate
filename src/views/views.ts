const modes = ["edit_mode", "settings"];
modes.forEach((v) => {
  on(`clicked:${v}`, () => {
    getAttrs([`${v}`], (attrs) => {
      const current = attrs[v] || "off";
      const newValue = current === "on" ? "off" : "on";
      setAttrs({ [`${v}`]: newValue });
    });
  });
});
