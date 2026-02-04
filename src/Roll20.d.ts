// Type definitions for Roll20 built-in functions and variables
// Definitions by: Karl Erik Hofseth https://github.com/Karlinator
declare type EventInfo = {
  newValue: string;
  previousValue: string;
  removedInfo?: { [key: string]: AttrValue };
  sourceAttribute: string;
  sourceType: string;
  triggerName: string;
  htmlAttributes?: { [key: string]: string }; //Action buttons
};

declare type AttrValue = string | number | boolean;

declare type Attrs = { [key: string]: AttrValue };

declare type Attributes = string[];

declare type Ids = string[];

declare function getAttrs(
  attributes: Attributes,
  callback?: (values: { [key: string]: string }) => void,
): void;

declare function setAttrs(
  values: { [key: string]: AttrValue },
  options?: { silent?: boolean },
  callback?: (values: { [key: string]: string }) => void,
): void;

declare function getSectionIDs(
  section_name: string,
  callback: (values: Ids) => void,
): void;

declare function generateRowID(): string;

declare function removeRepeatingRow(RowID: string): void;

declare function getTranslationByKey(key: string): string | false;

declare function getTranslationLanguage(): string;

declare type TokenValues = {
  bar1_link?: string | number;
  bar1_max?: string | number;
  bar1_value?: string | number;
  bar2_link?: string | number;
  bar2_max?: string | number;
  bar2_value?: string | number;
  bar3_link?: string | number;
  bar3_max?: string | number;
  bar3_value?: string | number;
  width: number;
  height: number;
  light_radius?: number;
};

declare function setDefaultToken(values: TokenValues): void;

declare function on(
  event: string,
  callback: (eventInfo: EventInfo) => void,
): void;

//- Drag & Drop
declare type CompendiumAttributes = {
  name: string;
  data: {
    Category: string;
    blobs: { [key: string]: unknown };
    expansion: number;
    //- This custom data added by the compendium owner
    [key: string]: string;
  };
  content: string;
};

declare function startCharactermancer(arg: string): unknown;

declare function finishCharactermancer(): unknown;

declare function getCharmancerData(): {
  [key: string]: {
    data: {
      blobs: { [key: string]: unknown };
      [key: string]: string;
    };
    values: { [key: string]: string };
  };
};

declare function changeCompendiumPage(
  iframeClass: string,
  pageName: string,
): void;

declare function getCompendiumPage(
  pageName: string,
  callback: (data: CompendiumAttributes) => void,
): void;

declare function showChoices(classNames: string[]): void;

declare function hideChoices(classNames: string[]): void;

declare function deleteCharmancerData(
  slides: string[],
  callback?: () => void,
): void;

declare function setCharmancerOptions(
  className: string,
  selectOptions: string,
  settings: {
    add: string[];
    category: string;
    disable?: string[];
    selected?: string;
    show_source?: boolean;
  },
  callback?: () => void,
): void;
