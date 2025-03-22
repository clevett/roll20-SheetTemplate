const getStaticUpdate = (attrs: string[], page: CompendiumAttributes) => {
  let update: { [key: string]: AttributeContent } = {};

  attrs.forEach((attr) => {
    //@ts-expect-error indexing error that should be fixed
    if (page?.[attr] ?? page?.data?.[attr]) {
      //@ts-expect-error indexing error that should be fixed
      update[attr] = page[attr] ?? roll20Attribute(attr, page.data[attr]);
    }
  });

  return update;
};
