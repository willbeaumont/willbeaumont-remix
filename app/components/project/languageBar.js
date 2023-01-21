import { VictoryBar, VictoryLegend, VictoryStack, VictoryTheme } from "victory";

const colorSet = "qualitative";

const LanguageBar = ({ data }) => {
  return data ? (
    <>
      <VictoryStack
        height={100}
        theme={VictoryTheme.material}
        colorScale={colorSet}
        range={{ x: [20, 330], y: [50, 250] }}
      >
        {data.map((o, id) => (
          <VictoryBar
            horizontal
            key={`bar-${id}`}
            data={[o]}
            x="name"
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
