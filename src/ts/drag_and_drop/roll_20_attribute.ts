const roll20Attribute = (attr: string, value: string) => {
  //TODO: Review this to see if it is needed in MythCraft
  if (attr === "skill") {
    return `@{${createAttributeName(value)}}`;
  }

  return value;
};
