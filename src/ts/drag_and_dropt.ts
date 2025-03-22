const dropWarning = (v: string) => {
  console.log(
    `%c Compendium Drop Error: ${v}`,
    "color: orange; font-weight:bold"
  );
};

const dropAttrs = ["drop_name", "drop_data", "drop_content"];

// const handle_backgrounds = (page: CompendiumAttributes) => {
//   const attrs = ["occupation_tag", "description"];
//   const update = getStaticUpdate(attrs, page);
//   update["background"] = page.name;

//   //For demo
//   update["occupation_tag"] = page.data.tag;

//   try {
//     setAttrs(update, { silent: true });
//   } catch (e) {
//     dropWarning(`Error setting attributes: ${e}`);
//   }

//   console.log(page);
// };

const handle_drop = () => {
  getAttrs(dropAttrs, (v) => {
    if (!v.drop_name || !v.drop_data) {
      return;
    }

    const page: CompendiumAttributes = {
      name: v.drop_name,
      data: parseJSON(v.drop_data) ?? v.drop_data,
      content: v.drop_content,
    };

    const { Category } = page.data;

    switch (Category) {
      case "Creatures":
      // resetRepeatingRows(repeatingSections);
      // resetSkillList(page.data.skills);
      // handle_npc(page);
      case "Backgrounds":
        // handle_backgrounds(page);
        break;
      default:
        dropWarning(`Unknown category: ${Category}`);
    }

    setAttrs(
      {
        drop_name: "",
        drop_data: "",
        drop_content: "",
        drop_category: "",
      },
      {
        silent: true,
      }
    );
  });
};

["data"].forEach((attr) => {
  on(`change:drop_${attr}`, () => {
    handle_drop();
  });
});
