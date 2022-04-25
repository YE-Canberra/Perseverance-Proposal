const budget = {
  "Manufacture" : {
    "Perseverance" : {
      "Core Parts" : [
	{"name": "3D-Printed Parts", "price": 20000},
	{"name": "Electronics", "price": 700},
	{"name": "Miscellaneous Hardware", "price": 2000}
      ],
      "Add-ons" : [
	{"name": "SuperCam (Red LED Light)", "price": 50},
	{"name": "SuperCam (Red Laser Pointer)", "price": 100},
	{"name": "RTG Lights (Green LEDs)", "price": 100},
	{"name": "Arm (Stationary)", "price": 2000},
	{"name": "Arm (Remote Controlled)", "price": 5000},
      ]
    },
    "Ingenuity" : [
      {"name": "Design", "price": 3000},
      {"name": "3D-Printed Parts", "price": 5000},
      {"name": "Electronics", "price": 1300},
      {"name": "Miscellaneous Hardware", "price": 400}
    ]
  },
  "Labour" : [
/*
  Prices are calculated as:
  price = expected_time (hrs) * 40 ($/hr);

  total time (hrs): 		180
  total labour cost ($):	7200
*/
    {"name": "Administration", "price": 600},		//15hrs
    {"name": "Order Parts", "price": 600},		//15hrs
    {"name": "Assemble Model", "price": 2400},		//60hrs
    {"name": "Program and Wire Model", "price": 1200},	//30hrs
    {"name": "Lesson Plan Creation", "price": 1200},	//30hrs
    {"name": "Teaching", "price": 1200}			//30hrs
  ]
};

const displayTotals = () => {
  for (let i=0; i<document.getElementsByClassName("").length; i++) {
    const deets = document.getElementsByClassName("")[i].deets;
    
  }
};

const createCheckBox = (content, checked) => {
  const frag = new DocumentFragment();
  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  checkBox.type = 'checkBox';
  checkBox.checked = checked;
  checkBox.disabled = checked;
  label.textContent = content;
  frag.appendChild(checkBox);
  frag.appendChild(label);
  return frag;
};

/*
  const createTableRow = (content, price, className, checkedBox) => {
    const row = document.createElement('tr');
    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');

    row.className = className;

    if (className === "titleRow") {
      cell1.textContent = content;
      cell2.textContent = price;
    } else if (className === "sublistRow") {
      cell1.textContent = content;
      cell2.textContent = price;
    } else if (className === "itemRow"){
      cell1.appendChild(createCheckBox(content, checkedBox));
      cell2.textContent = price;
    }
  
    row.appendChild(cell1);
    row.appendChild(cell2);
    tbody.appendChild(row);
  };


//    createTableRow(content = [], className, id);

*/

const displayInt = (num) => {
  if (num < 1000) {return num;};

  arr = String(num).split('');
  const r = arr.length % 3;
  for (let i = Math.floor(arr.length/3); i > 0; i--) {
    arr.splice(r + 3*(i-1), 0, ',');
  }
  return arr.join('');
};


const createCostingList = () => {
  const tbody = new DocumentFragment();
  const createTR = (content, className, id) => {
    const row = document.createElement('tr');
    row.className = className;
    row.id = id;
    if (className === "total") {

    }
    content.forEach((datum, index) => {
      const cell = document.createElement('td');
      cell.textContent = isNaN(datum) ? datum : displayInt(datum);
      row.appendChild(cell);
    });

    tbody.appendChild(row);
  };
  const createPricedItems = (arr, tally = 0) => {
    arr.forEach((item, index) => {
      createTR([item.name, item.price], (index === 0) ? "pricedItem firstItem" : "pricedItem");
      tally += item.price;
    });
    return tally;
  };

  for (let title in budget) {
    let total = 0;
    createTR([title], "budgetTitle", `Budget${title}`);
    if (Array.isArray(budget[title])) {
      total += createPricedItems(budget[title]);
    } else {
      for (let subtitle in budget[title]) {
 	let subtotal = 0;
	createTR([subtitle], "budgetSubtitle");
	if (!Array.isArray(budget[title][subtitle])) {
	  let concat = [];
	  for (subub in budget[title][subtitle]) {
	    concat = concat.concat(budget[title][subtitle][subub]);
	  }
	  subtotal += createPricedItems(concat, subtotal);
	} else {
	  subtotal += createPricedItems(budget[title][subtitle], subtotal);
	}
	createTR(["", subtotal], "subtotal");
	total += subtotal;
      }
    }
    createTR(["",total], "total");
  }
  window.addEventListener('DOMContentLoaded', () => {
    document.getElementsByClassName('budgetTable')[0].appendChild(tbody);
  }, {once: true});
};

createCostingList();