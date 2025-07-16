export const RenderLegend = (props) => {
  const { payload } = props;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "24px",
        marginTop: "20px",
        fontFamily: '"Plus Jakarta Sans"',
      }}
    >
      {payload.map((entry, index) => (
        <div
          key={`item-${index}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "3px",
              backgroundColor: entry.color,
            }}
          />
          <span
            style={{
              color: "#64748b",
              fontSize: "13px",
              fontWeight: "500",
              letterSpacing: "0.12px",
              textTransform: 'capitalize',
              fontFamily: 'Outfit',
              fontStyle: 'italic'
            }}
          >
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};
