export type NamedEntityRecognitionResult = {
    entity_group: string;
    score: number;
    word: string;
    start: number;
    end: number;
  };
  
  export type NamedEntityRecognitionResults = Array<NamedEntityRecognitionResult>;
  
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
      const eg = entityGroups[`${r.entity_group}`];
      if (eg)
        eg.push({ word: r.word, score: r.score, start: r.start, end: r.end });
      else
        entityGroups[`${r.entity_group}`] = [
          { word: r.word, score: r.score, start: r.start, end: r.end },
        ];
  
      const word = words[`${r.word}`];
      if (word)
        word.push({
          entity_group: r.entity_group,
          score: r.score,
          start: r.start,
          end: r.end,
        });
      else
        words[`${r.word}`] = [
          {
            entity_group: r.entity_group,
            score: r.score,
            start: r.start,
            end: r.end,
          },
        ];
    });
  
    const entityGroupKeys = Object.keys(entityGroups);
    const wordKeys = Object.keys(words);
  
    //create position Map for queries
    //const wordKeyPosMap = new Map(wordKeys.map((r, i) => [r, i]));
    const wordChartXmaxLength = wordKeys?.reduce(
      (p, c) => (p < words[c].length ? words[c].length : p),
      1,
    );
    //create apexcharts stacked series data format
    const wordStackedSeries = wordKeys.map((wordString) => {
      const series = {
        name: wordString,
        data: new Array<number>(entityGroupKeys.length).fill(0),
      };
      entityGroupKeys.forEach((entityGkey, index) => {
        const foundWordArr = entityGroups[entityGkey].filter(
          (r: { word: string }) => r.word === wordString,
        );
        if (foundWordArr?.length) {
          series.data[index] = foundWordArr.length;
        }
      });
      return series;
    });
  
    const texFontColor = "#212F3D";
    const returnDataStack = {
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
            colors: [texFontColor],
          },
          formatter: function (val:any, opt: any) {
            // console.log(opt.w.config.series[opt.seriesIndex].name)
            // return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
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
            formatter: function (_val:any, opt:any) {
              // console.log(opt.w.config.series[opt.seriesIndex].name)
              // return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
              const cwordName = opt.w.config.series[opt.seriesIndex].name
              const cWordData = words[cwordName]?.[0];
              if(cWordData) return `${Number(cWordData.score).toFixed(3)}`;
              return undefined
            },
          },
        },
      },
  
      series: wordStackedSeries,
    };
  
    const returnWordsData = {
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
            barHeight: "25%",
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
            colors: [texFontColor],
          },
          formatter: function (_val:any , opt:any) {
            const cWordData =
              words[opt.w.globals.labels[opt.dataPointIndex]]?.[0];
            // console.log(opt.w.globals.labels[opt.dataPointIndex])
            return `${cWordData.entity_group} score: ${Number(cWordData.score).toFixed(3)}`;
          },
          offsetX: -50,
          offsetY: 15,
        },
        tooltip: {
          y: {
            formatter: function (val:any) {
              return val
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
  