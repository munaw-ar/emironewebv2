import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      className="overflow-x-auto rounded-lg border border-border/10"
    >
      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="bg-accent/5">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border/10 ${
                  col.isNumeric ? "font-mono" : ""
                }`}
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
              className={`${idx % 2 === 1 ? "bg-muted/30" : "bg-background"} hover:bg-muted/50 transition-colors`}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`px-4 py-3 text-sm text-foreground border-b border-border/5 ${
                    col.isNumeric ? "font-mono" : ""
                  }`}
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default DataTable;
