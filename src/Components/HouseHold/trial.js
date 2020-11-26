constructor() {
    super();
    this.state = {index: null};
  }
  render() {
    const {index} = this.state;
    const data = scatterPlotData.map((d, i) => ({...d, color: i === index ? 1 : 0}));
    return <XYPlot
      colorDomain={[0, 1]}
      onMouseLeave={() => this.setState({index: null})}
    >
      <MarkSeries
        data={data}
        stroke="white"
        onNearestXY={(datapoint, {index}) => this.setState({index})}
      />
    </XYPlot>