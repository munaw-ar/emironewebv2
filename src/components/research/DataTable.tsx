interface Column {
  key: string;
  header: string;
  isNumeric?: boolean;
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, string | number>[];
}

const DataTable = ({ columns, data }: DataTableProps) => {
  return (
    <div
      className="reveal glass"
      style={{ overflowX: "auto", padding: 0 }}
    >
      <table className="stack-table" style={{ width: "100%", minWidth: 600, borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "var(--paper-2)" }}>
            {columns.map((col) => (
              <th
                key={col.key}
                className={col.isNumeric ? "tnum" : ""}
                style={{
                  padding: "var(--s3) var(--s3)",
                  textAlign: "left",
                  fontFamily: "var(--body)",
                  fontSize: "var(--step--1)",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "var(--mid)",
                  borderBottom: "1px solid var(--rule)",
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              style={{ background: idx % 2 === 1 ? "var(--rule-2)" : "var(--paper)" }}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  data-label={col.header}
                  className={col.isNumeric ? "tnum" : ""}
                  style={{
                    padding: "var(--s3) var(--s3)",
                    fontFamily: "var(--body)",
                    fontSize: "var(--step-0)",
                    color: "var(--ink)",
                    borderBottom: "1px solid var(--rule-2)",
                  }}
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
