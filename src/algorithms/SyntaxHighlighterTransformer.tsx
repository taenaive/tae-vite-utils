// spans={[
//     { start: 0, end: 7, type: 'person' },
//     { start: 8, end: 14, type: 'person' },
//     { start: 25, end: 34, type: 'date' },
//     { start: 38, end: 45, type: 'location' }
// ]}
// ents={[
//     { type: 'person', color: { r: 166, g: 226, b: 45 } },
//     { type: 'location', color: { r: 67, g: 198, b: 252 } },
//     { type: 'date', color: { r: 47, g: 187, b: 171 } }
// ]}

const colorDictionary = [
  { r: 166, g: 226, b: 45 },
  { r: 67, g: 198, b: 252 },
  { r: 47, g: 187, b: 171 },
  { r: 187, g: 47, b: 171 },
  { r: 187, g: 171, b: 47 },
];

export type NamedEntityRecognitionResult = {
  label: string;
  score?: number;
  text: string;
  start_char: number;
  end_char: number;
};

export type NamedEntityRecognitionResults = Array<NamedEntityRecognitionResult>;

/**
 * Function to change NER raw input data to Syntax Highlight ready datat.
 *
 * @function
 * @name NerChartTransform
 * @kind variable
 * @param {{ nerData: NamedEntityRecognitionResults | null }} { selectedIndex, nerData, }
 * @returns { spans: { start: number; end: number; type: string }[] ents: { type: string, color: { r: number, g: number, b: number } }[];}
 * @exports
 */
export const nerSyntaxHighlightTransform = (nerData: NamedEntityRecognitionResults | null) => {
  const entityGroups: any = {};
  const spans: { start: number; end: number; type: string }[] = [];
  nerData?.forEach((r) => {
    const eg = entityGroups[`${r.label}`];
    if (!eg) entityGroups[`${r.label}`] = {};
    spans.push({ start: r.start_char - 1, end: r.end_char - 1, type: r.label });
  });
  const entityGroupKeys = Object.keys(entityGroups);
  const ents: { type: string, color: { r: number, g: number, b: number } }[] = entityGroupKeys.map((value, index) => {
    return { type: value, color: colorDictionary[index % 5] };
  });

  return { spans, ents };
};
