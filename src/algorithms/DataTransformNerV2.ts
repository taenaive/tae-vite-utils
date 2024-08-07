import { ApexOptions } from "apexcharts";
export type NamedEntityRecognitionResult = {
    label: string;
    score?: number;
    text: string;
    start_char: number;
    end_char: number;
  };
  
  export type NamedEntityRecognitionResults = Array<NamedEntityRecognitionResult>;
  
  /**
   * Function to change NER raw input data to Apex Chart ready datat. 
   * 
   * @function
   * @name NerChartTransform
   * @kind variable
   * @param {{ selectedIndex: number nerData: NamedEntityRecognitionResults | null }} { selectedIndex, nerData, }
   * @returns {{ options: { chart: { id: string; type: string; }; plotOptions: { bar: { borderRadius: number; borderRadiusApplication: string; horizontal: boolean; barHeight: string; }; }; xaxis: { categories: string[]; stepSize: number; max: number; }; colors: string[]; dataLabels: { ...; }; tooltip: { ...; }; }; series: { ...; }[]; } | { ...; }}
   * @exports
   */
  export const NerChartTransform = ({
    selectedIndex,
    nerData,
  }: {
    selectedIndex: number;
    nerData: NamedEntityRecognitionResults | null;
  }) => {
    const entityGroups: any = {};
    const words: any = {};
    nerData?.forEach((r) => {
      const eg = entityGroups[`${r.label}`];
      if (eg)
        eg.push({ word: r.text, score: r.score, start: r.start_char, end: r.end_char });
      else
        entityGroups[`${r.label}`] = [
          { word: r.text, score: r.score, start: r.start_char, end: r.end_char },
        ];
      const word = words[`${r.text}`];
      if (word)
        word.push({
          label: r.label,
          score: r.score,
          start: r.start_char,
          end: r.end_char,
        });
      else
        words[`${r.text}`] = [
          {
            label: r.label,
            score: r.score,
            start: r.start_char,
            end: r.end_char,
          },
        ];
    });
    const entityGroupKeys = Object.keys(entityGroups);
    const wordKeys = Object.keys(words);
    const wordChartXmaxLength = wordKeys?.reduce(
      (p, c) => (p < words[c].length ? words[c].length : p),
      1
    );
    //create apexcharts stacked series data format
    const wordStackedSeries = wordKeys.map((wordString) => {
      const series = {
        name: wordString,
        data: new Array<number>(entityGroupKeys.length).fill(0),
      };
      entityGroupKeys.forEach((entityGkey, index) => {
        const foundWordArr = entityGroups[entityGkey].filter(
          (r: { word: string }) => r.word === wordString
        );
        if (foundWordArr?.length) {
          series.data[index] = foundWordArr.length;
        }
      });
      return series;
    });
    //Stacked chart view data
    const returnDataStack: {options: ApexOptions, series: ApexOptions["series"]} = {
      options: {
        chart: {
          id: "basic-bar",
          type: "bar",
          stacked: true,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            borderRadiusApplication: "end",
            horizontal: false,
            columnWidth: "98%",
          },
        },
        colors: [
          "#33b2df",
          "#546E7A",
          "#d4526e",
          "#13d8aa",
          "#A5978B",
          "#2b908f",
          "#f9a3a4",
          "#90ee7e",
          "#f48024",
          "#69d2e7",
        ],
        dataLabels: {
          enabled: true,
          textAnchor: "middle",
          style: {
            colors: ["#212F3D"],
          },
          formatter: function (val:any, opt:any) {
            return `${opt.w.config.series[opt.seriesIndex].name}: ${val}`;
          },
          offsetX: 0,
          offsetY: 0,
        },
        xaxis: {
          categories: entityGroupKeys,
        },
        yaxis: {
          stepSize: 1,
        },
        tooltip: {
          y: {
            formatter: function (_val:any , opt:any) {
              const cwordName = opt.w.config.series[opt.seriesIndex].name;
            //   const cWordData = words[cwordName]?.[0];
            //   if (cWordData) return `${Number(cWordData.score).toFixed(3)}`;
            //   return '';
            return cwordName
            },
          },
        },
      },
      series: wordStackedSeries,
    };
    // words chart data
    const returnWordsData: {options:ApexOptions, series: ApexOptions["series"]} = {
      options: {
        chart: {
          id: "basic-bar2",
          type: "bar",
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            borderRadiusApplication: "end",
            horizontal: true,
            barHeight: "50%",
          },
        },
        xaxis: {
          categories: wordKeys,
          stepSize: 1,
          max: wordChartXmaxLength,
        },
        colors: ["#1976d2"],
        dataLabels: {
          enabled: true,
          textAnchor: "start",
          style: {
            colors: ["#EBF5FB"],
          },
          formatter: function (_val:any , opt:any) {
            const cWordData =
              words[opt.w.globals.labels[opt.dataPointIndex]]?.[0];
            return `${cWordData.label}` 
            // score: ${Number(
            //   cWordData.score
            // ).toFixed(3)}`;
          },
          offsetX: -50,
          offsetY: 0,
        },
        tooltip: {
          y: {
            formatter: function (val:any) {
              return val;
            },
          },
        },
      },
      series: [
        {
          name: "Occurences",
          data: wordKeys?.map((r) => words[r].length),
        },
      ],
    };
    return selectedIndex === 0 ? returnWordsData : returnDataStack;
  };
  
