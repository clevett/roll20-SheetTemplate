const repeatingSections = [
  "example-repeating-section",
  "example-attack-repeating-section",
];
repeatingSections.forEach((sectionName) => {
  const states = ["edit", "expand"];
  states.forEach((button) => {
    on(`clicked:repeating_${sectionName}:${button}`, (event) => {
      const { sourceAttribute } = event;
      const row = getFieldsetRow(sourceAttribute);

      getAttrs([`${row}_state`], (attrs) => {
        const state = attrs[`${row}_state`];

        const newState = state.includes(button)
          ? state.replace(button, "").trim()
          : `${state} ${button}`.trim();

        setAttrs({ [`${row}_state`]: newState });
      });
    });
  });
});
