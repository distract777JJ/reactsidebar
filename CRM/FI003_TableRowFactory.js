
const TableRowFactory = {
  createTableRow: function (index, ClassName) {
    switch (ClassName) {
      case "PaymentDetailRow":
        return new PaymentDetailRow(index);

      default:
        return null;
    }
  },
};

class PaymentDetailRow {
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
        <td>${this.index}</td>
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
        <td><input type="number" class="Qantity"></td>
        <td><input type="number" class="TotalAmount" readonly></td>
        <td>
        <select class="Region">
        <option value=0>CHINA</option>
        <option value=1>US</option>
        </select>
        </td>
      `;

    // 获取各个<td>中的元素
    const CategoryInput = tr.querySelector(".Category");
    const StartDateInput = tr.querySelector(".DetailstartDate");
    const EndDateInput = tr.querySelector(".DetailEndtDate");
    const CurrencyInput = tr.querySelector(".PCurrency");
    const PriceInput = tr.querySelector(".AmountWithoutTax");
    const QuantityInput = tr.querySelector(".Qantity");
    const TotalInput = tr.querySelector(".TotalAmount");
    const RegionInput = tr.querySelector(".Region");


      // $(StartDateInput).datepicker({
      //   dateFormat: "yy-mm-dd" // 设置日期格式
      //   // 其他选项...
      // });
 


    // 添加事件处理函数

    CategoryInput.addEventListener("change", (event) =>
      this.handleCategoryChange(event.target)
    );
    StartDateInput.addEventListener("change", (event) =>
      this.handleStartDateChange(event.target)
    );
    EndDateInput.addEventListener("change", (event) =>
      this.handleEndDateChange(event.targetis)
    );
    CurrencyInput.addEventListener("change", (event) =>
      this.handleCurrencyChange(event.target)
    );
    PriceInput.addEventListener("change", (event) =>
      this.handlePriceChange(event.target)
    );
    QuantityInput.addEventListener("change", (event) =>
      this.handleQuantityChange(event.target)
    );
    TotalInput.addEventListener("change", (event) =>
      this.handleTotalInputChange(event.target)
    );
     RegionInput.addEventListener("change", (event) =>
       this.handleRegionChange(event.target)
    );


    // 返回<tr>元素
    return tr;
  }

  // 处理下拉选单变化事件
  handleCategoryChange(Category) {
    const selectedIndex = Category.selectedIndex;
    const selectedOption = Category.options[selectedIndex]; // Get the selected option
    const selectedText = selectedOption.text;
    console.log(`value: ${Category.value}, text: ${selectedText}`);
  }

  async populateDropdown() {
    try {
      // 使用Fetch API从API获取选项数据
      const response = await fetch("YOUR_API_ENDPOINT_HERE");
      const data = await response.json();

      // 清空<select>元素的选项
      this.dropdown.innerHTML = "";

      // 添加选项到<select>元素
      data.forEach((option) => {
        const optionElement = document.createElement("option");
        optionElement.value = option.value;
        optionElement.textContent = option.text;
        this.dropdown.appendChild(optionElement);
      });
    } catch (error) {
      console.error("无法获取选项数据: " + error);
    }
  }
}



