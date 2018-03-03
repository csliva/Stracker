// @flow
import React, { Component } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';

class Analytics extends Component {

  victoryData = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000}
  ];

  //victory bar is being used. If no data is here, victory bar provides fallback data
  render() {
    return (
    <main>
      <p>Analytics and a csv export will be available here</p>
      <VictoryChart
        // domainPadding will add space to each side of VictoryBar to
        // prevent it from overlapping the axis
        domainPadding={20}
      >
        <VictoryAxis
          // tickValues specifies both the number of ticks and where
          // they are placed on the axis
          tickValues={[1, 2, 3, 4]}
          tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
        />
        <VictoryAxis
          dependentAxis
          // tickFormat specifies how ticks should be displayed
          tickFormat={(x) => (`$${x / 1000}k`)}
        />
        <VictoryBar
          data={this.victoryData}
          x="quarter"
          y="earnings"
        />
      </VictoryChart>
    </main>

    );
  }
}

export default Analytics;
