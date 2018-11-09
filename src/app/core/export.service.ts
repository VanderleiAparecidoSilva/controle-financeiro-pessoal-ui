import { Injectable } from '@angular/core';

export class TableCell {
  constructor(public index: number,
              public data: string) {}
}

export class TableData {
  constructor(
      public headers: TableCell[],
      public data: TableCell[][]
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  private readRowCells(cells: HTMLCollectionOf<HTMLTableCellElement | HTMLTableHeaderCellElement>): TableCell[] {
    const rowData = [];
    for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
      const cell = cells.item(cellIndex);
      const exportable = cell.attributes.getNamedItem('exportable');

      if (!exportable || (exportable && exportable.value !== 'false')) {
          let text = '';
          const exportValue = cell.attributes.getNamedItem('exportValue');
          if (exportValue) {
            text = exportValue.value;
          } else {
            text = cell.innerText;
          }
          if (text !== '') {
            rowData.push({index: cellIndex, data: text.trim()});
          }
      }
    }
    return rowData;
  }

  private readTable(table: HTMLTableElement): TableData {
    const headers = this.readRowCells(table.rows.item(0).cells).filter(c => {
      return c.data !== '';
    });
    const dataRows = [];
    for (let rowIndex = 1; rowIndex < table.rows.length; rowIndex++) {
      const rowData = this.readRowCells(table.rows.item(rowIndex).cells).filter(c => {
          return headers.findIndex(h => {
            return h.index === c.index;
          }) !== -1;
      });

      dataRows.push(rowData);
    }
    return new TableData(headers, dataRows);
  }

  private csvTryQuote(data: string) {
    if (data.includes(',')) {
      return '"' + data.replace(/"/g, '""') + '"';
    }
    return data.replace(/"/g, '""');
  }

  private toCsv(data: TableData) {
    let csv = '\ufeff';
    const csvSeparator = ',';

    data.headers.forEach((cell, i) => {
      csv += this.csvTryQuote(cell.data);

      if (i < (data.headers.length - 1)) {
        csv += csvSeparator;
      }
    });

    data.data.forEach((row, j) => {
      csv += '\n';

      row.forEach((cell, i) => {
        csv += this.csvTryQuote(cell.data);

        if (i < (row.length - 1)) {
        csv += csvSeparator;
        }
      });
    });

    return csv;
  }

  private toJson(data: TableData) {
    const rows = [];
    data.data.forEach((row, j) => {
      const obj = {};
      row.forEach((cell, i) => {
        obj[data.headers[i].data] = cell.data;
      });

      rows.push(obj);
    });
    return JSON.stringify(rows);
  }

  export(data: string, mimeTypeAndCharset: string, filename: string) {
    const blob = new Blob([data], {
      type: mimeTypeAndCharset
    });

    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      link.style.display = 'none';
      document.body.appendChild(link);
      if (link.download !== undefined) {
        link.setAttribute('href', URL.createObjectURL(blob));
        link.setAttribute('download', filename);
        link.click();
      } else {
        data = mimeTypeAndCharset + ',' + data;
        window.open(encodeURI(data));
      }
      document.body.removeChild(link);
    }
  }

  exportCsv(table: HTMLTableElement, filename: string) {
    const csv = this.toCsv(this.readTable(table));
    this.export(csv, 'text/csv;charset=utf-8;', filename);
  }

  exportJson(table: HTMLTableElement, filename: string) {
    const csv = this.toCsv(this.readTable(table));
    this.export(csv, 'application/json;charset=utf-8;', filename);
  }
}
