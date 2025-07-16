import "./Table.css";

const Table = ({ children }) => {
  return (
    <div className="table-container">
      <table>{children}</table>
    </div>
  );
};

Table.Head = ({ cols }) => {
  return (
    <thead>
      <tr className="header-table">
        {cols.map((val, i) => (
          <th key={i}>{val.title}</th>
        ))}
        <th>Actions</th>
      </tr>
    </thead>
  );
};

Table.Body = ({ children }) => <tbody>{children}</tbody>;

export default Table;
