import { unparse } from "papaparse";
import { downloadFile } from "./downloadFile";

export interface DownloadCSVFileProps {
  data: unknown[];
  filename: string;
}

export function downloadCSVFile({ data, filename }: DownloadCSVFileProps) {
  const content = unparse(data);
  downloadFile({
    content,
    filename,
    mimeType: "text/csv;charset=utf-8;",
  });
}
