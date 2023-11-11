
const TableRowFactory = {
  createTableRow: function (index, ClassName,data) {
    switch (ClassName) {
      case "PaymentDetailRow":
          return new PaymentDetailRow(index,data);
      case "MealDetailRow":
          return new MealDetailRow(index);


      
      default:
       console.log("error"+ClassName);
    }
    
  },
};

class PaymentDetailRow {
  constructor(index, data) {
    this.index = index;
    this.tr = this.createTableRow(data);
    // 创建<select>元素
    // this.dropdown = document.createElement("select");
    // this.dropdown.classList.add("dropdown");
    // this.dropdown.addEventListener("change", () => this.handleDropdownChange());

    // // 将<select>元素添加到<tr>中
    // this.row.appendChild(this.dropdown);

    // // 调用populateDropdown来获取和设置选项数据
    // this.populateDropdown();
  }

  // 创建<tr>元素并返回
  createTableRow(data) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td><input type="checkbox"></td>
        <td><input type="text" name="SerialNo" class="SerialNo" value="${this.index}" readonly></td>
        <td>
          <select class="Category">
            <option value="0">旅費</option>
            <option value="1">膳食費</option>
          </select>
        </td>
        <td>
          <input type="date" class="DetailstartDate">
        </td>
        <td>
          <input type="date" class="DetailEndtDate">
        </td>
        <td>
        <select class="PCurrency">
        <option value="0">USD</option>
        <option value="1">TWD</option>
        </select>
        </td>
        <td><input type="number" class="AmountWithoutTax"></td>
        <td><input type="number" class="ExchangeRate"></td>
        <td><input type="number" class="TotalAmount" readonly></td>
        <td>
        <select class="Region">
        <option value=0>CHINA</option>
        <option value=1>US</option>
        </select>
        </td>
      `;
      tr.setAttribute('role', 'row');
      //tr.classList.add('tablesorter-hasChildRow');
      if(data)
    {  tr.querySelector(".Category").value = data.category;
      tr.querySelector(".DetailstartDate").valueAsDate = new Date(data.startDate);
      tr.querySelector(".DetailEndtDate").valueAsDate = new Date(data.endDate);
      tr.querySelector(".PCurrency").value = data.currency;
      tr.querySelector(".AmountWithoutTax").value = data.AmountWithoutTax;
      tr.querySelector(".ExchangeRate").value = data.ExchangeRate;
      tr.querySelector(".TotalAmount").value = data.TotalAmount;
      tr.querySelector(".Region").value = data.Region;
     }
     // $(StartDateInput).datepicker({
      //   dateFormat: "yy-mm-dd"
      
      // });
 
    // Get all elements with the specified class names
    const classNames = ["Category", "DetailstartDate", "DetailEndtDate", "PCurrency", "AmountWithoutTax", "ExchangeRate", "TotalAmount", "Region"];
   
    classNames.forEach(className => {
      const elements = tr.querySelectorAll("." + className);
      elements.forEach(element => {
        element.addEventListener("change", (event) => this.handleInputChange(event.target,tr));
      });
    });

     
    // 返回<tr>元素
    return tr;
  }


  handleInputChange(target,tr) {
    const className = target.className;
  
    // Your handling code based on the className
    switch (className) {
      case "Category":
        const selectedIndex = target.selectedIndex;
        const selectedOption = target.options[selectedIndex]; // Get the selected option
        const selectedText = selectedOption.text;
        console.log(`value: ${target.value}, text: ${selectedText}`);
          break;
      case "PCurrency":
      case "AmountWithoutTax":
      case "ExchangeRate":
        const amountWithoutTaxInput = tr.querySelector(".AmountWithoutTax");
        const quantityInput = tr.querySelector(".ExchangeRate");
        const totalAmountInput = tr.querySelector(".TotalAmount");
    
        // Retrieve values
        const amountWithoutTax = parseFloat(amountWithoutTaxInput.value);
        const quantity = parseFloat(quantityInput.value);
  
        // Perform calculation
        const totalAmount = isNaN(amountWithoutTax) || isNaN(quantity) ? 0 : amountWithoutTax * quantity;
  
        // Set the calculated value to TotalAmount input
        totalAmountInput.value = totalAmount.toFixed(2); // You can format it as needed
  
        break;
      

      // Add cases for other class names as needed
      default:
        break;
    
    }

    
  }
  //   calculatePaymentAmount(row) {
  //   var selectedCurrency = row.find(".currency-select").val();
  //   var exchangeRate = $("#currtable tbody tr:has(td:contains(" + selectedCurrency + ")) input").val();
  //   var amount = parseFloat(row.find(".amount").val());
  //   var paymentAmount = amount * exchangeRate;
  //   row.find(".exchange-rate").val(exchangeRate);
  //   row.find(".payment-amount").val(paymentAmount.toFixed(2));
  // }


  // async populateDropdown() {
  //   try {
  //     // 使用Fetch API
  //     const response = await fetch("YOUR_API_ENDPOINT_HERE");
  //     const data = await response.json();

  //     // 清空<select>元素的选项
  //     this.dropdown.innerHTML = "";

  //     // 添加选项到<select>元素
  //     data.forEach((option) => {
  //       const optionElement = document.createElement("option");
  //       optionElement.value = option.value;
  //       optionElement.textContent = option.text;
  //       this.dropdown.appendChild(optionElement);
  //     });
  //   } catch (error) {
  //     console.error("无法获取选项数据: " + error);
  //   }
  // }
}





class MealDetailRow {
  constructor(index) {
    this.index = index;
    this.tr = this.createTableRow();
    // 创建<select>元素
    // this.dropdown = document.createElement("select");
    // this.dropdown.classList.add("dropdown");
    // this.dropdown.addEventListener("change", () => this.handleDropdownChange());

    // // 将<select>元素添加到<tr>中
    // this.row.appendChild(this.dropdown);

    // // 调用populateDropdown来获取和设置选项数据
    // this.populateDropdown();
  }

  // 创建<tr>元素并返回
  createTableRow() {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td><input type="checkbox"></td>
        <td><input type="text" name="SerialNo" class="SerialNo" value="${this.index}" readonly></td>
        <td>
        <input type="date" class="MealDate"></td>
        <td>
          <select class="MealRegion">
          <option value=0>CHINA</option>
          <option value=1>US</option>
        </select>
        </td>
        <td> <select class="MealCurrency">
          <option value=0>USD</option>
          <option value=1>TWD</option>
        </select>
      </td>
        <td><input type="checkbox" name="breakfast" class="Breakfast" checked></td>
        <td><input type="number" name="breakfastAmt" class="BreakfastAmt" value="10"></td>
        <td><input type="checkbox" name="Lunch" class="Lunch" checked></td>
        <td><input type="number" name="LunchAmt" class="LunchAmt" value="15"></td>
        <td><input type="checkbox" name="Dinner" class="Dinner" checked></td>
        <td><input type="number" name="DinnerAmt" class="DinnerAmt" value="20"></td>
        <td><textarea name="description" class="Description" cols="30" rows="3"></textarea></td>
      `;

 
    // Get all elements with the specified class names
    const classNames = ["MealDate", "MealRegion", "MealCurrency", "Breakfast", "BreakfastAmt", "Lunch", "LunchAmt", "Dinner","DinnerAmt","Description"];
 
    classNames.forEach(className => {
      const elements = tr.querySelectorAll("." + className);
      elements.forEach(element => {
        element.addEventListener("change", (event) => this.handleInputChange(event.target));
      });
    });

     
    // 返回<tr>元素
    return tr;
  }


  handleInputChange(target) {
    const className = target.className;
  
    //一定會做
    $("#paymentdetail tbody tr").each((index, row) => {
      const $row = $(row);
      const category = $row.find("select.category option:selected").text();
      if (category === "膳食費") {
        $row.remove();
      }
    });



    // Your handling code based on the className
    switch (className) {
      case "MealRegion":
        const selectedIndex = target.selectedIndex;
        const selectedOption = target.options[selectedIndex]; // Get the selected option
        const selectedText = selectedOption.text;
        console.log(`value: ${target.value}, text: ${selectedText}`);
        break;
      case "DetailstartDate":
        // Handle StartDate change
        break;
      // Add cases for other class names as needed
      default:
        break;
    
    }

    
  }




}


