function convertTableToJSON(tableSelector, config) {
    const tableRows = $(tableSelector).find('tbody tr');
    const jsonData = [];
  
    tableRows.each(function() {
      const rowData = {};
  
      for (const key in config) {
        const columnConfig = config[key];
        const columnValue = $(this).find(columnConfig.selector).val();
  
        if (columnConfig.transform) {
          rowData[key] = columnConfig.transform(columnValue);
        } else {
          rowData[key] = columnValue;
        }
      }
  
      jsonData.push(rowData);
    });
  
    return JSON.stringify(jsonData);
  }
  
  // 使用示例

  