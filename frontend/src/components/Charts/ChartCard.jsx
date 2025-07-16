export const ChartCard = ({ title, children, chartRef = null, wFull = false }) => (
  <div
    style={{
      backgroundColor: "white",
      padding: "28px 0px",
      paddingRight: '14px',
      borderRadius: "16px",
      border: "0.0000001px solid rgba(0,0,0,0.1)",
      height: "100%",
      flexGrow: '1',
      width: `${wFull ? '50%' : '400px'}`
    }}
    ref={chartRef}
  >
    <h3
      style={{
        marginBottom: "45px",
        fontSize: "18px",
        fontWeight: "600",
        color: "#0f172a",
        fontFamily: '"Outfit"',
        letterSpacing: "0.2px",
        fontStyle: "italic",
        marginLeft: '37px',
        opacity: '0.80'
      }}
    >
      {title}
    </h3>
    {children}
  </div>
);