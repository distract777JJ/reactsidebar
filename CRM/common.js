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
  const mealDetailConfig = {
    id: { selector: 'input.SerialNo', transform: parseInt },
    date: { selector: 'input.MealDate' },
    region: { selector: 'input.MealRegion' },
    currency: { selector: 'input.MealCurrency' },
    breakfastF: { selector: 'input.breakfast', transform: Boolean },
    breakfastA: { selector: 'input.breakfastAmt', transform: parseFloat },
    LunchF: { selector: 'input.Lunch', transform: Boolean },
    LunchA: { selector: 'input.LunchAmt', transform: parseFloat },
    DinneF: { selector: 'input.Dinner', transform: Boolean },
    aftDinnerA: { selector: 'input.DinnerAmt', transform: parseFloat },
    desc: { selector: 'textarea.description' },
  };
  
  const mealDetailJSON = convertTableToJSON('#Mealdetail', mealDetailConfig);
  console.log(mealDetailJSON);
  