import { VictoryBar, VictoryLegend, VictoryStack, VictoryTheme } from "victory";

const colorSet = "qualitative";

const LanguageBar = ({ data }) => {
  return data ? (
    <>
      <VictoryStack
        height={100}
        theme={VictoryTheme.material}
        colorScale={colorSet}
      >
        {data.map((o, id) => (
          <VictoryBar
            horizontal
            key={`bar-${id}`}
            data={[o]}
            x="language"
            y="value"
          />
        ))}
      </VictoryStack>
      <VictoryLegend
        height={30}
        theme={VictoryTheme.material}
        colorScale={colorSet}
        gutter={20}
        data={data}
        style={{ labels: { fill: "white" } }}
        orientation="horizontal"
      />
    </>
  ) : (
    <></>
  );
};

export default LanguageBar;
