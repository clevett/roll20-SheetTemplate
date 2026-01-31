const getFieldsetRow = (sourceAttribute: string) => {
  const split = sourceAttribute.split("_");
  //Fieldset class will be repeating_groupname_reprowid_attrName
  //returns repeating_groupname_reprowid
  return `${split[0]}_${split[1]}_${split[2]}`;
};
